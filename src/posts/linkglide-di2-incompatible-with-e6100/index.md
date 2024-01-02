---
date: "2023-10-12T10:57:11-07:00"
tags:
  - ebike
  - drivetrain
title: Linkglide Di2 Is Incompatible With E6100
summary: Gus is grumpy at Shimano for not making their new electronic drivetrains compatible with older e-bikes. I have thoughts on why I'd like to try Linkglide and Di2!
banner_image:
  alt: A buff tabby cat looking grumpy and sitting beside a crankset just out of view.
---

**tl;dr:** A Shimano support member tested it for me and confirmed that Linkglide Di2 won't work with E6100 e-bikes.

## Existing Compatibility

Shimano seems to frame e-bikes as a motivation behind designing [Linkglide](https://bike.shimano.com/en-US/technologies/component/details/linkglide.html) (see [below](#why-linkglide-and-di2)). There are both mechanical and electronic Linkglide derailleurs. The mechanical ones will work just fine on an e-bike. All current electronic Linkglide derailleurs[^1] are only for e-bikes. So you couldn't just run a separate Linkglide Di2 setup in parallel with a battery in the downtube.

[^1]: [RD-M8150-11](https://bike.shimano.com/en-EU/product/component/ep8-ep801/RD-M8150-11.html), [RD-U6070](https://bike.shimano.com/en-EU/product/component/ep6-ep600/RD-U6070.html), and [RD-U6050](https://bike.shimano.com/en-EU/product/component/ep6-ep600/RD-U6050.html). Aside: RD-M8150-11 is Linkglide and [RD-M8150-12](https://bike.shimano.com/en-EU/product/component/ep8-ep801/RD-M8150-12.html) is Hyperglide+. I know Shimano is better than this!!.

That leaves running _either_ mechanical Linkglide (e.g., [RD-U8000](https://bike.shimano.com/en-US/product/component/cues-u8000/RD-U8000.html)) or Di2 (e.g., [RD-M8050](https://bike.shimano.com/en-EU/product/component/deorext-m8050-di2/RD-M8050-GS.html)).

## Linkglide with Di2 and E6100 Incompatibility

This is all more-or-less spelled out in the [compatibility chart](https://productinfo.shimano.com/#/com?acid=C-431&cid=C-431). However, given that the E6100 is clearly capable of talking to a Di2 derailleur and that there shouldn't be anything fundamentally different between a Di2 derailleur and one that supports Linkglide — why not simply hook one up and accept that maybe the features like free shift advertised by the [RD-M8150-11](https://bike.shimano.com/en-EU/product/component/ep8-ep801/RD-M8150-11.html) won't work? Perhaps the compatibility chart is just being strict and only advertising compatibility if there is 100% support. Alas, if you do this, the bike won't turn on.

I really appreciate Shimano S-Tec support member MattyF who tested this out for me! From them:

> […] I managed to get my hands on an M8150 RD/SL and an E6100 bike. I can confirm that the bike will not even power up when these components are plugged in. It just completely locks out the system. So compatibilty is definitely a hard no.
>
> Not all Di2 derailleurs are equal. M8150 anything will NOT work here. M8050 components, however, should work fine.
>
> On that note, I've tried mechanical Linkglide on an E6100 bike. It works great!

This seems like a shameful oversight. Why should the firmware care about which motor it's plugged into? If a non-Linkglide rear derailleur can pull across the cassette, why should the firmware care if the derailleur is Linkglide-compatible or not? This kind of slightly arbitrary limitation fuels righteous philosophical objections to electronic shifting/bikes by retrogrouches and others. That's capitalism for you though — where's the profit in supporting this?

## Why Linkglide and Di2?

My [recent motivation](/posts/1x-ebike-chain-retention-problems/) for a clutched derailleur has accelerated my medium-term plans to upgrade the drivetrain on my e-bike. I figured this would be a good time to try out Linkglide (Shimano's new cassette design) and perhaps Di2 (electronic shifting). Di2 is intriguing because:

1. The shifting housing on this e-bike gets routed internally over the motor unit and then under the battery. That's a lot of chances for tight bends and kinks that can affect indexed shifting performance. Electronic shifting would avoid this. (So would friction shifting.)
1. Theoretically less maintenance on my everyday do-it-all bike — no need to change the shift cable and housing every year or so.
1. Possibly improved ergonomics for the shifter position and hand fatigue. I got this e-bike due to some chronic wrist issues I've been figuring out. Awkward finger movements can aggravate this.
1. I'd like to develop my own opinion on whether electronic shifting makes sense philosophically and practically (i.e., getting more people on safe and well-functioning bikes for transportation). I'm unlikely to put it on a different bike because the derailleur being powered by the battery the e-bike already has sounds sensible.

And if the Linkglide marketing is to be believed then:

1. E-bikes chew through drivetrain consumables faster. Linkglide cassettes are [allegedly 3x as durable](https://bike.shimano.com/en-US/technologies/component/details/linkglide.html). Linkglide hasn't really been around long enough for bike mechanics to substantiate this.
1. The design is supposed to work better under load. Your chain is tense when you pedal. When you shift you want your chain to be able to fall off the cog it's on. Chain tension makes this harder. I generally ease up on the pedals for a moment when I shift. I think this is less impactful on an e-bike because even if you ease up on the pedals the motor could still be driving the chainring for a moment. This makes it more likely that you're shifting under load. I might be wrong, but this is an unfortunate reality of e-bikes. Shimano has heavily oriented its Linkglide marketing around e-bikes and claims it should help solve this problem.

Combining both sounds useful! This _would_ be supported on the newer EP801 or EP6 systems.
