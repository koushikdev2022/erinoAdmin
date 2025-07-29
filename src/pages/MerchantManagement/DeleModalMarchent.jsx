import { Button, Modal } from "flowbite-react"
import { useDispatch } from "react-redux"
import { getMarchent, suspendMarchent } from "../../Reducer/MarchentSlice"

const DeleModalMarchent=({ openDeleteModalM,
          setOpenDeleteModalM,
         mId,
          setOpenManageMerchantDetailsModal})=>{
               const dispatch=useDispatch()
        const custDel=()=>{
            dispatch(suspendMarchent({vendor_id:mId})).then((res)=>{
                console.log("resdel",res);
                
                if(res?.payload?.status_code===200){
                    setOpenDeleteModalM(false)
                    setOpenManageMerchantDetailsModal(false)
                    dispatch(getMarchent())
                }
            })
        }
    return(
        <>
               <Modal
                        show={openDeleteModalM}
                        onClose={() => setOpenDeleteModalM(false)}
                      >
                         
                        <Modal.Header className="text-[#435971]">Are you want to Suspend?</Modal.Header>
                        <Modal.Body className="flex justify-center gap-3">
                      <Button
                            className="bg-white text-gray-700 hover:bg-[#9b1c1c] hover:text-white border border-gray-300"
                            onClick={() => setOpenDeleteModalM(false)}
                          >
                            Cancel
                          </Button>
                          <Button type="button" className="bg-[#F85656] hover:bg-black" onClick={custDel}>Yes</Button>
        
                        </Modal.Body>
                      
                        
                      </Modal>
        </>
    )
}
export default DeleModalMarchent