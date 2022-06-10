---
layout: post
title: Get started with Jekyll, GitHub, and Netlify
image: /assets/img/blog/idea.jpg
description: >
  How this website was made (and my first ever blog post!)
tags: [dev, open source, tutorials]
---

Let's build a website!
{:.figcaption}

- Table of Contents
{:toc}

## Objective

Build a free, open-source website.
{:.faded}

Jekyll theme, code on GitHub, hosted by Netlify. You'll reap the following benefits:

1. A full history of your changes to any part of the website
1. Write blog posts entirely in Markdown
1. Free, automatic SSL
1. Quick deployments, including CI/CD by default

   ...and much more!

## Prerequisites

You’re going to learn a lot but you’re also expected to come to the table with
a few things. If you plan to follow along, be sure you have the following:
{:.faded}

1. [Chocolatey](https://TsekNet.com/blog/chocolatey)
1. Windows
1. Familiarity with Git
1. Familiarity with HTML/CSS/Markdown
1. (Optional) [VSCode](https://code.visualstudio.com)
1. (Optional) A custom domain name

While this tutorial was written with Windows in mind, the only difference
per platform is how you [install
Jekyll](https://jekyllrb.com/docs/installation/) and file paths.
{:.note}

## Background

Getting [my blog](https://tseknet.com) launched was a story of false
starts. I started this project to push myself to learn new tools (read: play
with new toys).

For years, I hosted a basic cover page website via a virtualized Nginx VM, shown below:

![Old Site](../assets/img/blog/oldsite.png){:.img width="500" height="100" loading="lazy"}

I've been toying with the idea of hosting my blog using the tools noted
[below](#overview) ever since that old website was launched. I documented how I
accomplished that goal for your viewing (reading?) pleasure.

Let's dive right in with how *you* can copy my homework.

## Overview

The puzzle pieces:
{:.faded}

1. [Jekyll](https://jekyllrb.com): Transforms plain text into static websites.
1. [GitHub](https://github.com): Where the static files used by Jekyll are hosted.
1. [Netlify](https://netlify.com): Detects changes pushed to GitHub, deploys a
   website, and handles HTTPS.

## Jekyll

### Installation

Want to skip the install step? See this [blog post](jekyll-codespaces)
{:.tip}

You'll first need to install some prerequisites:

1. Install [Chocolatey](https://tseknet.com/blog/chocolatey) for Windows, a (great) software management solution.
1. Install ruby: `choco install ruby`
1. Close and re-open your preferred terminal (as admin) or
refresh your environment before continuing.

Next up, you'll need to install Jekyll and its prerequisites:

1. Install bundler: `gem install bundler`
1. Install Jekyll:
   - Install mysys2: `choco install msys2 `
   - Install the Ruby Installer Development Kit: `ridk install 3`
   - `gem install jekyll` or your preferred theme (see note below)

I would pause here if you're interested in leveraging a custom theme, as Jekyll themes often
provide all the files you'll need to get started. My blog uses the HydeJack
theme, described [below](#my-theme).
{:.note}

Finally, let's get your blog up and running:

1. Navigate to the root folder for your blog, for example: `cd C:\Projects`
1. Initialize your blog: `jekyll new myblog` (skip this step if
   you're using a custom theme)
1. Navigate to your blog: `cd myblog`
1. Install required bundles: `bundle install`
1. Start your blog: `jekyll serve`
1. Browse to <http://localhost:4000>. Congrats, \<you're the blogger now\>.gif 🎉

### My Theme

My blog leverages the Hydejack Pro theme. The
[Hydejack documentation](https://hydejack.com/docs/) is a good place to get
started if you're interested. The main benefit I've found for the pro version of
this theme is dark mode support.

If you want to use the free version, clone (or download) the [Hydejack starter
kit](https://github.com/hydecorp/hydejack-starter-kit/tree/gh-pages). You'll
find all the files required to get your blog up and running included.

### Customization and Iteration

This is where you'll spend most of your time, and this is *never* really done. You'll
want to add some personality to your website. Feel free to copy anything you like from
[my GitHub repo](https://github.com/tseknet/website). Another good
place to start is searching for popular Jekyll plugins.

At the very least, you'll want to modify the `_config.yml`, `Gemfile`, and any
included markdown files (e.g. `about.markdown` and `index.markdown`) to reference
your information, rather than the defaults. I'd recommend spending some time
looking through your site's basic configuration(s).

To make changes to my blog, here's the workflow that I usually follow:

1. Navigate to your site: [http://localhost:4000](http://localhost:4000)
1. Make a change to a file such as `_config.yml`
1. Did anything break? Did the updates take effect?
1. ???
1. Repeat

## GitHub

Step one of three done already? Onwards to making your website open source!
{:.faded}

### Set Up Your Repository

Everything you are seeing on this
website is hosted on my [GitHub
Repo](https://github.com/tseknet/website). Here's how you can do the same:

1. Navigate to [GitHub](https://github.com), creating an account if necessary.
1. Navigate to [https://github.com/new](https://github.com/new):
   - Enter your desired repository name (ex: myblog) and an optional description.
   - Initialize with a README
   - Add .gitignore: `Jekyll`
   - I normally select an `MIT License`, but that's up to you.

    ![Old Site](../assets/img/blog/newgitrepo.png){:.img width="500" height="10"
    loading="lazy"}

1. Click `Create Repository`
1. Clone your newly created repo via VSCode. See this
   [post](https://medium.com/@brygrill/version-control-basics-with-github-and-vs-code-1c1906cadd33)
   to learn how.

I manage my repo in VSCode, but this will work via the [command
line](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)
as well.
{:.tip}

### GitHub Files

You'll want to modify a few commonly used GitHub files in VSCode locally.

1. `README.md`: This will be what everyone sees when they visit your repository.
   See [makeareadme.com](https://www.makeareadme.com/) for tips on how to make
   awesome README files.

    Example:
    ```
    This repo hosts my website, which leverages Jekyll and Netlify to serve this static website.
    ```

1. `.gitignore`: Files not uploaded to GitHub, you'll want to ensure the following
   exist at the very least.

    Example:
    ```
    _site
    .jekyll-cache
    Gemfile.lock
    ```

### Open Source Your Website

To upload your website to GitHub:

1. Copy the entire *contents* of your website into the new folder containing your repository.
1. Commit your changes, then push your code to GitHub. Again, see [this post](https://medium.com/@brygrill/version-control-basics-with-github-and-vs-code-1c1906cadd33) for how that works.
1. Navigate back to your GitHub repository to confirm the files were uploaded successfully.

## Netlify CMS

Final stretch! Now let's automate that website!
{:.faded}

Netlify runs the `jekyll build` command for you against your
GitHub repo, does SSL/optimization/CDN "magic", and publishes your website.
{:.tldr}

The following steps will get you started, taken directly from the official [Netlify Jekyll
guide](https://www.netlify.com/blog/2020/04/02/a-step-by-step-guide-jekyll-1.0-on-netlify/):

1. Navigate to [Netlify](https://netlify.com), creating an account if necessary.
1. Add your new site by clicking `New site from Git`
1. Link to your GitHub by following the prompts to connect, pick a repo, and build.
   - Build options can be left as the default for Jekyll.
1. Build your site. You should now see `Deploy in progress`, and after a minute
   or so, your new website (with a custom URL) should be live!

### Netlify vs GitHub Pages

Netlify has free [custom domain support](https://docs.netlify.com/domains-https/custom-domains), [automatic certificate management](https://docs.netlify.com/domains-https/https-ssl), [handles minify for CSS and JavaScript](https://www.netlify.com/blog/2019/08/05/control-your-asset-optimization-settings-from-netlify.toml/), etc.

There are also paid features such as [analytics](https://www.netlify.com/products/analytics/), with no cookies required.

Netlify has a good comparison listed directly on their [website](https://www.netlify.com/github-pages-vs-netlify/) if you're interested in learning more.

## Conclusion

By leveraging Jekyll, GitHub, and Netlify, you can reap all the benefits of
code-based configuration, take for granted features such as automatic SSL, and
have a beautiful website with tons of
plugins available.

I hope you've found this guide useful. I appreciate your time in reading my first blog post!

If you run into any issues or have any suggestions, please reach out to me directly or leave a comment.

Now get out there and build that beautiful website 🏗️

## Related Links

- [Hosting Your Website With Github and Netlify](https://www.youtube.com/watch?v=hBQlCtfRmqs)
- [Setup Custom Domain On Netlify](https://www.youtube.com/watch?v=Q9giWrfIJKk)
- [How I customized Hydejack Theme](https://lazyren.github.io/devlog/how-i-customized-hydejack-theme.html#conclusion)
- [Hydejack Showcase](https://hydejack.com/showcase/)
- [Jekyll Style Guide](https://ben.balter.com/jekyll-style-guide/)
- [Jekyll Cheat Sheet](https://devhints.io/jekyll)
