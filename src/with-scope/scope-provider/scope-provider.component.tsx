import { createContext, onCleanup } from 'solid-js';
import { GlobalScopeProviderComponent } from './scope-provider.component.types';
import { createScopController } from '../utils';
import { SimplePortal } from '../simple-portal';

export var GlobalScopeContext = createContext(createScopController());

export var GlobalScopeProvider: GlobalScopeProviderComponent = (props) => {
  var value = GlobalScopeContext.defaultValue;

  onCleanup(() => {
    value.clear();
  });

  <SimplePortal>{value.list()}</SimplePortal>;

  return <GlobalScopeContext.Provider value={value}>{props.children}</GlobalScopeContext.Provider>;
};
