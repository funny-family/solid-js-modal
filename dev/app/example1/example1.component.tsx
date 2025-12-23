import './example1.styles.css';
import { Component } from 'solid-js';
import { Modal, type ModalRef } from 'src/modal';

export var Example1: Component = () => {
  var modalRef: ModalRef | null = null;

  return (
    <section>
      <h1>Example 1</h1>

      <section>
        <button
          type="button"
          onClick={() => {
            modalRef!.showModal();
          }}
        >
          open modal
        </button>

        <Modal
          // ref={el => {
          //   modalRef = el;

          //   console.log({ modalRef, el });
          // }}
          ref={modalRef!}
          style="inline-size: 50vw; block-size: 50vh;"
        >
          <button
            type="button"
            onClick={() => {
              modalRef!.close();
            }}
          >
            close modal
          </button>

          <section>
            <h1>What is Lorem Ipsum?</h1>

            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </section>
        </Modal>
      </section>
    </section>
  );
};
