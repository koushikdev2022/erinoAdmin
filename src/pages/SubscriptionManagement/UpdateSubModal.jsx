import { Button, Label, Modal, TextInput } from "flowbite-react"
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addSubscriptionToken, getSubscription, updateSubsDetails } from "../../Reducer/SubscriptionSlice";
import { getAllPlans } from "../../Reducer/PlanManagementSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
const UpdateSubModal=({ openSubsDetailsModal,
          setOpenSubsDetailsModal,
          singleSubs,
          // plans={plans}
          sId})=>{
              const {
                register,
                handleSubmit,
                setValue,
                formState: { errors },
              } = useForm();
                const dispatch = useDispatch();
    useEffect(()=>{
        console.log("singleSubs",singleSubs);
        
        setValue("coin",singleSubs?.data?.coin)
    },[singleSubs])
                 const onSubmit=(data)=>{
        dispatch(updateSubsDetails({...data,subscription_token_id:sId})).then((res)=>{
            console.log("res",res);
            if(res?.payload?.status_code===200){
                toast.success("token updated successfully")
                dispatch(getSubscription({page:1,limit:10}))
                setOpenSubsDetailsModal(false)
            }
            else if(res?.payload?.response?.data?.status_code===422){
                toast.error(res?.payload?.response?.data?.data?.[0]?.message)
                 setOpenSubsDetailsModal(false)
            }
            
        })
    }


    return(
        <>
          <Modal show={openSubsDetailsModal} onClose={() => setOpenSubsDetailsModal(false)}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Modal.Header className="text-[#435971]">Update Subscription Token</Modal.Header>
                  <Modal.Body>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="w-6/12">
                          <div className="mb-1 block">
                            <Label value="Coins *" />
                          </div>
                          <TextInput
                            type="text"
                            placeholder="Enter The  Coins"
                            {...register("coin", {
                              required: "Coin is required",
                            })}
                          />
                          {console.log(errors, "errors")}
                          {errors.coin && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.coin.message}
                            </p>
                          )}
                        </div>          
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer className="flex justify-end">
                    <Button
                      className="bg-white text-gray-700 hover:bg-[#9b1c1c] hover:text-white border border-gray-300"
                      onClick={() => setOpenSubsDetailsModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-[#686AF8] hover:bg-black">
                      Update
                    </Button>
                  </Modal.Footer>
                </form>
              </Modal>
        </>
    )
}
export default UpdateSubModal