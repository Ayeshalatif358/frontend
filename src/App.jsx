import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Invitation from "./components/Invitation";
import GlobalMusic from "./components/GlobalMusic";

function App() {
  return (
    <BrowserRouter>
      
      {/* 🎵 Global music plays across all pages */}
      <GlobalMusic />

      <Routes>
        <Route path="/" element={<Invitation />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;