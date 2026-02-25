import type { Component, JSX } from 'solid-js';

export type WithGlobalScopeProps = {
  children?: JSX.Element;
};

export type WithGlobalScopeComponent = Component<WithGlobalScopeProps>;
