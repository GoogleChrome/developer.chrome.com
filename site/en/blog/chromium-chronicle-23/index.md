---
title: "The Chromium Chronicle #23: Verified builds in Chrome Infra"
description: >
  Implementing a policy enforcement check for Chrome and the infrastructure
  has enabled us to verify that certain minimum standards for security are met.
layout: 'layouts/blog-post.njk'
date: 2021-07-28
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/hgu6uTktp2ipmuODZZhP.jpg'
alt: >
  Chromium Chronicle image
tags:
  - chromium-chronicle
---

**Episode 23:** by Akash Mukherjee in Mountain View, CA (July, 2021)<br>
[Previous episodes](/tags/chromium-chronicle/)

When we build Chrome, many pieces contribute to the environment that influences the output of an artifact.
From the OS, installed supporting libraries, third-party dependencies,
installed tools, and runtime environment itself;
each of these is built with various security hygiene levels.

Historically, Google uses _binary authorization_,
an internal runtime enforcement check that minimizes insider risk
by ensuring that production software and configuration deployed at Google
is properly reviewed and has traceable provenance.

By ensuring that no single person can compromise the build
and the supply chain of artifacts built on LUCI without being detected,
Google reduces risk on software that we ship to users.

Starting last year, for each build, the system produces a _verifiable build
manifest_—a signed [JWT](https://datatracker.ietf.org/doc/html/rfc7519)
fully describing the sources that went into the build,
cryptographic hashes of produced binaries and artifacts, and full build parameters.
This build manifest enables us to trace an artifact back to the sources,
thus making the build process and its outputs verifiable.

In addition, the manifest also enables us to verify the built artifact wasn't modified
as any changes would invalidate the signature.
In total,
this provides us with a chain-of-custody for artifacts as they traverse between trusted systems.

Binary Authorization is implemented as a two-step system.
The system generates a [provenance](https://csrc.nist.gov/glossary/term/Provenance)
with build time information;
the enforcement of policy occurs before signing or installing software.

```python
def CreateProvenance(self, build_manifest: Mapping[str, Any]):
  """Builder generates and signs provenance given build manifest. Signed JWT is placed
  alongside built artifact."""
```

For Chrome, before signing the produced software artifacts using Google's signing infrastructure,
the policy is enforced to meet particular minimum security requirements of the build.

```python
def VerifyProvenance(self, artifact_hash: str, provenance: str):
  """Provenance is verified using a policy engine service before signing an artifact."""
```

Requirements are divided into roughly 4 areas:

- **Source control:** protects the data that went into the build.
- **Build:** protects the process that converts the source into binary.
- **Provenance:** attestation that contains verifiable build manifest.
- **Policy:** rules that determine if a given artifact qualifies in a given context.

Implementing a policy enforcement check as part of the CI and CD processes for Chrome and the infrastructure
has enabled us to verify that the code
and configuration meet certain minimum standards for security.
This is a critical control used to limit the ability
of a potentially malicious insider or compromised insider account
to modify the software that we distribute to users.
