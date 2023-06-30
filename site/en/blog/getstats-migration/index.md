---
layout: 'layouts/blog-post.njk'
title: 'WebRTC: Legacy getStats() migration guide'
description: >
  Learn how to use Safari Web Inspector debugging for Chrome on iOS.
authors:
  - henrikbostrom
date: 2023-06-30
---

The legacy `getStats()` WebRTC API will be removed in Chrome 117, therefore apps using it will need to migrate to the standard API. This article explains how to migrate your code, and what to do if you need more time to make this change. 

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
      <td><code>
ssrc
</code></td>
      <td><br>
Represents an RTP stream and metrics about the associated <code>MediaStreamTrack</code>.<br>
<br>
<br>
The standard types for this are <code>inbound-rtp</code> (for receive RTP streams and its associated remote <code>MediaStreamTrack</code>), <code>outbound-rtp</code> (for send RTP streams) and <code>media-source</code> (for local <code>MediaStreamTrack</code> metrics associated with a send RTP stream). RTP stream metrics also contain information about the encoder or decoder used by the RTP stream.</td>
    </tr>
    <tr>
      <td><code>
VideoBwe
</code></td>
      <td><br>
Bandwidth estimation metrics, target bitrate, encoder bitrate and actual bitrate. These types of metrics are part of the RTP metrics (<code>outbound-rtp</code> and <code>inbound-rtp</code>) and ICE candidate pair metrics (<code>candidate-pair</code>).</td>
    </tr>
    <tr>
      <td><code>
googComponent
</code></td>
      <td><br>
Represents the transport (ICE and DTLS). The standard version is <code>transport</code>.</td>
    </tr>
    <tr>
      <td><code>
localcandidate and remotecandidate
</code></td>
      <td><br>
Represents an ICE candidate. The standard version is <code>local-candidate</code> and <code>remote-candidate</code>.</td>
    </tr>
    <tr>
      <td><code>
googCandidatePair
</code></td>
      <td><br>
Represents an ICE candidate pair, which is a pairing of a local and a remote candidate. The standard version is <code>candidate-pair</code>.</td>
    </tr>
    <tr>
      <td><code>
googCertificate
</code></td>
      <td><br>
Represents a certificate used by the DTLS transport. The standard version is <code>certificate</code>.</td>
    </tr>
    <tr>
      <td><code>
googLibjingleSession
</code></td>
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
      <th>Legacy metric
      <br><code>googCertificate</code></th>
      <th>Standard correspondence
      <br><code>certificate</code></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>
.googFingerprint
</code></td>
      <td><code>
.fingerprint
</code></td>
    </tr>
    <tr>
      <td><code>
.googFingerprintAlgorithm
</code></td>
      <td><code>
.fingerprintAlgorithm
</code></td>
    </tr>
    <tr>
      <td><code>
.googDerBase64
</code></td>
      <td><code>
.base64Certificate
</code></td>
    </tr>
    </tbody>
</table>
<table>
  <thead>
    <tr>
      <th>Legacy metric
      <br><code>googComponent</code></th>
      <th>Standard correspondence
      <br><code>transport</code></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>
.localCertificateId
</code></td>
      <td><code>
.localCertificateId
</code></td>
    </tr>
    <tr>
      <td><code>
.remoteCertificateId
</code></td>
      <td><code>
.remoteCertificateId
</code></td>
    </tr>
    <tr>
      <td><code>
.selectedCandidatePairId
</code></td>
      <td><code>
.selectedCandidatePairId
</code></td>
    </tr>
    <tr>
      <td><code>
.dtlsCipher
</code></td>
      <td><code>
.dtlsCipher
</code></td>
    </tr>
    <tr>
      <td><code>
.srtpCipher
</code></td>
      <td><code>
.srtpCipher
</code></td>
    </tr>
    </tbody>
    </table>
    <table>
 <thead>
    <tr>
      <th>Legacy metric
      <br><code>localcandidate</code></th>
      <th>Standard correspondence
      <br><code>local-candidate</code> or <code>candidate-pair</code></th>
    </tr>
  </thead>
  <tbody>   
    <tr>
      <td><code>
