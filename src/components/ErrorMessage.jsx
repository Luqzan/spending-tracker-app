export default function ErrorMessage({ errors }) {
  return (
    <div className="py-2 px-4 rounded-md bg-red-100 dark:bg-red-900 mt-2">
      {errors.map((error) => (
        <p key={error} className="text-red-700 dark:text-red-200">
          - {error}
        </p>
      ))}
    </div>
  );
}
