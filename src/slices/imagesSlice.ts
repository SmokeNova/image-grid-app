import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface IImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface IImages {
  images: IImage[];
  isLoading: boolean;
  hasFailed: boolean;
}

const url = `https://api.thecatapi.com/v1/images/search?limit=10`;

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
    deleteImage(state, { payload: id }: { payload: string }) {
      state.images = state.images.filter((image) => image.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      state.images = [...action.payload];
      state.isLoading = false;
    });
    builder.addCase(fetchImages.rejected, (state) => {
      state.isLoading = false;
      state.hasFailed = true;
    });
  },
});

export const { deleteImage } = imagesSlice.actions;

export default imagesSlice.reducer;
