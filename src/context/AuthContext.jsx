import { createContext } from "react";

const AuthContext = createContext({
  user: {},
  isAuthenticated: () => {},
});

export default AuthContext;
