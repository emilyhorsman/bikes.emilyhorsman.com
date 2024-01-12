---
date: "2023-10-11T09:18:00-07:00"
tags:
  - drivetrain
  - ebike
  - maintenance
  - egret
title: 1x Chain Retention Problems
summary: My chain drops on the inboard side and gets _real_ stuck between the motor and chainring. There's a bunch of different solutions but none of them are perfect.
banner_image:
  alt: The front of a 1x crankset with the chain case fixing mounts visible
---

Front and rear derailleurs are responsible for more than just shifting — they also ensure the chain doesn't fall off. Bikes with only a single chainring usually include some chain retention component to compensate for the lack of front derailleur. My e-bike has a crankset with an outboard chain guard ([FC-E6100](https://bike.shimano.com/en-US/product/component/city---trekking-e-bike-e6100-series/FC-E6100.html)). This stops the chain from falling off the ring away from the bike.

I was lubing the chain on my e-bike and noticed this chain guard was loose. This one mounts directly to the chainring with some #2 Philips screws. These are dainty screws and don't take much torque so it's easy for them to rattle loose, never to be seen again.

{% image "DSCF4038.jpg" "The inboard face of a chainring showing the screw that mounts the chain guard" %}

Tightening them all solved my problems but was a good reminder that I still have the problem of inboard chain retention. Having the chain fall off inboard on this e-bike is a bigger problem than on a normal bike because it gets quite stuck between the drive unit cover and the ring. This happened to me on the trail the other day and I needed to work with someone else to pry the chain out. This chain is approaching the end of its life (around 0.5% wear) and I was in my easiest gear when it happened (and thus the chain is at its most extreme angle), making this more likely. Nonetheless, I'd like to avoid this situation ever happening again.

I have long-term plans to upgrade the drivetrain on this bike — perhaps to Shimano CUES — which would include a rear derailleur with a clutch. The [tension pulley](https://www.parktool.com/en-us/blog/repair-help/how-a-rear-derailleur-works) of a rear derailleur cage is always sprung backward which keeps tension on the chain. If you push the top section of your chain towards the chainstay you'll notice that the rear derailleur cage pivots forward. This happens all the time when you're riding over bumps — my best guess of how my chain fell off the other day. The chain can even hit your chainstay ("chain slap"). A clutch makes it harder for this to happen by partially inhibiting the cage from pivoting forward. Check out this dope [video from Park Tool showing all this with an action cam](https://www.youtube.com/watch?v=fmYG26okK_E).

A clutched derailleur might help in the future but I was going to go through a few chains on this drivetrain first (I think the rear derailleur has been bent the entire time I've had this bike and so if I can get this cassette to the end of its life then all will need replacing anyway). I'd also prefer something that offers more of a guarantee.

This crankset is also sold in configurations with an inner chain guard — see this [cool exploded view](https://si.shimano.com/en/ev/FC-E6100-4439). I could get that part from Shimano and it might fit and that would certainly solve my issue. However, I worry about how fragile and finicky these plastic chain guards are and I low-key hate Philips screws on my bike.

My favourite solution would be a narrow-wide chainring which is what you tend to see for chain retention on 1x systems. The drive unit on this e-bike is a [DU-E6100](https://bike.shimano.com/en-US/product/component/city---trekking-e-bike-e6100-series/DU-E6100.html) which has the chainring mounted to the drive unit instead of the spindle or crank (which has the weird consequence of being able to turn the crank backwards without moving the chainring). The [SM-CRE61](https://bike.shimano.com/en-US/product/component/city---trekking-e-bike-e6100-series/SM-CRE61.html) chainring currently installed gives a 46.5mm [chainline](https://www.parktool.com/en-us/blog/repair-help/chainline-concepts) so I'd need a narrow-wide ring that's compatible with the drive unit mount and has a similar chainline. Wolf Tooth [sells one](https://www.wolftoothcomponents.com/products/direct-mount-chainrings-shimano-e-bike-motor?variant=40023284023331) but the chainline is 55mm and they only advertise it working on different Shimano motor units. I'm not sure if the splines are the same. Shimano's [compatibility chart](https://productinfo.shimano.com/#/com?cid=C-431&acid=C-657) claims I can use chainrings from some of those other motor units so it's very possible the splines are the same! Shimano's [SM-CRE80](https://bike.shimano.com/en-US/product/component/ep6-ep600/SM-CRE80.html) has a similar chainline (50mm) and has "Dynamic Chain Engagement+" which seems like their version of a narrow-wide tooth profile — gotta love Shimano's marketing team. I'll probably fuck around and find out to see if the newer generation chainrings _are_ compatible. This would be my preferred solution.

Another solution is using a chain keeper. My understanding is these were more popular before the ubiquity of narrow-wide chainrings — although you still see them on some mountain bikes where they expect the chain to bounce around a lot. This would involve removing the outboard chain guard altogether (💯) and clamping a keeper to the seat tube over the chain. Paul Component Engineering makes a [beautiful purple one](https://www.paulcomp.com/shop/components/drivetrain/chain-keepers/chain-keeper/) with a design that allows it to work with a 34 to 55mm chainline. However, I think the mountable area on the seat tube would be too high to have the chain block sit right over the chain because the drive unit on this e-bike prevents it from going further down. (Edit: The fine folks at Paul confirmed that this wouldn't work on a mid-drive e-bike.)

{% image "chain_keeper_clamp_gallery_3.jpg" "A muddy Chain Keeper sitting directly over the chain" "Paul Component Engineering" %}

[Wolf Tooth makes one](https://www.wolftoothcomponents.com/collections/chainguides/products/gnarwolf-chainguide-seat-tube-clamp-mount) that I think would solve the clearance issues because the seat tube clamp is much higher than the chain block. Although it's possible that the bracket still wouldn't clear the motor unit.

{% image "wolf_tooth.jpg" "A Wolf Tooth GnarWolf Chainguide sitting over the chain" "Wolf Tooth Components" %}

There are also a variety of chain deflectors out there that act more like an inner chain guard instead of protecting both the inboard and outboard sides. This might work since I have the outer chain guard. It may at least stop the chain from getting stuck when it does fall inboard. Many of these have the same clearance issue as the Paul Chain Keeper since the retention part is basically at the same height as the mount.

Then there are chain cases that mount directly to the drive unit like Shimano's [SM-CDE80](https://bike.shimano.com/en-US/product/component/mtb-ebike-e8000/SM-CDE80.html). The compatibility chart doesn't list any compatible chain case with this DU-E6100 drive unit however its [exploded view](https://si.shimano.com/en/ev/DU-E6100-4436) does show the appropriate mounts for a chain case and even lists fixing screws for one. All the ones I can find that might mount to the drive unit have a wider chainline than this current setup would allow.

You can see the threads for a chain case in this photo (and some scraped paint from the chain being pried out).

{% image "DSCF4552.jpg" "The front of a 1x crankset with the chain case fixing mounts visible" %}

A classic trick is to use an old front derailleur as a chain keeper — you set the limit screws to keep the cage over the chain just like a chain keeper and then skip the shift cable. I think there may be similar clearance issues but if I have time I might experiment with this approach to at least have a temporary solution. I may even just try to thread some piece of plastic lying around the bike shop into the chain case mount to make sure the chain can't fall too far down and get stuck.

Anyway here's Gus rewarding you for reading my fabulous deep dive.

{% image "DSCF4545.jpg" "A buff colored cat lying down near a bike" %}
