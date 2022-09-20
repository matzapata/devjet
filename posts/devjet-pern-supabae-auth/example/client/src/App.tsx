import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Auth from "pages/Auth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
