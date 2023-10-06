import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IImage, IImages } from "../types";

const url = `https://api.thecatapi.com/v1/images/search?limit=10`;

const generateId = () => {
  let id = "";
  const str = "hpf840!gb;lyi23wzipxs";
  for (let i = 0; i < 8; i++) {
    id += str[Math.floor(Math.random() * str.length)];
  }
  return id;
};

export const fetchImages = createAsyncThunk(
  "images/fetchImages",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
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
    addImage(state, { payload: url }: { payload: string }) {
      state.images.push({
        id: generateId(),
        url,
        tags: [],
        addedToCollection: false,
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
      const image = state.images.find((img) => img.id === id) as IImage;
      image.addedToCollection = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      const images = [...action.payload];
      state.images = images.map((e) => ({ ...e, tags: ["cats"] }));
      state.isLoading = false;
    });
    builder.addCase(fetchImages.rejected, (state) => {
      state.isLoading = false;
      state.hasFailed = true;
    });
  },
});

export const { addImage, deleteImage, addTagToImage, addImageToCollection, removeImageFromCollection } = imagesSlice.actions;

export default imagesSlice.reducer;
