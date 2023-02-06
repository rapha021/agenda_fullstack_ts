import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./index.css"
import MainProvider from "./contexts/mainContext/mainContext"
import AuthProvider from "./contexts/authContext/authContext"

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
}

const theme = extendTheme({ colors })

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MainProvider>
          <ChakraProvider theme={theme} resetCSS>
            <App />
          </ChakraProvider>
        </MainProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
