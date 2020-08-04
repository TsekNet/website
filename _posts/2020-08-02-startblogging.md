---
layout: post
title: Start blogging with Jekyll, GitHub, and Netlify
image: /assets/img/blog/router.jpg
description: >
  How this website was made (and my first ever blog post!).
hide_description: true
sitemap: true
---

Why wasn't I doing this before?
{:.lead}

- Table of Contents
{:toc}

> Hello, world! This is my first ever (public) blog post!

## Why

Once completed, your new website will have the following benefits:
{:.faded}

1. Full history of your changes to any part of the site.
1. Writing blog posts is just adding a markdown file.
1. Free, automatic SSL
1. Custom domain support
1. Quick Deployments, include CI/CD
1. ...and much more!

## Requirements

The following are recommended before continuing:
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
2. [GitHub](https://github.com): Where the static files used by Jekyll are hosted.
3. [Netlify](https://netlify.com): Detects changes pushed to GitHub, deploys a
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

> NOTE: Prior to going through these instructions, you may want to locate a
> Jekyll theme that you prefer over the default. Otherwise, you may need to
> start over with your preferred theme. See [below](#my-jekyll-theme) for my theme.

1. Install [Chocolately](https://chocolatey.org/install), a (great) software management solution.
1. Install ruby: `choco install ruby`
1. Close/Reopen your preferred terminal as admin or refresh your environment.
1. Install bundler: `gem install bundler`
1. Install Jekyll:
   - Install mysys2: `choco install msys2 `
   - Install the Ruby Installer Development Kit: `ridk install 3`
   - `gem install jekyll`
1. Navigate to the root folder for your blog, for example: `cd C:\Projects`
1. Configure your blog: `jekyll new myblog; cd myblog; bundle install`
1. Start your blog: `jekyll serve`
1. Browse to <http://localhost:4000>. Congrats, \<you're the blogger now\>.gif 🎉

#### My Jekyll Theme

For this website, I chose the [Hydejack](https://hydejack.com) Pro theme. This
is a paid theme, and includes all the files required to start a website.

> WARNING: This theme required heavy modifications to configuration files
> prior to launching my website.

### Customization and Iteration

This is where you'll live for a while, and this is really *never* done. You'll
want to add your own spark to your website Look into popular Jekyll plugins as a
start!

At the very least, you'll want to modify the `_config.yml`, `Gemfile`, and any
included markdown files (e.g. `about.markdown` and `index.markdown`) to include
your information, rather than the defaults. I'd recommend spending some time and
looking through your sites basic configuration.

The basic workflow is as follows:

1. Make a change to a file such as `_config.yml`
2. Navigate to your site: http://localhost:4000
3. Did anything break? Did the updates take effect?
4. ???
5. Repeat

## GitHub

Step one of three done already—onwards!

### Setup Your Repository

GitHub is where your files my website lives. Everything you are seeing on the
website is hosted on my [GitHub Repo](https://github.com/tseknet/website). To
create a repo for your website:

1. Navigate to GitHub.com, create an account if necessary.
1. Navigate to https://github.com/new:
   - Enter a repository name
   - Optional Description
   - Initialize with a README
   - I normally select an `MIT License`, but that's up to you.
1. Click `Create Repository`
1. Clone your newly created repo via VSCode. See this [post](https://medium.com/@brygrill/version-control-basics-with-github-and-vs-code-1c1906cadd33) for more info.

> NOTE: I manage my repo in VSCode, but this
> will work via the [command line](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) as well.

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
1. Commit your changes, then Push your code to GitHub. Again, see this [post](https://medium.com/@brygrill/version-control-basics-with-github-and-vs-code-1c1906cadd33) for more info.
1. Navigate back to your GitHub repository to confirm the files were uploaded successfully.

## Netlify CMS

Final stretch—almost done!

Netlify, at a basic level, runs the `jekyll build` command for you against your
GitHub repo. The following steps will get you started, taken directly from the
official [Netlify Jekyll
guide](https://www.netlify.com/blog/2020/04/02/a-step-by-step-guide-jekyll-4.0-on-netlify/):

1. Add your new site by clicking `New site from Git`
2. Link to your GitHub by following the prompts to connect, pick a repo, and build.
   - Build options can be left as the default for Jekyll.
3. Build your site. You should now see `Deploy in progress`, and after a minute
   or so, your new website (with a custom URL) should be live!

> TIP: Netlify has wonderful (and documented) support for automatic SSL via [LetsEncrypt](https://docs.netlify.com/domains-https/https-ssl) and
> [custom domains](https://docs.netlify.com/domains-https/custom-domains).
