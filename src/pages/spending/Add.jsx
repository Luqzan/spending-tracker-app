import { useEffect, useState } from "react";
import CustomFormSelect from "../../components/CustomFormSelect";
import CustomFormInput from "../../components/CustomFormInput";
import CustomButton from "../../components/CustomButton";
import axios from "../../services/axios.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";

export default function Add() {
  const [categories, setCategories] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [errors, setErrors] = useState([]);

  const today = new Date();
  const [data, setData] = useState({
    category: "",
    subCategory: "",
    amount: "",
    description: "",
    date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(today.getDate()).padStart(2, "0")}`,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/spending/categories");

        if (!response.data.error) {
          setCategories(response.data.categories);
        }
      } catch (err) {
        console.error(err);

        setErrors(["Failed to load options. Try reloading."]);
      }
    };

    fetchCategories();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await axios.post("/spending/add", data);

    if (!response.data.error) {
      console.log("success");
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
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-4 sm:mx-20 w-full max-w-[600px] px-8 py-6 bg-background2 rounded-lg flex flex-col gap-4"
    >
      <h2 className="text-xl tracking-widest">RECORD NEW SPENDING</h2>
      <CustomFormSelect
        containerStyle="flex-1"
        id="category"
        label="Category"
        value={data.category}
        options={categories.map((category) => ({
          id: category.id,
          value: category.id,
          label: category.name,
        }))}
        onChange={(e) => {
          setData((prev) => ({
            ...prev,
            category: e.target.value,
          }));

          setSubCategoryOptions(
            categories[
              categories.findIndex((category) => category.id == e.target.value)
            ].subCategories.map((subCategory) => ({
              id: subCategory.id,
              value: subCategory.id,
              label: subCategory.name,
            }))
          );
        }}
      />

      <CustomFormSelect
        containerStyle="flex-1"
        id="subCategory"
        label="Sub-Category"
        value={data.subCategory}
        options={subCategoryOptions}
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

      <CustomButton type="submit" label="Add" containerStyle="mt-4" />

      {errors.length > 0 ? <ErrorMessage errors={errors} /> : null}
    </form>
  );
}
