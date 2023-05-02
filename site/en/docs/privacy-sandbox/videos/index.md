---
layout: 'layouts/doc-post.njk'
title: 'Privacy Sandbox videos'
subhead: >
  Privacy Sandbox videos and demos
description: >
  Privacy Sandbox videos and demos
date: 2023-05-14
authors:
  - samdutton
---

If you're looking for Privacy Sandbox resources, check out the videos below. Some are recorded Privacy Sandbox office hours. You can find upcoming office hours on the [events page](/docs/privacy-sandbox/events/).

## What is the Privacy Sandbox?

{% Columns %}
{% Column %}
<iframe width="280" height="158" src="https://www.youtube.com/embed/VVgtGkRtVPU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
{% endColumn %}
{% Column %}
<strong>May 12, 2022. Run time: 16:00</strong>

Rowan Merewood from the Chrome team talks about the Privacy Sandbox, the pros and cons of third party content, and how the Privacy Sandbox addresses these issues. Finally, he details how this model applies to cookies so you can prepare for upcoming changes.
{% endColumn %}
{% endColumns %}
<!--
{% Details %}
{% DetailsSummary %}
Transcript
{% endDetailsSummary %}

Hello, there. I'm Rowan from the Chrome team, and I'm 
going to tell you about privacy sandbox for the web.

Specifically, I want to talk about the pros and cons of third party content on the web today,then I want to show you the privacy
model behind the privacy sandbox proposals
that addresses these issues by partitioning identity
by first party, while still retaining
the functionality we need.

And then we can go into detail on how this model applies
to cookies so that you can see what you
may need to do on your site.

**Functionality**

So first, let's talk about the functionality
that we want to keep.
When you build on the web, you never
have to start with a blank canvas.
The clue is right there in the name.
The web, the internet.
It's all about connections between different sites.
Composable building blocks to create amazing things.
Now, this spans all the way from a basic link
or including an image from another site
up to pulling an entire JavaScript library
or embedding cross-site content with an iframe.

And because this is all built on a foundation of open standards,
it's resulted in incredibly rich and varied ecosystem that's
not owned by any one entity and is
open for anyone to participate.

When you have your own site, it's
entirely your choice what you do with it, whether that's just
sharing amazing cat pictures or running an entire cat care
business as your day job.

The thing is inviting a service onto your home page
is a lot like inviting someone into your own home.
You're giving them a level of access and visibility,
and that requires a level of trust.

For example, pulling in third party
JavaScript gives them access to the content on your page,
and that's expected, because generally, you actually want
that JavaScript to do something.
Now, there are a number of things you can already
do to secure your page.

I'm not covering them this session,
but you can check out our guides for more details,
and that's because what I want to cover
is how this access by third parties
can leak out beyond the confines of your own site.

Now, that third party service may be setting a cookie
as part of its functionality.
If it's a map widget, that cookie
might store something simple like a color theme
preference or perhaps a favorite store location.

And that's what we call a third party cookie.

Now, there's nothing inherently bad or scary about it.
It's functionality that I want as a user.
But if we throw another site into the mix that's
using the same widget, then now when I browse both these sites,
it's the same cookie being sent.

And that opens up some implementation issues
for the service.If the cookie is for a color scheme, that's probably OK.
I'll get the same look on each site,
but if it's for a favorite store though,
that might not make sense across different sites
or the third party may be explicitly setting
unique identifier.

That means they can directly link my activity
on site A and my activity on site B.
And this is what we mean by cross-site tracking.
Our aim with privacy sandbox is to remove this ability
from the web platform.

However, when I say, remove this ability from the web
and that we're going to phase out
support for third party cookies, I don't mean we just straight
block them.

You can already try this in your browser
today by blocking third party cookies and browsing around.
All that functionality like state and embedded widgets,
shared commenting, iframes embedding other protected
documents, either breaks or developers
are finding creative hacks and holes
to try and work around what the browser and the user
is trying to prevent.

