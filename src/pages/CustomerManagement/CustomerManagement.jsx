// import React, { useEffect, useState } from "react";
// import {
//   Modal,
//   Button,
//   TextInput,
//   Label,
//   Select,
//   Textarea,
//   FileInput,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeadCell,
//   TableRow,
// } from "flowbite-react";
// import { ToastContainer } from "react-toastify";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
// import { BiSolidMessageSquareEdit } from "react-icons/bi";
// import { MdDelete } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import { CgAdd } from "react-icons/cg";
// import { HiOutlineMail } from "react-icons/hi";
// import { FiPhoneCall } from "react-icons/fi";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { getCustomer } from "../../Reducer/CustomerSlice";

// const CustomerManagement = () => {
//   const [openCustomerDetailsModal, setOpenCustomerDetailsModal] =
//     useState(false);
//   const [openManageCustomerDetailsModal, setOpenManageCustomerDetailsModal] =
//     useState(false);
//     const dispatch=useDispatch()
//     const{customerLists}=useSelector((state)=>state?.coustomers)
//     useEffect(()=>{
// dispatch(getCustomer())
//     },[])
//   const navigate = useNavigate();
//   const [rowData] = useState([
//     {
//       name: "Erik Sarkar",
//       phone: "+91 -3721909981",
//       balance: "₹2300",
//       points: "1000 Points",
//       pointsstatus: "520/130",
//       status: "Active",
//       lasttransaction: "03 Jul 2025",
//     },
//   ]);

//   const [columnDefs] = useState([
//     {
//       field: "name",
//       headerName: "CUSTOMER NAME",
//       sortable: true,
//       filter: true,
//     },
//     {
//       field: "phone",
//       headerName: "PHONE NUMBER",
//       sortable: true,
//       filter: true,
//     },
//     {
//       field: "balance",
//       headerName: "WALLET BALANCE",
//       sortable: true,
//       filter: true,
//     },
//     {
//       field: "points",
//       headerName: "TOTAL POINTS",
//       sortable: true,
//       filter: true,
//     },
//     {
//       field: "pointsstatus",
//       headerName: "POINTS STATUS ( Valid/Expired)",
//       sortable: true,
//       filter: true,
//     },
//     {
//       field: "status",
//       headerName: "STATUS",
//       sortable: true,
//       filter: true,
//     },
//     {
//       field: "lasttransaction",
//       headerName: "LAST TRANSACTION",
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: "ACTIONS",
//       field: "actions",
//       cellRenderer: () => (
//         <Button
//           onClick={() => handleCustomerDetails()}
//           className="border text-[#536EFF] border-[#536EFF] bg-white hover:bg-[#536EFF] hover:text-white text-xl px-4 py-0 my-1"
//         >
//           View Details
//         </Button>
//       ),
//     },
//   ]);

//   const handleCustomerDetails = () => {
//     setOpenCustomerDetailsModal(true);
//   };

