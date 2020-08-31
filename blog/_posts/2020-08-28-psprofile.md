---
layout: post
title: My PowerShell Profile
image: /assets/img/blog/robotpiano.jpg
description: >
  Neat functions I've added to make my life easier
tags: [dev, automation, windows, powershell]
---

Are we automated yet?
{:.figcaption}

- Table of Contents
{:toc}

## Objective

Share my PowerShell profile with the world in a digestible manner. Explain the
main functions, how you can install my profile, and optionally contribute.

## Prerequisites

You’re going to learn a lot but you’re also expected to come to the table with a
few things. If you plan to follow along, be sure you have the following:

1. Windows 10 (tested on 1903 and newer)
1. Windows PowerShell (tested on 5.1 and 7.0), run as administrator

## Background

Profiles are loaded every time you launch PowerShell. You can add fancy
functions to your profile to make your life easier (such as Get-CatFacts 🐱).
{:.tldr}

PowerShell profiles are unique—they're personal. They're living things, just as
your needs change over time, I expect your PowerShell profile will as well, heck
mine sure has (just look at my [commit
history](https://github.com/TsekNet/PowerShell-Profile/commits/master)).

Realistically, I see basic functions like setting the default directory when you
launch PowerShell, importing some modules, setting some aliases being universal.
You may not *need* any of these, just like you don't *need* a PowerShell profile
at all, but we're talking about the quality of life here, not *needs*.

PowerShell profiles are a rabbit hole for sure. Every blog post I've seen goes
into (excruciating) detail on the different types of profiles, which one you'll need, etc. I'll
save you the time (and handle it for you), but if you're interested, go check out the official [PowerShell
docs](https://docs.microsoft.com/en-us/PowerShell/module/microsoft.PowerShell.core/about/about_profiles).

## Proof of Concept

Before we dive in, here's a taste. Try the following:

1. Open PowerShell as administrator
1. Create your profile by typing `New-Item $profile`

   You'll get an error if the file already exists. This is expected.
   {:.faded}
1. Copy the code block below into your `$profile`
```powershell
Set-Location $env:TEMP
Import-Module PSReadLine -Verbose
Set-Alias ll Get-ChildItem -Option AllScope
```
1. Type `& $profile` and hit enter. There you go, there's your first PowerShell $profile.

What happens? What did you expect to happen?
{:.faded}

## My Profile

<button class="btn btn-sm btn-primary" onclick=" window.open('https://github.com/TsekNet/PowerShell-Profile','_blank')" value="View Source on Github">
  <small class="icon-github"></small> View Source on Github
</button>

---

My personal PowerShell profile is made with [sugar, splice, and everything
nice](https://www.youtube.com/watch?v=HYhnflyun4E).

![admin](/assets/img/blog/admin_git.png)
PowerShell running in an administrative window while working on a git repo
{:.figcaption}

![admin](/assets/img/blog/non-admin.png)
PowerShell running in a non-admin window while working in `C:\Tmp`
{:.figcaption}

---

This is where I tell you to be sure you're aware of what you're downloading from the internet.
You can view the source on GitHub and inspect the code prior to
downloading/executing anything described in this post. I do eventually plan on
making my profile a signed PowerShell module to make it easier to download and
distribute.
{:.warning}

If you want to just get started with copying my homework run the following command in
PowerShell as administrator:

```powershell
iex ((New-Object Net.WebClient).DownloadString('https://github.com/tseknet/PowerShell-Profile/raw/master/install.ps1'))
```

You'll see verbose messages scrolling by explaining what is currently
executing. You should also see a few prompts along the way, such as to allow a new
NuGet provider. This is expected.

See [fonts](#fonts) below if you see missing characters in your prompt.
{:.important}

### What's Included

#### Modules

I can't take all the credit. The following (awesome) modules will be installed
by default:

1. [posh-git](https://github.com/dahlbyk/posh-git): Integrates Git and
   PowerShell by providing Git status summary information
1. [oh-my-posh](https://github.com/JanDeDobbeleer/oh-my-posh): Theme engine for
   PowerShell
1. [Get-ChildItemColor](https://github.com/joonro/Get-ChildItemColor): Provides
   colorization of outputs of `Get-ChildItem` Cmdlet of PowerShell
1. [PSWriteHTML](https://github.com/EvotecIT/PSWriteHTML): Output PowerShell
   commands to a formatted HTML page

#### Fonts

By default, my profile installs [Powerline](https://github.com/PowerLine/fonts)
fonts from GitHub to enable custom characters in the console. You may see
multiple popups to install fonts. This is expected.

Once the font(s) are installed, you may see multiple missing characters. To fix
this, see the instructions below.

The default Powerline font that this theme uses is `DejaVu Sans Mono for Powerline`. This can be modified in `profile.ps1`.
{:.note}

##### Terminal/VSCode

Change your PowerShell font to `DejaVu Sans Mono for Powerline` in the settings
JSON file.

##### PowerShell Console

1. Right-click the title bar of the PowerShell console
2. Select Properties
3. Select the Font tab
4. Locate `DejaVu Sans Mono for Powerline`
5. Click OK

You should now see your fully customized prompt 🎉

#### Custom Functions

Here's a high-level summary of some functions that my profile script provides:

1. Auto-update: Download the latest profile file from GitHub if necessary
1. Set the PowerShell Window Title with useful information such as elevation and version
1. Install and import modules listed above
1. Overwrite `ll` / `ls` / `history` commands for better results
1. Download and set my personal `oh-my-posh` theme module, [TsekNet.psm1](https://github.com/TsekNet/PowerShell-Profile/blob/master/Themes/TsekNet.psm1)
1. Install [Powerline](https://github.com/PowerLine/fonts) fonts using `posh-git`
1. Set the default location
1. Output functions made by the profile to the console

    ...and much more!

## Troubleshooting

Errors will be shown in the console. Type `$Error[0]` to see the latest error
message if necessary for troubleshooting.

## Making it Your Own

As mentioned in the [background](#background) section, PowerShell profiles are unique. Feel free to
fork [my profile](https://github.com/TsekNet/PowerShell-Profile) from GitHub, and modify it to fit your needs.

As an example, you can point the auto-updater function `Import-GitRepo` to
your repository [here](https://github.com/TsekNet/PowerShell-Profile/blob/0bfb9352fcd69a64889d379242dd4fce5201f1f8/profile.ps1#L277).

I've tried to break out functions that you may want to modify at the bottom of
the script, including cmdlets with configurable options.

## Conclusion

By leveraging PowerShell profiles, you can make your every day repetitive tasks
easier.

Wish you could get the weather at any moment from PowerShell? Make a function,
add it to your profile. Wish you could [get random comics](psoneliners#get-a-random-xkcd-comic)?
Make a function, add it to your profile.

I invite you to open a [pull request](https://github.com/TsekNet/PowerShell-Profile) if you found any issue with my PowerShell
profile. Got a cool function you're using in your profile? Leave a comment below!

Now get out there and make PowerShell do the work for you ✨

## Related Links

- [Jaykul's Profile on GitHub](https://github.com/Jaykul/Profile)
- [PowerShell Docs](https://docs.microsoft.com/en-us/PowerShell/module/microsoft.PowerShell.core/about/about_profiles)
- [How To Uniquify Your PowerShell Console](https://dev.to/hf-solutions/how-to-uniquify-your-PowerShell-profile-2b35)
- [Understanding the Six PowerShell Profiles](https://devblogs.microsoft.com/scripting/understanding-the-six-PowerShell-profiles/)