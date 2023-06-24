import type { Component } from 'solid-js';
import { Show, createSignal, onMount } from 'solid-js';
import { Modal } from '../../dist'
import type { ModalRootElement } from '../../dist'
import './app.styles.css';

export const App: Component = () => {
  let modelRef = undefined as any as ModalRootElement;
  let anotherModalRef = undefined as any as ModalRootElement;

  const { 0: isAnotherModalHidden, 1: setIsAnotherModalHiddenState } =
    createSignal(false);

  onMount(() => {
    console.log('modelRef:', { modelRef });
    console.log('anotherModalRef:', { anotherModalRef });
  });

  return (
    <main>
      <div>
        <button type="button" onClick={() => modelRef.showModal()}>
          Open modal
        </button>
        <Modal
          class="modal"
          ref={modelRef}
          style={{ padding: '100px' }}
          shouldCloseOnBackgroundClick={false}
          // keepMounted={false}
          onOpen={(event) => console.log('open event:', event)}
          // onClose={(event) => console.log('close event:', event)}
          // onCancel={(event) => console.log('cancel event:',event:)}
          // onClick={(event:) => console.log('click event:', event)}
          // onBackdropClick={() => console.log('background click')}
          children={
            <div class="modal__content">
              <h1>This is modal content!</h1>
              <button type="button" onClick={() => modelRef.close()}>
                Close modal
              </button>
            </div>
          }
        />
      </div>

      <div>
        <button
          type="button"
          onClick={() => {
            setIsAnotherModalHiddenState(true);
            anotherModalRef.showModal();
          }}
        >
          Open another modal
        </button>
        <Modal
          ref={anotherModalRef}
          shouldCloseOnBackgroundClick={true}
          onClick={() => setIsAnotherModalHiddenState(false)}
        >
          <Show when={isAnotherModalHidden()} fallback={null}>
            <div>
              <h1>Another Modal!</h1>
              <button type="button" onClick={() => anotherModalRef.close()}>
                Close another modal
              </button>
            </div>
          </Show>
        </Modal>
      </div>
    </main>
  );
};
