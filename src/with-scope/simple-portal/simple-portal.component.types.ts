import type { Component, JSX } from 'solid-js';

export type SimplePortalProps = {
  ref?: JSX.IntrinsicAttributes['ref'];
  children: JSX.Element;
};

export type SimplePortalComponent = Component<SimplePortalProps>;
