import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createDateSlice, DateSlice } from "./date.slice";
import { createGuestSlice, GuestSlice } from "./guest.slice";
import { createPersonSlice, PersonSlice } from "./person.slice";
import {
  ConfirmationSlice,
  createConfirmationSlice,
} from "./confirmation.slice";

type BoundState = PersonSlice & GuestSlice & DateSlice & ConfirmationSlice;

export const useWeddingBoundStore = create<BoundState>()(
  devtools(
    (...a) => ({
      ...createPersonSlice(...a),
      ...createGuestSlice(...a),
      ...createDateSlice(...a),
      ...createConfirmationSlice(...a),
    }),
    {
      name: "wedding-bound-store",
    }
  )
);