So we have a problem, where the same web functionality that
delivers valuable third party experiences also
enables cross-site tracking.

So let's go with some motivations and principles
before we talk about exactly what happens on cookies.
This is the balance to try and strike.
As both a user and a developer, I
want third party services to be something

I can easily and safely include as part of my browsing
and coding.
Now, at the same time, I want to ensure that cross-site tracking is hard.

As a user, I don't want to worry that my activity on one site
will leak into another, and as a developer,
I want to reduce the risk of the data
between my different client sites might start conflicting.

Our aim with privacy sandbox is to try and tackle this
at the level of the platform, the level of web standards,
because that's where the challenge exists.
Each of the proposals I'm going to talk about
are proposals for new or updated standards,
with the intent that we can find solutions
that work across browsers.

Now, that's not something we can just decide on our own though.
We need feedback and input from developers like you
to work through the process of progressing from a proposal
to a standard that has support for broad adoption.

**Partitioned identities**

Now with the privacy sandbox, we're
proposing to move to a model of the web that
is partitioned by first party.
Let's see what that means and how that would work.

One, identity is partitioned by first party site.
Now, here, identity just means that my browsing activity
on the blue site is separate and distinct from my browsing
on the green site.

By partitioning these identities,
we're creating a privacy boundary around them.
We want to stop information that could allow
these identities being joined from leakingthrough that boundary.

Now, that spans explicit identifiers,like a value in a cookie, or passive propertieslike comparing a visitor's user agent string or IP address.The default location for the partition is at the site level,providing a roughly equivalent mapping of the first partyto what you see in the browser's location bar.

Gain number .Third parties can be allowed to access a partition first partyidentity.This is where we allow a third partyto work within our privacy boundary.So my embedded map widget from before cansave my favorite store, but that preferencestays within the partition.When I visit the second site, it's a clean slate.No crossover or conflict with my activity on the previous slide.

And finally three.Only small amounts of first party identitycan be shared across site.The key here is that the information shared acrossthe privacy boundary cannot be enough to join those twoidentities, and there's an important distinction here.A person might choose to explicitly join their identityacross sites.For example, shared commenting servicewhere a comment is the same user across multiple sites,but we don't want to get all forms of cross site interactionbehind a login.Several of the privacy sandbox proposalsprovide this link that lets you get value from a widerthird party service without enabling cross-site tracking.

**Topics API**

Now, I want to show you how that works by using the new topics API, and then we'll get back into cookies. There's a bit more topics than I'm covering, because I want to focus on the flow of information. If you want to learn more about it,we have the documentation up hereand the API is available for testing and feedback now.

...

