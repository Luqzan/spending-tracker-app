/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import SpendingCard from "../../components/SpendingCard";
import { useContext, useState } from "react";
import CustomButton from "../../components/CustomButton";
import SpendingContext from "../../context/SpendingContext";
import ErrorMessage from "../../components/ErrorMessage";
import axios from "../../services/axios.jsx";

export default function List() {
  const spendingContext = useContext(SpendingContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  function handleAdd() {
    navigate("/protected/spending/add");
  }

  function handleEdit(id) {
    navigate(`/protected/spending/edit/${id}`);
  }

  async function handleDelete(id) {
    try {
      const response = await axios.delete(`/spending/${id}`);

      if (response.data.error === false) {
        const isDataRefreshed = await spendingContext.refreshData();

        if (!isDataRefreshed) {
          setErrors(["Failed to load data. Try reloading."]);
        }
      } else {
        setErrors(["Failed to delete spending. Try again."]);
      }
    } catch (err) {
      console.error(err);

      setErrors(["Failed to delete spending. Try again."]);
    }
  }

  return (
    <div className="mx-4 sm:mx-20 w-full max-w-[900px] min-h-screen flex flex-col gap-4">
      <div className="sticky pt-12 pb-4 px-4 top-0 rounded-b-lg bg-stone-200 dark:bg-stone-700 flex flex-row gap-4 items-center">
        <h2 className="flex-grow text-xl tracking-widest">SPENDING HISTORY</h2>

        <CustomButton
          onClick={() => {
            navigate("/protected");
          }}
          label="Analytics"
        />

        <button
          className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center"
          onClick={handleAdd}
        >
          <MdAdd className="text-4xl font-bold text-white" />
        </button>
      </div>

      {errors.length > 0 ? <ErrorMessage errors={errors} /> : null}

      {spendingContext.data.length > 0 ? null : (
        <div className="w-full flex flex-col gap-2 items-center mt-4">
          <p className="text-lg font-medium">Your spending record is empty.</p>

          <CustomButton onClick={handleAdd} label="Add one now" />
        </div>
      )}

      <div className="flex flex-col gap-4">
        {spendingContext.data.map((datum) => (
          <SpendingCard
            key={datum.id}
            data={datum}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}
