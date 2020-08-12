---
layout: post
title: My Chocolately Setup
image: /assets/img/blog/chocolatey.jpg
description: >
  How I automated my computer setup.
tags: [dev, automation, windows, powershell]
---

You've got a nice package (manager)
{:.figcaption}

- Table of Contents
{:toc}

## Chocolatey

Did someone say chocolate?
{:.faded}

From [chocolately.org](https://chocolatey.org):

> Chocolatey is software management automation for Windows that wraps
> installers, executables, zips, and scripts into compiled packages.

## Objective

This post describes how the commands I run on every new personal (and work)
system as soon as I log in for the first time. This ensures all of my systems
have the same software installed, everything kept up-to-date, and everything is
updated at the same time. Heck, this could even be used to automate your mom's
computer so she never calls you to ask how to update iTunes again (that last bit
may be based in reality).

## Prerequisites

You’re going to learn a lot but you’re also expected to come to the table with
a few things. If you plan to follow along, be be sure you have the following:

1. Windows 10 - 1903 or above is required for Windows Terminal
1. Windows PowerShell 5.1 or newer, run as administrator
1. [Chocolately](https://chocolatey.org/install)

## Background

For years, I've been using various different iterations of software installation
automation tools such as [ninite](https://ninite.com),
[PDQ](https://www.pdq.com),
[SCCM](https://en.wikipedia.org/wiki/Microsoft_System_Center_Configuration_Manager),
etc.

These tools all worked great, and some of them are still the preferred solutions
for companies I've worked at. What chocolately provides is a simple, code based
solution that allows me to manage software on my personal and work systems in a
similar fashion.

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

The packages listed below are my personal preferences. You'll want to add/remove
any software that you're interested in. Visit [chocolatey.org/packages](https://chocolatey.org/packages)
for a complete list of available packages.
{:.note title="IMPORTANT"}

Run the following command in PowerShell as administrator:

```powershell
# Install Packages and create scheduled a task to weekly update chocolatey at 1AM.
choco install 7zip git googlechrome greenshot keepass microsoft-windows-terminal mpc-hc notepadplusplus
powershell-preview putty python3 spotify steam treesizefree vscode-insiders openssh google-backup-and-sync
chrome-remote-desktop-host microsoft-edge choco-upgrade-all-at --params "'/WEEKLY:yes /DAY:SUN /TIME:01:00'"
```

### Personal PC Packages

Here's some additional packages that I install on my personal (non-work) systems.

```powershell
# Personal PC Packages
choco install discord f.lux wd-backup logitechgaming nvidia-display-driver disablewintracking cpu-z
```

## Conclusion

By leveraging Chocolatey, you can automatically install the same software and keep
it up-to-date with a few simple commands.

I hope you've found this guide useful. As always, if there
are any questions/concerns, please reach out to me directly and I'll get to them ASAP.

Now get out there and make your workflow and life sweeter with Chocolatey 🤖

## Related Links

- [Microsoft windows-dev-box-setup-scripts](https://github.com/microsoft/windows-dev-box-setup-scripts)
- [Getting Started with the Chocolatey Package Manager](https://adamtheautomator.com/install-chocolatey/)
- [Use Chocolatey to automate application installations on a Windows development machine](https://ttu.github.io/use-chocolatey-to-install-apps-windows-dev-machine/)