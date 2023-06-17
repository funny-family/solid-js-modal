import { onMount } from 'solid-js';
import { Body, Head, Html, Meta, Scripts, Title } from 'solid-start';
// import { Modal } from '../../dist/index.es';
import { Modal } from '../../lib/modal';
import type { ModalRootElement } from '../../lib/modal';
import './root.css';

export default function Root() {
  let modelRef = undefined as any as ModalRootElement;

  onMount(() => {
    console.log({ modelRef });
  });

  return (
    <Html lang="en">
      <Head>
        <Title>PLayground</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <button type="button" onClick={() => modelRef.showModal()}>
          Open modal
        </button>

        <Modal class="modal" ref={modelRef}>
          <div class="modal__content">
            <h1>This is modal content!</h1>
            <button type="button" onClick={() => modelRef.close()}>
              Close modal
            </button>
          </div>
        </Modal>

        <Scripts />
      </Body>
    </Html>
  );
}
