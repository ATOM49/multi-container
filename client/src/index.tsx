import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OtherPage from "./OtherPage";
import Fibonacci from "./Fibonacci";

// Create a client
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <Routes>
            <Route index element={<OtherPage />} />
            <Route path="fibonacci" element={<Fibonacci />} />
          </Routes>
        </ChakraProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
