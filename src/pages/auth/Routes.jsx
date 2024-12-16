import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Login from "./Login";
import Signup from "./Signup";

export default function AuthRoutes() {
  const authContext = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/login"
        element={authContext.user ? <Navigate to="/protected" /> : <Login />}
      />
      <Route
        path="/signup"
        element={authContext.user ? <Navigate to="/protected" /> : <Signup />}
      />
    </Routes>
  );
}
