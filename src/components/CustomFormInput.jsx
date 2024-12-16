export default function CustomFormInput({
  id,
  label,
  type,
  value,
  onChange,
  containerStyle,
  placeholder,
}) {
  return (
    <div className={`flex flex-col gap-1 ${containerStyle}`}>
      <label className="text-sm tracking-widest" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="p-2 text-foreground text-sm tracking-widest rounded-md bg-background"
      />
    </div>
  );
}
