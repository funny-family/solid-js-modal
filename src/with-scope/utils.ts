import { type Accessor, createSignal } from 'solid-js';

export type CreateScopControllerFunctionReturnValue = {
  list: Accessor<HTMLElement>;
  get: (id: string) => HTMLElement | undefined;
  set: (id: string, element: HTMLElement) => CreateScopControllerFunctionReturnValue;
  remove: (id: string) => boolean;
  clear: () => void;
  has: (id: string) => void;
};

export type CreateScopControllerFunction = () => CreateScopControllerFunctionReturnValue;

export var createScopController = () => {
  var scopeMap = new Map<string, HTMLElement>();
  var getList = () => scopeMap.values().toArray();

  const listSignal = createSignal(getList());
  var list = listSignal[0];
  var setList = listSignal[1];

  const get: CreateScopControllerFunctionReturnValue['get'] = (id) => {
    return scopeMap.get(id);
  };

  const set: CreateScopControllerFunctionReturnValue['set'] = (id, element) => {
    const map = scopeMap.set(id, element);

    setList(getList());

    return map;
  };

  const remove: CreateScopControllerFunctionReturnValue['remove'] = (id) => {
    const idDeleted = scopeMap.delete(id);

    setList(getList());

    return idDeleted;
  };

  const clear: CreateScopControllerFunctionReturnValue['clear'] = () => {
    scopeMap.clear();

    setList(getList());
  };

  const has: CreateScopControllerFunctionReturnValue['has'] = (id) => {
    return scopeMap.has(id);
  };

  return {
    list,
    get,
    set,
    remove,
    clear,
    has,
  };
};
