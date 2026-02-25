import './modal.styles.css';
import {
  createSignal,
  JSX,
  onCleanup,
  onMount,
  splitProps,
  children as toChildren,
} from 'solid-js';
import type { ModalComponent, ModalRef } from './modal.component.types';
import { isArray } from './utils';

export var ModalExposeSymbol = Symbol('expose');

export const Modal: ModalComponent = attrsAndProps => {
  var splittedProps = splitProps(
    attrsAndProps,
    ['classList', 'ref', '$ServerOnly', 'children'],
    ['shouldCloseOnBackdropClick', 'onOpen'],
  );
  var customAttr = splittedProps[0];
  var props = splittedProps[1];
  var attrs = splittedProps[2];

  var customAttr_children = customAttr.children;

  const open_signal = createSignal(false);
  var open = open_signal[0];
  var setOpen = open_signal[1];

  var shouldCloseOnBackdropClick = () => !!props.shouldCloseOnBackdropClick;

  var innerRef: ModalRef | null = null;

  var openEventName = 'open' as any;
  var openEvent = new CustomEvent(openEventName);

  var onOpen: JSX.EventHandler<HTMLDialogElement, MouseEvent> = event => {
    const prop_onOpen = props.onOpen;
    const prop_onOpenExists = prop_onOpen != null;

    // prettier-ignore
    (
      prop_onOpenExists
      &&
      typeof prop_onOpen === 'function'
    ) && (
      prop_onOpen(event)
    );

    // prettier-ignore
    (
      prop_onOpenExists
      &&
      isArray(prop_onOpen)
    ) && (
      // handler(data, event);
      prop_onOpen[0](prop_onOpen[1], event)
    );

    setOpen(true);
  };

  var onClick: JSX.CustomEventHandlersCamelCase<HTMLDialogElement>['onClick'] = event => {
    var attr_onClick = attrs.onClick;
    const target = event.target as HTMLElement;

    // prettier-ignore
    const isInBackdropArea = (
      event.offsetX < 0
      ||
      event.offsetX > target.offsetWidth
      ||
      event.offsetY < 0
      ||
      event.offsetY > target.offsetHeight
    );

    // prettier-ignore
    (
      isInBackdropArea
      &&
      shouldCloseOnBackdropClick()
    ) && (
      innerRef!.close(),
      event.stopImmediatePropagation(),
      event.stopPropagation()
    );

    const attr_onClickExists = attr_onClick != null;

    // prettier-ignore
    (
      attr_onClickExists
      &&
      typeof attr_onClick === 'function'
    ) && (
      attr_onClick(event)
    );

    // prettier-ignore
    (
      attr_onClickExists
      &&
      isArray(attr_onClick)
    ) && (
        // handler(data, event);
      attr_onClick[0](attr_onClick[1], event)
    );
  };

  var onClose: JSX.CustomEventHandlersCamelCase<HTMLDialogElement>['onClose'] = event => {
    const attr_OnClose = attrs.onClose;
    const attr_OnCloseExists = attr_OnClose != null;

    // prettier-ignore
    (
      attr_OnCloseExists
      &&
      typeof attr_OnClose === 'function'
    ) && (
      attr_OnClose(event)
    );

    // prettier-ignore
    (
      attr_OnCloseExists
      &&
      isArray(attr_OnClose)
    ) && (
      // handler(data, event);
      attr_OnClose[0](attr_OnClose[1], event)
    );

    setOpen(false);
  };

  var ref = (element: HTMLDialogElement) => {
    innerRef = element;

    let customAttr_ref = customAttr.ref;
    typeof customAttr_ref === 'function' ? customAttr_ref(element) : (customAttr_ref = element);

    const showModal = element.showModal;
    element.showModal = function () {
      showModal.call(this);

      this.dispatchEvent(openEvent);
    };
  };

  // var children = toChildren(() => {
  //   // prettier-ignore
  //   return (
  //     typeof customAttr_children === 'function'
  //     ?
  //     customAttr_children({ open })
  //     :
  //     customAttr_children
  //   );
  // });

  onMount(() => {
    if (props.onOpen) {
      innerRef!.addEventListener(openEventName, onOpen);
    }
  });

  onCleanup(() => {
    innerRef!.removeEventListener(openEventName, onOpen);
  });

  return (
    <dialog
      {...attrs}
      classList={customAttr.classList}
      $ServerOnly={customAttr.$ServerOnly}
      ref={ref}
      class={`${attrs.class || ''} solid-js-modal`}
      role={attrs.role || 'dialog'}
      aria-modal={attrs['aria-modal'] || true}
      onClick={onClick}
      onClose={onClose}
      children={customAttr_children}
      /* ------------------------- omitted attrs ------------------------- */
      open={null as any}
      /* ------------------------- omitted attrs ------------------------- */
    />
  );
};
