import { MdDelete, MdEdit } from "react-icons/md";

export default function SpendingCard({ data, handleEdit, handleDelete }) {
  return (
    <div className="p-4 bg-background2 rounded-lg flex flex-col gap-1">
      <div className="flex flex-row">
        <p className="flex-grow gap-4 uppercase text-sm text-stone-400">
          {data.category} &middot; {data.subCategory}
        </p>
        <p className="text-sm text-stone-400">{data.date}</p>
      </div>
      <p className="tracking-wide text-lg">{data.description}</p>
      <div className="flex flex-row gap-4">
        <p className="flex-grow mt-2 text-2xl font-bold tracking-widest text-stone-600 dark:text-stone-300">
          RM{data.cost}
        </p>
        <div className="flex flex-row gap-3">
          <button
            className="self-end flex flex-row gap-4"
            onClick={() => handleEdit(data.id)}
          >
            <MdEdit className="text-xl" />
          </button>
          <button
            className="self-end flex flex-row gap-4"
            onClick={() => handleDelete(data.id)}
          >
            <MdDelete className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
