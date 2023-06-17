import { onCleanup, onMount, splitProps } from 'solid-js';
import type {
  ModalComponent,
  ModalRootElement,
  ModalProps,
} from './modal.types';
import './modal.styles.css';

export const Modal: ModalComponent = (attrsAndProps) => {
  const { 0: props, 1: attrs } = splitProps(attrsAndProps, [
    'shouldCloseOnOverlayClick',
    'onOpen',
    'onClose',
    'onCancel',
  ]);

  const attributeName_open = 'open';

  let ref = attrs?.ref as ModalRootElement;

  const observer = new MutationObserver((mutationRecords) => {
    for (let i = 0; i < mutationRecords.length; i++) {
      const mutationRecord = mutationRecords[i];
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
    }
  });

  const onClose: (this: HTMLDialogElement, event: Event) => any = function (
    event
  ) {
    // console.log('modal "close" event:', event);

    if (props?.onClose != null) {
      props.onClose(event);
    }
  };

  const onCancel: (this: HTMLDialogElement, event: Event) => any = function (
    event
  ) {
    // console.log('modal "cancel" event:', event);

    if (props?.onCancel != null) {
      props.onCancel(event);
    }
  };

  onMount(() => {
    console.log(1231321, ref, { ref });

    observer.observe(ref, {
      attributes: true,
      attributeFilter: [attributeName_open],
    });
    ref.addEventListener('close', onClose);
    ref.addEventListener('cancel', onCancel);
  });

  onCleanup(() => {
    observer.disconnect();
    ref.removeEventListener('close', onClose);
    ref.removeEventListener('cancel', onCancel);
  });

  const shouldCloseOnOverlayClick = () =>
    props?.shouldCloseOnOverlayClick || false;

  return (
    <dialog
      {...attrs}
      /* ----------------- omitted attrs ----------------- */
      // @ts-ignore
      open={null}
      /* ----------------- omitted attrs ----------------- */
      ref={(el) => (ref = el)}
      class={`${attrs?.class || ''} solid-js-modal`}
    />
  );
};