//   const handleManageCustomerDetails = () => {
//     setOpenManageCustomerDetailsModal(true);
//     setOpenCustomerDetailsModal(false);
//   };
//   return (
//     <div>
//       <ToastContainer />
//       <div className="wrapper_area my-0 mx-auto p-6 rounded-xl bg-white">
//         <div className="h-full lg:h-screen">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-semibold">Customer List</h2>
//           </div>
//           <div
//             className="ag-theme-alpine"
//             style={{ height: 600, width: "100%" }}
//           >
//             <AgGridReact
//               rowData={rowData}
//               columnDefs={columnDefs}
//               pagination={true}
//               paginationPageSize={10}
//               domLayout="autoHeight"
//             />
//           </div>
//         </div>
//       </div>
//       {/* Customer Details modal start here */}
//       <Modal
//         show={openCustomerDetailsModal}
//         onClose={() => setOpenCustomerDetailsModal(false)}
//       >
//         <Modal.Header className="text-[#435971]">Customer Details</Modal.Header>
//         <Modal.Body>
//           <div className="space-y-4 h-[700px] overflow-y-scroll">
//             <h3 className="text-base text-[#191919] font-bold mb-1">Details</h3>
//             <div className="flex gap-4">
//               <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
//                 Customer Name
//               </div>
//               <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
//                 Erik Sarkar
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
//                 Email Id
//               </div>
//               <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
//                 ErikSarkar@gmail.com
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
//                 Phone Number
//               </div>
//               <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
//                 +91 90885 67890
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
//                 Last Login Date
//               </div>
//               <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
//                 03 Jul 2025
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
//                 Last Login Time
//               </div>
//               <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
//                 6:12 PM
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
//                 Total Orders
//               </div>
//               <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
//                 12
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
//                 Redemptions
//               </div>
//               <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
//                 10
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
//                 Referrals Made
//               </div>
//               <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
//                 2
//               </div>
//             </div>
//             <h3 className="text-base text-[#191919] font-bold mb-1">
//               Wallets Balance
//             </h3>
//             <div className="flex gap-4">
//               <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
//                 Current Balance
//               </div>
//               <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
//                 ₹ 20000
//               </div>
//             </div>
//             <div className="mt-4 border border-[#E5E5E5] rounded-lg overflow-hidden">
//               <h3 className="text-[#697A8D] text-sm font-semibold border-b border-[#E5E5E5] py-3 pl-6">
//                 Wallet Transaction History
//               </h3>
//               <div className="overflow-x-auto">
//                 <Table striped>
//                   <TableHead>
//                     <TableHeadCell className="font-semibild">
//                       Date
//                     </TableHeadCell>
//                     <TableHeadCell className="font-semibild">
//                       Type
//                     </TableHeadCell>
//                     <TableHeadCell className="font-semibild">
//                       ₹ 500
//                     </TableHeadCell>
//                     <TableHeadCell className="font-semibild">
//                       Reason
//                     </TableHeadCell>
//                   </TableHead>
//                   <TableBody className="divide-y">
//                     <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
//                       <TableCell className="py-2 text-[#697A8D]">
//                         03-07-25
//                       </TableCell>
//                       <TableCell className="py-2 text-[#05923C]">
//                         Credit
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         ₹ 500
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         Refund
//                       </TableCell>
//                     </TableRow>
//                     <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
//                       <TableCell className="py-2 text-[#697A8D]">
//                         03-07-25
//                       </TableCell>
//                       <TableCell className="py-2 text-[#05923C]">
//                         Credit
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         ₹ 500
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         Refund
//                       </TableCell>
//                     </TableRow>
//                     <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
//                       <TableCell className="py-2 text-[#697A8D]">
//                         03-07-25
//                       </TableCell>
//                       <TableCell className="py-2 text-[#05923C]">
//                         Credit
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         ₹ 500
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         Refund
//                       </TableCell>
//                     </TableRow>
//                     <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
//                       <TableCell className="py-2 text-[#697A8D]">
//                         03-07-25
//                       </TableCell>
//                       <TableCell className="py-2 text-[#F55D43]">
//                         Debit
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         ₹ 500
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         Withdrawal
//                       </TableCell>
//                     </TableRow>
//                     <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
//                       <TableCell className="py-2 text-[#697A8D]">
//                         03-07-25
//                       </TableCell>
//                       <TableCell className="py-2 text-[#F55D43]">
//                         Debit
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         ₹ 500
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         Withdrawal
//                       </TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </div>
//             </div>
//             <h3 className="text-base text-[#191919] font-bold mb-1">
//               Points History
//             </h3>
//             <div className="flex gap-4">
//               <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
//                 Total Points
//               </div>
//               <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
//                 750 pts
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
//                 Valid Points
//               </div>
//               <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
//                 650 pts
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
//                 Expired Points
//               </div>
//               <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
//                 100 pts
//               </div>
//             </div>
//             <div className="mt-4 border border-[#E5E5E5] rounded-lg overflow-hidden">
//               <h3 className="text-[#697A8D] text-sm font-semibold border-b border-[#E5E5E5] py-3 pl-6">
//                 Source & Expiry
//               </h3>
//               <div className="overflow-x-auto">
//                 <Table striped>
//                   <TableHead>
//                     <TableHeadCell className="font-semibild">
//                       Source
//                     </TableHeadCell>
//                     <TableHeadCell className="font-semibild">
//                       Points
//                     </TableHeadCell>
//                     <TableHeadCell className="font-semibild">
//                       Earned on
//                     </TableHeadCell>
//                     <TableHeadCell className="font-semibild">
//                       Expiry Date
//                     </TableHeadCell>
//                   </TableHead>
//                   <TableBody className="divide-y">
//                     <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
//                       <TableCell className="py-2 text-[#697A8D]">
//                         Signup Bonus
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">100</TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         01 Jul 2025
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         31 Aug 2025
//                       </TableCell>
//                     </TableRow>
//                     <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
//                       <TableCell className="py-2 text-[#697A8D]">
//                         Order Reward
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">300</TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         01 Jul 2025
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         31 Aug 2025
//                       </TableCell>
//                     </TableRow>
//                     <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
//                       <TableCell className="py-2 text-[#697A8D]">
//                         Referral
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">250</TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         01 Jul 2025
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         31 Aug 2025
//                       </TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </div>
//             </div>
//           </div>
//         </Modal.Body>
//         <Modal.Footer className="flex justify-end">
//           <Button
//             className="bg-white text-gray-700 hover:bg-[#9b1c1c] hover:text-white border border-gray-300"
//             onClick={() => setOpenCustomerDetailsModal(false)}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleManageCustomerDetails}
//             className="bg-[#686AF8] hover:bg-black"
//           >
//             Manage Customer
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       {/* Customer Details modal ends here */}
//       {/* Manage Customer Details modal start here */}
//       <Modal
//         show={openManageCustomerDetailsModal}
//         onClose={() => setOpenManageCustomerDetailsModal(false)}
//       >
//         <Modal.Header className="text-[#435971]">Customer Details</Modal.Header>
//         <Modal.Body>
//           <div className="space-y-4 h-[700px] overflow-y-scroll">
//             <h3 className="text-base text-[#191919] font-bold mb-1">Details</h3>
//             <div className="w-full">
//               <div className="w-full">
//                 <div className="mb-1 block">
//                   <Label value="Customer Name" />
//                 </div>
//                 <TextInput type="text" placeholder="Erik Sarkar" required />
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="w-6/12">
//                 <div className="mb-1 block">
//                   <Label value="Email Id" />
//                 </div>
//                 <TextInput
//                   type="email"
//                   placeholder="ErikSarkar@gmail.com"
//                   required
//                 />
//               </div>
//               <div className="w-6/12">
//                 <div className="mb-1 block">
//                   <Label value="Phone Number " />
//                 </div>
//                 <TextInput type="text" placeholder="1234567890" required />
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
//                 Last Login Date
//               </div>
//               <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
//                 03 Jul 2025
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
//                 Last Login Time
//               </div>
//               <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
//                 6:12 PM
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
//                 Total Orders
//               </div>
//               <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
//                 12
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
//                 Redemptions
//               </div>
//               <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
//                 10
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
//                 Referrals Made
//               </div>
//               <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
//                 2
//               </div>
//             </div>

