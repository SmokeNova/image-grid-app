import "./App.css";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Homepage from "./routes/Homepage";
import SearchResults from "./routes/SearchResults";
import CollectionPage from "./routes/CollectionPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/collection",
        element: <CollectionPage />
      },
      {
        path: "/search/:term",
        element: <SearchResults />
      },
    ],
  },
]);

function App() {
  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
