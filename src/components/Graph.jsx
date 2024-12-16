import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function Graph() {
  const spendingMonth = [
    { month: "8", year: "2024", spending: 1000 },
    { month: "9", year: "2024", spending: 1200 },
    { month: "10", year: "2024", spending: 900 },
    { month: "11", year: "2024", spending: 1500 },
    { month: "12", year: "2024", spending: 1700 },
    { month: "1", year: "2025", spending: 800 },
    { month: "2", year: "2025", spending: 1100 },
    { month: "3", year: "2025", spending: 1300 },
    { month: "4", year: "2025", spending: 1000 },
    { month: "5", year: "2025", spending: 1200 },
    { month: "6", year: "2025", spending: 1400 },
  ];

  const data = spendingMonth.map((item) => ({
    ...item,
    label: `${item.month}/${item.year}`,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="py-2 px-4 rounded-full bg-foreground">
          <p className="text-background">{`Spent RM${payload[0].value} on ${label}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ right: 30 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3 3" />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="spending" fill="#1d4fbc" />
        <XAxis dataKey="label" />
        <YAxis />
      </BarChart>
    </ResponsiveContainer>
  );
}
