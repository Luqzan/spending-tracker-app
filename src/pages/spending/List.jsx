import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import SpendingCard from "../../components/SpendingCard";

export default function List() {
  const data = [
    {
      id: 1,
      date: "11/12/2024",
      category: "Food",
      subCategory: "Dining Out",
      description: "Having dinner with family at Sukiya",
      cost: 120.56,
    },
    {
      id: 2,
      date: "11/12/2024",
      category: "Food",
      subCategory: "Dining Out",
      description: "Having dinner with family at Sukiya",
      cost: 120.56,
    },
    {
      id: 3,
      date: "11/12/2024",
      category: "Food",
      subCategory: "Dining Out",
      description: "Having dinner with family at Sukiya",
      cost: 120.56,
    },
    {
      id: 4,
      date: "11/12/2024",
      category: "Food",
      subCategory: "Dining Out",
      description: "Having dinner with family at Sukiya",
      cost: 120.56,
    },
    {
      id: 5,
      date: "11/12/2024",
      category: "Food",
      subCategory: "Dining Out",
      description: "Having dinner witsadasdash family at Sukiya",
      cost: 120.56,
    },
    {
      id: 6,
      date: "11/12/2024",
      category: "Food",
      subCategory: "Dining Out",
      description: "Having dinner with family at Sukiya",
      cost: 120.56,
    },
    {
      id: 7,
      date: "11/12/2024",
      category: "Food",
      subCategory: "Dining Out",
      description: "Having dinner with family at Sukiya",
      cost: 120.56,
    },
    {
      id: 8,
      date: "11/12/2024",
      category: "Food",
      subCategory: "Dining Out",
      description: "Having dinner with family at Sukiya",
      cost: 120.56,
    },
    {
      id: 9,
      date: "11/12/2024",
      category: "Food",
      subCategory: "Dining Out",
      description: "Having dinner with family at Sukiya",
      cost: 120.56,
    },
    {
      id: 10,
      date: "11/12/2024",
      category: "Food",
      subCategory: "Dining Out",
      description: "Having dinner with family at Sukiya",
      cost: 120.56,
    },
    {
      id: 11,
      date: "11/12/2024",
      category: "Food",
      subCategory: "Dining Out",
      description: "Having dinner with family at Sukiya",
      cost: 120.56,
    },
  ];

  const navigate = useNavigate();

  function handleAdd() {
    navigate("/protected/spending/add");
  }

  function handleEdit(id) {
    navigate(`/protected/spending/edit/${id}`);
  }

  function handleDelete(id) {
    console.log(id);
  }

  return (
    <div className="mx-4 sm:mx-20 w-full max-w-[900px] flex flex-col gap-4">
      <div className="sticky pt-12 pb-4 px-4 top-0 rounded-b-lg bg-stone-200 dark:bg-stone-700 flex flex-row items-center">
        <h2 className="flex-grow text-xl tracking-widest">SPENDING HISTORY</h2>
        <button
          className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center"
          onClick={handleAdd}
        >
          <MdAdd className="text-4xl font-bold text-white" />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {data.map((datum) => (
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
