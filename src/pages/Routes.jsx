/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import SpendingRoutes from "./spending/Routes";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import SpendingContextProvider from "../context/SpendingContextProvider";

export default function ProtectedRoutes() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    function checkAuthentication() {
      authContext.isAuthenticated();
    }

    checkAuthentication();
  }, []);

  return (
    <SpendingContextProvider>
      <Routes>
        <Route
          path=""
          element={authContext.user ? <Home /> : <Navigate to="/auth/login" />}
        />
        <Route
          path="spending/*"
          element={
            authContext.user ? (
              <SpendingRoutes />
            ) : (
              <Navigate to="/auth/login" />
            )
          }
        />
      </Routes>
    </SpendingContextProvider>
  );
}
