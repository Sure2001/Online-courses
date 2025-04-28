import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "22", Orders: 0, Customers: 1 },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-blue-600 text-white">
          <CardContent className="p-4 flex flex-col items-center">
            <div className="text-2xl">Total Orders</div>
            <div className="text-4xl font-bold">3</div>
            <a href="#" className="underline text-sm mt-2">View more...</a>
          </CardContent>
        </Card>
        <Card className="bg-blue-600 text-white">
          <CardContent className="p-4 flex flex-col items-center">
            <div className="text-2xl">Total Sales</div>
            <div className="text-4xl font-bold">515</div>
            <a href="#" className="underline text-sm mt-2">View more...</a>
          </CardContent>
        </Card>
        <Card className="bg-blue-600 text-white">
          <CardContent className="p-4 flex flex-col items-center">
            <div className="text-2xl">Total Customers</div>
            <div className="text-4xl font-bold">2</div>
            <a href="#" className="underline text-sm mt-2">View more...</a>
          </CardContent>
        </Card>
        <Card className="bg-blue-600 text-white">
          <CardContent className="p-4 flex flex-col items-center">
            <div className="text-2xl">People Online</div>
            <div className="text-4xl font-bold">0</div>
            <a href="#" className="underline text-sm mt-2">View more...</a>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-4">World Map</h2>
            {/ Placeholder for the map /}
            <div className="bg-gray-100 h-64 flex items-center justify-center">
              World Map Here
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-4">Sales Analytics</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Orders" fill="#8884d8" />
                <Bar dataKey="Customers" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}