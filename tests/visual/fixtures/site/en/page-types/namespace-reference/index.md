---
title: 'Lorem ipsum'
layout: 'layouts/namespace-reference.njk'
override:namespace:
  shortName: lorem-ipsum-dolor
  name: lorem-ipsum-dolor
  root:
    id: 1
    name: lorem-ipsum-dolor
    kind: 2
    kindString: Module
  groups:
    - title: Types
      prefix: type
      contents:
        - id: 21
          name: LoremIpsumPlugin
          _pageId: 'type-LoremIpsumPlugin'
          kind: 128
          kindString: Class
          comment:
            shortText: >-
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
              sed do eiusmod tempor incididunt.
          groups:
            - title: Constructors
              kind: 512
              children:
                - 22
          _type:
            properties:
              - id: 22
                name: constructor
                kind: 512
                kindString: Constructor
                _method:
                  parameters:
                    - id: 24
                      name: name
                      kind: 32768
                      kindString: Parameter
                      comment:
                        shortText: |-
                          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                          non proident, sunt in culpa qui officia deserunt mollit anim id
                          est laborum.
                      type:
                        type: intrinsic
                        name: string
                      _comment: |-
                        Lorem ipsum dolor sit amet [`DolorSitAmet`](#type-DolorSitAmet)
                         consectetur adipiscing elit
                    - id: 25
                      name: options
                      kind: 32768
                      kindString: Parameter
                      flags:
                        isOptional: true
                      type:
                        type: reference
                        id: 70
                        name: DolorSitAmet
                        _href: '#type-DolorSitAmet'
                  return:
                    id: -1
                    name: return
                    kind: 32768
                    type:
                      type: reference
                      id: 21
                      name: LoremIpsumPlugin
                      _href: '#type-LoremIpsumPlugin'
                    comment: {}
          _comment: >-
            Posuere `sollicitudin` aliquam ultrices sagittis orci
        - id: 70
          name: DolorSitAmet
          _pageId: 'type-DolorSitAmet'
          kind: 256
          kindString: Interface
          groups:
            - title: Properties
              kind: 1024
              children:
                - 71
                - 72
                - 73
          _type:
            properties:
              - id: 71
                name: Lorem
                kind: 1024
                kindString: Property
                flags:
                  isOptional: true
                type:
                  type: intrinsic
                  name: boolean
              - id: 72
                name: Ipsum
                kind: 1024
                kindString: Property
                flags:
                  isOptional: true
                type:
                  type: intrinsic
                  name: number
              - id: 73
                name: Dolor
                kind: 1024
                kindString: Property
                flags:
                  isOptional: false
                type:
                  type: reference
                  name: MagnaAliqua
---

# Intro

Lorem ipsum dolor sit amet, `consectetur adipiscing elit`, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
