---
title: 'Lorem ipsum'
layout: 'layouts/namespace-reference.njk'
override:namespace:
  shortName: workbox-background-sync
  name: workbox-background-sync
  root:
    id: 1
    name: workbox-background-sync
    kind: 2
    kindString: Module
    flags:
      isExternal: true
  groups:
    - title: Types
      prefix: type
      contents:
        - id: 21
          name: BackgroundSyncPlugin
          kind: 128
          kindString: Class
          flags:
            isExternal: true
          comment:
            shortText: >-
              A class implementing the `fetchDidFail` lifecycle callback. This
              makes it easier to add failed requests to a background sync Queue.
          groups:
            - title: Constructors
              kind: 512
              children:
                - 22
            - title: Properties
              kind: 1024
              children:
                - 26
                - 27
          _type:
            properties:
              - id: 22
                name: constructor
                kind: 512
                kindString: Constructor
                flags:
                  isExternal: true
                comment: {}
                signatures: []
                _method:
                  parameters:
                    - id: 24
                      name: name
                      kind: 32768
                      kindString: Parameter
                      flags:
                        isExternal: true
                      comment:
                        shortText: |-
                          See the {@link workbox-background-sync.Queue}
                           documentation for parameter details.
                      type:
                        type: intrinsic
                        name: string
                      _comment: |-
                        See the [`workbox-background-sync.Queue`](#type-Queue)
                         documentation for parameter details.
                    - id: 25
                      name: options
                      kind: 32768
                      kindString: Parameter
                      flags:
                        isExternal: true
                        isOptional: true
                      type:
                        type: reference
                        id: 70
                        name: QueueOptions
                        _href: '#type-QueueOptions'
                  return:
                    id: -1
                    name: return
                    kind: 32768
                    flags: {}
                    type:
                      type: reference
                      id: 21
                      name: BackgroundSyncPlugin
                      _href: '#type-BackgroundSyncPlugin'
                    comment: {}
          _comment: >-
            A class implementing the `fetchDidFail` lifecycle callback. This makes
            it easier to add failed requests to a background sync Queue.
        - id: 70
          name: QueueOptions
          kind: 256
          kindString: Interface
          flags:
            isExternal: true
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
                name: forceSyncFallback
                kind: 1024
                kindString: Property
                flags:
                  isExternal: true
                  isOptional: true
                type:
                  type: intrinsic
                  name: boolean
              - id: 72
                name: maxRetentionTime
                kind: 1024
                kindString: Property
                flags:
                  isExternal: true
                  isOptional: true
                type:
                  type: intrinsic
                  name: number
              - id: 73
                name: onSync
                kind: 1024
                kindString: Property
                flags:
                  isExternal: true
                  isOptional: true
                type:
                  type: reference
                  name: OnSyncCallback
---
