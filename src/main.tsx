import React from "react";
import ReactDOM from "react-dom/client";
import {ChakraProvider, extendTheme, ThemeConfig} from "@chakra-ui/react";

import App from "./components/App.tsx";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false
}

const theme = extendTheme({config});


ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
