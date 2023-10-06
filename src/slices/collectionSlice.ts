import { createSlice } from "@reduxjs/toolkit";
import { IImage } from "../types";

const initialState: { images: IImage[] } = (() => {
  const images = localStorage.getItem("collection");
  return images ? JSON.parse(images) : { images: [] };
})();

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    addToCollection(state, { payload: image }: { payload: IImage }) {
      const previousInstance = state.images.find((img) => img.id === image.id);
      if (!previousInstance) {
        state.images.push({...image, addedToCollection: true});
        localStorage.setItem("collection", JSON.stringify(state));
      }
    },
    removeFromCollection(state, { payload: id }: { payload: string }) {
      state.images = state.images.filter((img) => img.id !== id);
      localStorage.setItem("collection", JSON.stringify(state));
    },
  },
});

export const { addToCollection, removeFromCollection } =
  collectionSlice.actions;

export default collectionSlice.reducer;
