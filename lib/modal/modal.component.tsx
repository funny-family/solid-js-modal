import { Show, createSignal, onCleanup, onMount, splitProps } from 'solid-js';
import type {
  ModalComponent,
  ModalRootElement,
  ModalAttrsAndProps,
} from './modal.types';
import './modal.styles.css';

export const Modal: ModalComponent = (attrsAndProps) => {
  const { 0: props, 1: attrs } = splitProps(attrsAndProps, [
    'shouldCloseOnOverlayClick',
    'shouldChildrenRemainMounted',
    'onOpen',
  ]);

  const shouldChildrenRemainMounted = () =>
    props?.shouldChildrenRemainMounted == null
      ? true
      : props.shouldChildrenRemainMounted;
  const shouldCloseOnOverlayClick = () =>
    props?.shouldCloseOnOverlayClick == null
      ? true
      : props.shouldCloseOnOverlayClick;

  const {
    0: shouldChildrenRemainMountedState,
    1: setShouldChildrenRemainMountedState,
  } = createSignal(shouldChildrenRemainMounted());

  const attributeName_open = 'open';

  let ref = attrs?.ref as ModalRootElement;

  const observer = new MutationObserver((mutationRecords) => {
    const mutationRecord = mutationRecords[0];
    const attributeName = mutationRecord.attributeName;

    if (
      mutationRecord.type === 'attributes' &&
      attributeName === attributeName_open
    ) {
      const attributeValue = (mutationRecord.target as Element).getAttribute(
        attributeName
      );

      // hacky, hacky stuff (detect if modal open)
      if (attributeValue === '') {
        console.log('open');

        if (shouldChildrenRemainMounted() === false) {
          setShouldChildrenRemainMountedState(true);
        }

        if (props?.onOpen != null) {
          props.onOpen();
        }
      }
    }
  });

  const onClick: ModalAttrsAndProps['onClick'] = (event) => {
    if (shouldCloseOnOverlayClick()) {
      if (
        event.offsetX < 0 ||
        event.offsetX > (event.target as HTMLElement).offsetWidth ||
        event.offsetY < 0 ||
        event.offsetY > (event.target as HTMLElement).offsetHeight
      ) {
        ref.close();
      }
    }

    if (attrs?.onClick != null) {
      if (Array.isArray(attrs.onClick)) {
        const handler = attrs.onClick[0];
        const data = attrs.onClick[1];

        handler(data, event);
      }

      if (typeof attrs.onClick === 'function') {
        attrs.onClick(event);
      }
    }
  };

  const onClose: ModalAttrsAndProps['onClose'] = (event) => {
    console.log('close');

    if (shouldChildrenRemainMounted() === false) {
      setShouldChildrenRemainMountedState(false);
    }

    if (attrs?.onClose != null) {
      if (Array.isArray(attrs.onClose)) {
        const handler = attrs.onClose[0];
        const data = attrs.onClose[1];

        handler(data, event);
      }

      if (typeof attrs.onClose === 'function') {
        attrs.onClose(event);
      }
    }
  };

  onMount(() => {
    console.log(1231321, ref, { ref });

    observer.observe(ref as unknown as Node, {
      attributes: true,
      attributeFilter: [attributeName_open],
    });
  });

  onCleanup(() => {
    observer.disconnect();
  });

  return (
    <dialog
      {...attrs}
      ref={(el) => (ref = el)}
      class={`${attrs?.class || ''} solid-js-modal`}
      role={attrs?.role || 'dialog'}
      aria-modal={attrs?.['aria-modal'] || true}
      onClick={(event) => onClick(event)}
      onClose={(event) => onClose(event)}
      /* ------------------------- omitted attrs ------------------------- */
      open={null}
      textContent={null}
      innerHTML={null}
      innerText={null}
      /* ------------------------- omitted attrs ------------------------- */
    >
      <Show when={shouldChildrenRemainMountedState()}>{attrs?.children}</Show>
    </dialog>
  );
};
