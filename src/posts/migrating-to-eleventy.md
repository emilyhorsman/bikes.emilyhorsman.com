---
date: 2024-01-01T00:00:00-08:00
title: Migrating to Eleventy
tags:
  - meta
summary: Boring technical details on how this site is built. I migrated static-site generators from Hugo to Eleventy v3.
draft: true
---

It's unlikely I'll ever publish much on how this site is built. There's a [colophon](/colophon) for some of those details.

## Things I Love

1. Hugo's image pipeline didn't do it for me. Starting with their [lack of AVIF support](https://github.com/gohugoio/hugo/issues/7837). I was using a Node script with Sharp instead of Hugo's built-in image support. This was kind of annoying and I was about to integrate it with some kind of build tool like Gulp for incremental updates. But that at that point why not just use the excellent support Eleventy already has for Sharp?
1. Extensible! I think Hugo might be a good choice if you need something quick and basic. But if you want to do something that falls outside Hugo's support then you're SOL. With Eleventy I can use basically any templating language I want, write my own filters, etc.
1. Hugo has this bug where you break something, fix it, the site re-compiles successfully, but then the live reload never recovers. Eleventy has no issue here. To be fair to Hugo I never did look into that issue.

## Wishes

1. I really wanted to use Markdown image syntax instead of image shortcodes for the majority of my image content. But markdown-it doesn't support async renderers.
1. Keyword arguments in shortcodes, please please please.
1. Constructing shortcode output in JS without a templating language isn't much fun.

## Misc

1. I'm using the canary version of Eleventy 3 😬.
1. I didn't like Go's templating language. I'm not sure I'm really a fan of any of them though. I flirted with WebC but I don't think web components make sense for most things on this site. So I landed with Liquid which I don't love either. Nunjucks seems a bit better but it's slower and Mozilla isn't pushing a lot of commits over there.
1. It was a medium effort to port this site over. The templating took a while. I think if you had prior experience with Eleventy it wouldn't be so bad. I used some regex find/replace to change all the shortcodes and relevant frontmatter in the Markdown files. That went great!
