import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { firebaseStorage } from "../storages/firebase.storage";
import { logger } from "../middlewares/logger.middleware";
import { useWeddingBoundStore } from "../wedding";

const PERSON_STORAGE_ID = "person-storage";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeApi: StateCreator<
  PersonState & Actions,
  [["zustand/devtools", never]] // Se agrega este type para poder agregar nombres de acciones
> = (set) => ({
  firstName: "",
  lastName: "",
  setFirstName: (value: string) =>
    set(() => ({ firstName: value }), false, "setFirstName"),
  setLastName: (value: string) =>
    set(() => ({ lastName: value }), false, "setLastName"),
});

export const usePersonStore = create<PersonState & Actions>()(
  logger(
    devtools(
      persist(storeApi, {
        name: PERSON_STORAGE_ID,
        storage: firebaseStorage,
      }),
      {
        name: PERSON_STORAGE_ID,
      }
    )
  )
);

usePersonStore.subscribe((nextState, prevState) => {
  console.log({ nextState, prevState });

  const { firstName, lastName } = nextState;

  useWeddingBoundStore.getState().setFirstName(firstName);
  useWeddingBoundStore.getState().setLastName(lastName);
});
