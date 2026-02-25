import { type JSX, children as toChildren, onMount } from 'solid-js';
import { WithGlobalScopeComponent } from './with-global-scope.component.types';
import { useGlobalScope } from '../scope-provider/use-global-scope.hook';

export var WithGlobalScope: WithGlobalScopeComponent = (props) => {
  var scope = useGlobalScope();

  var children = toChildren(() => props.children) as unknown as () => HTMLElement;

  onMount(() => {
    const el = children();
    const elId = el.id;

    if (elId) {
      scope.set(elId, el);
    } else {
      const error = new Error(
        `"id" attribute is required for the modal to work in the global scope!`,
      );

      console.error('"id" attribute is required for', el);

      throw error;
    }
  });

  return children as unknown as JSX.Element;
};
