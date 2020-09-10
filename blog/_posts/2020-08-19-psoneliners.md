---
layout: post
title: Useful PowerShell One-Liners
image: /assets/img/blog/powershell.jpg
description: >
  Some neat, time-saving PowerShell plug-and-play commands
tags: [dev, automation, windows, powershell]
---

Is this about comedy?
{:.figcaption}

- Table of Contents
{:toc}

## Objective

This post aims to document some useful one-liners I've come across as part of
everyday usage of PowerShell. Hopefully, you'll find some of these powerful,
time-saving, and fun to play around with!

Many of these one-liners were taken from various blogs, social media, etc., and
are not necessarily my own.
{:.note}

## Prerequisites

Windows PowerShell 5.1 (unless otherwise specified), usually run as administrator

## Background

Part of learning PowerShell is simply writing code and getting a feel for what
the output should look like. Go ahead, copy and of these one-liners into your
PowerShell console. What do you expect to see? What did you actually see?

## PowerShell One-Liners

### Time of the Last Reboot

```powershell
(Get-CimInstance Win32_OperatingSystem).LastBootUpTime
```

### Find Your Public IP Address

```powershell
(Invoke-RestMethod ipinfo.io/json).ip
```

### Find Domain Controllers on Your Domain

```powershell
Resolve-DnsName -Type ALL -Name _ldap._tcp.dc._msdcs.$env:userdnsdomain
```

### List Software Available for Uninstall

```powershell
Get-ItemProperty HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\* | Select-Object DisplayName, DisplayVersion, Publisher, InstallDate | Format-Table
```

### Install PowerShell Core (6 and 7)

```powershell
Invoke-Expression "& { $(Invoke-RestMethod -Uri aka.ms/install-powers…) }" -UseMSI -Preview
```

### Get Free Space for System Drive

```powershell
(Get-PSDrive $Env:SystemDrive.Trim(':')).Free/1GB
```

### Get Parent Process(es)

```powershell
foreach ($prid in ($ppid = foreach ($process in (Get-Process -Name "powershell")) { (Get-CimInstance Win32_Process | Where-Object processid -EQ $process.Id).parentprocessid })) { Get-Process -Id $prid }
```

### List Subdirectories in the Current Directory

```powershell
Get-ChildItem -Directory
```

### List Started Services

```powershell
Get-Service | Where-Object {$_.status -eq "Started"}
```

### Tail (grep) a File

```powershell
Get-Content ./logfile.log -Tail 5 –Wait
```

### Port Scanner

```powershell
0..65535 | Foreach-Object { Test-NetConnection -Port $_ scanme.nmap.org -WA SilentlyContinue | Format-Table -Property ComputerName,RemoteAddress,RemotePort,TcpTestSucceeded }
```

### Common WMI (CIM) Queries

```powershell
# BIOS Version
(Get-CimInstance Win32_BIOS).SMBIOSBIOSVersion

# Serial Number
(Get-CimInstance Win32_BIOS).SerialNumber

# Model
(Get-CimInstance Win32_ComputerSystem).Model

# Printers
Get-CimInstance Win32_Printer | Select-Object Name, PortName, Default

# Active Directory Domain
(Get-CimInstance Win32_ComputerSystem).Domain
```

### Get Time Until Next Year

```powershell
(Get-Date -Date "$((Get-Date).Year + 1)/1/1") - (Get-Date)
```

### Cat Facts

```powershell
Invoke-WebRequest -Uri 'https://catfact.ninja/fact' -UseBasicParsing | Select-Object -ExpandProperty 'Content' | ConvertFrom-Json | Select-Object -ExpandProperty fact
```

### Get a Random XKCD Comic

```powershell
Invoke-RestMethod "http://xkcd.com/$(Get-Random -min 0 -max 2000)/info.0.json" | Select-Object title, transcript, alt, img | Format-List
```

## Conclusion

Hopefully, you've found some snippets in this post useful. For me, one-liners
have been fun, interactive ways to play with PowerShell and test my knowledge,
expectations, and push the language to its limits.

Have a cool one-liner you'd like to add to this doc? Feel free to drop a comment
or edit this page directly on GitHub using the button below.

Want more one-liners? [Click
here](https://parade.com/1040121/marynliles/one-liners/).

/dadjoke 🙃

## Related Links

- [What’s a PowerShell One-Liner & NOT a PowerShell One-Liner?](https://mikefrobbins.com/2019/02/07/whats-a-powershell-one-liner-not-a-powershell-one-liner/)
- [PowerShell One-Liners: Help, Syntax, Display and Files](https://www.red-gate.com/simple-talk/sysadmin/powershell/powershell-one-liners-help-syntax-display-and-files/)