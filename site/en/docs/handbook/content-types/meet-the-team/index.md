---
layout: layouts/events.njk
title: Sample meet the team page
description: This page presents a list of upcoming events and a list of past events.
hero: image/fuiz5I8Iv7bV8YbrK2PKiY3Vask2/oon9wpGOh5kvEJNGJhkp.png
alt: Sample meet the team page
currentEvents:
  - id: sample-event-1
    title: Sample event 1
    externalUrl: /
    summary: >-
      This is an event-card. Such cards are automatically added to the page for
      each event in the currentEvents and pastEvents collections.
    location: Munich, Germany
    date: '2044-12-12T00:00:00.000Z'
    isPastEvent: false
    image: image/fuiz5I8Iv7bV8YbrK2PKiY3Vask2/nmNwNgvOmvjk5fOm4MOM.jpg
    sessions:
      - speaker:
          image: image/kheDArv5csY6rvQUJDbWRscckLr1/DbljY0AD921j6PKWl6JC.jpeg
          title: i18n.authors.rachelandrew.title
          handle: rachelandrew
        title: Sample talk
        description: >-
          This is a sample session. You can add multiple talks to each session. If a
          talk has a long description then it is truncated.
        topics:
          - CSS
          - Web UI
        type: speaker
        slidesUrl: /en/content-types/meet-the-team/
        videoUrl: /en/content-types/meet-the-team/
        image: image/kheDArv5csY6rvQUJDbWRscckLr1/DbljY0AD921j6PKWl6JC.jpeg
      - speaker:
          image: image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Ie3JSl9zE6f51LclZGFS.jpg
          title: i18n.authors.alcastano.title
          handle: alcastano
        title: Sample speaker session
        description: >-
          There are two types of session: speaker and participant. This is a speaker
          session.
        topics:
          - Web UI
        type: speaker
        slidesUrl:
        videoUrl: /en/content-types/meet-the-team/
        image: image/kheDArv5csY6rvQUJDbWRscckLr1/DbljY0AD921j6PKWl6JC.jpeg
      - participants:
          - image: image/kheDArv5csY6rvQUJDbWRscckLr1/DbljY0AD921j6PKWl6JC.jpeg
            title: i18n.authors.rachelandrew.title
            handle: rachelandrew
          - image: image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Ie3JSl9zE6f51LclZGFS.jpg
            title: i18n.authors.alcastano.title
            handle: alcastano
        description: And this is a participant session.
        topics:
          - CSS
        type: participant
        slidesUrl: /en/content-types/meet-the-team/
        videoUrl:
  - id: sample-event-2
    title: Sample event 2
    externalUrl: /
    summary: Sample event 2
    location: Antwerp, Belgium
    date: '2045-12-12T00:00:00.000Z'
    isPastEvent: false
    image: image/fuiz5I8Iv7bV8YbrK2PKiY3Vask2/xaRHmkuKLfCcGdRaEiDr.png
    sessions:
      - participants:
          - image: image/kheDArv5csY6rvQUJDbWRscckLr1/DbljY0AD921j6PKWl6JC.jpeg
            title: i18n.authors.rachelandrew.title
            handle: rachelandrew
          - image: image/i9nJGvw3SnTPH63zKOYWtI6cP5m2/rS10rvGrNat9Euvxw8ju.jpg
            title: i18n.authors.surma.title
            handle: surma
          - image: image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Ie3JSl9zE6f51LclZGFS.jpg
            title: i18n.authors.alcastano.title
            handle: alcastano
        description: Participant sessions with multiple participants surface like this.
        topics:
          - CSS
        type: participant
        slidesUrl:
        videoUrl:
      - participants:
          - image: image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Ie3JSl9zE6f51LclZGFS.jpg
            title: i18n.authors.alcastano.title
            handle: alcastano
        description: Participant sessions with one participant surface like this.
        topics:
          - CSS
        type: participant
        slidesUrl:
        videoUrl:
  - id: sample-event-3
    title: Sample event 3
    externalUrl: /
    summary: >-
      A longer summary used to ensure multiline strings are handled correctly. Lorem ipsum
      dolor sit amet, consectetur adipiscing elit. Aliquam sit amet lobortis urna, ut
      lacinia sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    location: Munich, Germany
    date: '2044-12-12T00:00:00.000Z'
    isPastEvent: false
    image: image/fuiz5I8Iv7bV8YbrK2PKiY3Vask2/nmNwNgvOmvjk5fOm4MOM.jpg
    sessions:
      - speaker:
          image: image/kheDArv5csY6rvQUJDbWRscckLr1/DbljY0AD921j6PKWl6JC.jpeg
          title: i18n.authors.rachelandrew.title
          handle: rachelandrew
        title: Lorem ipsum
        description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet lobortis urna, ut lacinia sem.
        topics: []
        type: speaker
        image: image/kheDArv5csY6rvQUJDbWRscckLr1/DbljY0AD921j6PKWl6JC.jpeg
  - id: sample-event-4
    title: >-
      Sample event 4 - A longer title used to ensure multiline strings are handled correctly. Lorem ipsum
      dolor sit amet, consectetur adipiscing elit.
    externalUrl: /
    summary: Sample event 4
    location: Munich, Germany
    date: '2044-12-12T00:00:00.000Z'
    isPastEvent: false
    image: image/fuiz5I8Iv7bV8YbrK2PKiY3Vask2/nmNwNgvOmvjk5fOm4MOM.jpg
    sessions:
      - speaker:
          image: image/kheDArv5csY6rvQUJDbWRscckLr1/DbljY0AD921j6PKWl6JC.jpeg
          title: i18n.authors.rachelandrew.title
          handle: rachelandrew
        title: Lorem ipsum
        description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet lobortis urna, ut lacinia sem.
        topics: []
        type: speaker
        image: image/kheDArv5csY6rvQUJDbWRscckLr1/DbljY0AD921j6PKWl6JC.jpeg
  - id: sample-event-5
    title: Sample event 5
    externalUrl: /
    summary: Sample event 5
    location: London, UK
    date: '2044-12-12T00:00:00.000Z'
    isPastEvent: false
    image: image/fuiz5I8Iv7bV8YbrK2PKiY3Vask2/xaRHmkuKLfCcGdRaEiDr.png
    sessions:
      - speaker:
          image: image/kheDArv5csY6rvQUJDbWRscckLr1/DbljY0AD921j6PKWl6JC.jpeg
          title: i18n.authors.rachelandrew.title
          handle: rachelandrew
        title: Lorem ipsum
        description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet lobortis urna, ut lacinia sem.
        topics:
          - CSS
          - Web UI
          - Interop
          - Chrome Extentions
          - Chrome DevTools
          - Debugging
          - Web Developer Tools
        type: speaker
        image: image/kheDArv5csY6rvQUJDbWRscckLr1/DbljY0AD921j6PKWl6JC.jpeg
  - id: sample-event-6
    title: Sample event 6
    externalUrl: /
    summary: Sample event 6
    location: Munich, Germany
    date: '2044-12-12T00:00:00.000Z'
    isPastEvent: false
    image: image/fuiz5I8Iv7bV8YbrK2PKiY3Vask2/nmNwNgvOmvjk5fOm4MOM.jpg
    sessions:
      - speaker:
          image: image/kheDArv5csY6rvQUJDbWRscckLr1/DbljY0AD921j6PKWl6JC.jpeg
          title: i18n.authors.rachelandrew.title
          handle: rachelandrew
        title: Lorem ipsum
        description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet lobortis urna, ut lacinia sem.
        topics: []
        type: speaker
        image: image/kheDArv5csY6rvQUJDbWRscckLr1/DbljY0AD921j6PKWl6JC.jpeg
pastEvents: []
---
