---
layout: post
title: "Building a Script Library for FleetDM"
image: /assets/img/blog/library.jpg
description: >
  Use a common scripts library in FleetDM to avoid rewriting common script logic
tags: [automation, dev, devops, fleet, github, open source, powershell, tips, tutorials, windows]
---

Inline helper functions into Fleet scripts at deploy time.
{:.lead}

- Table of Contents
{:toc}

## The Problem Every Language Solved Except Mine

Most programming languages have language runtime resolves the dependency, loads the code,
and you never think about it again.

[Fleet](https://fleetdm.com/) scripts don't have an import mechanism. Each
script that
[`fleetctl gitops`](https://fleetdm.com/docs/configuration/yaml-files#gitops)
deploys is a standalone unit. Fleet uploads it, pushes it to the endpoint, and
runs it. There's no way to say "this script should import this other function." No
`requirements.txt`. No `go.mod`, no `.psd1` manifest. Just a script on its own.

There's an [open feature request](https://github.com/fleetdm/fleet/issues/27320)
for centralized script libraries in Fleet. Until that ships, if your scripts
share common functions, your options are:

| Approach | Problem |
|----------|---------|
| Copy-paste helpers into every script | Drift. One bug fix, N files to update. |
| Pre-stage files on disk | Need to keep those functions/files up-to-date|

I built another option.

## The idea

Rather than copying your script logic to every script in your environment, use
CI to expand known comments in your scripts with functions that can be shared
across all scripts. For example:

Script in your repo:

```bash
#!/bin/bash
#Helpers log, run
set -euo pipefail
log "Installing package..."
run installer -pkg "$pkg" -target /
```

Expanded script that lives in Fleet:

```bash
#!/bin/bash
#region helpers
log() {
    # timestamp, severity, write to stdout + syslog
}

run() {
    # log the command, execute it, capture exit code, log result
}
#endregion helpers

set -euo pipefail
log "Installing package..."
run installer -pkg "$pkg" -target /
```

The primary benefit here is that you have a common log and run function
for all your scripts, rather than duplicating code in each script. This
can be expanded to include any number of functions.

## The deets

Here's the high-level idea of how you can implement the a Fleet GitOps shared script library:

### Create a helpers folder

In your Fleet GitOps repo, create some known directory structure. Create one file per helper
function. Each file can declare its own dependencies using the same `#Helpers` directive,
so the inliner resolves the full tree:

```text
helpers/
  linux/
    log.sh
    run.sh
  mac/
    log.sh
    run.sh
    download.sh
  windows/
    Log.ps1
    Run.ps1
    ...tests
    ...etc.
```

Works for any scripting language. Bash for macOS and Linux, PowerShell for
Windows. The inliner doesn't care about the language, it just reads the
`#Helpers` line and does string replacement.

### Write your CI script

Write a CI script that replaces your comment (`#Helpers` in my example) with
your expanded code from the folder, some pseudocode included below to get you
started:

```python
# Load helper files: name -> {body, deps}
helpers = {}
for file in helpers_dir.glob("*.*"):
    if file.name.startswith("_"):
        continue
    name = file.stem
    deps = parse_directive(file.read_text().splitlines()[0])
    helpers[name] = {"body": file.read_text(), "deps": deps}

# Process every script that starts with #Helpers
for script in repo.rglob("*"):
    first_line = script.read_text().splitlines()[0]
    if not first_line.startswith("#Helpers"):
        continue

    requested = parse_directive(first_line)

    # Resolve transitive dependencies (topological sort)
    resolved = topo_resolve(requested, helpers)

    # Build: base preamble + each helper in dependency order
    block = base_content
    for name in resolved:
        block += helpers[name]["body"] + "\n"

    # Replace the directive with the inlined block
    output = shebang + "\n#region helpers\n" + block + "#endregion helpers\n"
    output += rest_of_script

    write_to(generated_dir / script.relative_to(repo), output)
```

The key is **transitive resolution**. If your script says `#Helpers download`,
and `download.sh` declares `#Helpers log, run`, the inliner walks the full
tree and emits all three in the right order. Developers just say what they
need, not what their dependencies need.

### Write a deploy hook

Run the inliner before `fleetctl gitops`:

```bash
python3 inliner.py

# Copy generated scripts over source so fleetctl reads them
cp -r .generated/. source/

fleetctl gitops -f config.yml
```

`fleetctl gitops` never sees the `#Helpers` directive. It gets a
self-contained script. Fleet stores it, pushes it to endpoints, done.

### (OPTIONAL) Add a --dry-run flag

You might want to add a `--dry-run` flag that runs the full resolution pass
without writing files. If any script references a helper that doesn't exist,
it fails:

```log
ERROR: unknown helper 'donwload'. Available: download, log, run, ...
```

Wire this into your CI pipeline. A typo in a `#Helpers` directive should fail
your merge request, not an endpoint at 3am.

## Parting Words

I know this is a hack. It's a C preprocessor for shell scripts. It's
`#include` with extra steps. Every real language solved `import` decades ago,
and [Fleet will too](https://github.com/fleetdm/fleet/issues/27320),
eventually.

But today, Fleet scripts are standalone, and that's the
constraint to design around. Self-contained scripts have no runtime
dependencies, no version drift, no "works on my machine." The inliner just
automates what you'd otherwise do by hand: copy the right functions into the
right scripts, every time, without mistakes.

About 100 lines of code, a CI hook, and a one-line directive per script. If
your Fleet GitOps repo has more than a handful of scripts, hopefully you
found this post helpful.

Have fun out there ✌️

## Related Links

- [Centralized function library for Fleet scripts](https://github.com/fleetdm/fleet/issues/27320) - The feature request that would make this post obsolete
- [Fleet GitOps](https://fleetdm.com/docs/configuration/yaml-files#gitops) - Configuration as code for osquery
- [FleetDM](https://fleetdm.com/) - Open-source device management
- [fleetctl gitops](https://fleetdm.com/docs/using-fleet/gitops) - How Fleet deploys from git
- [Topological Sorting](https://en.wikipedia.org/wiki/Topological_sorting) - What the inliner does with your dependency graph
