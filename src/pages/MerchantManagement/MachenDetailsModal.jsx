import { Button, Modal, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useEffect } from "react";
import { getMarchentDetails } from "../../Reducer/MarchentSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const MarchentDetailsModal=({openMerchantDetailsModal,
     setOpenMerchantDetailsModal,mId
})=>{
     const{singleMarchent}=useSelector((state)=>state?.marchent)
     const dispatch=useDispatch()
    console.log(singleMarchent,"singleMarchent");
    useEffect(()=>{
dispatch(getMarchentDetails({vendor_id:mId}))
    },[mId])
    
    return(
        <>
         <Modal
                show={openMerchantDetailsModal}
                onClose={() => setOpenMerchantDetailsModal(false)}
              >
                <Modal.Header className="text-[#435971]">Merchant Details</Modal.Header>
                <Modal.Body>
                  <div className="space-y-4 h-[700px] overflow-y-scroll">
                    <h3 className="text-base text-[#191919] font-bold mb-1">Details</h3>
                    <div className="flex gap-4">
                      <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                        Merchant Name
                      </div>
                      <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                        {singleMarchent?.res?.[0]?.first_name} {singleMarchent?.res?.[0]?.last_name}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                        Shop Name
                      </div>
                      <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                         {singleMarchent?.res?.[0]?.VendorShop?.[0]?.shop_name}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                        GSTIN No.
                      </div>
                      <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                       {singleMarchent?.res?.[0]?.VendorShop?.[0]?.gst_no}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                        Email Id
                      </div>
                      <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                        {singleMarchent?.res?.[0]?.email}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                        Phone Number
                      </div>
                      <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                        {singleMarchent?.res?.[0]?.mobile}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                        Address
                      </div>
                      <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                      {singleMarchent?.res?.[0]?.VendorShop?.[0]?.shop_address}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                        Pincode
                      </div>
                      <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                 {singleMarchent?.res?.[0]?.VendorShop?.[0]?.zip}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                        Subscription Tier
                      </div>
                      <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                        Basic
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                        Last Active
                      </div>
                      <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                        03 Jul 2025
                      </div>
                    </div>
                    <h3 className="text-base text-[#191919] font-bold mb-1">
                      Wallets Balance
                    </h3>
                    <div className="flex gap-4">
                      <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                        Current Balance
                      </div>
                      <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                        ₹ 20000
                      </div>
                    </div>
                    <h3 className="text-base text-[#191919] font-bold mb-1">
                      Points History
                    </h3>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="bg-[#F8F8F8] rounded-md p-3 text-center">
                        <p className="text-[#697A8D] text-xs font-medium pb-2">
                          Points Earned
                        </p>
                        <p className="text-[#000000] text-xs font-medium">10,000</p>
                      </div>
                      <div className="bg-[#F8F8F8] rounded-md p-3 text-center">
                        <p className="text-[#697A8D] text-xs font-medium pb-2">
                          Points Redeemed
                        </p>
                        <p className="text-[#000000] text-xs font-medium">7,000</p>
                      </div>
                      <div className="bg-[#F8F8F8] rounded-md p-3 text-center">
                        <p className="text-[#697A8D] text-xs font-medium pb-2">
                          Points Expired
                        </p>
                        <p className="text-[#000000] text-xs font-medium">500</p>
                      </div>
                    </div>
                    <div className="mt-4 border border-[#E5E5E5] rounded-lg overflow-hidden">
                      <h3 className="text-[#697A8D] text-sm font-semibold border-b border-[#E5E5E5] py-3 pl-6">
                        Transaction History
                      </h3>
                      <div className="overflow-x-auto">
                        <Table striped>
                          <TableHead>
                            <TableHeadCell className="font-semibild">
                              Date
                            </TableHeadCell>
                            <TableHeadCell className="font-semibild">
                              Type
                            </TableHeadCell>
                            <TableHeadCell className="font-semibild">
                              ₹ 500
                            </TableHeadCell>
                            <TableHeadCell className="font-semibild">
                              Reason
                            </TableHeadCell>
                          </TableHead>
                          <TableBody className="divide-y">
                            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                              <TableCell className="py-2 text-[#697A8D]">
                                03-07-25
                              </TableCell>
                              <TableCell className="py-2 text-[#05923C]">
                                Credit
                              </TableCell>
                              <TableCell className="py-2 text-[#697A8D]">
                                ₹ 500
                              </TableCell>
                              <TableCell className="py-2 text-[#697A8D]">
                                Refund
                              </TableCell>
                            </TableRow>
                            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                              <TableCell className="py-2 text-[#697A8D]">
                                03-07-25
                              </TableCell>
                              <TableCell className="py-2 text-[#05923C]">
                                Credit
                              </TableCell>
                              <TableCell className="py-2 text-[#697A8D]">
                                ₹ 500
                              </TableCell>
                              <TableCell className="py-2 text-[#697A8D]">
                                Refund
                              </TableCell>
                            </TableRow>
                            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                              <TableCell className="py-2 text-[#697A8D]">
                                03-07-25
                              </TableCell>
                              <TableCell className="py-2 text-[#05923C]">
                                Credit
                              </TableCell>
                              <TableCell className="py-2 text-[#697A8D]">
                                ₹ 500
                              </TableCell>
                              <TableCell className="py-2 text-[#697A8D]">
                                Refund
                              </TableCell>
                            </TableRow>
                            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                              <TableCell className="py-2 text-[#697A8D]">
                                03-07-25
                              </TableCell>
                              <TableCell className="py-2 text-[#F55D43]">
                                Debit
                              </TableCell>
                              <TableCell className="py-2 text-[#697A8D]">
                                ₹ 500
                              </TableCell>
                              <TableCell className="py-2 text-[#697A8D]">
                                Withdrawal
                              </TableCell>
                            </TableRow>
                            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                              <TableCell className="py-2 text-[#697A8D]">
                                03-07-25
                              </TableCell>
                              <TableCell className="py-2 text-[#F55D43]">
                                Debit
                              </TableCell>
                              <TableCell className="py-2 text-[#697A8D]">
                                ₹ 500
                              </TableCell>
                              <TableCell className="py-2 text-[#697A8D]">
                                Withdrawal
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer className="flex justify-end">
                  <Button
                    className="bg-white text-gray-700 hover:bg-[#9b1c1c] hover:text-white border border-gray-300"
                    onClick={() => setOpenMerchantDetailsModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    // onClick={handleManageMerchantDetails}
                    className="bg-[#686AF8] hover:bg-black"
                  >
                    Manage Merchant
                  </Button>
                </Modal.Footer>
              </Modal>
        </>
    )
}
export default MarchentDetailsModal;