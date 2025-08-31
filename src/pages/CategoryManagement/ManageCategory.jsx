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
import { getPlans} from "../../Reducer/PlanbadgeSlice";

// import AddPlansModal from "./AddPlansModal";
// import UpdatePlanModal from "./UpdatePlanModal";
import { categoryActiveDeactive, getAllCategory, getCategoryDetails } from "../../Reducer/CategorySlice";
import AddCategoryModal from "./AddCategoryModal";
import UpdateCategoryModal from "./UpdateCategoryModal";
import ImageUpdateModal from "./ImageUpdateModal";

// Image Cell Renderer Component
const ImageCellRenderer = React.memo((props) => {
  const { value } = props;
  
  if (!value) {
    return <span className="text-gray-400">No Image</span>;
  }

  return (
    <div className="flex items-center justify-center py-2">
      <img
        src={value}
        alt="Category Banner"
        className="w-12 h-12 object-cover rounded-lg border border-gray-200"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'block';
        }}
      />
      <span 
        className="text-gray-400 text-sm hidden"
        style={{ display: 'none' }}
      >
        Image not found
      </span>
    </div>
  );
});

const FlowbiteToggleSwitch = React.memo(
  ({ isActive, onToggle, isLoading, cateId }) => {
    const handleToggle = useCallback(
      (checked) => {
        if (!isLoading) {
          onToggle(cateId, checked);
        }
      },
      [cateId, onToggle, isLoading]
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
      cateId={data.id}
    />
  );
});

const ManageCategory = () => {
  const { categoryList, singleCategory } = useSelector((state) => state?.cateMan);
  const dispatch = useDispatch();
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openCategoryDetailsModal1, setOpenCategoryDetailsModal1] = useState(false);
  const [openCategoryDetailsModal2, setOpenCategoryDetailsModal2] = useState(false);
  const [catId, setCatId] = useState();
  const navigate = useNavigate();
  const [loadingStates, setLoadingStates] = useState({}); 

  useEffect(() => {
    dispatch(getAllCategory({ page: currentPage, limit: pageSize }));
  }, [dispatch, currentPage, pageSize]);

  const handleStatusToggle = useCallback(
    async (cateId, newStatus) => {
      try {
        // Set loading state for this specific customer
        setLoadingStates((prev) => ({ ...prev, [cateId]: true }));

        const statusValue = newStatus ? 1 : 0; // Convert boolean to API expected format

        // Prepare the API payload
        const payload = {
          category_id: cateId,
          status: statusValue,
        };

        // Dispatch the API call
        const result = await dispatch(categoryActiveDeactive(payload)).unwrap();

        // Show success message
        toast.success(
          `Category ${newStatus ? "activated" : "deactivated"} successfully!`
        );

        // Refresh the customer list to get updated data
        dispatch(getAllCategory({ page: currentPage, limit: pageSize }));
      } catch (error) {
        console.error("Error toggling Plan status:", error);
        toast.error(
          `Failed to ${
            newStatus ? "activate" : "deactivate"
          } Category. Please try again.`
        );
      } finally {
        // Remove loading state for this customer
        setLoadingStates((prev) => {
          const newState = { ...prev };
          delete newState[cateId];
          return newState;
        });
      }
    },
    [dispatch, currentPage, pageSize]
  );

  const rowData = useMemo(() => {
    // Fixed: Check for categoryList.data instead of planBadgeList.res
    if (!categoryList?.data || !Array.isArray(categoryList.data)) {
      console.log("No Category data available or invalid format");
      return [];
    }

    // Fixed: Use categoryList.data directly and include banner
    return categoryList.data.map((mar) => ({
      id: mar?.id, // Ensure unique ID
      cat_name: mar?.cat_name,
      banner: mar?.banner, // Add banner URL for image display
      status: mar?.status === 1 ? "Active" : "Inactive",
    }));
  }, [categoryList]);

  const columnDefs = useMemo(() => [
    {
      field: "banner",
      headerName: "IMAGE",
      sortable: false,
      filter: false,
      cellRenderer: ImageCellRenderer,
    },
    {
      field: "cat_name",
      headerName: "CATEGORY NAME",
      sortable: true,
      filter: true,
    },
    {
      field: "status",
      headerName: "STATUS",
      sortable: false, // Disable sorting since we have interactive component
      filter: false, // Disable filter since we have interactive component
     
      cellRenderer: StatusCellRenderer,
      cellRendererParams: {
        onStatusToggle: handleStatusToggle,
        loadingStates: loadingStates,
      },
    },
        {
      headerName: "ACTIONS",
      field: "actions",
   
      cellRenderer: (params) => (
        <Button
          onClick={() => handleCateImage(params?.data?.id)}
          className="border text-[#536EFF] border-[#536EFF] bg-white hover:bg-[#536EFF] hover:text-white text-xl px-4 py-0 my-1"
        >
          Update Image
        </Button>
      ),
    },
    {
      headerName: "ACTIONS",
      field: "actions",
      width: 120,
      cellRenderer: (params) => (
        <Button
          onClick={() => handleCateDetails(params?.data?.id)}
          className="border text-[#536EFF] border-[#536EFF] bg-white hover:bg-[#536EFF] hover:text-white text-xl px-4 py-0 my-1"
        >
          Update
        </Button>
      ),
    },
  ], [handleStatusToggle, loadingStates]);

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

  const handleAddCate = () => {
    setOpenCategoryModal(true);
    //dispatch(getPlans())
  };

  const handleCateDetails = (id) => {
    setOpenCategoryDetailsModal1(true)
    setCatId(id)
    dispatch(getCategoryDetails(id))
    
  }
  const handleCateImage=(id)=>{
     setOpenCategoryDetailsModal2(true)
    setCatId(id)
    dispatch(getCategoryDetails(id))
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
            <h2 className="text-2xl font-semibold">Category List</h2>
            <Button
              onClick={() => handleAddCate()}
              className="bg-[#536EFF] hover:bg-[#E7E7FF] px-4 py-1 text-white hover:text-[#536EFF] text-base font-semibold flex justify-center items-center rounded-md"
            >
              <CgAdd className="text-[18px] mr-1" />
              Add Category
            </Button>
          </div>

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
        openCategoryModal && (
          <AddCategoryModal
            openCategoryModal={openCategoryModal}
            setOpenCategoryModal={setOpenCategoryModal}
          />
        )
      }
      {
        openCategoryDetailsModal1&&(
          <UpdateCategoryModal
          openCategoryDetailsModal1={openCategoryDetailsModal1}
          setOpenPlansDetailsModal1={setOpenCategoryDetailsModal1}
          catId={catId}
          singleCategory={singleCategory}
          />
        )
      }

       {
        setOpenCategoryDetailsModal2&&(
          <ImageUpdateModal
          openCategoryDetailsModal2={openCategoryDetailsModal2}
          setOpenPlansDetailsModal2={setOpenCategoryDetailsModal2}
          catId={catId}
          singleCategory={singleCategory}
          />
        )
      }
    </div>
  );
};

export default ManageCategory;