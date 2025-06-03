import Topbar from "../components/TopBar";
import { Card } from "../components/ui/Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export const Dashboard = () => {
  const salesData = [
    { month: "Jan", sales: 4000, purchases: 2400 },
    { month: "Feb", sales: 3000, purchases: 1398 },
    { month: "Mar", sales: 2000, purchases: 9800 },
    { month: "Apr", sales: 2780, purchases: 3908 },
    { month: "May", sales: 1890, purchases: 4800 },
    { month: "Jun", sales: 2390, purchases: 3800 },
  ];

  const inventoryData = [
    { name: "Flour", value: 400, color: "#8884d8" },
    { name: "Sugar", value: 300, color: "#82ca9d" },
    { name: "Eggs", value: 200, color: "#ffc658" },
    { name: "Butter", value: 150, color: "#ff7300" },
  ];

  const stats = [
    { title: "Total Sales", value: "R 12,450", change: "+12.5%" },
    { title: "Total Purchases", value: "R 8,200", change: "+8.2%" },
    { title: "Active Orders", value: "23", change: "+5" },
    { title: "Low Stock Items", value: "7", change: "-2" },
  ];

  return (
    <div className=" bg-gray-50">
      <Topbar title="Dashboard" />
      <div className="p-6">
        <div className="text-center py-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Welcome to Dough Better Records
          </h2>
          <p className="text-gray-600">
            Your comprehensive bakery management system
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="p-6 shadow-md border-b border-gray-200 bg-white"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className="text-green-600 text-sm font-medium">
                  {stat.change}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 mt-20">
          <Card className="p-6 shadow-md border-b border-gray-200 bg-white">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Sales vs Purchases
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#3b82f6" />
                <Bar dataKey="purchases" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 shadow-md border-b border-gray-200 bg-white">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Inventory Distribution
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={inventoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={140}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {inventoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  );
};
