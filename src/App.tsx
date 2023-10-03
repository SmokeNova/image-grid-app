import "./App.css";
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider>
      <h1 className="text-emerald-500 text-3xl">Hello World</h1>
    </MantineProvider>
  );
}

export default App;
