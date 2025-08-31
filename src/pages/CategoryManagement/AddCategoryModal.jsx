import { Button, FileInput, Label, Modal, Select, TextInput } from "flowbite-react"
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addPlans, getAllPlans } from "../../Reducer/PlanManagementSlice";
import { toast } from "react-toastify";
import { addCategory, getAllCategory } from "../../Reducer/CategorySlice";

const AddCategoryModal=({ openCategoryModal,
          setOpenCategoryModal})=>{
            const {
                 register,
                 handleSubmit,
                 formState: { errors },
               } = useForm();
             const dispatch=useDispatch()

             const onSubmit=(data)=>{
                   const formData = new FormData();
    
    // Append text fields
    formData.append('cat_name', data.cat_name);
    formData.append('cat_short_name', data.cat_short_name);
    
    // Append file if it exists
    if (data.banner && data.banner[0]) {
      formData.append('banner', data.banner[0]);
    }
                dispatch(addCategory(formData)).then((res)=>{
                    console.log("res",res);
                    
                    if(res?.payload?.status_code===201){
                        setOpenCategoryModal(false)
                        dispatch(getAllCategory({ page: 1, limit:10 }));
                    }
                    else if(res?.payload?.response?.data?.status_code===422){
                        toast.error(res?.payload?.response?.data?.data?.[0]?.message)
                    }
                })
             }
    return(
        <>
           <Modal
                 show={openCategoryModal}
                 onClose={() => setOpenCategoryModal(false)}
               >
                 <form onSubmit={handleSubmit(onSubmit)}>
                 <Modal.Header className="text-[#435971]">
                   Add New Category
                 </Modal.Header>
                  <Modal.Body>
           <div className="space-y-4 overflow-y-scroll">
              <div className="flex gap-4">
               <div className="w-6/12">
                 <div className="mb-1 block">
                   <Label value="Category Name *" />
                 </div>
                 <TextInput type="text" placeholder="Enter Category Name" {...register("cat_name",{required:"Batch Name is required"})} />
                 {console.log(errors,"errors")
                 }
                 {errors.cat_name && (
   <p className="text-red-500 text-sm mt-1">{errors.cat_name.message}</p>
 )}
               </div>
               <div className="w-6/12">
                 <div className="mb-1 block">
                   <Label value="Short Name *" />
                 </div>
                  <TextInput type="text" placeholder="Enter Category Short Name" {...register("cat_short_name",{required:"Batch Name is required"})} />
                 {console.log(errors,"errors")
                 }
                 {errors.cat_short_name && (
   <p className="text-red-500 text-sm mt-1">{errors.cat_short_name.message}</p>
 )}
               </div>
             </div>
          
             <div>
               <div className="mb-1 block">
                 <Label value="Avatar *" />
               </div>
               <FileInput
                 
                 {...register("banner")}
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
                     onClick={() => setOpenCategoryModal(false)}
                   >
                     Cancel
                   </Button>
                   <Button type="submit" className="bg-[#686AF8] hover:bg-black">
                     Add Category
                   </Button>
                 </Modal.Footer>
                 </form>
               </Modal>
        </>
    )
}
export default AddCategoryModal