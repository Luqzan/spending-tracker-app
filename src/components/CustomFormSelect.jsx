export default function CustomFormSelect({
  id,
  label,
  value,
  onChange,
  options,
  containerStyle,
}) {
  return (
    <div className={`flex flex-col w-full gap-1 ${containerStyle}`}>
      <label className="text-sm tracking-widest" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="p-2 text-foreground bg-background text-sm tracking-widest rounded-md"
      >
        <option disabled value="">
          Choose {label}
        </option>

        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
