import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoutes from "./pages/Routes";
import AuthRoutes from "./pages/auth/Routes";
import AuthContextProvider from "./context/AuthContextProvider";

export default function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="auth/*" element={<AuthRoutes />} />
            <Route index element={<Navigate to="/protected" />} />
            <Route path="protected/*" element={<ProtectedRoutes />} />
          </Route>
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}
