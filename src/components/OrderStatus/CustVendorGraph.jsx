import { Select } from "flowbite-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Rectangle,
  Pie,
  PieChart,
} from "recharts";
import { getdashBoardDataGraph } from "../../Reducer/DashboardSliceNew";
const data = [
  {
    name: "Page A",
    Vendor: 4000,
    Customers: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    Vendor: 3000,
    Customers: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    Vendor: 2000,
    Customers: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    Vendor: 2780,
    Customers: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    Vendor: 1890,
    Customers: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    Vendor: 2390,
    Customers: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    Vendor: 3490,
    Customers: 4300,
    amt: 2100,
  },
];
const CustVendorGraph=()=>{
  const {graphData}=useSelector((state)=>state?.dashNew)
  const dispatch=useDispatch()
  useEffect(()=>{
  dispatch(getdashBoardDataGraph({ year: "2025"}))
  },[])
  console.log("graphData",graphData);
    const transformedData = graphData?.data?.monthlyData?.map((item) => ({
    name: item.month,
    Customers: item.customers,
    Vendor: item.vendors,
  })) || [];

    const customerColor = graphData?.data?.chartConfig?.colors?.customers || "#8884d8";
  const vendorColor = graphData?.data?.chartConfig?.colors?.vendors || "#82ca9d";
    return(
        <>
         <div className="bg-white rounded-xl px-4 py-4">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl text-[#566A7F] font-medium">
            Vendor and Customer Resgistrations
          </h3>
          <Select id="countries" required>
            <option>This Month</option>
            <option>This Year</option>
          </Select>
        </div>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={transformedData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="Customers"
                fill={customerColor}
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="Vendor"
                fill={vendorColor}
                activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
        </>
    )
}
export default CustVendorGraph