import { useContext } from 'solid-js';
import { GlobalScopeContext } from './scope-provider.component';

export var useGlobalScope = () => {
  return useContext(GlobalScopeContext);
};