//             <h3 className="text-base text-[#191919] font-bold mb-1">
//               Wallets Balance
//             </h3>
//             <div className="flex gap-4">
//               <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
//                 Current Balance
//               </div>
//               <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
//                 ₹ 20000
//               </div>
//             </div>
//             <div className="mt-4 border border-[#E5E5E5] rounded-lg overflow-hidden">
//               <h3 className="text-[#697A8D] text-sm font-semibold border-b border-[#E5E5E5] py-3 pl-6">
//                 Wallet Transaction History
//               </h3>
//               <div className="overflow-x-auto">
//                 <Table striped>
//                   <TableHead>
//                     <TableHeadCell className="font-semibild">
//                       Date
//                     </TableHeadCell>
//                     <TableHeadCell className="font-semibild">
//                       Type
//                     </TableHeadCell>
//                     <TableHeadCell className="font-semibild">
//                       ₹ 500
//                     </TableHeadCell>
//                     <TableHeadCell className="font-semibild">
//                       Reason
//                     </TableHeadCell>
//                   </TableHead>
//                   <TableBody className="divide-y">
//                     <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
//                       <TableCell className="py-2 text-[#697A8D]">
//                         03-07-25
//                       </TableCell>
//                       <TableCell className="py-2 text-[#05923C]">
//                         Credit
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         ₹ 500
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         Refund
//                       </TableCell>
//                     </TableRow>
//                     <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
//                       <TableCell className="py-2 text-[#697A8D]">
//                         03-07-25
//                       </TableCell>
//                       <TableCell className="py-2 text-[#05923C]">
//                         Credit
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         ₹ 500
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         Refund
//                       </TableCell>
//                     </TableRow>
//                     <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
//                       <TableCell className="py-2 text-[#697A8D]">
//                         03-07-25
//                       </TableCell>
//                       <TableCell className="py-2 text-[#05923C]">
//                         Credit
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         ₹ 500
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         Refund
//                       </TableCell>
//                     </TableRow>
//                     <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
//                       <TableCell className="py-2 text-[#697A8D]">
//                         03-07-25
//                       </TableCell>
//                       <TableCell className="py-2 text-[#F55D43]">
//                         Debit
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         ₹ 500
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         Withdrawal
//                       </TableCell>
//                     </TableRow>
//                     <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
//                       <TableCell className="py-2 text-[#697A8D]">
//                         03-07-25
//                       </TableCell>
//                       <TableCell className="py-2 text-[#F55D43]">
//                         Debit
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         ₹ 500
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         Withdrawal
//                       </TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </div>
//             </div>
//             <h3 className="text-base text-[#191919] font-bold mb-1">
//               Points History
//             </h3>
//             <div className="flex gap-4">
//               <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
//                 Total Points
//               </div>
//               <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
//                 750 pts
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
//                 Valid Points
//               </div>
//               <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
//                 650 pts
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
//                 Expired Points
//               </div>
//               <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
//                 100 pts
//               </div>
//             </div>
//             <div className="mt-4 border border-[#E5E5E5] rounded-lg overflow-hidden">
//               <h3 className="text-[#697A8D] text-sm font-semibold border-b border-[#E5E5E5] py-3 pl-6">
//                 Source & Expiry
//               </h3>
//               <div className="overflow-x-auto">
//                 <Table striped>
//                   <TableHead>
//                     <TableHeadCell className="font-semibild">
//                       Source
//                     </TableHeadCell>
//                     <TableHeadCell className="font-semibild">
//                       Points
//                     </TableHeadCell>
//                     <TableHeadCell className="font-semibild">
//                       Earned on
//                     </TableHeadCell>
//                     <TableHeadCell className="font-semibild">
//                       Expiry Date
//                     </TableHeadCell>
//                   </TableHead>
//                   <TableBody className="divide-y">
//                     <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
//                       <TableCell className="py-2 text-[#697A8D]">
//                         Signup Bonus
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">100</TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         01 Jul 2025
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         31 Aug 2025
//                       </TableCell>
//                     </TableRow>
//                     <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
//                       <TableCell className="py-2 text-[#697A8D]">
//                         Order Reward
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">300</TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         01 Jul 2025
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         31 Aug 2025
//                       </TableCell>
//                     </TableRow>
//                     <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
//                       <TableCell className="py-2 text-[#697A8D]">
//                         Referral
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">250</TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         01 Jul 2025
//                       </TableCell>
//                       <TableCell className="py-2 text-[#697A8D]">
//                         31 Aug 2025
//                       </TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </div>
//             </div>
//             <div className="mb-0 block">
//               <div className="flex justify-end gap-2">
//                 <button className="bg-white text-gray-700 hover:bg-[#9b1c1c] hover:text-white border border-gray-300 rounded-md p-2">
//                   <HiOutlineMail />
//                 </button>
//                 <button className="bg-white text-gray-700 hover:bg-[#9b1c1c] hover:text-white border border-gray-300 rounded-md p-2">
//                   <FiPhoneCall />
//                 </button>
//                 <button className="bg-[#F85656] hover:bg-black text-xs leading-[30px] rounded-md text-white font-normal px-4">
//                   Delete Customer
//                 </button>
//               </div>
//             </div>
//           </div>
//         </Modal.Body>
//         <Modal.Footer className="flex justify-end">
//           <Button
//             className="bg-white text-gray-700 hover:bg-[#9b1c1c] hover:text-white border border-gray-300"
//             onClick={() => setOpenManageCustomerDetailsModal(false)}
//           >
//             Cancel
//           </Button>
//           <Button className="bg-[#686AF8] hover:bg-black">Save & Update</Button>
//         </Modal.Footer>
//       </Modal>
//       {/* Manage Customer Details modal ends here */}
//     </div>
//   );
// };

