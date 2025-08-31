import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getAllCategory, updateCategoryDetails } from "../../Reducer/CategorySlice";
import { toast } from "react-toastify";

const UpdateCategoryModal=({ openCategoryDetailsModal1,
          setOpenPlansDetailsModal1,
          catId,
          singleCategory,})=>{
      const {
                     register,
                     setValue,
                     handleSubmit,
                     formState: { errors },
                   } = useForm();
                 const dispatch=useDispatch()

                 useEffect(()=>{
                    setValue("cat_name",singleCategory?.data?.cat_name)
                    setValue("cat_short_name",singleCategory?.data?.cat_short_name)
                 },[singleCategory])
        const onSubmit=((data)=>{
            dispatch(updateCategoryDetails({...data,category_id:catId})).then((res)=>{
                 if(res?.payload?.status_code===200){
                                        setOpenPlansDetailsModal1(false)
                                        dispatch(getAllCategory({ page: 1, limit:10 }));
                                    }
                                    else if(res?.payload?.response?.data?.status_code===422){
                                        toast.error(res?.payload?.response?.data?.data?.[0]?.message)
                                    }
            })
        })
    return(
        <>
         <Modal
                         show={openCategoryDetailsModal1}
                         onClose={() => setOpenPlansDetailsModal1(false)}
                       >
                         <form
                          onSubmit={handleSubmit(onSubmit)}
                          >
                         <Modal.Header className="text-[#435971]">
                           Update Category
                         </Modal.Header>
                          <Modal.Body>
                   <div className="space-y-4 overflow-y-scroll">
                      <div className="flex gap-4">
                       <div className="w-6/12">
                         <div className="mb-1 block">
                           <Label value="Batch Name *" />
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
                  
                     {/* <div>
                       <div className="mb-1 block">
                         <Label value="Avatar *" />
                       </div>
                       <FileInput
                         
                         {...register("banner")}
                       />
      
                     </div> */}
        
                   </div>
                 </Modal.Body>
                         <Modal.Footer className="flex justify-end">
                           <Button
                             className="bg-white text-gray-700 hover:bg-[#9b1c1c] hover:text-white border border-gray-300"
                             onClick={() => openCategoryDetailsModal1(false)}
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
export default UpdateCategoryModal;