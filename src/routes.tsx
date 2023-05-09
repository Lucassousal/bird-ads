import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { NotFound } from "./pages/NotFound/NotFoutd";
import { SignIn } from "./pages/SignIn/SignIn";

export const MainRoutes = () => {
  return(
    <Routes>
      <Route 
        path="/"
        element={<Home/>}
      />
      <Route
        path="/about"
        element={<div>Sobre</div>}
      />
      <Route
        path="/signin"
        element={<SignIn/>}
      />
      <Route
        path="*"
        element={<NotFound/>}
      />
    </Routes>
  )
}






