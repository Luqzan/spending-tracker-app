import { useState } from "react";
import SpendingContext from "./SpendingContext";
import axios from "../services/axios";

export default function SpendingContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  function analyzeData() {
    const dailyData = [];
    const monthlyData = [];
    const yearlyData = [];

    data.forEach((datum) => {
      const timeDaily = datum.date.slice(0, 10);
      const timeMonthly = datum.date.slice(0, 7);
      const timeYearly = datum.date.slice(0, 4);

      const indexDaily = dailyData.findIndex(
        (dailyDatum) => dailyDatum.time === timeDaily
      );
      const indexMonthly = monthlyData.findIndex(
        (monthlyDatum) => monthlyDatum.time === timeMonthly
      );
      const indexYearly = yearlyData.findIndex(
        (yearlyDatum) => yearlyDatum.time === timeYearly
      );

      if (indexDaily >= 0) {
        dailyData[indexDaily].sum += datum.amount;
      } else {
        dailyData.push({ time: timeDaily, sum: datum.amount });
      }

      if (indexMonthly >= 0) {
        monthlyData[indexMonthly].sum += datum.amount;
      } else {
        monthlyData.push({ time: timeMonthly, sum: datum.amount });
      }

      if (indexYearly >= 0) {
        yearlyData[indexYearly].sum += datum.amount;
      } else {
        yearlyData.push({ time: timeYearly, sum: datum.amount });
      }
    });

    let dailyMax = 0;
    let monthlyMax = 0;
    let yearlyMax = 0;
    let dailyMin = 99999999999;
    let monthlyMin = 99999999999;
    let yearlyMin = 99999999999;
    let dailySum = 0;
    let monthlySum = 0;
    let yearlySum = 0;

    for (const dailyDatum of dailyData) {
      dailyMax = dailyDatum.sum > dailyMax ? dailyDatum.sum : dailyMax;
      dailyMin = dailyDatum.sum < dailyMin ? dailyDatum.sum : dailyMin;
      dailySum += dailyDatum.sum;
    }
    for (const monthlyDatum of monthlyData) {
      monthlyMax =
        monthlyDatum.sum > monthlyMax ? monthlyDatum.sum : monthlyMax;
      monthlyMin =
        monthlyDatum.sum < monthlyMin ? monthlyDatum.sum : monthlyMin;
      monthlySum += monthlyDatum.sum;
    }
    for (const yearlyDatum of yearlyData) {
      yearlyMax = yearlyDatum.sum > yearlyMax ? yearlyDatum.sum : yearlyMax;
      yearlyMin = yearlyDatum.sum < yearlyMin ? yearlyDatum.sum : yearlyMin;
      yearlySum += yearlyDatum.sum;
    }

    const dailyAverage = dailySum / dailyData.length;
    const monthlyAverage = monthlySum / monthlyData.length;
    const yearlyAverage = yearlySum / yearlyData.length;

    setAnalytics({
      daily: {
        max: dailyMax,
        min: dailyMin,
        average: dailyAverage,
        data: dailyData,
      },
      monthly: {
        max: monthlyMax,
        min: monthlyMin,
        average: monthlyAverage,
        data: monthlyData,
      },
      yearly: {
        max: yearlyMax,
        min: yearlyMin,
        average: yearlyAverage,
        data: yearlyData,
      },
    });
  }

  async function refreshData() {
    try {
      const [responseForSpending, responseForCategories] = await Promise.all([
        axios.get("/spending/get-all"),
        axios.get("/spending/categories"),
      ]);

      if (
        responseForSpending.data.error === false &&
        responseForCategories.data.error === false
      ) {
        setData(responseForSpending.data.data);
        setCategories(responseForCategories.data.categories);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  const value = {
    data: data,
    refreshData: refreshData,
    categories: categories,
    analytics: analytics,
    analyzeData: analyzeData,
  };

  return (
    <SpendingContext.Provider value={value}>
      {children}
    </SpendingContext.Provider>
  );
}
