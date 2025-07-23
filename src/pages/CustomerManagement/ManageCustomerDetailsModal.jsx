import { Button, Label, Modal, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { getCustomer, getCustomerDetails, updateCustomerDetails } from "../../Reducer/CustomerSlice";
import { useSelector } from "react-redux";

const ManageCustomerDetailsModal=({openManageCustomerDetailsModal,
setOpenManageCustomerDetailsModal,
selectedCustomer,setOpenDeleteModal})=>{
      const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
console.log("selected customer",selectedCustomer);
const dispatch=useDispatch()
  useEffect(()=>{
setValue("full_name",selectedCustomer?.data?.full_name)
setValue("email",selectedCustomer?.data?.email)
setValue("mobile",selectedCustomer?.data?.mobile)
  },[selectedCustomer])
  const onSubmit=(data)=>{
    dispatch(updateCustomerDetails({...data,user_id:selectedCustomer?.data?.id})).then((res)=>{
        console.log("res",res);
        if(res?.payload?.status_code===200)
        {
            dispatch(getCustomer({page:1,limit:10}))
            setOpenManageCustomerDetailsModal(false)
        }
        
    })
  }
  const handleDeleteModal=()=>{
setOpenDeleteModal(true)
  }
    return(
        <>
       
            <Modal
        show={openManageCustomerDetailsModal}
        onClose={() => setOpenManageCustomerDetailsModal(false)}
      >
         <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header className="text-[#435971]">Customer Details</Modal.Header>
        <Modal.Body>
          <div className="space-y-4 h-[700px] overflow-y-scroll">
            <h3 className="text-base text-[#191919] font-bold mb-1">Details</h3>
            <div className="w-full">
              <div className="w-full">
                <div className="mb-1 block">
                  <Label value="Customer Name" />
                </div>
                <TextInput type="text" placeholder="Erik Sarkar" {...register("full_name")} />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-6/12">
                <div className="mb-1 block">
                  <Label value="Email Id" />
                </div>
                <TextInput
                  type="email"
                  placeholder="ErikSarkar@gmail.com"
                  {...register("email")}
                />
              </div>
              <div className="w-6/12">
                <div className="mb-1 block">
                  <Label value="Phone Number " />
                </div>
                <TextInput type="text" placeholder="1234567890" {...register("mobile")} />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Last Login Date
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                03 Jul 2025
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Last Login Time
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                6:12 PM
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Total Orders
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                12
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Redemptions
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                10
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Referrals Made
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                2
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
               ₹ {selectedCustomer?.data?.wallet?.balance || '0'}
              </div>
            </div>
            <div className="mt-4 border border-[#E5E5E5] rounded-lg overflow-hidden">
              <h3 className="text-[#697A8D] text-sm font-semibold border-b border-[#E5E5E5] py-3 pl-6">
                Wallet Transaction History
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
                      Amount
                    </TableHeadCell>
                    <TableHeadCell className="font-semibild">
                      Reason
                    </TableHeadCell>
                  </TableHead>
                  <TableBody className="divide-y">
                    {
                        selectedCustomer?.data?.transactions?.map((trans)=>{
                            return(
                                <>
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell className="py-2 text-[#697A8D]">
                        {new Date(trans?.created_at).toISOString().split('T')[0]}
                      </TableCell>
                      <TableCell className="py-2 text-[#05923C]">
                        {trans?.transaction_type}
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        ₹ {trans?.amount}
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        {trans?.transaction_purpose}
                      </TableCell>
                    </TableRow>
                                </>
                            )
                        })
                    }
                 
                
                  </TableBody>
                </Table>
              </div>
            </div>
            <h3 className="text-base text-[#191919] font-bold mb-1">
              Points History
            </h3>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Total Points
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                {selectedCustomer?.data?.pointHistory?.totalPoint} pts
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Valid Points
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                {selectedCustomer?.data?.pointHistory?.validPoint} pts
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Expired Points
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                {selectedCustomer?.data?.pointHistory?.expiredPoint} pts
              </div>
            </div>
            <div className="mt-4 border border-[#E5E5E5] rounded-lg overflow-hidden">
              <h3 className="text-[#697A8D] text-sm font-semibold border-b border-[#E5E5E5] py-3 pl-6">
                Source & Expiry
              </h3>
              <div className="overflow-x-auto">
                <Table striped>
                  <TableHead>
                    <TableHeadCell className="font-semibild">
                      Source
                    </TableHeadCell>
                    <TableHeadCell className="font-semibild">
                      Points
                    </TableHeadCell>
                    <TableHeadCell className="font-semibild">
                      Earned on
                    </TableHeadCell>
                    <TableHeadCell className="font-semibild">
                      Expiry Date
                    </TableHeadCell>
                  </TableHead>
                  <TableBody className="divide-y">
                    {
                        selectedCustomer?.data?.promoCoins?.map((promo)=>{
                            return(
                                <>
                                 <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell className="py-2 text-[#697A8D]">
                        N/A
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">{promo?.total_coin}</TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        {new Date (promo?.created_at).toISOString().split('T')[0]}
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        {new Date (promo?.expairy_date).toISOString().split('T')[0]}
                      </TableCell>
                    </TableRow>
                                </>
                            )
                        })
                    }
                   
                  
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="mb-0 block">
              <div className="flex justify-end gap-2">
                {/* <button className="bg-white text-gray-700 hover:bg-[#9b1c1c] hover:text-white border border-gray-300 rounded-md p-2">
                  <HiOutlineMail />
                </button>
                <button className="bg-white text-gray-700 hover:bg-[#9b1c1c] hover:text-white border border-gray-300 rounded-md p-2">
                  <FiPhoneCall />
                </button> */}
                <button type="button" onClick={()=>handleDeleteModal()} className="bg-[#F85656] hover:bg-black text-xs leading-[30px] rounded-md text-white font-normal px-4">
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
          <Button type="submit" className="bg-[#686AF8] hover:bg-black">Save & Update</Button>
        </Modal.Footer>
        </form>
      </Modal>
        
        </>
    )
}
export default ManageCustomerDetailsModal;