import { createSlice } from "@reduxjs/toolkit";
import { IImage } from "../types";

const initialState: IImage[] = [];

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    addToCollection(state, { payload: image }: { payload: IImage }) {
      state.push(image);
    },
    removeFromCollection(state, {payload: id}: {payload: string}) {
      return state.filter((img) => img.id !== id);
    }
  },
});

export const { addToCollection, removeFromCollection } = collectionSlice.actions;

export default collectionSlice.reducer;
