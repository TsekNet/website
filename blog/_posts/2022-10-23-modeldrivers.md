---
layout: post
title: How to Automatically Download the Latest Windows Device Drivers
image: /assets/img/blog/gettingready.jpg
description: >
  Automatically download the latest device drivers during Windows OS deployment (Dell, Lenovo, HP, etc.).
tags: [powershell, windows, SCCM, automation, opensource]
---

- Table of Contents
{:toc}

Imagine never needing to worry about drivers during Windows Operating System
deployment ever again.
{:.lead}

No need to manually download drivers. No need to
maintain driver folders on your deployment shares. No need to update drivers
whenever something breaks...
{:.faded}

## The Problem

Every Windows deployment environment seems to manage OS drivers differently.
Whether it's dumping every driver into a single folder in your deployment share,
one driver folder per OS, or one driver folder per model, these all require
manual maintenance of your deployment share. What if there was a way to
automatically, reproducibly, and consistently download OS drivers at
deployment time...?

## The Solution

Scrape manufacturer websites using RegEx for direct driver download URLs. RegEx
works well for this but...

<img src="https://imgs.xkcd.com/comics/perl_problems.png" title="" alt="Perl Problems" srcset="https://imgs.xkcd.com/comics/perl_problems_2x.png 2x" style="image-orientation: none;">

With that out of the way, I’ll start by sharing the entire script,
then describing it in more detail [below](#what-it-does). I’m always open to
suggestions, so feel free to open a
[pull request](https://github.com/TsekNet/PowerShell/pulls) or comment below!

<style>
.ps1 {height: 500px; overflow: scroll;}
</style>
<script src="https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2FTsekNet%2FPowerShell%2Fblob%2Fmaster%2FInstall-ModelDrivers%2Finstall_model_drivers.ps1&style=obsidian&showBorder=on&showFileMeta=on"></script>

The ideal solution is automated and doesn't require updating when new OS drivers
are released. Let's get into how the sauce is made:

### What it does

Refer to the code above for the most up-to-date information.
{:.important}

I wrote this script to simplify deploying drivers in my environment. What
began as an idea to use RegEx to scrape driver URLs quickly turned into a fully
automated solution (thanks Powershell!). This script is slightly modified for
GitHub to include all the steps necessary to download, install, and deploy OS
drivers.

Automating driver downloads from manufacturers is no discovery. As far as I
can tell, manufacturers have been publishing discoverable web endpoints (of
varying usefulness...) for driver downloads for over a decade now. Recently,
I've seen these endpoints improve to the point that this script is now possible.
What I haven't seen is a single script that does everything from scraping the
endpoint, to downloading, to installing, without the need to jump through
intermediary cab files. What this solution provides is simplicity. No need to
worry about OS drivers beyond specifying the manufacturer and model.

The scripted solution can be run directly from your system being deployed in
WinPE or WinRE. The `Manufacturer` parameter tells the script which website to
query for drivers. The `Model` parameter tells the script to query the
manufacturer's website for the exact string of your query and find the
associated driver download link.

Once the download link for the driver pack is obtained, the script downloads the
file to the local `$env:TEMP` directory and leverages `pnpunattend.exe` to
install all drivers in that directory. Finally, the script cleans up files
placed in `$env:TEMP` and exits.

### What it doesn't do

Install WinPE drivers (only OS drivers).

## Parting Words

This is where I acknowledge that downloading drivers from the manufacturer's
website during deployment may increase deployment times (vs. downloading from
an internal endpoint). This is a worthwhile trade-off for the time saved
from managing individual driver packs in deployment shares. While this script
applies OS drivers before booting into the OS during deployment, I would also
recommend running Windows Updates once booted into the OS for the first time.

This script also assumes that manufacturers test their drivers before
deployment (not always the case), and that the "latest" OS version drivers
will work on your systems. You'll have to discuss if this added automation is a
worthwhile trade-off with your team. Heck, feel free to fork this script
entirely to add resiliency, or submit PRs to improve the script itself.

Hopefully, this script saves you some time that could be better
used on automation, rather than fumbling with OS driver deployment 💻🔂⏩

## Related Links

- [MDT Lite Touch Driver Management](https://www.deploymentresearch.com/mdt-2013-lite-touch-driver-management/)
- [Back to Basics – Updating Drivers – pnputil.exe vs. pnpunattend.exe](https://www.deploymentresearch.com/back-to-basics-pnputil-exe-vs-pnpunattend-exe/)
- [OSDeploy](https://www.osdeploy.com/)
- [Invoke-OSDCloudDriverPack.ps1](https://github.com/OSDeploy/OSD/blob/6321c47b4d33f500d04a807504c3646e65009644/Provisioning/Invoke-OSDCloudDriverPack.ps1)
- [Downloading Dell Driver CAB files automagically with the Driver Pack Catalog](https://deploymentramblings.wordpress.com/2014/04/17/downloading-dell-driver-cab-files-automagically-with-the-driver-pack-catalog/)