The intent of the topics APIs to helpwith interest-based advertising use casesby providing topics of interest for the user based on the sitesthat they visit.But vitally, without sharing their activity in a waythat would allow for cross-site tracking.OK, let's say you want to provide mewith an ad tailored to my interests using the topics API.Each time I visit a site that uses your service,you would call the browsing topics method to observethe sites inferred topic.On one site, I might be looking at new plansand that site may have the Home and Garden topic,and that gets recorded in my browser as the topicyour service has seen.Now, later, I'm back looking at cats again,so on the site on that site, the pets and animals topicis registered.And then when I'm visiting a site whereyou want to show an appropriate ad for me, along with recordingthat your services seen the given topic for the site,the browsing topics method also returns a selectionof relevant topics for me, and your servicecan use that to help select the useful ad for me.We can see our third principle being applied here.Only small amounts of first party identitymay be shared across site, and remember,identity here means those aspectsof identifying information that couldallow the third party to join my browsing activity across sites.Instead of getting visibility into the exact pages I visited,the information is distilled downto just the topic associated with the site.Instead of a third party needing to take all that raw datato get the answer, we can providea purpose built API that still provides the end result.I can get my tailored cat content,but without that third party learningabout the specific cat-related sites that I visited.Topics is also available for testing now, alongwith several other privacy sandbox proposals.Now, if you provide third party servicesaround content personalization, advertising, fraud protection,identity, or similar, then you shouldbe taking a look for opportunities to test,and we would love to hear your feedback on this as well.OK, with that, let's get back into how we apply the privacymodel to cookies.CookiesWe already started this journey back in by making first party access the default for cookiesby changing the default for the same site attribute.Now, previously, if you set a cookielike this on your own site, you mayhave been surprised to discover that same cookie wouldbe sent in cross-site contexts.So in a way, every single cookie could be a third party cookieunless you said otherwise.So we change the default value to be equivalent to same siteequals lax, and what that means is that, by default, cookiesare restricted to first party contexts only.And if you really did want to provide a third party cookie,then you needed to explicitly opt in by adding the same siteequals none and secure attributes.Now, what this also means is that now, youhave an explicit list of your third party cookies,as in anywhere whether you're setting that same site equalsnone attribute.You will need to review these cookies to takeappropriate action before the full phase out.ChipsWe have two proposals that you can apply here, chipsand first party sets.We're going to start with chips to seehow it applies the partitioned approach from our privacymodel.So again, here's the current situation.Setting same site equals none on a cookiemeans that same cookie is sent in allthese different cross-site contexts,and that's iframes or sub resource requests.Now, if we label up our sites, then wesee that the reason for this is because wehave just one cookie jar for site C,and that's regardless of context.So what's the missing ingredient here?Well, instead of lumping everything together,we want cookies having independent partitioned state,which gives us the convenient and totally naturalacronym of CHIPS.Now, by setting the partition attribute on the cookie,you opt into a cookie jar that's partitioned by top level site.That means there's no more overlapping cookies from site Cwhen they're accessed on say A or site B.So if site C had a favorite store cookie,then I'm going to keep separate valuesfor that across those sites.Partitioned also requires that you set the path equal to slashand do not set the domain attribute.That means the cookie won't be sent to subdomains.This is generally a good practice anyway,as it's another reduction in scope for the cookieand less for you to worry about.You can also use the host prefix on your cookie namehere, which is a convenient conventionto enforce those rules.So if your use case for a third party cookiefits into this one to one embedded model,such as providing separate widgets or APIs per client,then CHIPS and this partitioned cookierepresents a clear improvement for youin terms of reducing complexity and reducing the riskof cross-site data leaks.You can also try this right now.For your own testing, we have the partitioned cookies flagthat you can enable to try the attribute,and if you're watching this during I/O,then we are currently running an origin trial from Chrome through to the end of Chrome  or up until about the beginningof August.Now, origin trials mean you can try chips on your own sitewith production traffic.This is absolutely critical for us,because origin trials are a key route for usto get real world developer feedback on proposalsto ensure that we're building something thatis going to meet your needs.Again, full instructions up on this blogpost, and we're around on Twitter and GitHubto hear your feedback.First Party SetsOK, the other proposal is first party sets and the same partyattribute, which allows you to define a larger privacyboundary than just one site.If we go back into our earlier set upand our model where we said identity is partitionedby first party site, site is just a convenient default.There are several situations, where the same partycan own multiple sites and wants to treat them differentlyfrom sites that are owned by someone else.For example, you may have different country levelversions of your service or you mayhave separate sites to provide separate functions providedunder the same banner.The challenge is that currently if Iwant to share a cookie among my own sites,I need to set same site equals none.And if I do that, then the cookiewill be sent on any cross-site requests, whichgives me additional security risks that Ineed to try and address.Now, I don't want to use chips in this situation,because while it would protect my cookie from being sharedwith the malicious site, it also puts all my sitesinto a separate container.If I'm trying to do something like single sign on or a sharedshopping cart, this doesn't work.First party sets provides a methodwhere we can define that set of sitesthat we own as in the sites that are first party to each other,and then we can mark our cookie to onlybe shared among those sites.This involves two bits of configuration.First, we define the first party set,which has one owner site and the list of member sites.Then we can update our cookie with the same party attributeto enforce only sending the cookiewithin our defined same party context of that set.You can see I'm also using same site lax here.Now, normally, this would restrict the cookieto just a single site context.But again, because we've used the first party setto expand our privacy boundary, I can still set the lax valueand only have that cookie sent inside of my set.First party sets are also available for developer testingbehind a flag.We have previously run an origin trial on this,and we're continuing to update based on the feedbackthat we've been receiving, figuring outthings like what makes the right policy for a valid set.So if you think this may apply to your situation,got all the details up on the developer sitefor you to get testing.RecapWith that, I hope you've got a better understandingof the model behind the privacy sandbox proposals,and I want to leave you with a little recap on what youneed to do to prepare for the third party cookie phaseout.First, make sure you review and have a listof your own cross-site cookies.This is anywhere that you are currentlysetting the same site equals none attribute.These are the cookies where you may needto take some kind of action.Next, if your use case for that cookieis in some kind of one to one or wholly embedded situationlike a self-contained component in another site,then look into CHIPS.You can add the partitioned attribute,and with the current origin trial,you can test on actual production site .If your cookie is used across multiple sitesbut only across sites that you own,then you should investigate first party sets.There are flags available for testing,and you can also use that to checkhow this would behave on a set of sites that you can define.Now, if neither of these proposals meet your needs,then you will need to investigate the widerset of privacy sandbox proposals for APIs such as topics, wherewe are replacing the need for a cross-site cookiewith a purpose built API for the use case.So with that, thank you for dropping by.I hope you've got that better understanding of the modeland applying it to your cookies.You can find all this material and more up on our developersite, and the team and I are alwayshappy to hear your questions over on Twitter on GitHub,so I'll see you there.[MUSIC PLAYING]
-->

