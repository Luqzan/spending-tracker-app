import { useContext } from "react";
import SpendingContext from "../context/SpendingContext";

export default function AverageSpending({ timeframe }) {
  const spendingContext = useContext(SpendingContext);

  return (
    <div className="flex flex-col gap-4 items-start">
      <div>
        <p>
          Average spending per{" "}
          {timeframe === "daily"
            ? "day"
            : timeframe === "monthly"
            ? "month"
            : timeframe === "yearly"
            ? "year"
            : null}
          :
        </p>
        {spendingContext.analytics ? (
          <h1>
            RM
            {timeframe === "daily"
              ? spendingContext.analytics.daily.average.toFixed(2)
              : timeframe === "monthly"
              ? spendingContext.analytics.monthly.average.toFixed(2)
              : timeframe === "yearly"
              ? spendingContext.analytics.yearly.average.toFixed(2)
              : null}
          </h1>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>

      <div>
        <p>
          Maximum spending per{" "}
          {timeframe === "daily"
            ? "day"
            : timeframe === "monthly"
            ? "month"
            : timeframe === "yearly"
            ? "year"
            : null}
          :
        </p>
        {spendingContext.analytics ? (
          <h1>
            RM
            {timeframe === "daily"
              ? spendingContext.analytics.daily.max.toFixed(2)
              : timeframe === "monthly"
              ? spendingContext.analytics.monthly.max.toFixed(2)
              : timeframe === "yearly"
              ? spendingContext.analytics.yearly.max.toFixed(2)
              : null}
          </h1>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>

      <div>
        <p>
          Minimum spending per{" "}
          {timeframe === "daily"
            ? "day"
            : timeframe === "monthly"
            ? "month"
            : timeframe === "yearly"
            ? "year"
            : null}
          :
        </p>
        {spendingContext.analytics ? (
          <h1>
            RM
            {timeframe === "daily"
              ? spendingContext.analytics.daily.min.toFixed(2)
              : timeframe === "monthly"
              ? spendingContext.analytics.monthly.min.toFixed(2)
              : timeframe === "yearly"
              ? spendingContext.analytics.yearly.min.toFixed(2)
              : null}
          </h1>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
}
