import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Modal,
  Button,
  TextInput,
  Label,
  Select,
  Textarea,
  FileInput,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  ToggleSwitch
} from "flowbite-react";
import { toast, ToastContainer } from "react-toastify";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CgAdd } from "react-icons/cg";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getPlanBadge, getPlanBatchDetails, getPlans, planBadgeActiveDeactive } from "../../Reducer/PlanbadgeSlice";
import AddPlanBadgeModal from "./AddPlanBadgeModal";
import UpdatePlanBadgeModal from "./UpdatePlanBadgeModal";



const FlowbiteToggleSwitch = React.memo(
  ({ isActive, onToggle, isLoading, planId }) => {
    const handleToggle = useCallback(
      (checked) => {
        if (!isLoading) {
          onToggle(planId, checked);
        }
      },
      [planId, onToggle, isLoading]
    );

    return (
      <div className="flex items-center gap-3">
        <div className="relative">
          <ToggleSwitch
            checked={isActive}
            onChange={handleToggle}
            disabled={isLoading}
            color={isActive ? "green" : "red"}
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
            </div>
          )}
        </div>
        {/* <span className={`text-sm font-medium ${isActive ? 'text-green-600' : 'text-red-600'}`}>
        {isActive ? 'Active' : 'Inactive'}
      </span> */}
      </div>
    );
  }
);
const StatusCellRenderer = React.memo((props) => {
  const { data, onStatusToggle, loadingStates } = props;
  const isActive = data.status === "Active";
  const isLoading = loadingStates[data.id] || false;

  return (
    <FlowbiteToggleSwitch
      isActive={isActive}
      onToggle={onStatusToggle}
      isLoading={isLoading}
      planId={data.id}
    />
  );
});
const PlanBadgeManagement = () => {
  const { planBadgeList, singlePlanbdge,plans } = useSelector((state) => state?.planBad);
  const dispatch = useDispatch();
  const [openplanbadgeModal, setOpenPlanbadgeModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openPlanbadgeDetailsModal, setOpenPlanbadgeDetailsModal] = useState(false);
  const [pId, setpId] = useState();
  const navigate = useNavigate();
   const [loadingStates, setLoadingStates] = useState({}); 

  useEffect(() => {
    dispatch(getPlanBadge({ page: currentPage, limit: pageSize }));
  }, [dispatch, currentPage, pageSize]);

  console.log("planBadgeList", planBadgeList);

   const handleStatusToggle = useCallback(
      async (planId, newStatus) => {
        try {
          // Set loading state for this specific customer
          setLoadingStates((prev) => ({ ...prev, [planId]: true }));
  
          const statusValue = newStatus ? 1 : 0; // Convert boolean to API expected format
  
          // Prepare the API payload
          const payload = {
            plan_badge_id: planId,
            status: statusValue,
          };
  
          // Dispatch the API call
          const result = await dispatch(planBadgeActiveDeactive(payload)).unwrap();
  
          // Show success message
          toast.success(
            `Plan Badge ${newStatus ? "activated" : "deactivated"} successfully!`
          );
  
          // Refresh the customer list to get updated data
          dispatch(getPlanBadge({ page: currentPage, limit: pageSize }));
        } catch (error) {
          console.error("Error toggling Plan status:", error);
          toast.error(
            `Failed to ${
              newStatus ? "activate" : "deactivate"
            } Plan Badge. Please try again.`
          );
        } finally {
          // Remove loading state for this customer
          setLoadingStates((prev) => {
            const newState = { ...prev };
            delete newState[planId];
            return newState;
          });
        }
      },
      [dispatch, currentPage, pageSize]
    );

  const rowData = useMemo(() => {
    // Fixed: Check for planBadgeList.data instead of planBadgeList.res
    if (!planBadgeList?.data || !Array.isArray(planBadgeList.data)) {
      console.log("No plan badge data available or invalid format");
      return [];
    }

    // Fixed: Use planBadgeList.data directly
    return planBadgeList.data.map((mar) => ({
      id: mar?.id, // Ensure unique ID
      batch_name: mar?.batch_name || "",
      plan_name: mar?.Plan?.plan_name || "",
      price: mar?.Plan?.price || "",
      status: mar?.status === 1 ? "Active" : "Inactive",
      currency: mar?.Plan?.currency || "",
      frequency: mar?.Plan?.frequency || ""
    }));
  }, [planBadgeList]);

  const columnDefs = useMemo(() => [
    {
      field: "batch_name",
      headerName: "BADGE NAME",
      sortable: true,
      filter: true,
      minWidth: 150,
    },
    {
      field: "plan_name",
      headerName: "PLAN NAME",
      sortable: true,
      filter: true,
      minWidth: 200,
    },
    {
      field: "price",
      headerName: "PRICE",
      sortable: true,
      filter: true,
      minWidth: 150,
    },
    {
      field: "currency",
      headerName: "CURRENCY",
      sortable: true,
      filter: true,
      minWidth: 120,
    },
    {
      field: "frequency",
      headerName: "FREQUENCY",
      sortable: true,
      filter: true,
      minWidth: 150,
    },
    {
        field: "status",
        minWidth: 150,
        headerName: "STATUS",
        sortable: false, // Disable sorting since we have interactive component
        filter: false, // Disable filter since we have interactive component
        flex: 1,
        cellRenderer: StatusCellRenderer,
        cellRendererParams: {
          onStatusToggle: handleStatusToggle,
          loadingStates: loadingStates,
        },
      },
    {
      headerName: "ACTIONS",
      field: "actions",
      minWidth: 120,
      cellRenderer: (params) => (
        <Button
           onClick={() => handlePlanBadgeDetails(params?.data?.id)}
          className="border text-[#536EFF] border-[#536EFF] bg-white hover:bg-[#536EFF] hover:text-white text-xl px-4 py-0 my-1"
        >
          Update
        </Button>
      ),
    },
  ], []);

  const onPaginationChanged = useCallback(
    (params) => {
      const currentPageFromGrid = params.api.paginationGetCurrentPage() + 1;
      const pageSizeFromGrid = params.api.paginationGetPageSize();

      if (
        currentPageFromGrid !== currentPage ||
        pageSizeFromGrid !== pageSize
      ) {
        setCurrentPage(currentPageFromGrid);
        setPageSize(pageSizeFromGrid);
      }
    },
    [currentPage, pageSize]
  );

  const handleAddPlanBadge = () => {
    setOpenPlanbadgeModal(true);
    dispatch(getPlans())
  };

  const handlePlanBadgeDetails=(id)=>{
    setOpenPlanbadgeDetailsModal(true)
    setpId(id)
    dispatch(getPlanBatchDetails(id))
    dispatch(getPlans())
  }

  // Add debug logging
  console.log("rowData:", rowData);
  console.log("rowData length:", rowData.length);

  return (
    <div>
      <ToastContainer />
      <div className="wrapper_area my-0 mx-auto p-6 rounded-xl bg-white">
        <div className="h-full lg:h-screen">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Plan Badge List</h2>
            <Button
              onClick={() => handleAddPlanBadge()}
              className="bg-[#536EFF] hover:bg-[#E7E7FF] px-4 py-1 text-white hover:text-[#536EFF] text-base font-semibold flex justify-center items-center rounded-md"
            >
              <CgAdd className="text-[18px] mr-1" />
              Add Plan Badge
            </Button>
          </div>
          
          {/* Debug information - remove this in production */}
      

          <div
            className="ag-theme-alpine"
            style={{ height: 600, width: "100%" }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              onPaginationChanged={onPaginationChanged}
              paginationPageSize={pageSize}
              pagination={true} // Added pagination prop
              domLayout="normal" // Changed from autoHeight to normal
            />
          </div>
        </div>
      </div>
      {
        (openplanbadgeModal&&plans)&&(
          <AddPlanBadgeModal
          openplanbadgeModal={openplanbadgeModal}
          setOpenPlanbadgeModal={setOpenPlanbadgeModal}
          plans={plans}
          />
        )
      }
      {
        (openPlanbadgeDetailsModal&&singlePlanbdge)&&(
          <UpdatePlanBadgeModal
          openPlanbadgeDetailsModal={openPlanbadgeDetailsModal}
          setOpenPlanbadgeDetailsModal={setOpenPlanbadgeDetailsModal}
          singlePlanbdge={singlePlanbdge}
           plans={plans}
           pId={pId}
          />
        )
      }
    </div>
  );
};

export default PlanBadgeManagement;