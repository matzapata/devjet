import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Protected from "pages/Protected";

import ProtectedRoute from "components/ProtectedRoute";

function App() {
  const user = true;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        element={
          <ProtectedRoute isAllowed={!!user} redirectPath="/auth/login" />
        }
      >
        <Route path="protected" element={<Protected />} />
        <Route path="test" element={<Protected />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
