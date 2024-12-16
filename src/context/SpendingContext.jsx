import { createContext } from "react";

const SpendingContext = createContext({
  data: [],
  categories: [],
  analytics: {
    daily: { max: null, min: null, average: null, data: [] },
    monthly: { max: null, min: null, average: null, data: [] },
    yearly: { max: null, min: null, average: null, data: [] },
  },
  refreshData: () => {},
  analyzeData: () => {},
});

export default SpendingContext;
