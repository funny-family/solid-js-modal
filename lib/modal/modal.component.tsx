import { Show, onCleanup, onMount, splitProps } from 'solid-js';
import type {
  ModalComponent,
  ModalRootElement,
  ModalAttrsAndProps,
} from './modal.types';
import './modal.styles.css';

export const Modal: ModalComponent = (attrsAndProps) => {
  const [props, attrs] = splitProps(attrsAndProps, [
    'shouldCloseOnOverlayClick',
    'onOpen',
  ]);

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

      // hacky, hacky stuff
      if (attributeValue === '') {
        if (props?.onOpen != null) {
          props.onOpen();
        }
      }
    }
  });

  const onClick: ModalAttrsAndProps['onClick'] = (event) => {
    if (props?.shouldCloseOnOverlayClick || true) {
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
      // {...rrr}
      ref={(el) => (ref = el)}
      class={`${attrs?.class || ''} solid-js-modal`}
      role={attrs?.role || 'dialog'}
      aria-modal={attrs?.['aria-modal'] || true}
      onClick={(event) => onClick(event)}
      /* ----------------- omitted attrs ----------------- */
      open={null}
      textContent={null}
      innerHTML={null}
      innerText={null}
      /* ----------------- omitted attrs ----------------- */
    >
      <Show when={true}>{attrs?.children}</Show>
    </dialog>
  );
};
