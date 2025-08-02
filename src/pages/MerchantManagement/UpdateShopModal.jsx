import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getMarchentShopDetails, updateMarchentShopDetails } from "../../Reducer/MarchentSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UpdateShopModal=({openShopUpdateModal,
        setOpenShopUpdateModal,
        setShopId,
    shopId,
setOpenShopModal
})=>{
        const{singleShope}=useSelector((state)=>state?.marchent)
        const dispatch=useDispatch()
             const {
                    register,
                    handleSubmit,
                    setValue,
                    formState: { errors },
                  } = useForm();
    useEffect(()=>{
dispatch(getMarchentShopDetails({vendor_shop_id:shopId}))
    },[])
    useEffect(()=>{
        setValue("shop_name",singleShope?.res?.shop_name);
        setValue("gst_no",singleShope?.res?.gst_no);
        setValue("zip_code",singleShope?.res?.zip)
        setValue("shop_address",singleShope?.res?.shop_address)
    },[setValue,singleShope,shopId])
    const onSubmit=(data)=>{
        dispatch(updateMarchentShopDetails({...data,vendor_shop_id:shopId,latitude:"54.89",longitude:"987.77"})).then((res)=>{
            if(res?.payload?.status_code===200){
                setOpenShopUpdateModal(false)
                setOpenShopModal(false)
                toast.success(res?.payload?.message)
            }
        })
    }
    return(
        <>
         <Modal
                show={openShopUpdateModal}
                onClose={() => setOpenShopUpdateModal(false)}
              >
                <form
                
                onSubmit={handleSubmit(onSubmit)}
                >
                <Modal.Header className="text-[#435971]">Merchant Shop Details</Modal.Header>
                <Modal.Body>
                  <div className="space-y-4 h-[700px] overflow-y-scroll">
                    <h3 className="text-base text-[#191919] font-bold mb-1">Shop Details</h3>
        
                    <div className="flex gap-4">
                      <div className="w-6/12">
                        <div className="mb-1 block">
                          <Label value="Shop Name *" />
                        </div>
                        <TextInput type="text" placeholder="Enter Shop Name" {...register("shop_name",{required:"Shop Name is required"})} />
                        {console.log(errors,"errors")
                        }
                        {errors.shop_name && (
          <p className="text-red-500 text-sm mt-1">{errors.shop_name.message}</p>
        )}
                      </div>
                      <div className="w-6/12">
                        <div className="mb-1 block">
                          <Label value="GST No. *" />
                        </div>
                        <TextInput
                          type="text"
                          placeholder="Gst No"
                          {...register("gst_no",{required:"Gst No is required"})}
                        />
                        {errors.gst_no && (
          <p className="text-red-500 text-sm mt-1">{errors.gst_no.message}</p>
        )}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-6/12">
                        <div className="mb-1 block">
                          <Label value="Zip Code *" />
                        </div>
                        <TextInput type="text" placeholder="Enter Email Id" {...register("zip_code",{required:"Email is Required"})} />
                                    {errors.zip_code && (
          <p className="text-red-500 text-sm mt-1">{errors.zip_code.message}</p>
        )}
                      </div>
                      <div className="w-6/12">
                        <div className="mb-1 block">
                          <Label value="Shop Address *" />
                        </div>
                        <TextInput
                          type="text"
                          placeholder="Enter Shop Address"
                          {...register("shop_address",{required:"Shop Address required"})}
                        />
                                                    {errors.shop_address && (
          <p className="text-red-500 text-sm mt-1">{errors.shop_address.message}</p>
        )}
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer className="flex justify-end">
                  <Button
                    className="bg-white text-gray-700 hover:bg-[#9b1c1c] hover:text-white border border-gray-300"
                    onClick={() => setOpenShopUpdateModal(false)}
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
export default UpdateShopModal;