{% endDetails %}

{% Columns %}
{% Column %}
<iframe width="280" height="158" src="https://www.youtube.com/embed/7AQFDm7STmw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

{% endColumn %}
{% Column %}
Description, date, link to docs... sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
{% endColumn %}
{% endColumns %}

<!-- https://www.youtube.com/watch?v=5t83ebP71Yw&list=RDCMUCnUYZLuoy1rq1aVMwx4aTzw&index=26 -->

{% Columns %}
{% Column %}
<iframe width="280" height="158" src="https://www.youtube.com/embed/Gv2H3cUz_DM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

{% endColumn %}
{% Column %}
Description, date, link to docs... sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
{% endColumn %}
{% endColumns %}

## Attribution reporting

{% Columns %}
{% Column %}
<iframe width="280" height="158" src="https://www.youtube.com/embed/UGA74CIcom8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
{% endColumn %}
{% Column %}
Description, date, link to docs... sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
{% endColumn %}
{% endColumns %}

{% Columns %}
{% Column %}
<iframe src="https://drive.google.com/file/d/18RGEx_mrhDJuMsLUK1BZ0cK5FSZRAAqh/preview" width="280" height="210" allow="autoplay"></iframe>

<!-- [Open full-size video](https://drive.google.com/file/d/18RGEx_mrhDJuMsLUK1BZ0cK5FSZRAAqh/preview) -->

{% endColumn %}
{% Column %}
Description, date, link to docs... sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
{% endColumn %}
{% endColumns %}

{% Columns %}
{% Column %}
<iframe src="https://drive.google.com/file/d/1EVCw6MTz3JIdkno2lICN6q7gNrmZBYGf/preview" width="280" height="210" allow="autoplay"></iframe>

<!-- [Open full-size video](https://drive.google.com/file/d/1EVCw6MTz3JIdkno2lICN6q7gNrmZBYGf/preview) -->

{% endColumn %}
{% Column %}
Description, date, link to docs... sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
{% endColumn %}
{% endColumns %}

{% Columns %}
{% Column %}
<iframe src="https://drive.google.com/file/d/1hmHoM3xyU4eLTJ1dM7_E8x-u6nZgim1O/preview" width="280" height="210" allow="autoplay"></iframe>

<!-- [Open full-size video](https://drive.google.com/file/d/1hmHoM3xyU4eLTJ1dM7_E8x-u6nZgim1O/preview) -->

{% endColumn %}
{% Column %}
Description, date, link to docs... sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
{% endColumn %}
{% endColumns %}

## Topics API

{% Columns %}
{% Column %}
    
<iframe src="https://drive.google.com/file/d/1831_uKSlTwnSzYNjpp9pkDEniDA_Q9lF/preview?t=1m03s"  width="280" height="210" allow="autoplay"></iframe> 

<!-- [Open full-size video](https://drive.google.com/file/d/1831_uKSlTwnSzYNjpp9pkDEniDA_Q9lF/) -->

{% endColumn %}
{% Column %}
September 6, 2022 A lot of words describing this video.Description, date, link to docs... sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
{% endColumn %}
{% endColumns %}

{% Columns %}
{% Column %}
<iframe src="https://drive.google.com/file/d/1dmpMKLJcGNe56M6ECRdRYhuITTv9YUDV/preview"  width="280" height="210" allow="autoplay"></iframe>

<!-- [Open full-size video](https://drive.google.com/file/d/1dmpMKLJcGNe56M6ECRdRYhuITTv9YUDV/preview) -->

{% endColumn %}
{% Column %}
Description, date, link to docs... sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
{% endColumn %}
{% endColumns %}

{% Columns %}
{% Column %}
<iframe width="280" height="158" src="https://www.youtube.com/embed/hEBzWuXjeTQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

{% endColumn %}
{% Column %}
Description, date, link to docs... sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
{% endColumn %}
{% endColumns %}

## First-party sets

{% Columns %}
{% Column %}
<iframe width="280" height="158"  src="https://www.youtube.com/embed/cNJ8mZ-J3F8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
{% endColumn %}
{% Column %}
Description, date, link to docs... sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
{% endColumn %}
{% endColumns %}

{% Columns %}
{% Column %}
<iframe src="https://drive.google.com/file/d/1riGrGwP5cyz3q4IcDjV5kulOK48OJV2S/preview"  width="280" height="210" allow="autoplay"></iframe> 

<!-- [Open full-size video](https://drive.google.com/file/d/1riGrGwP5cyz3q4IcDjV5kulOK48OJV2S/preview) -->
{% endColumn %}

{% Column %}
Recorded December 15, 2022 in Privacy Sandbox office hours.Description, date, link to docs... sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
{% endColumn %}
{% endColumns %}

## FLEDGE (Protected Audience API)

{% Columns %}
{% Column %}
<iframe width="280" height="158" src="https://www.youtube.com/embed/HkvmYKqnytw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

{% endColumn %}
{% Column %}
Description, date, link to docs... sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
{% endColumn %}
{% endColumns %}

{% Columns %}
{% Column %}
<iframe width="280" height="158" src="https://www.youtube.com/embed/znDD0gkdJyM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

{% endColumn %}
{% Column %}
Description, date, link to docs... sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
{% endColumn %}
{% endColumns %}

## Trust tokens

<!-- https://drive.google.com/file/d/18RGEx_mrhDJuMsLUK1BZ0cK5FSZRAAqh/view -->

{% Columns %}
{% Column %}
<iframe width="280" height="158" src="https://www.youtube.com/embed/bXB1Iwq6Eq4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
{% endColumn %}
{% Column %}
Description, date, link to docs... sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
{% endColumn %}
{% endColumns %}

## Origin trials

{% Columns %}
{% Column %}
<iframe width="280" height="158" src="https://www.youtube.com/embed/v_gI8wcsPUA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
{% endColumn %}
{% Column %}
Description, date, link to docs... sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
{% endColumn %}
{% endColumns %}
