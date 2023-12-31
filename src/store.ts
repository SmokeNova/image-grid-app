import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import imagesReducer from "./slices/imagesSlice";
import collectionReducer from "./slices/collectionSlice";

const store = configureStore({
  reducer: {
    images: imagesReducer,
    collection: collectionReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

export default store;
