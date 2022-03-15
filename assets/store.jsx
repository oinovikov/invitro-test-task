import React, { createContext, useReducer } from 'react';

const initialState = {
  log: [],
};
const store = createContext(initialState);
const { Provider } = store;

function reducer(state, action) {
  switch (action.type) {
    case 'unshift log': {
      return { ...state, log: [action.data, ...state.log] };
    }

    case 'pop log': {
      return { ...state, log: state.log.slice(0, -1) };
    }

    default: {
      throw new Error('Unknown reducer action.');
    }
  };
}

function StateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>
    {children}
  </Provider>;
};

export { store, StateProvider };
