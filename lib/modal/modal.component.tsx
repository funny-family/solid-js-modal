import { onCleanup, onMount, splitProps } from 'solid-js';
import type {
  ModalComponent,
  ModalRootElement,
  ModalAttrsAndProps,
} from './modal.types';
import './modal.styles.css';

export const Modal: ModalComponent = (attrsAndProps) => {
  const { 0: props, 1: attrs } = splitProps(attrsAndProps, [
    'shouldCloseOnBackgroundClick',
    'onOpen',
  ]);

  const isArray = Array.isArray;

  const shouldCloseOnBackgroundClick = () =>
    props?.shouldCloseOnBackgroundClick == null
      ? true
      : props.shouldCloseOnBackgroundClick;

  let ref = attrs?.ref as ModalRootElement;

  const openEvent = new CustomEvent('open');

  const onOpen: EventListenerOrEventListenerObject = function (
    this: Element,
    event
  ) {
    if (props?.onOpen != null) {
      if (typeof props.onOpen === 'function') {
        props.onOpen(
          event as Event & {
            currentTarget: ModalRootElement;
            target: Element;
          }
        );
      }

      if (isArray(props.onOpen)) {
        // handler(data, event);
        props.onOpen[0](props.onOpen[1], event);
      }
    }
  };

  const onClick: ModalAttrsAndProps['onClick'] = (event) => {
    if (
      event.offsetX < 0 ||
      event.offsetX > (event.target as HTMLElement).offsetWidth ||
      event.offsetY < 0 ||
      event.offsetY > (event.target as HTMLElement).offsetHeight
    ) {
      if (shouldCloseOnBackgroundClick()) {
        ref.close();
        event.preventDefault();
        event.stopImmediatePropagation();
        event.stopPropagation();
      }
    }

    if (attrs?.onClick != null) {
      if (typeof attrs.onClick === 'function') {
        attrs.onClick(event);
      }

      if (isArray(attrs.onClick)) {
        // handler(data, event);
        attrs.onClick[0](attrs.onClick[1], event);
      }
    }
  };

  onMount(() => {
    const showModal = ref.showModal;
    ref.showModal = function () {
      showModal.call(this);

      this.dispatchEvent(openEvent);
    };
    ref.addEventListener('open', onOpen);
  });

  onCleanup(() => {
    ref.removeEventListener('open', onOpen);
  });

  return (
    <dialog
      {...attrs}
      ref={(el) => (ref = el)}
      class={`${attrs?.class || ''} solid-js-modal`}
      role={attrs?.role || 'dialog'}
      aria-modal={attrs?.['aria-modal'] || true}
      onClick={(event) => onClick(event)}
      /* ------------------------- omitted attrs ------------------------- */
      open={null}
      /* ------------------------- omitted attrs ------------------------- */
    />
  );
};
