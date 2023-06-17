import type { Component, JSX } from 'solid-js';

export type ModalRootElement = Omit<
  HTMLDialogElement,
  /* ----------------- omitted attrs ----------------- */
  | 'show'
  /* ----------------- omitted attrs ----------------- */
  /* ----------------- overwritten attrs ----------------- */
  | 'open'
> & {
  readonly open: boolean;
  /* ----------------- overwritten attrs ----------------- */
};

type ModalAttrs = Omit<
  JSX.HTMLElementTags['dialog'],
  /* ----------------- omitted attrs ----------------- */
  | 'open'
  /* ----------------- omitted attrs ----------------- */
  /* ----------------- overwritten attrs ----------------- */
  | 'ref'
> & {
  ref?: ModalRootElement | ((el: ModalRootElement) => void) | undefined;
  /* ----------------- overwritten attrs ----------------- */
};

export type ModalProps = {
  shouldCloseOnOverlayClick?: boolean,
  onOpen?: () => void;
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/close_event
   */
  onClose?: (event: Event) => void;
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/cancel_event
   */
  onCancel?: (event: Event) => void;
};

type ModalCustomAttrs = JSX.CustomAttributes<ModalRootElement>;

type ModalAttrsAndProps = ModalAttrs & ModalProps & ModalCustomAttrs;

export type ModalComponent = Component<ModalAttrsAndProps>;