.stunKeepaliveRequestsSent
</code></td>
      <td>
<code>candidate-pair.requestsSent</code> (reverse lookup <code>candidate-pair</code> via <code>candidate-pair.localCandidateId</code>)</td>
    </tr>
    <tr>
      <td><code>
.portNumber
</code></td>
      <td><code>
local-candidate.port
</code></td>
    </tr>
    <tr>
      <td><code>
.networkType
</code></td>
      <td><code>
local-candidate.networkType
</code></td>
    </tr>
    <tr>
      <td><code>
.ipAddress
</code></td>
      <td><code>
local-candidate.address
</code></td>
    </tr>
    <tr>
      <td><code>
.stunKeepaliveResponsesReceived
</code></td>
      <td><code>
candidate-pair.responsesReceived
</code></td>
    </tr>
    <tr>
      <td><code>
.stunKeepaliveRttTotal
</code></td>
      <td><code>
candidate-pair.totalRoundTripTime
</code></td>
    </tr>
    <tr>
      <td><code>
.transport
</code></td>
      <td><code>
local-candidate.protocol
</code></td>
    </tr>
    <tr>
      <td><code>
.candidateType
</code></td>
      <td><code>
local-candidate.candidateType
</code></td>
    </tr>
    <tr>
      <td><code>
.priority
</code></td>
      <td><code>
local-candidate.priority
</code></td>
    </tr>
    </tbody>
</table>
<table>
 <thead>
    <tr>
      <th>Legacy metric
      <br><code>remotecandidate</code></th>
      <th>Standard correspondence
      <br><code>remote-candidate</code></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
Same as <code>localcandidate</code> above.</td>
      <td>
Same as <code>local-candidate</code> above.</td>
    </tr>
</tbody>
</table>
<table>
 <thead>
    <tr>
      <th>Legacy metric
      <br><code>googCandidatePair</code></th>
      <th>Standard correspondence
      <br><code>candidate-pair</code></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>
.responsesSent
</code></td>
      <td><code>
candidate-pair.responsesSent
</code></td>
    </tr>
    <tr>
      <td><code>
.requestsReceived
</code></td>
      <td><code>
candidate-pair.requestsReceived
</code></td>
    </tr>
    <tr>
      <td><code>
.googRemoteCandidateType
</code></td>
      <td>
<code>remote-candidate.candidateType</code> <br>(lookup <code>remote-candidate</code> via <br><code>candidate-pair.remoteCandidateId</code>)</td>
    </tr>
    <tr>
      <td><code>
.googReadable
</code></td>
      <td>
<code>googReadable</code> is a boolean reflecting whether or not we've recently incremented <code>candidate-pair.requestsReceived</code> or <code>candidate-pair.responsesReceived</code>
</td>
    </tr>
    <tr>
      <td><code>
.googLocalAddress
</code></td>
      <td>
<code>local-candidate.address</code> <br>(lookup <code>local-candidate</code> via <br><code>candidate-pair.localCandidateId</code>)</td>
    </tr>
    <tr>
      <td><code>
.consentRequestsSent
</code></td>
      <td><code>
candidate-pair.consentRequestsSent
</code></td>
    </tr>
    <tr>
      <td><code>
.googTransportType
</code></td>
      <td>
Same as <code>local-candidate.protocol</code> and <code>remote-candidate.protocol</code>.</td>
    </tr>
    <tr>
      <td><code>
.googChannelId
</code></td>
      <td><code>
candidate-pair.transportId
</code></td>
    </tr>
    <tr>
      <td><code>
.googLocalCandidateType
</code></td>
      <td><code>
local-candidate.candidateType
</code></td>
    </tr>
    <tr>
      <td><code>
.googWritable
</code></td>
      <td>
<code>googWritable</code> is a boolean reflecting whether or not we've recently incremented <code>candidate-pair.responsesReceived</code>
</td>
    </tr>
    <tr>
      <td><code>
.googRemoteAddress
</code></td>
      <td><code>
remote-candidate.address
</code></td>
    </tr>
    <tr>
      <td><code>
.googRtt
</code></td>
      <td><code>