// export default CustomerManagement;





import React, { useEffect, useState } from "react";
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
import { HiOutlineMail } from "react-icons/hi";
import { FiPhoneCall } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getCustomer } from "../../Reducer/CustomerSlice";
import CustomerDetalisModal from "./CustomerDetalisModal";


const CustomerManagement = () => {
  const [openCustomerDetailsModal, setOpenCustomerDetailsModal] = useState(false);
  const [openManageCustomerDetailsModal, setOpenManageCustomerDetailsModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const dispatch = useDispatch();
  const { customerLists,loading,error } = useSelector((state) => state?.coustomers); // Fixed typo: coustomers -> customers

  useEffect(() => {
    dispatch(getCustomer({ page: currentPage, limit: pageSize }));
  }, [dispatch, currentPage, pageSize]);

  const navigate = useNavigate();

  // Transform API data to match AG-Grid format
  const transformedRowData = customerLists?.data ? customerLists.data.map(customer => ({
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
    // Keep original customer data for detailed view
    originalData: customer
  })) : [];

  const [columnDefs] = useState([
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
      cellRenderer: (params) => (
        <>
        {console.log(params.data)
        }
        <Button
          onClick={() => handleCustomerDetails(params?.data)}
          className="border text-[#536EFF] border-[#536EFF] bg-white hover:bg-[#536EFF] hover:text-white text-xl px-4 py-0 my-1"
        >
          View Details
        </Button>
        </>
      ),
      flex: 1,
    },
  ]);

  const handleCustomerDetails = (customerData) => {
    setSelectedCustomer(customerData);
    setOpenCustomerDetailsModal(true);
  };

  const handleManageCustomerDetails = () => {
    setOpenManageCustomerDetailsModal(true);
    setOpenCustomerDetailsModal(false);
  };

  // Handle pagination
  const onPaginationChanged = (params) => {
    const currentPage = params.api.paginationGetCurrentPage() + 1;
    const pageSize = params.api.paginationGetPageSize();
    
    if (currentPage !== currentPage || pageSize !== pageSize) {
      setCurrentPage(currentPage);
      setPageSize(pageSize);
    }
  };

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
          <div
            className="ag-theme-alpine"
            style={{ height: 600, width: "100%" }}
          >
            <AgGridReact
              rowData={transformedRowData}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={pageSize}
              domLayout="autoHeight"
              onPaginationChanged={onPaginationChanged}
              loadingOverlayComponent={'Loading customers...'}
              noRowsOverlayComponent={'No customers found'}
            />
          </div>
        </div>
      </div>

      {/* Customer Details modal start here */}
    <CustomerDetalisModal
    openCustomerDetailsModal={openCustomerDetailsModal}
    setOpenCustomerDetailsModal={setOpenCustomerDetailsModal}
    selectedCustomer={selectedCustomer}
    />
      {/* Customer Details modal ends here */}

      {/* Manage Customer Details modal start here */}
      {/* <Modal
        show={openManageCustomerDetailsModal}
        onClose={() => setOpenManageCustomerDetailsModal(false)}
      >
        <Modal.Header className="text-[#435971]">Manage Customer</Modal.Header>
        <Modal.Body>
          <div className="space-y-4 h-[700px] overflow-y-scroll">
            <h3 className="text-base text-[#191919] font-bold mb-1">Edit Details</h3>
            <div className="w-full">
              <div className="w-full">
                <div className="mb-1 block">
                  <Label value="Customer Name" />
                </div>
                <TextInput 
                  type="text" 
                  defaultValue={selectedCustomer?.originalData?.full_name || ''} 
                  required 
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-6/12">
                <div className="mb-1 block">
                  <Label value="Phone Number" />
                </div>
                <TextInput
                  type="text"
                  defaultValue={selectedCustomer?.originalData?.mobile || ''}
                  required
                />
              </div>
              <div className="w-6/12">
                <div className="mb-1 block">
                  <Label value="Status" />
                </div>
                <Select defaultValue={selectedCustomer?.originalData?.status || 1}>
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </Select>
              </div>
            </div>

            <h3 className="text-base text-[#191919] font-bold mb-1">
              Wallet Information
            </h3>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Current Balance
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                ₹ {selectedCustomer?.originalData?.wallet?.balance || '0'}
              </div>
            </div>

            <h3 className="text-base text-[#191919] font-bold mb-1">
              Points Information
            </h3>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Total Points
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                {selectedCustomer?.originalData?.promoCoins?.total_points || 0} pts
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Valid Points
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                {selectedCustomer?.originalData?.promoCoins?.valid_points || 0} pts
              </div>
            </div>

            <div className="mb-0 block">
              <div className="flex justify-end gap-2">
                <button className="bg-white text-gray-700 hover:bg-[#9b1c1c] hover:text-white border border-gray-300 rounded-md p-2">
                  <HiOutlineMail />
                </button>
                <button className="bg-white text-gray-700 hover:bg-[#9b1c1c] hover:text-white border border-gray-300 rounded-md p-2">
                  <FiPhoneCall />
                </button>
                <button className="bg-[#F85656] hover:bg-black text-xs leading-[30px] rounded-md text-white font-normal px-4">
                  Delete Customer
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button
            className="bg-white text-gray-700 hover:bg-[#9b1c1c] hover:text-white border border-gray-300"
            onClick={() => setOpenManageCustomerDetailsModal(false)}
          >
            Cancel
          </Button>
          <Button className="bg-[#686AF8] hover:bg-black">Save & Update</Button>
        </Modal.Footer>
      </Modal> */}
      {/* Manage Customer Details modal ends here */}
    </div>
  );
};

export default CustomerManagement;
