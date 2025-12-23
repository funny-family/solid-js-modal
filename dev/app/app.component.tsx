import './app.styles.css';
import 'src/modal/modal.styles.css';
import { type Component } from 'solid-js';
import { Example1 } from './example1/example1.component';
import { Example2 } from './example2/example2.component';
import { Example3 } from './example3/example3.component';

export const App: Component = () => {
  return (
    <main>
      <Example1 />

      <hr />

      <Example2 />

      <hr />

      <Example3 />
    </main>
  );
};
