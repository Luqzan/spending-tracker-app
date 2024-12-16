import { useContext, useState } from "react";
import CustomFormSelect from "../../components/CustomFormSelect";
import CustomFormInput from "../../components/CustomFormInput";
import CustomButton from "../../components/CustomButton";
import axios from "../../services/axios.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";
import { useNavigate, useParams } from "react-router-dom";
import SpendingContext from "../../context/SpendingContext.jsx";
import { MdArrowBack } from "react-icons/md";

export default function Edit() {
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const spendingContext = useContext(SpendingContext);

  const spendingId = useParams().id;
  const previousData = spendingContext.data.find(
    (spending) => spending.id === Number(spendingId)
  );

  let previousCategory, previousSubCategory, subCategoryList;

  for (const categoryIterate of spendingContext.categories) {
    let found = false;
    for (const subCategoryIterate of categoryIterate.subCategories) {
      if (subCategoryIterate.id === previousData.subCategoryId) {
        previousSubCategory = subCategoryIterate.id;
        found = true;
        break;
      }
    }
    if (found) {
      previousCategory = categoryIterate.id;
      subCategoryList = categoryIterate.subCategories.map((element) => ({
        id: element.id,
        value: element.id,
        label: element.name,
      }));
    }
  }

  const [data, setData] = useState({
    category: previousCategory,
    subCategory: previousSubCategory,
    amount: previousData.amount,
    description: previousData.description,
    date: previousData.date.slice(0, 10),
  });

  function onCategoryChange(e) {
    setData((prev) => ({
      ...prev,
      category: e.target.value,
    }));

    setSubCategoryOptions(
      spendingContext.categories[
        spendingContext.categories.findIndex(
          (category) => category.id == e.target.value
        )
      ].subCategories.map((subCategory) => ({
        id: subCategory.id,
        value: subCategory.id,
        label: subCategory.name,
      }))
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.put(`/spending/${spendingId}`, data);

      if (response.data.error === false) {
        navigate("/protected/spending");
      } else {
        if (response.data.message === "Validation error.") {
          setErrors(response.data.details);
        } else if (
          typeof response.data.message === "object" &&
          Object.keys(response.data.message).includes("message")
        ) {
          setErrors([response.data.message.message]);
        } else if (typeof response.data.message === "string") {
          setErrors([response.data.message]);
        } else {
          setErrors(["Oops! Something's wrong, try again."]);
        }
      }
    } catch (err) {
      console.error(err);

      setErrors(["Oops! Something's wrong, try again."]);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative mx-4 sm:mx-20 w-full max-w-[600px] px-8 py-6 bg-background2 rounded-lg flex flex-col gap-4"
    >
      <button
        className="absolute -top-16 left-0"
        onClick={(e) => {
          e.preventDefault();
          navigate("/protected/spending");
        }}
      >
        <MdArrowBack className="text-4xl font-bold text-white" />
      </button>

      <h2 className="text-xl tracking-widest">EDIT SPENDING</h2>

      <CustomFormSelect
        containerStyle="flex-1"
        id="category"
        label="Category"
        value={data.category}
        options={spendingContext.categories.map((category) => ({
          id: category.id,
          value: category.id,
          label: category.name,
        }))}
        onChange={onCategoryChange}
      />

      <CustomFormSelect
        containerStyle="flex-1"
        id="subCategory"
        label="Sub-Category"
        value={data.subCategory}
        options={
          subCategoryOptions.length > 0 ? subCategoryOptions : subCategoryList
        }
        onChange={(e) => {
          setData((prev) => ({ ...prev, subCategory: e.target.value }));
        }}
      />

      <CustomFormInput
        id="amount"
        label="Amount"
        type="number"
        value={data.amount}
        placeholder="Enter amount here"
        onChange={(e) => {
          setData((prev) => ({ ...prev, amount: e.target.value }));
        }}
      />

      <CustomFormInput
        id="description"
        label="Description"
        type="text"
        value={data.description}
        placeholder="Enter description here"
        onChange={(e) => {
          setData((prev) => ({ ...prev, description: e.target.value }));
        }}
      />

      <CustomFormInput
        id="date"
        label="Date"
        type="date"
        value={data.date}
        onChange={(e) => {
          setData((prev) => ({ ...prev, date: e.target.value }));
        }}
      />

      <CustomButton type="submit" label="Edit" containerStyle="mt-4" />

      {errors.length > 0 ? <ErrorMessage errors={errors} /> : null}
    </form>
  );
}
