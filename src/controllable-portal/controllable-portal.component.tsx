import {
  createEffect,
  createMemo,
  createRoot,
  createSignal,
  getOwner,
  onCleanup,
  runWithOwner,
  sharedConfig,
  type JSX,
} from 'solid-js';
import { insert } from 'solid-js/web';
import { createElement } from './utils';

export var ControllablePortal = <T extends boolean = false, S extends boolean = false>(props: {
  mount?: HTMLElement;
  unmount?: boolean;
  useShadow?: T;
  isSVG?: S;
  ref?:
    | (S extends true ? SVGGElement : HTMLDivElement)
    | ((
        el: (T extends true ? { readonly shadowRoot: ShadowRoot } : {}) &
          (S extends true ? SVGGElement : HTMLDivElement),
      ) => void);
  children: JSX.Element;
}) => {
  var useShadow = props.useShadow;
  var marker = document.createTextNode('');
  var mount = () => props.mount || document.body;
  var unmount = () => (props.unmount == null ? true : props.unmount);
  var owner = getOwner();
  var content: undefined | (() => JSX.Element);
  var hydrating = !!sharedConfig.context;

  createEffect(
    () => {
      // basically we backdoor into a sort of renderEffect here
      hydrating && ((getOwner() as any).user = hydrating = false);

      content || (content = runWithOwner(owner, () => createMemo(() => props.children)));

      var el = mount();

      var container = createElement(props.isSVG ? 'g' : 'div', props.isSVG);
      var renderRoot =
        useShadow && container.attachShadow ? container.attachShadow({ mode: 'open' }) : container;
      var isUnmounted = unmount();
      var contentElement = (content as any)()() as HTMLElement;
      const foundContent = el.querySelector<HTMLElement>(`#${contentElement.id}`);

      console.log(owner);

      createRoot((dispose) => {
        if (foundContent == null) {
          Object.defineProperty(container, '_$host', {
            get() {
              return marker.parentNode;
            },
            configurable: true,
          });

          insert(renderRoot, content);

          el.appendChild(container);

          props.ref && (props as any).ref(container);

          onCleanup(() => {
            isUnmounted && el.removeChild(container);
          });
        }
      }, owner);
    },
    undefined,
    { render: !hydrating },
  );

  return marker;
};
