import { Button, FileInput, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getAllCategory, updateBanner } from "../../Reducer/CategorySlice";

const ImageUpdateModal = ({
  openCategoryDetailsModal2,
  setOpenPlansDetailsModal2,
  catId,
  singleCategory,
}) => {
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      if (singleCategory?.data) {
        // Set batch name

        // Set current image
        if (singleCategory.data.banner) {
          // Clean the image URL if it has "undefined/" prefix
          let imageUrl = singleCategory.data.banner;
          // if (imageUrl.startsWith('undefined/')) {
          //   imageUrl = imageUrl.replace('undefined/', '');
          // }
          setCurrentImage(imageUrl);
          setPreviewImage(null); // Reset preview when loading existing data
        }
      }
    }, 1000);
  }, [singleCategory, setValue]);

  useEffect(() => {
    if (!openCategoryDetailsModal2) {
      reset();
      setPreviewImage(null);
      setCurrentImage(null);
    }
  }, [openCategoryDetailsModal2, reset]);

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
  const onSubmit = (data) => {
    const formData = new FormData();
    if (data.banner && data.banner[0]) {
      formData.append("banner", data.banner[0]);
    }
    formData.append("category_id", catId); // ✅ Add ID inside FormData

    dispatch(updateBanner(formData)).then((res) => {
      if (res?.payload?.status_code === 200) {
        setOpenPlansDetailsModal2(false);
        dispatch(getAllCategory({ page: 1, limit: 10 }));
      }
    });
  };

  return (
    <>
      <Modal
        show={openCategoryDetailsModal2}
        onClose={() => setOpenPlansDetailsModal2(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header className="text-[#435971]">Update Image</Modal.Header>
          <Modal.Body>
            <div className="space-y-4 overflow-y-scroll">
              <div>
                <div className="mb-1 block">
                  <Label value="Banner Image *" />
                </div>

                {/* Image Preview Section */}
                <div className="mb-4">
                  {(previewImage || currentImage) && (
                    <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex-shrink-0">
                        <img
                          src={previewImage || currentImage}
                          alt={
                            previewImage
                              ? "New avatar preview"
                              : "Current avatar"
                          }
                          className="w-20 h-20 object-cover rounded-lg border-2 border-gray-300"
                          onError={(e) => {
                            console.error(
                              "Image failed to load:",
                              e.target.src
                            );
                            e.target.src =
                              "data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100' height='100' fill='%23f3f4f6'/%3e%3ctext x='50' y='50' font-family='Arial, sans-serif' font-size='14' fill='%236b7280' text-anchor='middle' dy='.3em'%3eNo Image%3c/text%3e%3c/svg%3e";
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            {previewImage
                              ? "New Avatar Preview"
                              : "Current Avatar"}
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
                            : "Upload a new image to replace this avatar."}
                        </p>
                        {previewImage && (
                          <button
                            type="button"
                            onClick={() => {
                              setPreviewImage(null);
                              // Reset the file input
                              const fileInput =
                                document.querySelector('input[type="file"]');
                              if (fileInput) fileInput.value = "";
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
                <div className="mb-1 block">
                  <Label value="Accept * ( .jpg, .png, .JPEG )" />
                </div>
                <FileInput
                  {...register("banner")}
                  onChange={(e) => {
                    register("banner").onChange(e); // Keep react-hook-form registration
                    handleFileChange(e); // Handle preview
                  }}
                  accept=".jpg, .png, .JPEG"
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="flex justify-end">
            <Button
              className="bg-white text-gray-700 hover:bg-[#9b1c1c] hover:text-white border border-gray-300"
              onClick={() => setOpenPlansDetailsModal2(false)}
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
  );
};
export default ImageUpdateModal;
