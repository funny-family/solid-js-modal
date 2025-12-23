import type { Component, JSX, Accessor } from 'solid-js';

export type ModalChildren =
  | JSX.Element
  | ((args: { open: Accessor<boolean> }) => JSX.Element);

export type ModalRef = HTMLDialogElement;

// export type ModalRootElement = Omit<
//   HTMLDialogElement,
//   /* ------------------------- omitted attrs ------------------------- */
//   | 'show'
//   /* ------------------------- omitted attrs ------------------------- */
//   /* ------------------------- overwritten attrs ------------------------- */
//   | 'open'
// > & {
//   readonly open: boolean;
//   /* ------------------------- overwritten attrs ------------------------- */
// };

type ModalAttrs = Omit<
  JSX.HTMLElementTags['dialog'],
  /* --------------------------------- omitted attrs ------------------------- */
  'open' | 'ref' | 'children'
  /* --------------------------------- omitted attrs ------------------------- */
> & {
  ref?: ModalRef | ((element: ModalRef) => void) | undefined;
  children?: ModalChildren;
};

export type ModalProps = {
  /**
   * @description
   * Allow to close modal on backdrop click.
   */
  shouldCloseOnBackdropClick?: boolean;
  /**
   * @description
   * Callback fired the modal is opened.
   */
  onOpen?: JSX.EventHandlerUnion<ModalRef, Event>;
};

type ModalCustomAttrs = JSX.CustomAttributes<ModalRef>;

export type ModalAttrsAndProps = ModalAttrs & ModalProps & ModalCustomAttrs;

export type ModalComponent = Component<ModalAttrsAndProps>;
