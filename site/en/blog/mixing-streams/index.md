---
layout: 'layouts/blog-post.njk'
title:  We'll cross the (media) streams, Ray
description: >
     Today, when using Media Source Extensions (MSE) in Chrome, it's not possible to switch between encrypted and clear streams. Starting in Chrome 58, all this changes. 
authors:
    - joemedley
date: 2017-03-20
updated: 2017-09-25
---


Today, when using
[Media Source Extensions (MSE)](https://developer.mozilla.org/docs/Web/API/Media_Source_Extensions_API) 
in Chrome, it's not possible to switch between encrypted and clear streams. This
is actually not prohibited by the MSE spec. Rather, this limitation is mostly in
how the media pipeline is setup to support [Encrypted Media Extensions
(EME)](https://developer.mozilla.org/docs/Web/API/Encrypted_Media_Extensions_API).

MSE requires that media streams start with an initialization segment which
includes information like codec initialization data, and encryption information.
Typically, the initialization segment is at the beginning of a media file.
Consequently, when media are attached to a media element via download or MSE,
they "just work".

The problem comes when you try to change media characteristics in mid stream.
Changing media characteristics requires passing a new initialization segment.
For most characteristics, this works. Playback continues. The exception is the
encryption settings. The encryption settings from the first initialization
segment only signal whether the stream segments _may_ be encrypted, meaning
clear media segments can be inserted in the stream. Corollary to this is that an
unencrypted stream with even a single encrypted segment requires that encryption
information be included in the initialization segment. Because of this, ad
insertion requires workarounds that don't apply to other platforms.

Starting in Chrome 58, all this changes. You can now switch between encrypted
and unencrypted in the same stream. This improves compatibility by matching
behavior that already exists in Firefox and Edge.

This has a few caveats. First, if you anticipate any encrypted segments in your
media streams, you must set the
[MediaKeys](https://developer.mozilla.org/docs/Web/API/MediaKeys)
up front. As before, you cannot mix HTTP and HTTPS in the same source.

