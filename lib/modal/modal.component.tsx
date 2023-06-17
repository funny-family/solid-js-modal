import { onCleanup, onMount, splitProps } from 'solid-js';
import type {
  ModalComponent,
  ModalRootElement,
  ModalAttrsAndProps,
} from './modal.types';
import './modal.styles.css';

export const Modal: ModalComponent = (attrsAndProps) => {
  const [props, restAttrs] = splitProps(attrsAndProps, [
    'shouldCloseOnOverlayClick',
    'onOpen',
  ]);

  const attributeName_open = 'open';

  let ref = restAttrs?.ref as ModalRootElement;

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

      // hacky, hacky stuff
      if (attributeValue === '') {
        if (props?.onOpen != null) {
          props.onOpen();
        }
      }
    }
  });

  const onClick: ModalAttrsAndProps['onClick'] = (event) => {
    if (
      event.offsetX < 0 ||
      event.offsetX > (event.target as HTMLElement).offsetWidth ||
      event.offsetY < 0 ||
      event.offsetY > (event.target as HTMLElement).offsetHeight
    ) {
      ref.close();
    }

    if (restAttrs?.onClick != null) {
      if (Array.isArray(restAttrs.onClick)) {
        const handler = restAttrs.onClick[0];
        const data = restAttrs.onClick[1];

        handler(data, event);
      }

      if (typeof restAttrs?.onClick === 'function') {
        restAttrs.onClick(event);
      }
    }
  };

  onMount(() => {
    console.log(1231321, ref, { ref });

    observer.observe(ref, {
      attributes: true,
      attributeFilter: [attributeName_open],
    });
  });

  onCleanup(() => {
    observer.disconnect();
  });

  const shouldCloseOnOverlayClick = () =>
    props?.shouldCloseOnOverlayClick || false;

  return (
    <dialog
      {...restAttrs}
      /* ----------------- omitted attrs ----------------- */
      // @ts-ignore
      open={null}
      /* ----------------- omitted attrs ----------------- */
      ref={(el) => (ref = el)}
      class={`${restAttrs?.class || ''} solid-js-modal`}
      role={restAttrs?.role || 'dialog'}
      aria-modal={restAttrs?.['aria-modal'] || true}
      onClick={(event) => onClick(event)}
    />
  );
};
