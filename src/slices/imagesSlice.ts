import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IImage, IImages, ISelectedImage } from "../types";
import { generateId } from "../utils";

const url = `https://api.thecatapi.com/v1/images/search?limit=20&api_key=${import.meta.env.VITE_CAT_API_KEY}`;

export const fetchImages = createAsyncThunk(
  "images/fetchImages",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (error: any) {
      thunkAPI.rejectWithValue("something went wrong!");
    }
  }
);

const initialState: IImages = {
  images: [],
  isLoading: true,
  hasFailed: false,
};

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    addImage(state, { payload: image }: { payload: ISelectedImage }) {
      const {url, dimensions} = image;
      state.images.push({
        id: generateId(),
        url,
        tags: [],
        addedToCollection: false,
        width: dimensions.width,
        height: dimensions.height
      });
    },
    deleteImage(state, { payload: id }: { payload: string }) {
      state.images = state.images.filter((image) => image.id !== id);
    },
    addTagToImage(
      state,
      { payload }: { payload: { id: string; tags: string[] } }
    ) {
      const { id, tags } = payload;
      const image = state.images.find((img) => img.id === id) as IImage;
      image.tags = [...tags];
    },
    addImageToCollection(state, { payload: id }: { payload: string }) {
      const image = state.images.find((img) => img.id === id) as IImage;
      image.addedToCollection = true;
    },
    removeImageFromCollection(state, { payload: id }: { payload: string }) {
      const image = state.images.find((img) => img.id === id);
      if (image) image.addedToCollection = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      try {
        const images = [...action.payload];
        state.images = images.map((e) => ({ ...e, tags: ["cats"], addedToCollection: false }));
        state.isLoading = false;
      } catch (error) {
        state.isLoading = false;
        state.hasFailed = true;
      }
    });
    builder.addCase(fetchImages.rejected, (state) => {
      state.isLoading = false;
      state.hasFailed = true;
    });
  },
});

export const { addImage, deleteImage, addTagToImage, addImageToCollection, removeImageFromCollection } = imagesSlice.actions;

export default imagesSlice.reducer;
