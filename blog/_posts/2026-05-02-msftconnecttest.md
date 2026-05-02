---
layout: post
title: How One Blocked URL Added 10 Minutes to Every Domain Join
image: /assets/img/blog/firewall.png
description: >
  Windows probes msftconnecttest.com before Entra join, obviously.
tags: [dev, devops, tips, tutorials, windows]
---

- Table of Contents
{:toc}

## The mystery

Every single domain join: exactly 10 minutes of nothing, then success. Not "sometimes slow." Ten minutes. Every machine. Every time.

Nothing in procmon, logman, event logs, network traces, etc.

## The accidental discovery

Weeks later, while debugging a completely unrelated issue, I noticed it: a single, lonely, unanswered HTTP GET to `http://www.msftconnecttest.com/connecttest.txt`, then an exactly 10-minute hang.

Windows has a service called Network Connectivity Status Indicator (`NCSI`), run by the Network Location Awareness service (`NlaSvc`). Before doing anything that requires internet, including Entra join, it probes the URL above to check connectivity. Expected response: `Microsoft Connect Test`. 22 bytes. If you're on a locked down corporate network, the packets would be dropped silently: no RST, no 403, no redirect. So `NlaSvc` retried with TCP backoff for exactly 10 minutes, concluded "no internet," then Windows tried the domain join anyway and it works instantly.

You've seen this URL before, by the way. It's the same probe Windows uses for captive portal detection: the reason hotel Wi-Fi and airport networks pop up a login page when you connect. Same URL, same mechanism. Except on a properly locked-down corporate network, there's no captive portal to redirect to, and the request just goes unanswered.

And the domain isn't `*.microsoft.com` or `*.windows.net` or any wildcard you already have in your allow list. It's `msftconnecttest.com`. A completely separate domain that Microsoft chose for reasons I'm sure made sense to someone.

## The fix

Allow `http://www.msftconnecttest.com/connecttest.txt` through your network firewall.

That's it. Just spend a few weeks reverse engineering how Micrososft domain join works, and you too would find this. Just a silent timeout and the implicit expectation that you'll eventually stumble across the answer while debugging something else. I guess this blog is just becoming Micrososft docs?

Anyway, hope this post saved you time in debugging this for your setup. Have fun out there ✌️

## Related Links

- [Answers To common questions about NCSI](https://learn.microsoft.com/en-us/windows-server/networking/ncsi/ncsi-frequently-asked-questions)
- [No Internet Error on Windows - NCSI Troubleshooting](https://support.catonetworks.com/hc/en-us/articles/13097064458525-No-Internet-Error-on-Windows-NCSI-Troubleshooting)
- [Microsoft Forum](https://learn.microsoft.com/en-us/answers/questions/3985646/win10-dont-query-www-msftconnecttest-com)
