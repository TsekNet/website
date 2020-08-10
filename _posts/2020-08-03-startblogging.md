---
layout: post
title: Get started with Jekyll, GitHub, and Netlify
image: /assets/img/blog/router.jpg
description: >
  How this website was made (and my first ever public blog post!).
tags: [dev, open source, tutorials]
---

Let's build a website!
{:.figcaption}

- Table of Contents
{:toc}

## Objective

Once completed, your new website will have the following benefits:
{:.faded}

1. Full history of your changes to any part of the site.
1. Writing blog posts is just adding a markdown file.
1. Free, automatic SSL
1. Custom domain support
1. Quick Deployments, including CI/CD
1. ...and much more!

## Prerequisites

You’re going to learn a lot but you’re also expected to come to the table with
a few things. If you plan to follow along, be sure you have the following:
{:.faded}

1. [Chocolately](https://chocolatey.org/install)
1. [VSCode](https://code.visualstudio.com)
1. Windows
1. Familiarity with Git
1. Familiarity with HTML/CSS/Markdown

## Overview

The puzzle pieces:
{:.faded}

1. [Jekyll](https://jekyllrb.com): Transforms plain text into static websites.
1. [GitHub](https://github.com): Where the static files used by Jekyll are hosted.
1. [Netlify](https://netlify.com): Detects changes pushed to GitHub, deploys a
   website, and handles HTTPS.

## Background

For me, getting this website up was a story of false starts. For years, I hosted
a basic virtualized nginx website. I've
been playing with the idea of hosting this website using the tools noted
[above](#overview) for years now. Once decided, trying to start this
website, I'd run into bugs, issues with integrating the tooling, etc.

I'd give bringing this website up another try every few months, documenting
issues experienced along the way (for your viewing pleasure).

Let's dive right in with how *you* can copy my homework.

## Jekyll

### Installation

You'll first need to install some prerequisites:

1. Install [Chocolately](https://chocolatey.org/install), a (great) software management solution.
1. Install ruby: `choco install ruby`
1. Close and re-open your preferred terminal (as admin) or
refresh your environment before continuing.

Next up, you'll need to install Jekyll and it's prerequisites:

1. Install bundler: `gem install bundler`
1. Install Jekyll:
   - Install mysys2: `choco install msys2 `
   - Install the Ruby Installer Development Kit: `ridk install 3`
   - `gem install jekyll` or your preferred theme*

I would pause here if you're interested in a custom theme, and leverage the
default installation/configuration of the selected theme instead of the Jekyll
default. See [below](#my-theme) for this website's theme.
{:.note title="IMPORTANT"}

Finally, let's get your blog up and running:

1. Navigate to the root folder for your blog, for example: `cd C:\Projects`
1. Configure your blog: `jekyll new myblog; cd myblog; bundle install`
1. Start your blog: `jekyll serve`
1. Browse to <http://localhost:4000>. Congrats, \<you're the blogger now\>.gif 🎉

### My Theme

This website leverages the Hydejack pro theme. The
[Hydejack documentation](https://hydejack.com/docs) is a good place to get
started if you're interested. The main benefit I've found for the pro version of
this theme is included dark mode support.

If you wants to use free version, clone or download the [Hydejack starter
kit](https://github.com/hydecorp/hydejack-starter-kit/tree/gh-pages). You'll
find all the files required to get your blog up and running included.

### Customization and Iteration

This is where you'll spend most of your time, and this is really *never* done. You'll
want to add your own spark to your website. Look into popular Jekyll plugins as a
start!

At the very least, you'll want to modify the `_config.yml`, `Gemfile`, and any
included markdown files (e.g. `about.markdown` and `index.markdown`) to reference
your information, rather than the defaults. I'd recommend spending some time and
looking through your sites basic configuration(s).

To make changes to this website, here's the flow that I usually follow:

1. Navigate to your site: http://localhost:4000
1. Make a change to a file such as `_config.yml`
1. Did anything break? Did the updates take effect?
1. ???
1. Repeat

## GitHub

Step one of three done already—onwards to making your website open source!

### Setup Your Repository

Everything you are seeing on the
website is actually hosted on my [GitHub
Repo](https://github.com/tseknet/website). Here's how you can do the same:

1. Navigate to [GitHub](https://github.com), creating an account if necessary.
1. Navigate to https://github.com/new:
   - Enter your desired repository name (ex: myblog) and an optional description.
   - Initialize with a README
   - I normally select an `MIT License`, but that's up to you.
1. Click `Create Repository`
1. Clone your newly created repo via VSCode. See this
   [post](https://medium.com/@brygrill/version-control-basics-with-github-and-vs-code-1c1906cadd33)
   for how that works.

I manage my repo in VSCode, but this
will work via the [command
line](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)
as well.
{:.note title="tip"}

### GitHub Files

You'll want to modify a few commonly used GitHub files in VSCode locally.

1. README.md: This will be what everyone sees when they visit your repository,
   for example:
```
This repo hosts my website, which leverages Jekyll and Netlify to serve this static website.
```
1. .gitignore: Files not uploaded to GitHub, for example:
```
_site
.jekyll-cache
Gemfile.lock
```

### Upload Your Website

To upload your website to GitHub:

1. Copy the entire *contents* of your website into the new folder containing
   your repository.
1. Commit your changes, then Push your code to GitHub. Again, see this [post](https://medium.com/@brygrill/version-control-basics-with-github-and-vs-code-1c1906cadd33) for how that works.
1. Navigate back to your GitHub repository to confirm the files were uploaded successfully.

## Netlify CMS

Final stretch—now let's automate your website!

Netlify, at a basic level, runs the `jekyll build` command for you against your
GitHub repo, just like you would run locally. The following steps will get you started, taken directly from the
official [Netlify Jekyll
guide](https://www.netlify.com/blog/2020/04/02/a-step-by-step-guide-jekyll-1.0-on-netlify/):

1. Navigate to [Netlify](https://netlify.com), creating an account if necessary.
1. Add your new site by clicking `New site from Git`
1. Link to your GitHub by following the prompts to connect, pick a repo, and build.
   - Build options can be left as the default for Jekyll.
1. Build your site. You should now see `Deploy in progress`, and after a minute
   or so, your new website (with a custom URL) should be live!

Netlify has wonderful (and documented) support for automatic SSL via [LetsEncrypt](https://docs.netlify.com/domains-https/https-ssl) and
[custom domains](https://docs.netlify.com/domains-https/custom-domains).
{:.note title="TIP"}

## Conclusion

By leveraging Jekyll, GitHub, and Netlify, you can reap all the benefits of code
based configuration, have automatic SSL, and have a beautiful website with tons of
plugins available.

I hope you've found this guide useful. As always, if there
are any questions/concerns, please reach out to me directly and I'll get to them ASAP.

Now get out there and build that beautiful website 🏗️

## Related Links

- [Hosting Your Website With Github and Netlify](https://www.youtube.com/watch?v=hBQlCtfRmqs)
- [Setup Custom Domain On Netlify](https://www.youtube.com/watch?v=Q9giWrfIJKk)
- [How I customized Hydejack Theme](https://lazyren.github.io/devlog/how-i-customized-hydejack-theme.html#conclusion)
- [Hydejack Showcase](https://hydejack.com/showcase/)
- [Jekyll Style Guide](https://ben.balter.com/jekyll-style-guide/)
- [Jekyll Cheat Sheet](https://devhints.io/jekyll)