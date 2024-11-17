import "@testing-library/jest-dom";
import { act } from "@testing-library/react";
import * as zustand from "zustand";
import { useConfigurationStore } from "./Base/stores/ConfigurationStore";

// hide an error provided by the bay component lib in our tests
const BAYER_COMPONENT_REF_ERROR =
  "Warning: forwardRef render functions accept exactly two parameters: props and ref";
const NO_CONNECTION_ERROR = "ECONNREFUSED";
const originalError = console.error.bind(console.error);
console.error = (...args) => {
  if (
    !args.toString().includes(BAYER_COMPONENT_REF_ERROR) &&
    !args.toString().includes(NO_CONNECTION_ERROR)
  ) {
    return originalError(...args);
  }
};

window.URL.createObjectURL = jest.fn();

global.matchMedia =
  global.matchMedia ||
  function (query) {
    return {
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
  };

// setup i18n

jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
        languages: ["en", "es", "de"],
      },
    };
  },
  initReactI18next: {
    type: "3rdParty",
    init: jest.fn(),
  },
  Trans: ({ i18nKey }: { i18nKey: string }) => i18nKey,
  Translation: ({
    children,
  }: {
    children: (t: (str: string) => string) => React.ReactNode;
  }) => children((k) => k),
}));

// setup zustand

const { create: actualCreate, createStore: actualCreateStore } =
  jest.requireActual<typeof zustand>("zustand");

// a variable to hold reset functions for all stores declared in the app
export const storeResetFns = new Set<() => void>();

const createUncurried = <T>(stateCreator: zustand.StateCreator<T>) => {
  const store = actualCreate(stateCreator);
  const initialState = store.getState();
  storeResetFns.add(() => {
    store.setState(initialState, true);
  });
  return store;
};

// when creating a store, we get its initial state, create a reset function and add it in the set
export const create = (<T>(stateCreator: zustand.StateCreator<T>) => {
  console.log("zustand create mock");

  // to support curried version of create
  return typeof stateCreator === "function"
    ? createUncurried(stateCreator)
    : createUncurried;
}) as typeof zustand.create;

const createStoreUncurried = <T>(stateCreator: zustand.StateCreator<T>) => {
  const store = actualCreateStore(stateCreator);
  const initialState = store.getState();
  storeResetFns.add(() => {
    store.setState(initialState, true);
  });
  return store;
};

// when creating a store, we get its initial state, create a reset function and add it in the set
export const createStore = (<T>(stateCreator: zustand.StateCreator<T>) => {
  console.log("zustand createStore mock");

  // to support curried version of createStore
  return typeof stateCreator === "function"
    ? createStoreUncurried(stateCreator)
    : createStoreUncurried;
}) as typeof zustand.createStore;

// // reset all stores after each test run
afterEach(() => {
  act(() => {
    storeResetFns.forEach((resetFn) => {
      resetFn();
    });
  });
});

beforeEach(() => {
  useConfigurationStore.setState({
    config: {
      api: {
        prefix: "api",
        common: "common",
        farm: "farm",
        season: "season",
        user: "user",
        proxy: "proxy",
      },
      environment: "season",
    },
  });
});

//setup webcrypto
window.crypto = jest.fn() as any;
window.crypto.randomUUID = jest.fn();
