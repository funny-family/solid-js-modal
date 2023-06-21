import type { Component, JSX } from 'solid-js';

export type ModalRootElement = Omit<
  HTMLDialogElement,
  /* ------------------------- omitted attrs ------------------------- */
  | 'show'
  | 'textContent'
  | 'innerText'
  | 'innerHTML'
  /* ------------------------- omitted attrs ------------------------- */
  /* ------------------------- overwritten attrs ------------------------- */
  | 'open'
> & {
  readonly open: boolean;
  /* ------------------------- overwritten attrs ------------------------- */
};

type ModalAttrs = Omit<
  JSX.HTMLElementTags['dialog'],
  /* --------------------------------- omitted attrs ------------------------- */
  | 'open'
  | 'textContent'
  | 'innerText'
  | 'innerHTML'
  /* --------------------------------- omitted attrs ------------------------- */
  /* ------------------------- overwritten attrs ------------------------- */
  | 'ref'
> & {
  ref?: ModalRootElement | ((el: ModalRootElement) => void) | undefined;
  /* ------------------------- overwritten attrs ------------------------- */
};

export type ModalProps = {
  /**
   * @description
   * Allow to close modal on background click.
   */
  shouldCloseOnBackgroundClick?: boolean;
  /**
   * @description
   * Always keep the children in the DOM.
   */
  keepMounted?: boolean;
  /**
   * @description
   * Callback fired when the backdrop is clicked.
   */
  onBackdropClick?: () => void;
  /**
   * @description
   * Callback fired the modal is opened.
   */
  onOpen?: () => void;
};

type ModalCustomAttrs = JSX.CustomAttributes<ModalRootElement>;

export type ModalAttrsAndProps = ModalAttrs & ModalProps & ModalCustomAttrs;

export type ModalComponent = Component<ModalAttrsAndProps>;
