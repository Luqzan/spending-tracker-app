import { useState } from "react";
import SpendingContext from "./SpendingContext";
import axios from "../services/axios";

export default function SpendingContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [analytics, setAnalytics] = useState({
    daily: { max: null, min: null, average: null, data: [] },
    monthly: { max: null, min: null, average: null, data: [] },
    yearly: { max: null, min: null, average: null, data: [] },
  });

  async function refreshData() {
    try {
      const response = await axios.get("/user/spending/get-all");

      if (!response.data.error) {
        setData(response.data.data);

        response.data.data.forEach((datum) => {
          console.log(datum.date);
        });
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  const value = {
    data: data,
    refreshData: refreshData,
    analytics: analytics,
    highestSpent: highestSpent,
  };

  return (
    <SpendingContext.Provider value={value}>
      {children}
    </SpendingContext.Provider>
  );
}
