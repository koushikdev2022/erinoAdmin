import DashboardCard from "../../components/DashboardCard.jsx";
import DashboardCardNew from "../../components/DashboardCardNew.jsx";
import TableOne from "../../components/TableOne.jsx";
const Dashboard = () => {
  return (
    <div className="wrapper_area my-0 mx-auto px-0">
      <div className="h-full lg:h-full">
        {/* <h1 className="text-2xl font-medium text-black mb-4">Dashboard</h1> */}
        <div className="mb-0">
          {/* <DashboardCard /> */}
          <DashboardCardNew />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
