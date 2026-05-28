import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Invitation from "./components/Invitation";
import GlobalMusic from "./components/GlobalMusic";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Terms from "./components/Terms";
function App() {
  return (
    <BrowserRouter>
      
      {/* 🎵 Global music plays across all pages */}
      <GlobalMusic />

      <Routes>
        <Route path="/" element={<Invitation />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<Terms />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;