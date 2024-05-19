---
layout: post
title: How to Ditch Google Photos
image: /assets/img/blog/google-photos.jpg
description: >
  Google Photos is great, but I already have a storage server.
tags: [nas, tips, tutorials, degoogle]
---

- Table of Contents
{:toc}

Ever wanted to migrate from Google Photos to other apps but found the task too daunting? Well, this post describes how I migrated Google Photos to [Synology Photos](https://www.synology.com/en-global/dsm/feature/photos), taking back ownership of my photos. It took a few hours (mostly spent downloading/moving files). The same process can be used to move from Google Photos to any other solution (examples include [Immich](https://immich.app/), [NextCloud](https://nextcloud.com/), [ownCloud](https://owncloud.com/), etc.).

Enter [GooglePhotosTakeoutHelper](https://github.com/TheLastGimbus/GooglePhotosTakeoutHelper) 📸

## 1. Export

The first thing to do is export your files from Google Photos. This should be done a few days before you're ready to migrate your photos to your new photo storage solution. Follow the steps below:

1. Navigate to https://takeout.google.com/
1. Click `Deselect All`
1. Scroll down to `Google Photos` and tick the associated checkbox
1. Scroll down to the bottom and click `Next Step`
1. Under Choose file type, frequency & destination:
   - `Transfer to` can be set to whatever you prefer. I chose `Add to Drive` (it will upload files to your Google Drive).
   - Select `export once`
   - Leave file type as `zip`
   - `File size` should be set to 50GB
1. Click `Create Export`

That's it for now! You should receive an email notifying you when your export is ready.

## 2. Download the Export

Once you receive the email that your Google Photos export is ready, go ahead and download the exported `.zip` archives to somewhere that has enough storage space. To prep your photos for organization (below), extract each individual `takeout-DATE-###.zip` into a `/takeout` directory somewhere on your disk.

Folder structure should look like this:

```
../takeout
├─ takeout-20200112T193857Z-001
├─ takeout-20200112T193857Z-002
├─ takeout-20200112T193857Z-003
└─ takeout-20200112T193857Z-004

...etc
```

## 3. Automatic Organization

Start by taking a step back and deciding where you want your photos to live, and if you want any other application to manage your photos (ex: Synology Photos, Immich, etc.). These applications may require that photos are placed in specific directories, so make sure to set these up before continuing. This could technically be anywhere you want, but I'd recommend storing your photos on your storage server (NAS).

Next up is making sense of the export that Google Takeout provided you. To do this, we'll use an open-sourced tool called GooglePhotosTakeoutHelper on GitHub following the steps below.:

1. Download the latest binary from their [releases page](https://github.com/TheLastGimbus/GooglePhotosTakeoutHelper/releases) on GitHub (either Linux, Mac, or Windows)
1. Launch the downloaded binary *as admin* (this is different depending on the platform you downloaded)
1. Hit the enter key when the binary prompts you to select the source directory
   - You should see a pop-up file explorer view, select the `/takeout` directory from earlier
1. Go back to the command prompt where the binary is running, and hit the enter key again to select the destination directory
   - You should see a pop-up file explorer view, select your destination directory (can be your storage server)
1. Let GooglePhotosTakeoutHelper do it's magic
1. (OPTIONAL) Organize the resulting `/ALL_PHOTOS` output folder in the destination directory

## 4. (Optional) Manual Organization

There will almost definitely be photos for which GooglePhotosTakeoutHelper could not identify the date/time. If you're using Synology Photos, you can click the information (i) icon that shows up when you click a photo and edit the date metadata directly. If you're using something else, you can try the [Files](https://files.community/) app to edit the photo metadata manually.

This will be the most annoying, toilsome part of the entire process, depending on how many of your photos were missing the date metadata to start.
{:.warning}

## Parting Thoughts

The motivation for this project was to avoid paying monthly fees to store photos (Google/Microsoft/Amazon/etc.) when I already have a storage server that I'm actively using. Owning where your photos are stored has other auxiliary benefits such as privacy, control, no one can deprecate your data, etc.

Had issues running through this process? Let me know.

Go forth and data hoard 💾

## Related Links

- [Reddit - Selfhosted](https://www.reddit.com/r/selfhosted/)
- [Reddit - Homelab](https://www.reddit.com/r/homelab/)
