/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import Info from "../components/Info";
import CustomButton from "../components/CustomButton";
import { useContext, useEffect, useState } from "react";
import SpendingContext from "../context/SpendingContext";
import ErrorMessage from "../components/ErrorMessage";

export default function Home() {
  const navigate = useNavigate();
  const spendingContext = useContext(SpendingContext);
  const [errors, setErrors] = useState([]);
  const [timeframe, setTimeframe] = useState("monthly");

  useEffect(() => {
    const loadData = async () => {
      try {
        const isDataRefreshed = await spendingContext.refreshData();

        if (!isDataRefreshed) {
          setErrors(["Failed to load data. Try reloading."]);
        }
      } catch (err) {
        console.error(err);

        setErrors(["Failed to load data. Try reloading."]);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    spendingContext.analyzeData();
  }, [spendingContext.data]);

  return (
    <div>
      {spendingContext.data.length > 0 ? (
        <div className="flex flex-col gap-8 items-center">
          <div className="flex flex-row gap-4">
            <CustomButton
              onClick={() => {
                setTimeframe("daily");
              }}
              label="daily"
            />

            <CustomButton
              onClick={() => {
                setTimeframe("monthly");
              }}
              label="monthly"
            />

            <CustomButton
              onClick={() => {
                setTimeframe("yearly");
              }}
              label="yearly"
            />
          </div>

          <Info timeframe={timeframe} />

          <CustomButton
            onClick={(e) => {
              e.preventDefault();
              navigate("/protected/spending");
            }}
            label="SEE ALL SPENDING"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <p className="text-2xl text-center">
            You have not recorded any spending yet.
          </p>

          <CustomButton
            label={"add now"}
            onClick={() => {
              navigate("/protected/spending/add");
            }}
          />
        </div>
      )}

      {errors.length > 0 ? <ErrorMessage errors={errors} /> : null}
    </div>
  );
}
