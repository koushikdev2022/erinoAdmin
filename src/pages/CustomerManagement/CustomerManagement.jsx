import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
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
import { HiOutlineMail, HiSearch } from "react-icons/hi";
import { FiPhoneCall } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getCustomer, getCustomerDetails } from "../../Reducer/CustomerSlice";
import CustomerDetalisModal from "./CustomerDetalisModal";
import ManageCustomerDetailsModal from "./ManageCustomerDetailsModal";
import DeleModal from "./DeleModal";

// Move ActionButtonRenderer outside component to prevent re-creation
const ActionButtonRenderer = React.memo((props) => {
  const handleClick = useCallback(() => {
    console.log('Button clicked with data:', props.data);
    props.onViewDetails(props.data);
  }, [props.data, props.onViewDetails]);

  return (
    <Button
      onClick={handleClick}
      className="border text-[#536EFF] border-[#536EFF] bg-white hover:bg-[#536EFF] hover:text-white text-xl px-4 py-0 my-1"
    >
      View Details
    </Button>
  );
});

const CustomerManagement = () => {
  const [openCustomerDetailsModal, setOpenCustomerDetailsModal] = useState(false);
  const [openManageCustomerDetailsModal, setOpenManageCustomerDetailsModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [custId, setCustId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const gridRef = useRef();

  const dispatch = useDispatch();
  const { customerLists, loading, error, singleCustomer } = useSelector((state) => state?.coustomers);

  useEffect(() => {
    dispatch(getCustomer({ page: currentPage, limit: pageSize }));
  }, [dispatch, currentPage, pageSize]);

  const navigate = useNavigate();

  // Memoize transformed data to prevent unnecessary recalculations
  const transformedRowData = useMemo(() => {
    return customerLists?.data ? customerLists.data.map(customer => ({
      id: customer.id,
      name: customer.full_name,
      phone: customer.mobile,
      balance: `₹${customer.wallet?.balance || '0'}`,
      points: `${customer.promoCoins?.total_points || 0} Points`,
      pointsstatus: `${customer.promoCoins?.valid_points || 0}/${customer.promoCoins?.expired_points || 0}`,
      status: customer.status === 1 ? "Active" : "Inactive",
      lasttransaction: customer.last_transaction?.created_at 
        ? new Date(customer.last_transaction.created_at).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })
        : "N/A",
      originalData: customer
    })) : [];
  }, [customerLists?.data]);

  // Stable callback for handling customer details
  const handleCustomerDetails = useCallback((customerData) => {
    dispatch(getCustomerDetails(customerData?.id));
    setSelectedCustomer(customerData);
    setOpenCustomerDetailsModal(true);
    setCustId(customerData?.id);
  }, [dispatch]);

  // Memoize column definitions with stable callback
  const columnDefs = useMemo(() => [
    {
      field: "name",
      headerName: "CUSTOMER NAME",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      field: "phone",
      headerName: "PHONE NUMBER",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      field: "balance",
      headerName: "WALLET BALANCE",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      field: "points",
      headerName: "TOTAL POINTS",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      field: "pointsstatus",
      headerName: "POINTS STATUS (Valid/Expired)",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      field: "status",
      headerName: "STATUS",
      sortable: true,
      filter: true,
      flex: 1,
      cellStyle: (params) => {
        return params.value === 'Active' 
          ? { color: '#10B981', fontWeight: 'bold' }
          : { color: '#EF4444', fontWeight: 'bold' };
      }
    },
    {
      field: "lasttransaction",
      headerName: "LAST TRANSACTION",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "ACTIONS",
      field: "actions",
      cellRenderer: ActionButtonRenderer,
      cellRendererParams: {
        onViewDetails: handleCustomerDetails
      },
      flex: 1,
      sortable: false,
      filter: false,
    },
  ], [handleCustomerDetails]);

  // Memoize filtered data
  const filteredData = useMemo(() => {
    if (!searchText) {
      return transformedRowData;
    }
    return transformedRowData.filter(row => {
      return Object.values(row).some(value => 
        String(value).toLowerCase().includes(searchText.toLowerCase())
      );
    });
  }, [searchText, transformedRowData]);

  // Stable search handlers
  const onSearchTextChange = useCallback((e) => {
    setSearchText(e.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchText("");
  }, []);

  const onGridReady = useCallback((params) => {
    gridRef.current = params;
  }, []);

  const handleManageCustomerDetails = useCallback(() => {
    setOpenManageCustomerDetailsModal(true);
    setOpenCustomerDetailsModal(false);
  }, []);

  // Handle pagination
  const onPaginationChanged = useCallback((params) => {
    const currentPageFromGrid = params.api.paginationGetCurrentPage() + 1;
    const pageSizeFromGrid = params.api.paginationGetPageSize();
    
    if (currentPageFromGrid !== currentPage || pageSizeFromGrid !== pageSize) {
      setCurrentPage(currentPageFromGrid);
      setPageSize(pageSizeFromGrid);
    }
  }, [currentPage, pageSize]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading customers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">Error loading customers: {error.message || 'Unknown error'}</div>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
      <div className="wrapper_area my-0 mx-auto p-6 rounded-xl bg-white">
        <div className="h-full lg:h-screen">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Customer List</h2>
            {customerLists?.pagination && (
              <div className="text-sm text-gray-500">
                Total: {customerLists.pagination.total_count} customers
              </div>
            )}
          </div>
          
          <div className="mb-4 flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <TextInput
                type="text"
                placeholder="Search customers..."
                value={searchText}
                onChange={onSearchTextChange}
                className="pl-10"
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
            {searchText && (
              <Button
                onClick={clearSearch}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Clear
              </Button>
            )}
          </div>
          
          <div
            className="ag-theme-alpine"
            style={{ height: 600, width: "100%" }}
          >
            <AgGridReact
              ref={gridRef}
              rowData={filteredData}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={pageSize}
              domLayout="autoHeight"
              onPaginationChanged={onPaginationChanged}
              onGridReady={onGridReady}
              loadingOverlayComponent={'Loading customers...'}
              noRowsOverlayComponent={'No customers found'}
              suppressCellFocus={true}
              // Add these props to improve performance
              suppressRowClickSelection={true}
              animateRows={false}
              enableCellTextSelection={false}
            />
          </div>
        </div>
      </div>

      {/* Customer Details modal */}
      {openCustomerDetailsModal && (
        <CustomerDetalisModal
          openCustomerDetailsModal={openCustomerDetailsModal}
          setOpenCustomerDetailsModal={setOpenCustomerDetailsModal}
          setOpenManageCustomerDetailsModal={setOpenManageCustomerDetailsModal}
          selectedCustomer={selectedCustomer}
        />
      )}

      {/* Manage Customer Details modal */}
      {openManageCustomerDetailsModal && (
        <ManageCustomerDetailsModal
          openManageCustomerDetailsModal={openManageCustomerDetailsModal}
          setOpenManageCustomerDetailsModal={setOpenManageCustomerDetailsModal}
          selectedCustomer={singleCustomer}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}

      {/* Delete modal */}
      {openDeleteModal && (
        <DeleModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          selectedCustomer={singleCustomer}
          setOpenManageCustomerDetailsModal={setOpenManageCustomerDetailsModal}
        />
      )}
    </div>
  );
};

export default CustomerManagement;