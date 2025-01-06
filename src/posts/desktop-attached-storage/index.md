---
date: "2025-01-05T18:37:00-08:00"
title: Desktop-Attached Storage
summary: Getting extra storage space for backups and photos with a QNAP TR-004.
banner_image:
  alt: A QNAP TR-004 with four drive bays is placed on a desk. A computer monitor is partially visible in the background, and the room is dimly lit.
tags:
  - misc
---

The 2TB SSD that I've been using as a Time Machine ran out of space a couple of weeks ago, and my laptop's storage is about to run out due to the ever-increasing size of my photo catalog (which is responsible for 72% of my storage 😬).

My friends are talking about network-attached storage and Tailscale and other sicko stuff, but I have just wanted a humble desktop-attached storage (DAS) for some extra space.

I'm using a [QNAP TR-004](https://web.archive.org/web/20241205124743/https://www.qnap.com/en/product/tr-004) and a couple of used 12 TB drives. There was plenty of availability on the used market for 12TB drives, and they worked out to $14.6/TB. They're set up in RAID 1 right now, and I plan to migrate them to RAID 5 when I run out of storage. This means that stuff I put on the QNAP volume gets copied to both drives. There will still be a copy of things if one drive fails.

It's pretty small on my desk.[^1] It couldn't be much smaller than the physical volume of the four 3.5" drives it can take. [Marsh's](/tags/cats) clicker for scale.

[^1]: And kind of cute but sort of in a r/malelivingspace way and that's sort of cursed.

{% image './DSC04943-16x9.jpg' 'A QNAP TR-004 with four drive bays is placed on a desk. A computer monitor is partially visible in the background, and the room is dimly lit.' %}

I'm using [`restic`](https://restic.net/) as a replacement for Time Machine. This lets me have all my backups in a folder on the QNAP volume without making a separate partition for the Time Machine. This DAS setup allows my Backblaze account to backup the QNAP volume (excluding the redundant `restic` backups) without paying for additional cloud storage.

{% image './qnap.jpg' 'A screenshot of the QNAP External RAID Manager interface showing the configuration of a TR-004 device. It displays two installed disks, both Seagate ST12000NT001-3LX101 hard drives with a capacity of 12 TB each, configured in RAID 1. The RAID group is labeled “TR-004 RAID Group 1,” with a usable capacity of 12 TB. The status of both disks and the RAID group is marked as “Good.”' %}

A big portion of my Capture One catalog is the Trash collection. I put all its contents into a new album and then exported it to the QNAP volume as a new managed catalog. Then I could delete the contents of the Trash collection in my main catalog and now my laptop has a lot more space on it again.
