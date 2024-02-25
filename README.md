## Architecture

1. Source media committed with Git LFS pointing to a Cloudflare R2 bucket. See https://github.com/emilyhorsman/git-lfs-s3-proxy.

## Misc Video Stuff

```
ffmpeg -i /Users/emilyhorsman/Library/Mobile\ Documents/com~apple~CloudDocs/DSCF3457-2.mp4 -pix_fmt yuv420p -vf scale=1536:-2 -c:v libvpx-vp9 -b:v 2M -pass 1 -an -f null /dev/null
ffmpeg -i /Users/emilyhorsman/Library/Mobile\ Documents/com~apple~CloudDocs/DSCF3457-2.mp4 -pix_fmt yuv420p -vf scale=1536:-2 -c:v libvpx-vp9 -b:v 2M -pass 2 -c:a libopus ducks.6.webm
ffmpeg -i ducks.mp4 -ss 00:00:01.000 -vframes 1 ducks.jpg
```

## rclone

```
img $ rclone sync . r2:cdn/ -P --track-renames
```
