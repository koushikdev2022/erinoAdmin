import {
  Button,
  FileInput,
  Label,
  Modal,
  Select,
  TextInput,
} from "flowbite-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addPlans, getAllPlans } from "../../Reducer/PlanManagementSlice";
import { toast } from "react-toastify";

const AddPlansModal = ({ openplansModal, setOpenPlansModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(addPlans(data)).then((res) => {
      console.log("res", res);

      if (res?.payload?.status_code === 201) {
        setOpenPlansModal(false);
        dispatch(getAllPlans({ page: 1, limit: 10 }));
      } else if (res?.payload?.response?.data?.status_code === 422) {
        toast.error(res?.payload?.response?.data?.data?.[0]?.message);
      }
    });
  };
  return (
    <>
      <Modal show={openplansModal} onClose={() => setOpenPlansModal(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header className="text-[#435971]">Add New Plans</Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-6/12">
                  <div className="mb-1 block">
                    <Label value="Plan Name *" />
                  </div>
                  <TextInput
                    type="text"
                    placeholder="Enter Plan Name"
                    {...register("plan_name", {
                      required: "Batch Name is required",
                    })}
                  />
                  {console.log(errors, "errors")}
                  {errors.plan_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.plan_name.message}
                    </p>
                  )}
                </div>

                <div className="w-6/12">
                  <div className="mb-1 block">
                    <Label value="Currency *" />
                  </div>
                  {/* <TextInput type="text" placeholder="Enter Currency" {...register("currency",{required:"Currency is required"})} />
                         {console.log(errors,"errors")
                         } */}
                  <Select
                    {...register("currency", {
                      required: "Currency is required",
                    })}
                  >
                    <option value="">Select</option>
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                  </Select>
                  {errors.currency && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.currency.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-6/12">
                  <div className="mb-1 block">
                    <Label value="Price *" />
                  </div>
                  <TextInput
                    type="text"
                    placeholder="Enter Price"
                    {...register("price", {
                      required: "Batch Name is required",
                    })}
                  />
                  {console.log(errors, "errors")}
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div className="w-6/12">
                  <div className="mb-1 block">
                    <Label value="Frequency*" />
                  </div>
                  {/* <TextInput type="text" placeholder="Enter Frequency" {...register("frequency",{required:"Frequency is required"})} />
                         {console.log(errors,"errors")
                         } */}
                  <Select
                    {...register("frequency", {
                      required: "Frequency is required",
                    })}
                  >
                    <option value="">Select</option>
                    <option value="1">Monthly</option>
                    <option value="3">Quarterly</option>
                    <option value="6">Half-yearly</option>
                    <option value="12">Annually</option>
                  </Select>
                  {errors.frequency && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.frequency.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full">
                <div className="mb-1 block">
                  <Label value="Price Id*" />
                </div>
                <TextInput
                  type="text"
                  placeholder="Enter Price Id"
                  {...register("price_id", {
                    required: "Price_Id is required",
                  })}
                />
                {console.log(errors, "errors")}
                {errors.price_id && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price_id.message}
                  </p>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="flex justify-end">
            <Button
              className="bg-white text-gray-700 hover:bg-[#9b1c1c] hover:text-white border border-gray-300"
              onClick={() => setOpenPlansModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#686AF8] hover:bg-black">
              Add Plans
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
export default AddPlansModal;
