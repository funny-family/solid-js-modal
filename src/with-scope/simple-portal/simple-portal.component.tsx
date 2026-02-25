import {
  type JSX,
  sharedConfig,
  getOwner,
  onCleanup,
  createMemo,
  runWithOwner,
  createEffect,
} from 'solid-js';
import { insert } from 'solid-js/web';
import type { SimplePortalComponent } from './simple-portal.component.types';
import { Object_defineProperty } from '../../utils';

export var SimplePortal: SimplePortalComponent = (props) => {
  var marker = document.createTextNode('');
  var el = document.body;
  var owner = getOwner();
  var content: undefined | (() => JSX.Element);
  var hydrating = !!sharedConfig.context;

  createEffect(
    () => {
      // basically we backdoor into a sort of renderEffect here
      hydrating && ((getOwner() as any).user = hydrating = false);
      content || (content = runWithOwner(owner, () => createMemo(() => props.children)));

      const container = document.createElement('div');

      Object_defineProperty(container, '_$host', {
        get() {
          return marker.parentNode;
        },
        configurable: true,
      });

      insert(container, content);
      el.appendChild(container);
      props.ref && (props as any).ref(container);

      onCleanup(() => el.removeChild(container));
    },
    undefined,
    { render: !hydrating },
  );

  return marker;
};
