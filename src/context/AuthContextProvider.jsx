import { useState } from "react";
import AuthContext from "./AuthContext";
import axios from "../services/axios";

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  async function isAuthenticated() {
    try {
      const response = await axios.get("/auth-check");

      if (response.data.isAuthenticated) {
        setUser(response.data.user);
        return true;
      } else {
        setUser(null);
        return false;
      }
    } catch (err) {
      console.error(err);
      setUser(null);
      return false;
    }
  }

  const value = {
    user: user,
    isAuthenticated: isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
