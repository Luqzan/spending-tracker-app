export default function AverageSpending({ spending }) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p>Average spending:</p>
        <div className="flex items-end gap-1">
          <h1>RM{spending}</h1>
          <p>/month</p>
        </div>
      </div>
      <div>
        <p>Max spending:</p>
        <div className="flex items-end gap-1">
          <h1>RM{spending}</h1>
          <p>/month</p>
        </div>
      </div>
      <div>
        <p>Min spending:</p>
        <div className="flex items-end gap-1">
          <h1>RM{spending}</h1>
          <p>/month</p>
        </div>
      </div>
    </div>
  );
}
