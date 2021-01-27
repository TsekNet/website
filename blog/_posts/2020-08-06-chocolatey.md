---
layout: post
title: How I Automated Software Management
image: /assets/img/blog/chocolatebar.jpg
description: >
  How I automated my Windows Software Management
tags: [dev, automation, windows, powershell]
---

- Table of Contents
{:toc}

Did someone say chocolate? 🍫
{:.lead}

From [chocolatey.org](https://chocolatey.org):

> Chocolatey is software management automation for Windows that wraps
> installers, executables, zips, and scripts into compiled packages.

For years, I’ve been using various different iterations of software installation
automation tools such as [Ninite](https://ninite.com),
[PDQ](https://www.pdq.com),
[SCCM](https://en.wikipedia.org/wiki/Microsoft_System_Center_Configuration_Manager),
etc. These are great solutions for enterprise deployments, but I found myself
wanting a simple, code-based solution that allows software to be managed on all
systems by simply running a few commands.

This post aims to share with the world how I made software management sane
again. Chocolatey keeps software consistent (and updated!) across all of my systems. Heck, Chocolatey
could even be used to automate your mom's software updates so she never
calls you to ask how to update iTunes again (that last bit may be based in
reality).

Enter Chocolatey 🤘
{:.lead}

## Prerequisites

You’re going to learn a lot but you’re also expected to come to the table with a
few things. If you plan to follow along, be sure you have the following:

1. Windows 10 (1903 or above is required for Windows Terminal)
1. Windows PowerShell 5.1 or newer, run as administrator

Type `winver` in any terminal to check your current Windows version.
{:.tip}

## Install Chocolatey Client

Run the following commands in PowerShell as administrator:

```powershell
# Allow downloads
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Force

# Install Chocolatey
iwr https://chocolatey.org/install.ps1 -UseBasicParsing | iex

# Auto confirm package installations (no need to pass -y)
choco feature enable -n allowGlobalConfirmation -y
```

## Install Software Packages

The packages listed below are my personal preferences. You'll want to hand
curate this list to fit your needs. Visit
[chocolatey.org/packages](https://chocolatey.org/packages) for a complete list
of available packages.
{:.important}

Run the following command in PowerShell as administrator:

```powershell
# Install packages and create a scheduled task to update chocolatey weekly at 1AM.
choco install 7zip chrome-remote-desktop-host git gitversion.portable google-backup-and-sync googlechrome greenshot keepass microsoft-edge microsoft-windows-terminal mpc-hc notepadplusplus openssh powershell-preview putty python3 spotify steam treesizefree vscode-insiders cascadiacodepl starship choco-upgrade-all-at --params "'/WEEKLY:yes /DAY:SUN /TIME:01:00'"
```

### Sprinkle Some Personal Packages

Here are some additional packages that I install on my personal (non-work) systems.

```powershell
# Personal PC Packages
choco install cpu-z disablewintracking discord f.lux logitechgaming nvidia-display-driver wd-backup
```

## Conclusion

Chocolatey = Awesome.
{:.tldr}

By leveraging Chocolatey, you can automatically install the same software
across any number of hosts and ensure they're kept up-to-date with a few simple
commands.

This is where I note that Chocolatey does a bunch more than just making my life
easier; see their [features](https://chocolatey.org/pricing) list if you're
interested in learning more and possibly deploying Chocolatey as your
enterprise software management solution.

Now get out there and make your workflow and life sweeter with Chocolatey 🤖

## Related Links

- [Microsoft windows-dev-box-setup-scripts](https://github.com/microsoft/windows-dev-box-setup-scripts)
- [Getting Started with the Chocolatey Package Manager](https://adamtheautomator.com/install-chocolatey/)
- [Use Chocolatey to automate application installations on a Windows development machine](https://ttu.github.io/use-chocolatey-to-install-apps-windows-dev-machine/)