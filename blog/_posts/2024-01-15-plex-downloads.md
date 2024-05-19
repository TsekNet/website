---
layout: post
title: Plex Downloads Still Suck
image: /assets/img/blog/plex-downloads.jpg
description: >
  The unsatisfying story of how I've resolved to download media (movies, etc.) from my NAS to my phone.
tags: [plex, jellyfin, homelab, smb, nas, tips, windows]
---

- Table of Contents
{:toc}

<img src="//imgs.xkcd.com/comics/shouldnt_be_hard.png" title="(six hours later) ARGH. How are these stupid microchips so durable?! All I want is to undo a massive industrial process with household tools!" alt="Shouldn't Be Hard" style="image-orientation:none">

## The Problem

I want to download *my* movies from *my* Network-Attached
Storage (NAS) server onto *my* phone.

Sounds simple, right?
{:.faded}

## Attempted Solutions

I'll start with a list of solutions that did _NOT_ work for me (and why) so you don't waste your time, in
order of when I tried them, then describe the solution I've landed on. I'll add to this list as I inevitably try other
solutions in the future.

### 1. Plex Downloads

[Plex](https://plex.tv) downloads used to work great for me, before they ["revamped"](<(https://www.reddit.com/r/PleX/comments/oaf332/sync_is_dead_almost_long_live_downloads/)>) *Sync* into *Downloads*. Ever since this revamp for mobile downloads, I have not been able to reliably download media to my phone using the Plex app on either Android or iOS. I've tried multiple disparate media servers, Operating Systems, and different network configurations/locations/VPNs. Most of the time downloads wouldn't work at all. Sometime in the past month (Jan '24) it looks like Plex has made some attempts at revamping their new downloads feature again. This initially looked promising, as at least some of my downloads were succeeding. But... now any file over ~2GB fails to download across devices and different media servers (similar to before, but smaller files work fine now).

I've looked into media server logs, and countless Plex [forum](https://forums.plex.tv/t/downloads-sucks-and-doesn-t-work-error-downloading-item/742233)/[Reddit](https://www.reddit.com/r/PleX/comments/xt6626/why_do_plex_downloads_still_suck_so_much/) threads describing the same woes about the revamped Plex downloads feature that I've described above. No suggestions in those threads fixed my download issues.

I will give Plex some credit and say their UX for downloading multiple media files at once (for example: an entire season of a TV show) is actually good. It just doesn't work for larger files.

I decided to stop investing time into Plex downloads and moved on.

Plex technically has a feature that allows you to download the raw file (reliably!) from your media server *if you are the server owner*. This feature isn't available in the app, and you have to click each individual item you want to download, click the three dots menu, and then click "Save As." Doing this on the Plex website for every item I wanted to download wasn't scalable for things like entire TV shows.
{:.note}

### 2. Jellyfin Downloads

[Jellyfin](https://jellyfin.org/) is an open-source alternative to Plex, with support for downloading media from your media server via their open-source Android app. There's an alternative Jellyfin Android app (with the same issues) called [Findroid](https://github.com/jarnedemeulemeester/findroid) that's beautiful, and I would recommend it over the default Jellyfin mobile app on Android. Now on to the issues:

1. Jellyfin doesn't have download support for iOS on any of its mobile clients. There is support through the [Infuse](https://apps.apple.com/us/app/infuse-video-player/id1136220934) iOS app, but that requires a paid subscription ($9.99/year). I would prefer to not pay to download *my* media on *my* phone.
1. Jellyfin downloads seem to be the slowest of all the options I've tried. For example, multiple different ~30GB movies quoted me 12 hours+ for download over WiFi. That's definitely not limited by the speed of my network.
1. Jellyfin does not have support for downloading entire seasons of shows at once. You need to go into each individual episode, wait for the episode info to load, then hit download. Looks like the Findroid team is working on adding this functionality on [GitHub](https://github.com/jarnedemeulemeester/findroid/pull/492).
1. Opinion: Jellyfin's UI is worse than Plex's. This is somewhat curbed by how beautiful the Findroid app is on mobile, but Findroid doesn't have an app for desktop/the various Smart TVs that I use to watch home media.

### 3. Synology Drive

I briefly considered using [Synology Drive](https://www.synology.com/en-global/dsm/feature/drive) on my NAS to expose my media over the internet essentially as you would in Google Drive (but self-hosted). After being quoted about a day for indexing all of my media on the share that I added to Synology Drive, I canceled the indexing job and scrapped this idea. This isn't my intended use of Synology Drive anyway (it's more of a Google Drive replacement for me).

### 4. VLC

The same VLC that's been around since 2001. I briefly played with using VLC to download files from my NAS over SMB (see below) to a local folder on my Android/iOS devices. VLC surprisingly does not have this feature (at least on Android). The closest I could find is [this thread](https://forum.videolan.org/viewtopic.php?t=134050) from 2016 saying that the feature would be added.

I briefly looked for other Android video players that could be used to copy files over SMB/FTP/etc., but didn't find one I liked that had the functionality I was looking for.

### 5. Other Android Video Players

I tried other Android video player apps such as [Next Player](https://github.com/anilbeesetti/nextplayer), [MX Player](https://play.google.com/store/apps/details?id=com.mxtech.videoplayer.pro&hl=en_US&gl=US) (paid), Stock Android/Samsung video players, [mpv](https://mpv.io/), etc. None of them had the functionality of downloading files from SMB to a local directory that I was looking for.

## Actual Solution

✨ SMB ✨

That's right, the good ol' reliable SMB (Server Message Block) protocol. No really, just an [SMB share](https://kb.synology.com/en-br/DSM/help/DSM/AdminCenter/file_winmacnfs_win) on my NAS that allows me to copy/paste files from my NAS to my phone. I mount an SMB share (that I already have
available for my internal Windows devices) and copy files to wherever I want on whichever devices I want. No dealing with proprietary download functionality (Plex), unpolished/missing download functionality (Jellyfin), additional overhead for indexing files (Synology Drive), etc. My files, when I want them, without any bells and whistles.

Cool, so SMB from Android/iOS devices... Now to decide which app is best for copying files from an SMB share to these devices. I played around with a few Android apps before landing on [Material Files](https://play.google.com/store/apps/details?id=me.zhanghai.android.files&hl=en_US&gl=US&pli=1). This app is basic, beautiful, and allows me to copy files from my NAS SMB share directly to my Android device. Copy, paste, *simple*.

For iOS the built-in "Files" app has a "Connect to Server..." option that can be used to connect to a SMB share using the format `smb://hostname/folder`. From there, you can browse to the media file and copy/paste as your heart desires.

## Ramblings

I'm convinced that the people writing these media management tools don't consider downloading a core feature, and don't have much use for it themselves, based on the frustrations I've mentioned in this post. I however still have to give credit to the Jellyfin team for all the good work they do, Jellyfin is a great tool.

I'll note that SMB isn't even my preferred option. Browsing folders instead of the Plex or Jellyfin UI makes them less discoverable for me, as the metadata isn't as visible (actors, dates, posters, etc.). What SMB does offer however is protection from changes breaking my file downloading, and removing download speed bottlenecks. I would recommend always accessing SMB over a home network VPN, as even SMB has been known to have its share of vulnerabilities and bugs. I'm happy with the solution for now, but who knows, maybe Plex will fix their downloads in the future and I'll try it again at some point.

Have better ideas for how to download media to mobile devices? Think I missed something? Have Questions? Comment below.

Good luck out there 👍

## Related Links

- [Media Storage Options for NVIDIA SHIELD](https://support.plex.tv/articles/220391808-media-storage-options-for-nvidia-shield/)
- [Client Spotlight: Infuse for tvOS and iOS](https://jellyfin.org/posts/client-infuse/)
- [Jellyfin vs Plex: Which is the best home media server?](https://www.androidauthority.com/jellyfin-vs-plex-home-server-3360937/)
