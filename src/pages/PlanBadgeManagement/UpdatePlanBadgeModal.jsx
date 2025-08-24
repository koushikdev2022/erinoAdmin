import { Button, FileInput, Label, Modal, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getPlanBadge, updatePlanBadgeDetails } from "../../Reducer/PlanbadgeSlice";

const UpdatePlanBadgeModal = ({
  openPlanbadgeDetailsModal,
  setOpenPlanbadgeDetailsModal,
  singlePlanbdge,
  plans,
  pId,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  
  const [previewImage, setPreviewImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  
  const dispatch = useDispatch();
  console.log("singlePlanbdge", singlePlanbdge);

  // Set form values when singlePlanbdge data is available
  useEffect(() => {
    setTimeout(()=>{
 if (singlePlanbdge?.data) {
      // Set batch name
      setValue("batch_name", singlePlanbdge.data.batch_name || "");
      
      // Set plan_id (use the actual ID, not the plan name)
      setValue("plan_id", singlePlanbdge.data.plan_id || "");
      
      // Set current image
      if (singlePlanbdge.data.batch_avatar) {
        // Clean the image URL if it has "undefined/" prefix
        let imageUrl = singlePlanbdge.data.batch_avatar;
        // if (imageUrl.startsWith('undefined/')) {
        //   imageUrl = imageUrl.replace('undefined/', '');
        // }
        setCurrentImage(imageUrl);
        setPreviewImage(null); // Reset preview when loading existing data
      }
    }
    },1000)
   
  }, [singlePlanbdge, setValue]);

  // Handle file selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  // Handle form submission
  const onSubmit = (data) => {
       const formData = new FormData();
    
    // Append text fields
    formData.append('batch_name', data.batch_name);
    formData.append('plan_id', data.plan_id);
    formData.append("plan_badge_id",pId)
    
    // Append file if it exists
    if (data.avatar && data.avatar[0]) {
      formData.append('avatar', data.avatar[0]);
    }
    // Add your update logic here
     dispatch(updatePlanBadgeDetails(formData)).then((res)=>{
          if(res?.payload?.status_code===200){
                 setOpenPlanbadgeDetailsModal(false)
                 dispatch(getPlanBadge({page:1,limit:10}))
             }
     });
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!openPlanbadgeDetailsModal) {
      reset();
      setPreviewImage(null);
      setCurrentImage(null);
    }
  }, [openPlanbadgeDetailsModal, reset]);

  return (
    <>
      <Modal
        show={openPlanbadgeDetailsModal}
        onClose={() => setOpenPlanbadgeDetailsModal(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header className="text-[#435971]">
            Update Plan Badge
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-4 overflow-y-scroll">
              <div className="flex gap-4">
                <div className="w-6/12">
                  <div className="mb-1 block">
                    <Label value="Batch Name *" />
                  </div>
                  <TextInput
                    type="text"
                    placeholder="Enter Batch Name"
                    {...register("batch_name", {
                      required: "Batch Name is required"
                    })}
                  />
                  {errors.batch_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.batch_name.message}
                    </p>
                  )}
                </div>
                <div className="w-6/12">
                  <div className="mb-1 block">
                    <Label value="Choose Plan *" />
                  </div>
                  <Select
                    {...register("plan_id", {
                      required: "Plan is required"
                    })}
                    disabled
                  >
                    <option value="">Select</option>
                    {plans?.data?.map((pln) => (
                      <option key={pln.id} value={pln.id}>
                        {pln.plan_name}
                      </option>
                    ))}
                  </Select>
                  {errors.plan_id && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.plan_id.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="mb-1 block">
                  <Label value="Avatar *" />
                </div>
                
                {/* Image Preview Section */}
                <div className="mb-4">
                  {(previewImage || currentImage) && (
                    <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex-shrink-0">
                        <img
                          src={previewImage || currentImage}
                          alt={previewImage ? "New avatar preview" : "Current avatar"}
                          className="w-20 h-20 object-cover rounded-lg border-2 border-gray-300"
                          onError={(e) => {
                            console.error("Image failed to load:", e.target.src);
                            e.target.src = "data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100' height='100' fill='%23f3f4f6'/%3e%3ctext x='50' y='50' font-family='Arial, sans-serif' font-size='14' fill='%236b7280' text-anchor='middle' dy='.3em'%3eNo Image%3c/text%3e%3c/svg%3e";
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            {previewImage ? "New Avatar Preview" : "Current Avatar"}
                          </span>
                          {previewImage && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">
                          {previewImage 
                            ? "This new image will replace the current avatar when you save." 
                            : "Upload a new image to replace this avatar."
                          }
                        </p>
                        {previewImage && (
                          <button
                            type="button"
                            onClick={() => {
                              setPreviewImage(null);
                              // Reset the file input
                              const fileInput = document.querySelector('input[type="file"]');
                              if (fileInput) fileInput.value = '';
                            }}
                            className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
                          >
                            Remove new image
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                <FileInput
                  {...register("avatar")}
                  onChange={(e) => {
                    register("avatar").onChange(e); // Keep react-hook-form registration
                    handleFileChange(e); // Handle preview
                  }}
                 
                  accept="image/*"
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="flex justify-end">
            <Button
              className="bg-white text-gray-700 hover:bg-[#9b1c1c] hover:text-white border border-gray-300"
              onClick={() => setOpenPlanbadgeDetailsModal(false)}
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#686AF8] hover:bg-black">
              Update Plan Badge
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default UpdatePlanBadgeModal;