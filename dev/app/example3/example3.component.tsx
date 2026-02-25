import './example3.styles.css';
import { Component, createSignal, Show } from 'solid-js';
import { Modal, type ModalRef } from 'src/modal';
import { WithGlobalScope, GlobalScopeProvider, useGlobalScope } from 'src/with-scope';

export var Example3: Component = () => {
  var modalRef: ModalRef | null = null;
  var modalRef1: ModalRef | null = null;

  var { 0: isVisible, 1: setVisibility } = createSignal(false);
  var { 0: isVisible1, 1: setVisibility1 } = createSignal(false);

  var modalScope = useGlobalScope();
  (window as any).modalScope = modalScope;

  return (
    <GlobalScopeProvider>
      <section>
        <h1>Example 3.1</h1>

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
              open modal (#modal3)
            </button>

            <WithGlobalScope>
              <Modal
                ref={modalRef!}
                style="inline-size: 50vw; block-size: 50vh;"
                id="modal3"
                shouldCloseOnBackdropClick
              >
                <section>
                  <h1>What is Lorem Ipsum? (#modal3)</h1>

                  <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to make a type specimen
                    book. It has survived not only five centuries, but also the leap into electronic
                    typesetting, remaining essentially unchanged. It was popularised in the 1960s
                    with the release of Letraset sheets containing Lorem Ipsum passages, and more
                    recently with desktop publishing software like Aldus PageMaker including
                    versions of Lorem Ipsum.
                  </p>
                </section>
              </Modal>
            </WithGlobalScope>
          </section>
        </Show>
      </section>

      <section>
        <h1>Example 3.2</h1>

        <button
          type="button"
          onClick={() => {
            modalRef1!.showModal();
          }}
        >
          open modal (#modal4)
        </button>

        <section>
          <WithGlobalScope>
            <Modal
              ref={modalRef1!}
              style="inline-size: 50vw; block-size: 50vh;"
              id="modal4"
              shouldCloseOnBackdropClick
            >
              <section>
                <h1>What is Lorem Ipsum? (#modal4)</h1>

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
          </WithGlobalScope>
        </section>
      </section>
    </GlobalScopeProvider>
  );
};
