import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { customSessionStorage } from "../storages/session.storage";

const BEARS_STORAGE_ID = "bears-storage";

interface Bear {
  id: number;
  name: string;
}

interface BearState {
  bears: Bear[];
  blackBears: number;
  polarBears: number;
  pandaBears: number;
}

interface Actions {
  addBears: () => void;
  clearBears: () => void;
  doNothing: () => void;
  increaseBlackBears: (by: number) => void;
  increasePolarBears: (by: number) => void;
  increasePandaBears: (by: number) => void;
  totalBears: () => number;
}

const storeApi: StateCreator<
  BearState & Actions,
  [["zustand/devtools", never]]
> = (set, get) => ({
  bears: [{ id: 1, name: "Oso #1" }],
  blackBears: 10,
  polarBears: 5,
  pandaBears: 1,
  addBears: () =>
    set(
      (state) => ({
        bears: [
          ...state.bears,
          {
            id: state.bears.length + 1,
            name: `Oso #${state.bears.length + 1}`,
          },
        ],
      }),
      false,
      "addBears"
    ),
  clearBears: () => set(() => ({ bears: [] }), false, "clearBears"),
  doNothing: () =>
    set((state) => ({ bears: [...state.bears] }), false, "doNothing"),
  increaseBlackBears: (by: number) =>
    set(
      (state) => ({ blackBears: state.blackBears + by }),
      false,
      "increaseBlackBears"
    ),
  increasePolarBears: (by: number) =>
    set(
      (state) => ({ polarBears: state.polarBears + by }),
      false,
      "increasePolarBears"
    ),
  increasePandaBears: (by: number) =>
    set(
      (state) => ({ pandaBears: state.pandaBears + by }),
      false,
      "increasePandaBears"
    ),
  totalBears: () => {
    return (
      get().blackBears +
      get().polarBears +
      get().pandaBears +
      get().bears.length
    );
  },
});

export const useBearsStore = create<BearState & Actions>()(
  devtools(
    persist(storeApi, {
      name: BEARS_STORAGE_ID,
      storage: customSessionStorage,
    }),
    {
      name: BEARS_STORAGE_ID,
    }
  )
);