candidate-pair.currentRoundTripTime
</code></td>
    </tr>
    <tr>
      <td><code>
.googActiveConnection
</code></td>
      <td>
The <em>active connection</em> refers to the candidate pair that is currently selected by the transport, such as where <code>candidate-pair.id == transport.selectedCandidatePairId</code></td>
    </tr>
    <tr>
      <td><code>
.packetsDiscardedOnSend
</code></td>
      <td><code>
candidate-pair.packetsDiscardedOnSend
</code></td>
    </tr>
    <tr>
      <td><code>
.bytesReceived
</code></td>
      <td><code>
candidate-pair.bytesReceived
</code></td>
    </tr>
    <tr>
      <td><code>
.responsesReceived
</code></td>
      <td><code>
candidate-pair.responsesReceived
</code></td>
    </tr>
    <tr>
      <td><code>
.remoteCandidateId
</code></td>
      <td><code>
candidate-pair.remoteCandidateId
</code></td>
    </tr>
    <tr>
      <td><code>
.localCandidateId
</code></td>
      <td><code>
candidate-pair.localCandidateId
</code></td>
    </tr>
    <tr>
      <td><code>
.bytesSent
</code></td>
      <td><code>
candidate-pair.bytesSent
</code></td>
    </tr>
    <tr>
      <td><code>
.packetsSent
</code></td>
      <td><code>
candidate-pair.packetsSent
</code></td>
    </tr>
    <tr>
      <td><code>
.bytesReceived
</code></td>
      <td><code>
candidate-pair.bytesReceived
</code></td>
    </tr>
    <tr>
      <td><code>
.bytesReceived
</code></td>
      <td><code>
candidate-pair.bytesReceived
</code></td>
    </tr>
</tbody>
</table>
<table>
 <thead>
    <tr>
      <th>Legacy metric
      <br><code>ssrc</code></th>
      <th>Standard correspondence
      <br><code>inbound-rtp</code>, <code>outbound-rtp</code>, <code>media-source</code></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>
.audioInputLevel
</code></td>
      <td>
<code>media-source.audioLevel</code>. The legacy metric is in range [0..32768] but the standard metrc is in range [0..1].</td>
    </tr>
    <tr>
      <td><code>
.audioOutputLevel
</code></td>
      <td><br>
<code>inbound-rtp.audioLevel</code>. The legacy metric is in range [0..32768] but the standard metrc is in range [0..1].</td>
    </tr>
    <tr>
      <td><code>
.packetsLost
</code></td>
      <td><code>
inbound-rtp.packetsLost
</code></td>
    </tr>
    <tr>
      <td><code>
.googTrackId
</code></td>
      <td>
<code>media-source.trackIdentifier</code> for local <code>MediaStreamTrack</code>s and <code>inbound-rtp.trackIdentifier</code> for remote <code>MediaStreamTrack</code>s</td>
    </tr>
    <tr>
      <td><code>
.googRtt
</code></td>
      <td>
<code>remote-inbound-rtp.roundTripTime</code> (see <code>outbound-rtp.remoteId</code>)</td>
    </tr>
    <tr>
      <td><code>
.googEchoCancellationReturnLossEnhancement
</code></td>
      <td><code>
inbound-rtp.echoReturnLossEnhancement
</code></td>
    </tr>
    <tr>
      <td><code>
.googCodecName
</code></td>
      <td>
The codec name is the subtype of the "type/subtype" mime type, <code>codec.mimeType</code> (see <code>inbound-rtp.codecId</code> and <code>outbound-rtp.codecId</code>)</td>
    </tr>
    <tr>
      <td><code>
.transportId
</code></td>
      <td>
<code>inbound-rtp.transportId</code> and <code>outbound-rtp.transportId</code></td>
    </tr>
    <tr>
      <td><code>
.mediaType
</code></td>
      <td>
<code>inbound-rtp.kind</code> and <code>outbound-rtp.kind</code> or <code>media-source.kind</code>
</td>
    </tr>
    <tr>
      <td><code>
.googEchoCancellationReturnLoss
</code></td>
      <td><code>
inbound-rtp.echoReturnLoss
</code></td>
    </tr>
    <tr>
      <td><code>
