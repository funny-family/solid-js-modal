import type { Component, JSX } from 'solid-js';

export type ModalRootElement = Omit<
  HTMLDialogElement,
  /* ------------------------- omitted attrs ------------------------- */
  | 'show'
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
   * Callback fired the modal is opened.
   */
  onOpen?: JSX.EventHandlerUnion<ModalRootElement, Event>;
};

type ModalCustomAttrs = JSX.CustomAttributes<ModalRootElement>;

export type ModalAttrsAndProps = ModalAttrs & ModalProps & ModalCustomAttrs;

export type ModalComponent = Component<ModalAttrsAndProps>;
