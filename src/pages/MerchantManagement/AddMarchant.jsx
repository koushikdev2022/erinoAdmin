import { Button, FileInput, Label, Modal, Select, Textarea, TextInput } from "flowbite-react"
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addMarchent, getMarchent } from "../../Reducer/MarchentSlice";
import { toast } from "react-toastify";

const AddMarchant=({ openAddMerchantModal,
      setOpenAddMerchantModal})=>{
      const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
const dispatch=useDispatch()
const onSubmit=(data)=>{
    console.log("data",data);
    
dispatch(addMarchent({...data,latitude:"22.5744",longitude:"88.3629"})).then((res)=>{
    console.log("res",res);
    if(res?.payload?.status_code===201){
        setOpenAddMerchantModal(false)
        dispatch(getMarchent())
    }
    else if(res?.payload?.response?.data?.status_code===422){
        toast.error(res?.payload?.response?.data?.data?.[0]?.message)
    }
    
})
}
    return(
        <>
        <Modal
        show={openAddMerchantModal}
        onClose={() => setOpenAddMerchantModal(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header className="text-[#435971]">
          Register New Merchant
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4 h-[700px] overflow-y-scroll">
            {/* <div>
              <div className="mb-1 block">
                <Label value="Merchant Name *" />
              </div>
              <TextInput
                type="text"
                placeholder="Enter Merchant Name"
                required
              />
            </div> */}
             <div className="flex gap-4">
              <div className="w-6/12">
                <div className="mb-1 block">
                  <Label value="First Name *" />
                </div>
                <TextInput type="text" placeholder="Enter First Name" {...register("first_name",{required:"First Name is required"})} />
                {console.log(errors,"errors")
                }
                {errors.first_name && (
  <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>
)}
              </div>
              <div className="w-6/12">
                <div className="mb-1 block">
                  <Label value="Last Name *" />
                </div>
                <TextInput
                  type="text"
                  placeholder="Last Name"
                  {...register("last_name",{required:"Last Name is required"})}
                />
                {errors.last_name && (
  <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>
)}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-6/12">
                <div className="mb-1 block">
                  <Label value="Email Id *" />
                </div>
                <TextInput type="email" placeholder="Enter Email Id" {...register("email",{required:"Email is Required"})} />
                            {errors.email && (
  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
)}
              </div>
              <div className="w-6/12">
                <div className="mb-1 block">
                  <Label value="Phone Number *" />
                </div>
                <TextInput
                  type="tel"
                  placeholder="Enter Mobile Number"
                  {...register("mobile",{required:"Mobile is required",pattern: {
      value: /^[0-9]{10}$/,
      message: "Mobile number must be exactly 10 digits",
    },})}
                />
                                            {errors.mobile && (
  <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
)}
              </div>
            </div>
            <div>
              <div className="mb-1 block">
                <Label value="Shop Name *" />
              </div>
              <TextInput
                type="text"
                placeholder="Enter Company Name"
                {...register("shop_name",{required:"Copnay name is required"})}
              />
                                                        {errors.shop_name && (
  <p className="text-red-500 text-sm mt-1">{errors.shop_name.message}</p>
)}
            </div>
            <div>
              <div className="mb-1 block">
                <Label value="Shop GSTIN No. *" />
              </div>
              <TextInput type="text" placeholder="Enter GSTIN No." {...register("gst_no",{required:"Gst No is required"})} />
                                                                    {errors.gst_no && (
  <p className="text-red-500 text-sm mt-1">{errors.gst_no.message}</p>
)}
            </div>

            <div>
              <div className="mb-1 block">
                <Label value="Brand Name *" />
              </div>
              <TextInput type="text" placeholder="Enter Brand name" {...register("brand_name",{required:"Brand name is required"})} />
           {errors.brand_name && (
  <p className="text-red-500 text-sm mt-1">{errors.brand_name.message}</p>
)}
            </div>
            {/* <div className="flex gap-4">
              <div className="w-6/12">
                <div className="mb-1 block">
                  <Label value="Choose State *" />
                </div>
                <Select required>
                  <option>Choose State</option>
                  <option>West bengal</option>
                </Select>
              </div>
              <div className="w-6/12">
                <div className="mb-1 block">
                  <Label value="Choose City *" />
                </div>
                <Select required>
                  <option>Choose City</option>
                  <option>Kolkata</option>
                </Select>
              </div>
            </div> */}
            <div>
              <div className="mb-1 block">
                <Label value="Address *" />
              </div>
              <Textarea placeholder="Enter Address" rows={4} {...register("shop_address",{required:"Address is required"})}/>
           {errors.shop_address && (
  <p className="text-red-500 text-sm mt-1">{errors.shop_address.message}</p>
)}
            </div>
                <div>
              <div className="mb-1 block">
                <Label value="Zip Code *" />
              </div>
              <TextInput placeholder="Enter Zip Code"  {...register("zip_code",{required:"Zip code is required"})}/>
           {errors.zip_code && (
  <p className="text-red-500 text-sm mt-1">{errors.zip_code.message}</p>
)}
            </div>
            {/* <div>
              <div className="mb-1 block">
                <Label value="Profile Image" />
              </div>
              <div className="flex w-full items-center justify-center">
                <Label
                  htmlFor="dropzone-file"
                  className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <svg
                      className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <FileInput id="dropzone-file" className="hidden" />
                </Label>
              </div>
            </div> */}
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button
            className="bg-white text-gray-700 hover:bg-[#9b1c1c] hover:text-white border border-gray-300"
            onClick={() => setOpenAddMerchantModal(false)}
          >
            Cancel
          </Button>
          <Button type="submit" className="bg-[#686AF8] hover:bg-black">
            Register Merchant
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
        </>
    )
}
export default AddMarchant