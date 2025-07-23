import { useDispatch } from "react-redux";
import { deleteCustomerDetails, getCustomer } from "../../Reducer/CustomerSlice";
import { Button, Modal } from "flowbite-react";

const DeleModal=({openDeleteModal,
      setOpenDeleteModal,
      selectedCustomer,setOpenManageCustomerDetailsModal})=>{
        const dispatch=useDispatch()
        const custDel=()=>{
            dispatch(deleteCustomerDetails({user_id:selectedCustomer?.data?.id})).then((res)=>{
                console.log("resdel",res);
                
                if(res?.payload?.status_code===200){
                    setOpenDeleteModal(false)
                    setOpenManageCustomerDetailsModal(false)
                    dispatch(getCustomer({page:1,limit:10}))
                }
            })
        }
    return(
        <>
            
                    <Modal
                show={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
              >
                 
                <Modal.Header className="text-[#435971]">Are you want to delete?</Modal.Header>
                <Modal.Body className="flex justify-center gap-3">
              <Button
                    className="bg-white text-gray-700 hover:bg-[#9b1c1c] hover:text-white border border-gray-300"
                    onClick={() => setOpenDeleteModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="button" className="bg-[#F85656] hover:bg-black" onClick={custDel}>Yes</Button>

                </Modal.Body>
              
                
              </Modal>
        </>
    )
}
export default DeleModal;