import React, { useEffect, useMemo, useState } from "react";
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
} from "flowbite-react";
import { ToastContainer } from "react-toastify";
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
import { getMarchent, getMarchentDetails } from "../../Reducer/MarchentSlice";
import MarchentDetailsModal from "./MachenDetailsModal";
import ShopModal from "./ShopModal";
import AddMarchant from "./AddMarchant";
import UpdateMarchentModal from "./UpdateMarchentModal";
import DeleModalMarchent from "./DeleModalMarchent";

const MerchantManagement = () => {
  const{marchentList,singleMarchent}=useSelector((state)=>state?.marchent)
  const dispatch=useDispatch()
  const [openAddMerchantModal, setOpenAddMerchantModal] = useState(false);
  const [openDeleteModalM, setOpenDeleteModalM] = useState(false);
  const [openMerchantDetailsModal, setOpenMerchantDetailsModal] =
    useState(false);
  const [openManageMerchantDetailsModal, setOpenManageMerchantDetailsModal] =
    useState(false);
    const[mId,setmId]=useState()
  const navigate = useNavigate();
  const[openShopModal,setOpenShopModal]=useState(false)
  useEffect(()=>{
dispatch(getMarchent())
  },[])
  console.log("marchentList",marchentList);
  
   const rowData = useMemo(() => {
    // Safety checks for undefined/null data
    if (!marchentList?.res || !Array.isArray(marchentList.res)) {
      console.log("No merchant data available or invalid format");
      return [];
    }

    return marchentList.res.map((mar, index) => ({
      id: mar?.id || `temp-${index}`, // Ensure unique ID
      fname: mar?.first_name || "",
      lname: mar?.last_name || "",
      email: mar?.email || "",
      phone: mar?.mobile || "",
      status: mar?.status === 1 ? "Active" : "Inactive",
      walletbalance: mar?.total_points_issued || 0,
      pointtransaction: mar?.total_expired_points || 0,
    }));
  }, [marchentList]);

 const columnDefs = useMemo(() => [
    {
      valueGetter: (params) => `${params.data.fname || ""} ${params.data.lname || ""}`.trim(),
      headerName: "MERCHANT NAME",
      sortable: true,
      filter: true,
      minWidth: 150,
    },
    {
      field: "email",
      headerName: "EMAIL ID",
      sortable: true,
      filter: true,
      minWidth: 200,
    },
    {
      field: "phone",
      headerName: "PHONE NUMBER",
      sortable: true,
      filter: true,
      minWidth: 150,
    },
    {
      field: "walletbalance",
      headerName: "WALLET BALANCE",
      sortable: true,
      filter: true,
      minWidth: 120,
    },
    {
      field: "pointtransaction",
      headerName: "POINT TRANSACTION",
      sortable: true,
      filter: true,
      minWidth: 150,
    },
    {
      field: "status",
      headerName: "STATUS",
      sortable: true,
      filter: true,
      minWidth: 100,
    },
    {
      headerName: "SHOPS",
      field: "shop",
      minWidth: 120,
      cellRenderer: (params) => (
        <Button
          onClick={() => handleMerchantShopDetails(params?.data?.id)}
          className="border text-[#536EFF] border-[#536EFF] bg-white hover:bg-[#536EFF] hover:text-white text-xl px-4 py-0 my-1"
        >
          Shop Details
        </Button>
      ),
    },
    {
      headerName: "ACTIONS",
      field: "actions",
      minWidth: 120,
      cellRenderer: (params) => (
        <Button
          onClick={() => handleMerchantDetails(params?.data?.id)}
          className="border text-[#536EFF] border-[#536EFF] bg-white hover:bg-[#536EFF] hover:text-white text-xl px-4 py-0 my-1"
        >
          View Details
        </Button>
      ),
    },
  ], []);

  const handleAddMerchant = (id) => {

    setOpenAddMerchantModal(true);
  };

  const handleMerchantDetails = (id) => {
    console.log("id",id);
    setmId(id)
    // dispatch(getMarchentDetails({vendor_id:id}))
    setOpenMerchantDetailsModal(true);
  };

    const handleMerchantShopDetails = (id) => {
    console.log("id",id);
    setmId(id)
    // dispatch(getMarchentDetails({vendor_id:id}))
    setOpenShopModal(true);
  };

 

  return (
    <div>
      <ToastContainer />
      <div className="wrapper_area my-0 mx-auto p-6 rounded-xl bg-white">
        <div className="h-full lg:h-screen">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Merchant List</h2>
            <Button
              onClick={() => handleAddMerchant()}
              className="bg-[#536EFF] hover:bg-[#E7E7FF] px-4 py-1 text-white hover:text-[#536EFF] text-base font-semibold flex justify-center items-center rounded-md"
            >
              <CgAdd className="text-[18px] mr-1" />
              Register New Merchant
            </Button>
          </div>
          <div
            className="ag-theme-alpine"
            style={{ height: 600, width: "100%" }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={10}
              domLayout="autoHeight"
              
            />
          </div>
        </div>
      </div>
      {/* Register New Merchant modal start here */}
     {
      openAddMerchantModal&&(
<AddMarchant
      openAddMerchantModal={openAddMerchantModal}
      setOpenAddMerchantModal={setOpenAddMerchantModal}
      />
      )
     } 
      {/* Register New Merchant modal ends here */}
      {/* Merchant Details modal start here */}
      {
        openMerchantDetailsModal&&(
  <MarchentDetailsModal
     openMerchantDetailsModal={openMerchantDetailsModal}
     setOpenMerchantDetailsModal={setOpenMerchantDetailsModal}
     setOpenManageMerchantDetailsModal={setOpenManageMerchantDetailsModal}
     mId={mId}

     />
        )
      }

      {
        openShopModal&&(
          <ShopModal
          openShopModal={openShopModal}
          setOpenShopModal={setOpenShopModal}
          mId={mId}
          />
        )
      }
   
      {/* Merchant Details modal ends here */}
      {/* Manage Merchant Details modal start here */}
     {
      openManageMerchantDetailsModal&&(
<UpdateMarchentModal
      openManageMerchantDetailsModal={openManageMerchantDetailsModal}
      setOpenManageMerchantDetailsModal={setOpenManageMerchantDetailsModal}
       mId={mId}
        setOpenDeleteModalM={setOpenDeleteModalM}
      />
      )
     } 

     {openDeleteModalM && (
        <DeleModalMarchent
          openDeleteModalM={openDeleteModalM}
          setOpenDeleteModalM={setOpenDeleteModalM}
         mId={mId}
          setOpenManageMerchantDetailsModal={setOpenManageMerchantDetailsModal}
        />
      )}
      {/* Manage Merchant Details modal ends here */}
    </div>
  );
};

export default MerchantManagement;
