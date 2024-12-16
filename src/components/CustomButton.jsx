export default function CustomButton({ type, onClick, label, containerStyle }) {
  return (
    <button
      type={type}
      className={`py-2 px-6 bg-blue-600 rounded-lg h-fit w-fit uppercase text-white text-nowrap font-bold tracking-widest ${containerStyle}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
