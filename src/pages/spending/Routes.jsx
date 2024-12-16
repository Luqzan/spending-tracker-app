import { Routes, Route } from "react-router-dom";
import List from "./List";
import Add from "./Add";
import Edit from "./Edit";

export default function SpendingRoutes() {
  return (
    <Routes>
      <Route path="" element={<List />} />
      <Route path="add" element={<Add />} />
      <Route path="edit/:id" element={<Edit />} />
    </Routes>
  );
}
