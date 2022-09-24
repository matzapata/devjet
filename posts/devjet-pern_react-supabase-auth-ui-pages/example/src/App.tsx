import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "pages/Home";
import NotFound from "pages/NotFound";
import SignUp from "pages/auth/Signup";
import SignIn from "pages/auth/Signin";
import Recover from "pages/auth/Recover";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/recover" element={<Recover />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