.totalAudioEnergy
</code></td>
      <td>
<code>inbound-rtp.totalAudioEnergy</code> and <code>media-source.totalAudioEnergy</code>
</td>
    </tr>
    <tr>
      <td><code>
ssrc.totalSamplesDuration
</code></td>
      <td>
<code>inbound-rtp.totalSamplesDuration</code> and <code>media-source.totalSamplesDuration</code>
</td>
    </tr>
    <tr>
      <td><code>
.ssrc
</code></td>
      <td>
<code>inbound-rtp.ssrc</code> and <code>outbound-rtp.ssrc</code>
</td>
    </tr>
    <tr>
      <td><code>
.googJitterReceived
</code></td>
      <td><code>
inbound-rtp.jitter
</code></td>
    </tr>
    <tr>
      <td><code>
.packetsSent
</code></td>
      <td><code>
outbound-rtp.packetsSent
</code></td>
    </tr>
    <tr>
      <td><code>
.bytesSent
</code></td>
      <td><code>
outbound-rtp.bytesSent
</code></td>
    </tr>
    <tr>
      <td><code>
.googContentType
</code></td>
      <td>
<code>inbound-rtp.contentType</code> and <code>outbound-rtp.contentType</code></td>
    </tr>
    <tr>
      <td><code>
.googFrameWidthInput
</code></td>
      <td><code>
media-source.width
</code></td>
    </tr>
    <tr>
      <td><code>
.googFrameHeightInput
</code></td>
      <td><code>
media-source.height
</code></td>
    </tr>
    <tr>
      <td><code>
.googFrameRateInput
</code></td>
      <td><code>
media-source.framesPerSecond
</code></td>
    </tr>
    <tr>
      <td><code>
.googFrameWidthSent
</code></td>
      <td><code>
outbound-rtp.frameWidth
</code></td>
    </tr>
    <tr>
      <td><code>
.googFrameHeightSent
</code></td>
      <td><code>
outbound-rtp.frameHeight
</code></td>
    </tr>
    <tr>
      <td><code>
.googFrameRateSent
</code></td>
      <td><br>
While the send FPS is the rate of change of <code>outbound-rtp.framesSent</code>, this is actually implemented as <code>outbound-rtp.framesPerSecond</code> which is encoding FPS.</td>
    </tr>
    <tr>
      <td><code>
.googFrameWidthReceived
</code></td>
      <td><code>
inbound-rtp.frameWidth
</code></td>
    </tr>
    <tr>
      <td><code>
.googFrameHeightReceived
</code></td>
      <td><code>
inbound-rtp.frameHeight
</code></td>
    </tr>
    <tr>
      <td><code>
.googFrameRateDecoded
</code></td>
      <td><br>
The rate of change of <code>inbound-rtp.framesDecoded</code></td>
    </tr>
    <tr>
      <td><code>
.googFrameRateOutput
</code></td>
      <td><br>
The rate of change of <code>inbound-rtp.framesDecoded</code> - <code>inbound-rtp.framesDropped</code></td>
    </tr>
    <tr>
      <td><code>
.hugeFramesSent
</code></td>
      <td><code>
outbound-rtp.hugeFramesSent
</code></td>
    </tr>
    <tr>
      <td><code>
.qpSum
</code></td>
      <td><p>
<code>inbound-rtp.qpSum</code> and <code>outbound-rtp.qpSum</code></p></td>
    </tr>
    <tr>
      <td><code>
.framesEncoded
</code></td>
      <td><code>
outbound-rtp.framesEncoded
</code></td>
    </tr>
    <tr>
      <td><code>
.googAvgEncodeMs
</code></td>
      <td><p>
<code>outbound-rtp.totalEncodeTime</code> / <code>outbound-rtp.framesEncoded</code>
</p></td>
    </tr>
    <tr>
      <td><code>
.codecImplementationName
</code></td>
      <td><p>
<code>inbound-rtp.decoderImplementation</code> and <code>outbound-rtp.encoderImplementation</code>
</p></td>
    </tr>
    <tr>
      <td><code>
.googCpuLimitedResolution
</code></td>
      <td><br>
