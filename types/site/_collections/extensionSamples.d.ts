declare global {
  export interface SampleElement extends HTMLElement {
    data: extensionSample;
  }

  export interface extensionSample {
    type: 'API_SAMPLE' | 'FUNCTIONAL_SAMPLE';
    name: string;
    repo_link: string;
    apis: extensionApiItem[];
    title: string;
    description: string;
    permissions: string[];
  }

  export interface extensionApiItem {
    type: extensionApiTypeResult;
    namespace: string;
    propertyName: string;
  }

  export type extensionApiTypeResult =
    | 'event'
    | 'method'
    | 'property'
    | 'type'
    | 'unknown';
}

// empty export to keep file a module
export {};
