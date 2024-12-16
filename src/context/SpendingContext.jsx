import { createContext } from "react";

const SpendingContext = createContext({
  data: [],
  refreshData: () => {},
});

export default SpendingContext;