True if <code>outbound-rtp.qualityLimitationReason == "cpu"</code></td>
    </tr>
    <tr>
      <td><code>
.googBandwidthLimitedResolution
</code></td>
      <td><br>
True if <code>outbound-rtp.qualityLimitationReason == "bandwidth"</code></td>
    </tr>
    <tr>
      <td><code>
.googAdaptationChanges
</code></td>
      <td><br>
The legacy metric counts the number of times resolution or frame rate changed for <code>qualityLimitationReason</code> related reasons. This could be deduced from other metrics (e.g. send resolution or frame rate being different from source resolution or frame rate), but the duration that we have been limited, <code>outbound-rtp.qualityLimitationDurations</code>, may be more useful than how frequently resolution or frame rate changed was reconfigured.</td>
    </tr>
    <tr>
      <td><code>
.googNacksReceived
</code></td>
      <td><code>
inbound-rtp.nackCount
</code></td>
    </tr>
    <tr>
      <td><code>
.googNacksSent
</code></td>
      <td><code>
inbound-rtp.nackCount
</code></td>
    </tr>
    <tr>
      <td><code>
.googPlisReceived
</code></td>
      <td><code>
inbound-rtp.pliCount
</code></td>
    </tr>
    <tr>
      <td><code>
.googPlisSent
</code></td>
      <td><code>
inbound-rtp.pliCount
</code></td>
    </tr>
    <tr>
      <td><code>
.googFirsReceived
</code></td>
      <td><code>
inbound-rtp.firCount
</code></td>
    </tr>
    <tr>
      <td><code>
.googFirsSent
</code></td>
      <td><code>
inbound-rtp.firCount
</code></td>
    </tr>
    <tr>
      <td><code>
.googSecondaryDecodedRate
</code></td>
      <td><br>
The recent ratio of packets containing error correction: <code>inbound-rtp.fecPacketsReceived</code> - <code>inbound-rtp.fecPacketsDiscarded</code></td>
    </tr>
    <tr>
      <td><code>
.packetsReceived
</code></td>
      <td><code>
inbound-rtp.packetsReceived
</code></td>
    </tr>
    <tr>
      <td><code>
.googJitterBufferMs
</code></td>
      <td><code>
inbound-rtp.jitterBufferDelay</code> / <code>inbound-rtp.jitterBufferEmittedCount
</code></td>
    </tr>
    <tr>
      <td>
<code>.googTargetDelayMs</code> (video)</td>
      <td><code>
inbound-rtp.jitterBufferTargetDelay</code> / <code>inbound-rtp.jitterBufferEmittedCount
</code></td>
    </tr>
    <tr>
      <td>
<code>.googPreferredJitterBufferMs</code> (audio)</td>
      <td><code>
inbound-rtp.jitterBufferTargetDelay</code> / <code>inbound-rtp.jitterBufferEmittedCount
</code></td>
    </tr>
    <tr>
      <td><code>
.googExpandRate
</code></td>
      <td><br>
The recent ratio of concealed samples: <code>inbound-rtp.concealedSamples</code> / <code>inbound-rtp.totalSamplesReceived</code></td>
    </tr>
    <tr>
      <td><code>
.googSpeechExpandRate
</code></td>
      <td>
The recent ratio of concealed samples while the stream was not silent: of (<code>inbound-rtp.concealedSamples</code> - <code>inbound-rtp.silentConcealedSamples</code>) / <code>inbound-rtp.concealedSamples</code></td>
    </tr>
    <tr>
      <td><code>
.googAccelerateRate
</code></td>
      <td>
The recent ratio of samples that were discarded in order to accelerate playout speed: <code>inbound-rtp.removedSamplesForAcceleration</code> / <code>inbound-rtp.totalSamplesReceived</code></td>
    </tr>
    <tr>
      <td><code>
.googPreemptiveExpandRate
</code></td>
      <td><br>
The recent ratio of samples that were synthesized in order to decelerate playout speed: <code>inbound-rtp.insertedSamplesForDeceleration</code> / <code>inbound-rtp.totalSamplesReceived</code></td>
    </tr>
    <tr>
      <td><code>
