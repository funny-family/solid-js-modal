<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=solid-js-modal&background=tiles&project=%20" alt="solid-js-modal">
</p>

# solid-js-modal

[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)

Simple "dialog" element based "modal" component for Solid-js

## Quick start

### Installation:
```bash
npm i solid-js-modal
# or
yarn add solid-js-modal
# or
pnpm add solid-js-modal
```

### [Demo here!](https://funny-family.github.io/solid-js-modal/)

### Examples:
```tsx
import { Modal } from 'solid-js-modal';
import 'solid-js-modal/dist/style.css';
// ...
let modalRef;
// ...
<div>
  <button
    type="button"
    onClick={() => modalRef.showModal()}
  >
    Open modal
  </button>

  <Modal ref={modalRef}>
    <p>This is modal content</p>
  </Modal>
</div>
```

```tsx
import { Modal } from 'solid-js-modal';
import 'solid-js-modal/dist/style.css';
// ...
let modalRef;
// ...
<div>
  <button
    type="button"
    onClick={() => modalRef.showModal()}
  >
    Open modal
  </button>

  <Modal ref={modalRef} shouldCloseOnBackgroundClick={false}>
    <button
      type="button"
      onClick={() => modalRef.close()}
    >
      Close modal
    </button>
    <p>This is modal content</p>
  </Modal>
</div>
```

```tsx
import { createSignal, Show } from 'solid-js';
import { Modal } from 'solid-js-modal';
import 'solid-js-modal/dist/style.css';
// ...
let modalRef;
const { 0: isVisible, 1: setIsVisibleState } = createSignal(false);
// ...
<div>
  <button
    type="button"
    onClick={() => {
      modalRef.showModal();
      setIsVisibleState(true);
    }}
  >
    Open modal
  </button>

  <Modal
    ref={modalRef}
    onClose={() => {
      setIsVisibleState(false);
    }}
  >
    <Show when={isVisible} fallback={null}>
      <p>This is modal content</p>
    </Show>
  </Modal>
</div>
```

### User guide:
The `Modal` component has all the attributes that `HTMLDialogElement` has, except for `open`.

#### Props
| Prop name | Description | Default value | Example value |
| --------- | ----------- | ------------- | ------------- |
| shouldCloseOnBackgroundClick | Allow to close modal on background click. | true | false |
| onOpen | Callback fired the modal is opened. | n/a | `(event) => console.log('open event:', event)`
