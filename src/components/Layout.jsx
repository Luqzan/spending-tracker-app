import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <main className="w-screen flex justify-center">
      <Outlet />
    </main>
  );
}
