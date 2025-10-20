import { Button, Label, Modal, TextInput } from "flowbite-react"
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addSubscriptionToken, getSubscription } from "../../Reducer/SubscriptionSlice";
import { getAllPlans } from "../../Reducer/PlanManagementSlice";
import { toast } from "react-toastify";

const AddSubsModal=({openSubsModal,
          setOpenSubsModal,plnId})=>{
              const {
                register,
                handleSubmit,
                formState: { errors },
              } = useForm();
                const dispatch = useDispatch();
    const onSubmit=(data)=>{
        dispatch(addSubscriptionToken({...data,plan_id:plnId})).then((res)=>{
            console.log("res",res);
            if(res?.payload?.status_code===201){
                toast.success("token added successfully")
                dispatch(getSubscription({page:1,limit:10}))
                setOpenSubsModal(false)
            }
            else if(res?.payload?.response?.data?.status_code===422){
                toast.error(res?.payload?.response?.data?.data?.[0]?.message)
                 setOpenSubsModal(false)
            }
            
        })
    }
    return(
        <>
        <Modal show={openSubsModal} onClose={() => setOpenSubsModal(false)}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Modal.Header className="text-[#435971]">Add New Subscription Token</Modal.Header>
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
                      onClick={() => setOpenSubsModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-[#686AF8] hover:bg-black">
                      Add 
                    </Button>
                  </Modal.Footer>
                </form>
              </Modal>
        </>
    )
}
export default AddSubsModal