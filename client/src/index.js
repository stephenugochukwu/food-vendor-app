import React from "react";
import { RecoilRoot } from "recoil";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BaseRoute } from "./routes/BaseRoute";
import { AuthProvider } from "./context/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<BaseRoute />}></Route>
          </Routes>
        </AuthProvider>
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>

);