.googSecondaryDiscardedRate
</code></td>
      <td><code>
inbound-rtp.fecPacketsDiscarded
</code></td>
    </tr>
    <tr>
      <td><code>
.bytesReceived
</code></td>
      <td><code>
inbound-rtp.bytesReceived
</code></td>
    </tr>
    <tr>
      <td><code>
s.googCurrentDelayMs
</code></td>
      <td>
<code>inbound-rtp.jitterBufferDelay</code> + media-playout.totalPlayoutDelay</code>
</td>
    </tr>
    <tr>
      <td><code>
.googDecodeMs
</code></td>
      <td>
<code>inbound-rtp.totalDecodeTime</code> / <code>inbound-rtp.framesDecoded</code>
</td>
    </tr>
    <tr>
      <td><code>
.googTimingFrameInfo
</code></td>
      <td><br>
The only remaining goog-metric. <code>inbound-rtp.googTimingFrameInfo</code></td>
    </tr>
    <tr>
      <td><code>
.framesDecoded
</code></td>
      <td><code>
inbound-rtp.framesDecoded
</code></td>
    </tr>
</tbody>
</table>
<table>
 <thead>
    <tr>
      <th>Legacy metric
      <br><code>VideoBwe</code></th>
      <th>Standard correspondence
      <br><code>outbound-rtp</code> and <code>candidate-pair</code></th>
    </tr>
  </thead>
    <tr>
      <td><code>
.googTargetEncBitrate
</code></td>
      <td><br>
<code>outbound-rtp.targetBitrate</code> as an instantaneous value or <code>outbound-rtp.totalEncodedBytesTarget</code> / <code>outbound-rtp.framesEncoded</code> as an average</td>
    </tr>
    <tr>
      <td><code>
.googActualEncBitrate
</code></td>
      <td>
The bytes produced by the encoder are the payload bytes, excluding retransmissions: the rate of change of <code>outbound-rtp.bytesSent</code> - <code>outbound-rtp.retransmittedBytesSent</code></td>
    </tr>
    <tr>
      <td><code>
.googBucketDelay
</code></td>
      <td>
<code>outbound-rtp.totalPacketSendDelay</code> / <code>outbound-rtp.packetsSent
</code></td>
    </tr>
    <tr>
      <td><code>
.googTransmitBitrate
</code></td>
      <td>
The rate of change of <code>outbound-rtp.headerBytesSent</code> + <code>outbound-rtp.bytesSent</code> for per-RTP stream bitrate, <code>candidate-pair.bytesSent</code> for per-ICE candidate bitrate or <code>transport.bytesSent</code> for per-transport bitrate</td>
    </tr>
    <tr>
      <td><code>
.googRetransmitBitrate
</code></td>
      <td>
The range of change of <code>outbound-rtp.retransmittedBytesSent</code></td>
    </tr>
    <tr>
      <td><code>
.googAvailableSendBandwidth
</code></td>
      <td><code>
candidate-pair.availableOutgoingBitrate
</code></td>
    </tr>
    <tr>
      <td><code>
.googAvailableReceiveBandwidth
</code></td>
      <td><code>
candidate-pair.availableIncomingBitrate
</code></td>
    </tr>
  </tbody>
</table>

## The standard API is simulcast-aware

If you use simulcast you may have noticed that the legacy API only reports a single SSRC even when you're using simulcast to send (for example) three RTP streams over three separate SSRCs.  

The standard API does not share this limitation and will return three `outbound-rtp` stats objects, one for each of the SSRCs. This means that you can analyze each RTP stream individually, but it also means that to obtain the total bitrate of all RTP send streams you'll need to aggregate them yourself.  

SVC streams or RTP streams with multiple spatial layers configured via the `scalabilityMode` API on the other hand still show up as a single `outbound-rtp` because these are sent over a single SSRC.

## If you need more time for migration

When the legacy API is removed in Chrome 117, using it will generate an exception. If you are unable to migrate your code in time, the [origin trial for RTCPeerConnection callback-based getStats() API](/origintrials/#/view_trial/3633278999381147649) gives registered websites more time to migrate. With an origin trial token, the legacy getStats() API may continue to be used until Chrome 121.