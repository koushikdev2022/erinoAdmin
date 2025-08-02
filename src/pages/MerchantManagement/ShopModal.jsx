import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getMarchentDetails } from "../../Reducer/MarchentSlice";
import { useEffect } from "react";
import { Button, Modal, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

const ShopModal=({openShopModal,
          setOpenShopModal,
          mId,
         setOpenShopUpdateModal,
        setShopId})=>{
              const{singleMarchent}=useSelector((state)=>state?.marchent)
     const dispatch=useDispatch()
    console.log(singleMarchent,"singleMarchent");
    useEffect(()=>{
dispatch(getMarchentDetails({vendor_id:mId}))
    },[mId])

    const handleShopUpdate=(id)=>{
      setOpenShopUpdateModal(true)
      setShopId(id)
    }
    return(
        <>
        <Modal
        size="2xl"
                        show={openShopModal}
                        onClose={() => setOpenShopModal(false)}
                      >
                        <Modal.Header className="text-[#435971]">Shop  Details</Modal.Header>
                        <Modal.Body>
                          <div className="space-y-4 h-[700px] overflow-y-scroll">
                            
                            <div className="mt-4 border border-[#E5E5E5] rounded-lg overflow-hidden">
                           
                              <div className="overflow-x-auto">
                                <Table striped>
                                  <TableHead>
                                    <TableHeadCell className="font-semibild">
                                      Shop Name
                                    </TableHeadCell>
                                    <TableHeadCell className="font-semibild">
                                      GST No
                                    </TableHeadCell>
                                    <TableHeadCell className="font-semibild">
                                    Shop Address
                                    </TableHeadCell>
                                    <TableHeadCell className="font-semibild">
                                      Zip Code
                                    </TableHeadCell>
                                    <TableHeadCell className="font-semibild">
                                      Action
                                    </TableHeadCell>
                                  </TableHead>
                                  <TableBody className="divide-y">
                                    {
                                        singleMarchent?.res?.[0]?.VendorShop?.map((shops)=>{
                                            return(
                                                <>
                                                 <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                      <TableCell className="py-2 text-[#697A8D]">
                                        {shops?.shop_name}
                                      </TableCell>
                                      <TableCell className="py-2 text-[#05923C]">
                                        {shops?.gst_no}
                                      </TableCell>
                                      <TableCell className="py-2 text-[#697A8D]">
                                        {shops?.shop_address}
                                      </TableCell>
                                      <TableCell className="py-2 text-[#697A8D]">
                                        {shops?.zip}
                                      </TableCell>

                                      <TableCell className="py-2 text-[#697A8D]">
                                        <Button
                                                  onClick={()=>handleShopUpdate(shops?.id)}
                                                  className="border text-[#536EFF] border-[#536EFF] bg-white hover:bg-[#536EFF] hover:text-white text-xl px-4 py-0 my-1"
                                                >
                                                  Update
                                                </Button>
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
                          </div>
                        </Modal.Body>
                    
                      </Modal>
        </>
    )
}
export default ShopModal;