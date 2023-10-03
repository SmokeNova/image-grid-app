import "./App.css";
import '@mantine/core/styles.css';
import { useEffect } from 'react';
import { RootState, useAppDispatch } from "./store";
import { useSelector } from 'react-redux';

import { MantineProvider } from '@mantine/core';
import { fetchImages } from "./slices/imagesSlice";

function App() {
  const dispatch = useAppDispatch();
  const { images, isLoading } = useSelector((state: RootState) => state.images);

  useEffect(() => {
    dispatch(fetchImages())
  }, [])

  if (isLoading) return 'loading';

  console.log(images);

  return (
    <MantineProvider>
      <h1 className="text-emerald-500 text-3xl">Hello World</h1>
    </MantineProvider>
  );
}

export default App;
