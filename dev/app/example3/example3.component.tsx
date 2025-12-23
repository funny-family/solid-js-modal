import './example3.styles.css';
import { Component, createSignal, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { Modal, type ModalRef } from 'src/modal';
import { ControllablePortal } from 'src/controllable-portal';

export var Example3: Component = () => {
  var modalRef: ModalRef | null = null;

  var { 0: isVisible, 1: setVisibility } = createSignal(false);

  return (
    <section>
      <h1>Example 3</h1>

      <button
        type="button"
        onClick={() => {
          setVisibility((pev) => !pev);
        }}
      >
        show / hide section
      </button>

      <Show when={isVisible()}>
        <section>
          <button
            type="button"
            onClick={() => {
              modalRef!.showModal();
            }}
          >
            open modal
          </button>

          <ControllablePortal unmount={false}>
            <Modal
              ref={modalRef!}
              style="inline-size: 50vw; block-size: 50vh;"
              id="modal3"
              shouldCloseOnBackdropClick
            >
              <section>
                <h1>What is Lorem Ipsum?</h1>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make a type specimen
                  book. It has survived not only five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                  with desktop publishing software like Aldus PageMaker including versions of Lorem
                  Ipsum.
                </p>
              </section>
            </Modal>
          </ControllablePortal>
        </section>
      </Show>
    </section>
  );
};
