import React, { useEffect } from "react";
import { AiOutlineTransaction } from "react-icons/ai";
import { FaCalendarDays, FaUsers } from "react-icons/fa6";
import { gCurve, oCurve, rCurve } from "../assets/images/images";
import { MdSupervisorAccount } from "react-icons/md";
import { IoMdTrendingDown, IoMdTrendingUp } from "react-icons/io";
import { HiUsers } from "react-icons/hi2";
import { BiWallet } from "react-icons/bi";
import { VscActivateBreakpoints } from "react-icons/vsc";

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

//
const dataPointActivity = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

//
const dataAdminWalletBalance = [
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

import { Select } from "flowbite-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getdashBoardData } from "../Reducer/DashboardSliceNew";
import AdminWalletBalance from "./OrderStatus/AdminWalletBalance";
import CustVendorGraph from "./OrderStatus/CustVendorGraph"

const DashboardCardNew = () => {
  const {dashData}=useSelector((state)=>state?.dashNew)
  const dispatch=useDispatch()
  useEffect(()=>{
dispatch(getdashBoardData())
  },[])
  console.log("dashData",dashData);
  
  return (
    <div>
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl px-4 py-4">
          <div className="mb-10 flex justify-between items-center">
            <div className="">
              <p className="text-[#636466] text-sm font-normal pb-1.5">
                Total Customers
              </p>
              <h3 className="text-[#202224] text-[24px] leading-[32px] font-medium pb-2">
                {dashData?.data?.valid_customer}
              </h3>
            </div>
            <div className="bg-[#E0E1FF] rounded-[6px] w-[56px] h-[56px] flex justify-center items-center">
              <FaUsers className="text-[#536EFF] text-3xl" />
            </div>
          </div>
          <div className="flex items-center">
            <IoMdTrendingUp className="text-[#00B69B] text-2xl mr-2" />
            <p className="text-[#636466] text-sm font-normal pb-0">
              <span className="text-[#00B69B]">8.5%</span> Up from yesterday
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl px-4 py-4">
          <div className="mb-10 flex justify-between items-center">
            <div className="">
              <p className="text-[#636466] text-sm font-normal pb-1.5">
                Total Merchants
              </p>
              <h3 className="text-[#202224] text-[24px] leading-[32px] font-medium pb-2">
                {dashData?.data?.valid_vendor}
              </h3>
            </div>
            <div className="bg-[#FFF5DF] rounded-[6px] w-[56px] h-[56px] flex justify-center items-center">
              <HiUsers className="text-[#FFAB00] text-3xl" />
            </div>
          </div>
          <div className="flex items-center">
            <IoMdTrendingUp className="text-[#00B69B] text-2xl mr-2" />
            <p className="text-[#636466] text-sm font-normal pb-0">
              <span className="text-[#00B69B]">8.5%</span> Up from yesterday
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl px-4 py-4">
          <div className="mb-10 flex justify-between items-center">
            <div className="">
              <p className="text-[#636466] text-sm font-normal pb-1.5">
                Wallet Balance
              </p>
              <h3 className="text-[#202224] text-[24px] leading-[32px] font-medium pb-2">
                ₹35111
              </h3>
            </div>
            <div className="bg-[#EEFFD5] rounded-[6px] w-[56px] h-[56px] flex justify-center items-center">
              <BiWallet className="text-[#568118] text-3xl" />
            </div>
          </div>
          <div className="flex items-center">
            <IoMdTrendingDown className="text-[#FF3E1D] text-2xl mr-2" />
            <p className="text-[#636466] text-sm font-normal pb-0">
              <span className="text-[#FF3E1D]">4.3%</span> Down from yesterday
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl px-4 py-4">
          <div className="mb-10 flex justify-between items-center">
            <div className="">
              <p className="text-[#636466] text-sm font-normal pb-1.5">
                Customers Points Overview
              </p>
              <h3 className="text-[#202224] text-[24px] leading-[32px] font-medium pb-2">
                40,689
              </h3>
            </div>
            <div className="bg-[#F5E0FF] rounded-[6px] w-[56px] h-[56px] flex justify-center items-center">
              <VscActivateBreakpoints className="text-[#D516BC] text-3xl" />
            </div>
          </div>
          <div className="flex items-center">
            <IoMdTrendingUp className="text-[#00B69B] text-2xl mr-2" />
            <p className="text-[#636466] text-sm font-normal pb-0">
              <span className="text-[#00B69B]">8.5%</span> Up from yesterday
            </p>
          </div>
        </div>
      </div>

   <AdminWalletBalance/>
<CustVendorGraph/>
      {/* <div className="bg-white rounded-xl px-4 py-4">
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
              data={data}
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
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="Vendor"
                fill="#82ca9d"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div> */}
    </div>
  );
};

export default DashboardCardNew;
