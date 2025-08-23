import { Button, FileInput, Label, Modal, Select, Textarea, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addPlanBadge, getPlanBadge } from "../../Reducer/PlanbadgeSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";


const AddPlanBadgeModal=({
     openplanbadgeModal,
          setOpenPlanbadgeModal,
          plans
})=>{
    

    const {
     register,
     handleSubmit,
     formState: { errors },
   } = useForm();
 const dispatch=useDispatch()
 const onSubmit=(data)=>{
     console.log("data",data);
     
        const formData = new FormData();
    
    // Append text fields
    formData.append('batch_name', data.batch_name);
    formData.append('plan_id', data.plan_id);
    
    // Append file if it exists
    if (data.avatar && data.avatar[0]) {
      formData.append('avatar', data.avatar[0]);
    }
 dispatch(addPlanBadge(formData)).then((res)=>{
     console.log("res",res);
     if(res?.payload?.status_code===201){
         setOpenPlanbadgeModal(false)
         dispatch(getPlanBadge({page:1,limit:10}))
     }
     else if(res?.payload?.response?.data?.status_code===422){
         toast.error(res?.payload?.response?.data?.data?.[0]?.message)
     }
     
 })
 }
     return(
         <>
         <Modal
         show={openplanbadgeModal}
         onClose={() => setOpenPlanbadgeModal(false)}
       >
         <form onSubmit={handleSubmit(onSubmit)}>
         <Modal.Header className="text-[#435971]">
           Add New Plan Badge
         </Modal.Header>
         <Modal.Body>
           <div className="space-y-4 overflow-y-scroll">
              <div className="flex gap-4">
               <div className="w-6/12">
                 <div className="mb-1 block">
                   <Label value="Batch Name *" />
                 </div>
                 <TextInput type="text" placeholder="Enter Batch Name" {...register("batch_name",{required:"Batch Name is required"})} />
                 {console.log(errors,"errors")
                 }
                 {errors.batch_name && (
   <p className="text-red-500 text-sm mt-1">{errors.batch_name.message}</p>
 )}
               </div>
               <div className="w-6/12">
                 <div className="mb-1 block">
                   <Label value="Choose Plan *" />
                 </div>
                 <Select
                   {...register("plan_id",{required:"Plan  is required"})}
                 >
                    <option >Select</option>
                    {
                        plans?.data?.map((pln)=>{
                            return(
                                <>
                                <option value={pln?.id}>{pln?.plan_name}</option>
                                </>
                            )
                        })
                    }
                 </Select>
                 {errors.plan_id && (
   <p className="text-red-500 text-sm mt-1">{errors.plan_id.message}</p>
 )}
               </div>
             </div>
          
             <div>
               <div className="mb-1 block">
                 <Label value="Avatar *" />
               </div>
               <FileInput
                 
                 {...register("avatar")}
               />
                                                         {/* {errors.shop_name && (
   <p className="text-red-500 text-sm mt-1">{errors.shop_name.message}</p>
 )} */}
             </div>

           </div>
         </Modal.Body>
         <Modal.Footer className="flex justify-end">
           <Button
             className="bg-white text-gray-700 hover:bg-[#9b1c1c] hover:text-white border border-gray-300"
             onClick={() => setOpenPlanbadgeModal(false)}
           >
             Cancel
           </Button>
           <Button type="submit" className="bg-[#686AF8] hover:bg-black">
             Add Plan Badge
           </Button>
         </Modal.Footer>
         </form>
       </Modal>
         </>
     )
}
export default AddPlanBadgeModal