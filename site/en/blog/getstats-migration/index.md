---
layout: 'layouts/blog-post.njk'
title: 'WebRTC: Legacy getStats() migration guide'
description: >
  Learn how to use Safari Web Inspector debugging for Chrome on iOS.
authors:
  - henrikbostrom
date: 2023-06-29
---

The legacy getStats() WebRTC API will be removed in Chrome 117, therefore apps using it will need to migrate to the standard API. This article explains how to migrate your code, and what to do if you need more time to make this change. 

Historically there have been two competing versions of the WebRTC `getStats()` API. The legacy getStats() API, that pre-dates the standardization process and takes a callback argument, and the standardized and widely supported API which returns a promise.  

The standard API is more feature rich and has well-defined metrics publicly documented in the W3C specification [Identifiers for WebRTC's Statistics API](https://w3c.github.io/webrtc-stats/). The specification includes descriptions of each metric listed in this guide and many more. 

From Chrome 117 the legacy `getStats()` API will throw an exception in the Stable release channel (the exception throwing will be gradually rolled out). Follow this guide to ease your transition to the standard API.  

{% Aside %}  
You can compare legacy and standard metrics in real-time while your app is running by going to `chrome://webrtc-internals/` in a separate tab, then selecting **legacy** or **standard** metrics using the drop-down table.  
{% endAside %}

## Legacy versus standard stats types

The complete list of standard stats types can be found by looking at the [RTCStatsType](https://w3c.github.io/webrtc-stats/#rtctatstype-*) enum in the specification. This includes which stats dictionary definition describes the metrics collected for each type.  

The stats objects all have an id attribute which uniquely identifies the underlying object across multiple `getStats()` calls. The same object will have the same ID every time the method is called. This is useful for calculating the rate of change of metrics (there's an example in the next section). The IDs also form relationships of references. For example the `outbound-rtp` stats object references the associated `media-source` stats object via the `outbound-rtp.mediaSourceId` attribute. If you draw all `...Id` relationships you get a graph. 

The legacy API has the following stats types, corresponding to the standard types as follows:

<table>
  <thead>
    <tr>
      <th><br>
<strong>Legacy type</strong></th>
      <th><br>
<strong>Standard type</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><p><pre>
ssrc
</pre></p></td>
      <td><br>
Represents an RTP stream and metrics about the associated <code>MediaStreamTrack</code>.<br>
<br>
<br>
The standard types for this are <code>inbound-rtp</code> (for receive RTP streams and its associated remote <code>MediaStreamTrack</code>), <code>outbound-rtp</code> (for send RTP streams) and <code>media-source</code> (for local <code>MediaStreamTrack</code> metrics associated with a send RTP stream). RTP stream metrics also contain information about the encoder or decoder used by the RTP stream.</td>
    </tr>
    <tr>
      <td><p><pre>
VideoBwe
</pre></p></td>
      <td><br>
Bandwidth estimation metrics, target bitrate, encoder bitrate and actual bitrate. These types of metrics are part of the RTP metrics (<code>outbound-rtp</code> and <code>inbound-rtp</code>) and ICE candidate pair metrics (<code>candidate-pair</code>).</td>
    </tr>
    <tr>
      <td><p><pre>
googComponent
</pre></p></td>
      <td><br>
Represents the transport (ICE and DTLS). The standard version is <code>transport</code>.</td>
    </tr>
    <tr>
      <td><p><pre>
localcandidate and remotecandidate
</pre></p></td>
      <td><br>
Represents an ICE candidate. The standard version is <code>local-candidate</code> and <code>remote-candidate</code>.</td>
    </tr>
    <tr>
      <td><p><pre>
googCandidatePair
</pre></p></td>
      <td><br>
Represents an ICE candidate pair, which is a pairing of a local and a remote candidate. The standard version is <code>candidate-pair</code>.</td>
    </tr>
    <tr>
      <td><p><pre>
googCertificate
</pre></p></td>
      <td><br>
Represents a certificate used by the DTLS transport. The standard version is <code>certificate</code>.</td>
    </tr>
    <tr>
      <td><p><pre>
googLibjingleSession
</pre></p></td>
      <td><br>
Represents the <code>RTCPeerConnection</code>. While its contents does not map to anything in the standard, the standard does have a type associated with the <code>RTCPeerConnection</code>: <code>peer-connection</code>.</td>
    </tr>
    <tr>
      <td><br>
Missing from legacy API</td>
      <td><br>
These stats types have been added to the standard API that don't have any corresponding legacy type:<br>
<ul>
<li><code>codec</code>: A codec that is currently being used by an RTP stream, either for encoding or decoding. This is a subset of the codecs that have been negotiated in the SDP.</li>
</ul>
<ul>
<li><code>remote-inbound-rtp</code>: A remote endpoint's inbound RTP stream corresponding to an outbound RTP stream that this endpoint is sending (<code>outbound-rtp</code>). It is measured at the remote endpoint and reported in an RTCP Receiver Report (RR) or RTCP Extended Report (XR).</li>
</ul>
<ul>
<li><code>remote-outbound-rtp</code>: A remote endpoint's outbound RTP stream corresponding to an inbound RTP stream that this endpoint is receiving (<code>inbound-rtp</code>). It is measured at the remote endpoint and reported in an RTCP Sender Report (SR).</li>
</ul>
<ul>
<li><code>media-playout</code>: Metrics about the playout of a remote <code>MediaStreamTrack</code> associated with an inbound RTP stream (<code>inbound-rtp</code>).</li>
</ul>
<ul>
<li><code>data-channel</code>: Represents an <code>RTCDataChannel</code>.</li>
</ul>
</td>
    </tr>
  </tbody>
</table>

## Legacy to standard metrics mapping

This mapping is aimed to help developers find which legacy metric corresponds to which standard metric, but note that the corresponding metric may use different units or be expressed as a total counter rather than an instantaneous value. Refer to the specification for metric definitions.  
The standard API prefers exposing total counters rather than rates. This means that to get the corresponding rate (for example, bitrate) as in the legacy API, the app must calculate the average rate by taking the delta between two `getStats()` calls. For example:

```js
// Periodically (e.g. every second or every 10 seconds)...
const currReport = await pc.getStats();
// Calculate bitrate since the last getStats() call.
// Handling of undefined is omitted for clarity.
const currOutboundRtp = currReport.values().find(s => s.type == 'outbound-rtp');
const prevOutboundRtp = prevReport.get(currOutboundRtp.id);
const deltaBits = (currOutboundRtp.bytesSent - prevOutboundRtp.bytesSent) * 8;
const deltaSeconds = (currOutboundRtp.timestamp - prevOutboundRtp.timestamp) / 1000;
logBitrateMeasurement(deltaBits / deltaSeconds);
// Remember the report for next time.
prevReport = currReport;
```

Having to calculate rates and averages yourself like this may seem like a cumbersome additional step but it has the upside of allowing you to get averages over any desired time interval. Calling the standard API less often than you may otherwise have had to do with the legacy API has some performance benefits.

<table>
  <thead>
    <tr>
      <th><br>
<strong>Legacy metric</strong></th>
      <th><br>
<strong>Standard correspondence</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><br>
<strong>googCertificate</strong></td>
      <td><br>
<strong>certificate</strong></td>
    </tr>
    <tr>
      <td><p><pre>
googCertificate.googFingerprint
</pre></p></td>
      <td><p><pre>
certificate.fingerprint
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
googCertificate.googFingerprintAlgorithm
</pre></p></td>
      <td><p><pre>
certificate.fingerprintAlgorithm
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
googCertificate.googDerBase64
</pre></p></td>
      <td><p><pre>
certificate.base64Certificate
</pre></p></td>
    </tr>
    <tr>
      <td><br>
<strong>googComponent</strong></td>
      <td><br>
<strong>transport</strong></td>
    </tr>
    <tr>
      <td><p><pre>
googComponent.localCertificateId
</pre></p></td>
      <td><p><pre>
transport.localCertificateId
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
googComponent.remoteCertificateId
</pre></p></td>
      <td><p><pre>
transport.remoteCertificateId
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
googComponent.selectedCandidatePairId
</pre></p></td>
      <td><p><pre>
transport.selectedCandidatePairId
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
googComponent.dtlsCipher
</pre></p></td>
      <td><p><pre>
transport.dtlsCipher
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
googComponent.srtpCipher
</pre></p></td>
      <td><p><pre>
transport.srtpCipher
</pre></p></td>
    </tr>
    <tr>
      <td><br>
<strong>localcandidate</strong></td>
      <td><br>
<strong>local-candidate / candidate-pair</strong></td>
    </tr>
    <tr>
      <td><p><pre>
localcandidate.stunKeepaliveRequestsSent
</pre></p></td>
      <td><br>
<code>candidate-pair.requestsSent</code> (reverse lookup <code>candidate-pair</code> via <code>candidate-pair.localCandidateId</code>)</td>
    </tr>
    <tr>
      <td><p><pre>
localcandidate.portNumber
</pre></p></td>
      <td><p><pre>
local-candidate.port
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
localcandidate.networkType
</pre></p></td>
      <td><p><pre>
local-candidate.networkType
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
localcandidate.ipAddress
</pre></p></td>
      <td><p><pre>
local-candidate.address
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
localcandidate.stunKeepaliveResponsesReceived
</pre></p></td>
      <td><p><pre>
candidate-pair.responsesReceived
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
localcandidate.stunKeepaliveRttTotal
</pre></p></td>
      <td><p><pre>
candidate-pair.totalRoundTripTime
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
localcandidate.transport
</pre></p></td>
      <td><p><pre>
local-candidate.protocol
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
localcandidate.candidateType
</pre></p></td>
      <td><p><pre>
local-candidate.candidateType
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
localcandidate.priority
</pre></p></td>
      <td><p><pre>
local-candidate.priority
</pre></p></td>
    </tr>
    <tr>
      <td><br>
<strong>remotecandidate</strong></td>
      <td><br>
<strong>remote-candidate</strong></td>
    </tr>
    <tr>
      <td><br>
Same as <code>localcandidate</code> above.</td>
      <td><br>
Same as <code>local-candidate</code> above.</td>
    </tr>
    <tr>
      <td><br>
<strong>googCandidatePair</strong></td>
      <td><br>
<strong>candidate-pair</strong></td>
    </tr>
    <tr>
      <td><p><pre>
googCandidatePair.responsesSent
</pre></p></td>
      <td><p><pre>
candidate-pair.responsesSent
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
googCandidatePair.requestsReceived
</pre></p></td>
      <td><p><pre>
candidate-pair.requestsReceived
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
googCandidatePair.googRemoteCandidateType
</pre></p></td>
      <td><br>
<code>remote-candidate.candidateType</code> (lookup <code>remote-candidate</code> via <code>candidate-pair.remoteCandidateId</code>)</td>
    </tr>
    <tr>
      <td><p><pre>
googCandidatePair.googReadable
</pre></p></td>
      <td><p><pre>
googReadable is a boolean reflecting whether or not we've recently incremented candidate-pair.requestsReceived or candidate-pair.responsesReceived
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
googCandidatePair.googLocalAddress
</pre></p></td>
      <td><br>
<code>local-candidate.address</code> (lookup <code>local-candidate</code> via <code>candidate-pair.localCandidateId</code>)</td>
    </tr>
    <tr>
      <td><p><pre>
googCandidatePair.consentRequestsSent
</pre></p></td>
      <td><p><pre>
candidate-pair.consentRequestsSent
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
googCandidatePair.googTransportType
</pre></p></td>
      <td><br>
Same as <code>local-candidate.protocol</code> and <code>remote-candidate.protocol</code>.</td>
    </tr>
    <tr>
      <td><p><pre>
googCandidatePair.googChannelId
</pre></p></td>
      <td><p><pre>
candidate-pair.transportId
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
googCandidatePair.googLocalCandidateType
</pre></p></td>
      <td><p><pre>
local-candidate.candidateType
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
googCandidatePair.googWritable
</pre></p></td>
      <td><p><pre>
googWritable is a boolean reflecting whether or not we've recently incremented candidate-pair.responsesReceived
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
googCandidatePair.googRemoteAddress
</pre></p></td>
      <td><p><pre>
remote-candidate.address
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
googCandidatePair.googRtt
</pre></p></td>
      <td><p><pre>
candidate-pair.currentRoundTripTime
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
googCandidatePair.googActiveConnection
</pre></p></td>
      <td><br>
The "active connection" refers to the candidate pair that is currently selected by the transport, i.e. where <code>candidate-pair.id == transport.selectedCandidatePairId</code></td>
    </tr>
    <tr>
      <td><p><pre>
googCandidatePair.packetsDiscardedOnSend
</pre></p></td>
      <td><p><pre>
candidate-pair.packetsDiscardedOnSend
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
googCandidatePair.bytesReceived
</pre></p></td>
      <td><p><pre>
candidate-pair.bytesReceived
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
googCandidatePair.responsesReceived
</pre></p></td>
      <td><p><pre>
candidate-pair.responsesReceived
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
googCandidatePair.remoteCandidateId
</pre></p></td>
      <td><p><pre>
candidate-pair.remoteCandidateId
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
googCandidatePair.localCandidateId
</pre></p></td>
      <td><p><pre>
candidate-pair.localCandidateId
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
googCandidatePair.bytesSent
</pre></p></td>
      <td><p><pre>
candidate-pair.bytesSent
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
googCandidatePair.packetsSent
</pre></p></td>
      <td><p><pre>
candidate-pair.packetsSent
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
googCandidatePair.bytesReceived
</pre></p></td>
      <td><p><pre>
candidate-pair.bytesReceived
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
googCandidatePair.bytesReceived
</pre></p></td>
      <td><p><pre>
candidate-pair.bytesReceived
</pre></p></td>
    </tr>
    <tr>
      <td><br>
<strong>ssrc</strong></td>
      <td><br>
<strong>inbound-rtp, outbound-rtp, media-source</strong></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.audioInputLevel
</pre></p></td>
      <td><br>
<code>media-source.audioLevel</code>. The legacy metric is in range [0..32768] but the standard metrc is in range [0..1].</td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.audioOutputLevel
</pre></p></td>
      <td><br>
<code>inbound-rtp.audioLevel</code>. The legacy metric is in range [0..32768] but the standard metrc is in range [0..1].</td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.packetsLost
</pre></p></td>
      <td><p><pre>
inbound-rtp.packetsLost
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googTrackId
</pre></p></td>
      <td><br>
<code>media-source.trackIdentifier</code> for local <code>MediaStreamTrack</code>s and <code>inbound-rtp.trackIdentifier</code> for remote <code>MediaStreamTrack</code>s</td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googRtt
</pre></p></td>
      <td><br>
<code>remote-inbound-rtp.roundTripTime</code> (see <code>outbound-rtp.remoteId</code>)</td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googEchoCancellationReturnLossEnhancement
</pre></p></td>
      <td><p><pre>
inbound-rtp.echoReturnLossEnhancement
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googCodecName
</pre></p></td>
      <td><br>
The codec name is the subtype of the "type/subtype" mime type, <code>codec.mimeType</code> (see <code>inbound-rtp.codecId</code> and <code>outbound-rtp.codecId</code>)</td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.transportId
</pre></p></td>
      <td><p><pre>
inbound-rtp.transportId and outbound-rtp.transportId
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.mediaType
</pre></p></td>
      <td><p><pre>
inbound-rtp.kind and outbound-rtp.kind or media-source.kind
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googEchoCancellationReturnLoss
</pre></p></td>
      <td><p><pre>
inbound-rtp.echoReturnLoss
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.totalAudioEnergy
</pre></p></td>
      <td><p><pre>
inbound-rtp.totalAudioEnergy and media-source.totalAudioEnergy
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.totalSamplesDuration
</pre></p></td>
      <td><p><pre>
inbound-rtp.totalSamplesDuration and media-source.totalSamplesDuration
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.ssrc
</pre></p></td>
      <td><p><pre>
inbound-rtp.ssrc and outbound-rtp.ssrc
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googJitterReceived
</pre></p></td>
      <td><p><pre>
inbound-rtp.jitter
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.packetsSent
</pre></p></td>
      <td><p><pre>
outbound-rtp.packetsSent
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.bytesSent
</pre></p></td>
      <td><p><pre>
outbound-rtp.bytesSent
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googContentType
</pre></p></td>
      <td><p><pre>
inbound-rtp.contentType and outbound-rtp.contentType
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googFrameWidthInput
</pre></p></td>
      <td><p><pre>
media-source.width
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googFrameHeightInput
</pre></p></td>
      <td><p><pre>
media-source.height
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googFrameRateInput
</pre></p></td>
      <td><p><pre>
media-source.framesPerSecond
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googFrameWidthSent
</pre></p></td>
      <td><p><pre>
outbound-rtp.frameWidth
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googFrameHeightSent
</pre></p></td>
      <td><p><pre>
outbound-rtp.frameHeight
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googFrameRateSent
</pre></p></td>
      <td><br>
While the send FPS is the rate of change of <code>outbound-rtp.framesSent</code>, this is actually implemented as <code>outbound-rtp.framesPerSecond</code> which is encoding FPS.</td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googFrameWidthReceived
</pre></p></td>
      <td><p><pre>
inbound-rtp.frameWidth
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googFrameHeightReceived
</pre></p></td>
      <td><p><pre>
inbound-rtp.frameHeight
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googFrameRateDecoded
</pre></p></td>
      <td><br>
The rate of change of <code>inbound-rtp.framesDecoded</code></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googFrameRateOutput
</pre></p></td>
      <td><br>
The rate of change of <code>inbound-rtp.framesDecoded - inbound-rtp.framesDropped</code></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.hugeFramesSent
</pre></p></td>
      <td><p><pre>
outbound-rtp.hugeFramesSent
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.qpSum
</pre></p></td>
      <td><p><pre>
inbound-rtp.qpSum and outbound-rtp.qpSum
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.framesEncoded
</pre></p></td>
      <td><p><pre>
outbound-rtp.framesEncoded
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googAvgEncodeMs
</pre></p></td>
      <td><p><pre>
outbound-rtp.totalEncodeTime / outbound-rtp.framesEncoded
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.codecImplementationName
</pre></p></td>
      <td><p><pre>
inbound-rtp.decoderImplementation and outbound-rtp.encoderImplementation
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googCpuLimitedResolution
</pre></p></td>
      <td><br>
True if <code>outbound-rtp.qualityLimitationReason == "cpu"</code></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googBandwidthLimitedResolution
</pre></p></td>
      <td><br>
True if <code>outbound-rtp.qualityLimitationReason == "bandwidth"</code></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googAdaptationChanges
</pre></p></td>
      <td><br>
The legacy metric counts the number of times resolution or frame rate changed for <code>qualityLimitationReason</code> related reasons. This could be deduced from other metrics (e.g. send resolution or frame rate being different from source resolution or frame rate), but the duration that we have been limited, <code>outbound-rtp.qualityLimitationDurations</code>, may be more useful than how frequently resolution or frame rate changed was reconfigured.</td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googNacksReceived
</pre></p></td>
      <td><p><pre>
inbound-rtp.nackCount
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googNacksSent
</pre></p></td>
      <td><p><pre>
inbound-rtp.nackCount
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googPlisReceived
</pre></p></td>
      <td><p><pre>
inbound-rtp.pliCount
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googPlisSent
</pre></p></td>
      <td><p><pre>
inbound-rtp.pliCount
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googFirsReceived
</pre></p></td>
      <td><p><pre>
inbound-rtp.firCount
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googFirsSent
</pre></p></td>
      <td><p><pre>
inbound-rtp.firCount
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googSecondaryDecodedRate
</pre></p></td>
      <td><br>
The recent ratio of packets containing error correction: <code>inbound-rtp.fecPacketsReceived - inbound-rtp.fecPacketsDiscarded</code></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.packetsReceived
</pre></p></td>
      <td><p><pre>
inbound-rtp.packetsReceived
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googJitterBufferMs
</pre></p></td>
      <td><p><pre>
inbound-rtp.jitterBufferDelay / inbound-rtp.jitterBufferEmittedCount
</pre></p></td>
    </tr>
    <tr>
      <td><br>
<code>ssrc.googTargetDelayMs</code> (video)</td>
      <td><p><pre>
inbound-rtp.jitterBufferTargetDelay / inbound-rtp.jitterBufferEmittedCount
</pre></p></td>
    </tr>
    <tr>
      <td><br>
<code>ssrc.googPreferredJitterBufferMs</code> (audio)</td>
      <td><p><pre>
inbound-rtp.jitterBufferTargetDelay / inbound-rtp.jitterBufferEmittedCount
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googExpandRate
</pre></p></td>
      <td><br>
The recent ratio of concealed samples: <code>inbound-rtp.concealedSamples / inbound-rtp.totalSamplesReceived</code></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googSpeechExpandRate
</pre></p></td>
      <td><br>
The recent ratio of concealed samples while the stream was not silent: of <code>(inbound-rtp.concealedSamples - inbound-rtp.silentConcealedSamples) / inbound-rtp.concealedSamples</code></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googAccelerateRate
</pre></p></td>
      <td><br>
The recent ratio of samples that were discarded in order to accelerate playout speed: <code>inbound-rtp.removedSamplesForAcceleration / inbound-rtp.totalSamplesReceived</code></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googPreemptiveExpandRate
</pre></p></td>
      <td><br>
The recent ratio of samples that were synthesized in order to decelerate playout speed: <code>inbound-rtp.insertedSamplesForDeceleration / inbound-rtp.totalSamplesReceived</code></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googSecondaryDiscardedRate
</pre></p></td>
      <td><p><pre>
inbound-rtp.fecPacketsDiscarded
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.bytesReceived
</pre></p></td>
      <td><p><pre>
inbound-rtp.bytesReceived
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googCurrentDelayMs
</pre></p></td>
      <td><p><pre>
inbound-rtp.jitterBufferDelay + media-playout.totalPlayoutDelay
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googDecodeMs
</pre></p></td>
      <td><p><pre>
inbound-rtp.totalDecodeTime / inbound-rtp.framesDecoded
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.googTimingFrameInfo
</pre></p></td>
      <td><br>
The only remaining goog-metric... <code>inbound-rtp.googTimingFrameInfo</code></td>
    </tr>
    <tr>
      <td><p><pre>
ssrc.framesDecoded
</pre></p></td>
      <td><p><pre>
inbound-rtp.framesDecoded
</pre></p></td>
    </tr>
    <tr>
      <td><br>
<strong>VideoBwe</strong></td>
      <td><br>
<strong>outbound-rtp and candidate-pair</strong></td>
    </tr>
    <tr>
      <td><p><pre>
VideoBwe.googTargetEncBitrate
</pre></p></td>
      <td><br>
<code>outbound-rtp.targetBitrate</code> as an instantaneous value or <code>outbound-rtp.totalEncodedBytesTarget / outbound-rtp.framesEncoded</code> as an average</td>
    </tr>
    <tr>
      <td><p><pre>
VideoBwe.googActualEncBitrate
</pre></p></td>
      <td><br>
The bytes produced by the encoder are the payload bytes, excluding retransmissions: the rate of change of <code>outbound-rtp.bytesSent - outbound-rtp.retransmittedBytesSent</code></td>
    </tr>
    <tr>
      <td><p><pre>
VideoBwe.googBucketDelay
</pre></p></td>
      <td><p><pre>
outbound-rtp.totalPacketSendDelay / outbound-rtp.packetsSent
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
VideoBwe.googTransmitBitrate
</pre></p></td>
      <td><br>
The rate of change of <code>outbound-rtp.headerBytesSent + outbound-rtp.bytesSent</code> for per-RTP stream bitrate, <code>candidate-pair.bytesSent</code> for per-ICE candidate bitrate or <code>transport.bytesSent</code> for per-transport bitrate</td>
    </tr>
    <tr>
      <td><p><pre>
VideoBwe.googRetransmitBitrate
</pre></p></td>
      <td><br>
The range of change of <code>outbound-rtp.retransmittedBytesSent</code></td>
    </tr>
    <tr>
      <td><p><pre>
VideoBwe.googAvailableSendBandwidth
</pre></p></td>
      <td><p><pre>
candidate-pair.availableOutgoingBitrate
</pre></p></td>
    </tr>
    <tr>
      <td><p><pre>
VideoBwe.googAvailableReceiveBandwidth
</pre></p></td>
      <td><p><pre>
candidate-pair.availableIncomingBitrate
</pre></p></td>
    </tr>
  </tbody>
</table>

## The standard API is simulcast-aware

If you use simulcast you may have noticed that the legacy API only reports a single SSRC even when you're using simulcast to send (for example) three RTP streams over three separate SSRCs.  
The standard API does not share this limitation and will return three `outbound-rtp` stats objects, one for each of the SSRCs. This means that you can analyze each RTP stream individually, but it also means that to obtain the total bitrate of all RTP send streams you'll need to aggregate them yourself.  
SVC streams or RTP streams with multiple spatial layers configured via the `scalabilityMode` API on the other hand still show up as a single `outbound-rtp` because these are sent over a single SSRC.

## If you need more time for migration

When the legacy API is removed in Chrome 117, using it will generate an exception. If you are unable to migrate your code in time, the [origin trial for RTCPeerConnection callback-based getStats() API](/origintrials/#/view_trial/3633278999381147649) gives registered websites more time to migrate. With an origin trial token, the legacy getStats() API may continue to be used until Chrome 121.