import { Button, Label, Modal, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Textarea, TextInput } from "flowbite-react";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { getMarchentDetails, updateMarchent } from "../../Reducer/MarchentSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const UpdateMarchentModal=({openManageMerchantDetailsModal,
      setOpenManageMerchantDetailsModal,
       mId,
      setOpenDeleteModalM})=>{
        const {
            register,
            handleSubmit,
            setValue,
            formState: { errors },
          } = useForm();
          const{singleMarchent}=useSelector((state)=>state?.marchent)
             const dispatch=useDispatch()
            console.log(singleMarchent,"singleMarchent");
            useEffect(()=>{
        dispatch(getMarchentDetails({vendor_id:mId}))
            },[mId])
            useEffect(()=>{
              setValue("first_name",singleMarchent?.res?.[0]?.first_name);
              setValue("last_name",singleMarchent?.res?.[0]?.last_name);
              setValue("email",singleMarchent?.res?.[0]?.email);
              setValue("mobile",singleMarchent?.res?.[0]?.mobile);
             
              
            },[setValue,mId,singleMarchent])
            const onSubmit=(data)=>{
              dispatch(updateMarchent({...data,vendor_id:mId})).then((res)=>{
                console.log("Res",res);
                
              })
            }
            const handleDelete=(id)=>{
              setOpenDeleteModalM(true)
            }
    return(
        <>
        <Modal
        show={openManageMerchantDetailsModal}
        onClose={() => setOpenManageMerchantDetailsModal(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header className="text-[#435971]">Merchant Details</Modal.Header>
        <Modal.Body>
          <div className="space-y-4 h-[700px] overflow-y-scroll">
            <h3 className="text-base text-[#191919] font-bold mb-1">Details</h3>
            {/* <div className="flex gap-4">
              <div className="w-6/12">
                <div className="mb-1 block">
                  <Label value="Merchant Name" />
                </div>
                <TextInput type="text" placeholder="Erik Sarkar" required />
              </div>
              <div className="w-6/12">
                <div className="mb-1 block">
                  <Label value="Shop Name " />
                </div>
                <TextInput type="text" placeholder="Burger Shot" {...register} />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-6/12">
                <div className="mb-1 block">
                  <Label value="GSTIN No." />
                </div>
                <TextInput type="text" placeholder="19HVGHL9861V0Z1" required />
              </div>
              <div className="w-6/12">
                <div className="mb-1 block">
                  <Label value="Email Id" />
                </div>
                <TextInput
                  type="text"
                  placeholder="ErikSarkar@gmail.com"
                  required
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-6/12">
                <div className="mb-1 block">
                  <Label value="Phone Number " />
                </div>
                <TextInput type="text" placeholder="1234567890" required />
              </div>
              <div className="w-6/12">
                <div className="mb-1 block">
                  <Label value="Pincode" />
                </div>
                <TextInput type="text" placeholder="700013" required />
              </div>
            </div>
            <div>
              <div className="mb-1 block">
                <Label value="Address *" />
              </div>
              <Textarea
                placeholder="1/A, Lenin Sarani Kolkata"
                required
                rows={4}
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
            {/* <div>
              <div className="mb-1 block">
                <Label value="Shop Name *" />
              </div>
              <TextInput
                type="text"
                placeholder="Enter Company Name"
                {...register("shop_name",{required:"Compnay name is required"})}
              />
                                                        {errors.shop_name && (
  <p className="text-red-500 text-sm mt-1">{errors.shop_name.message}</p>
)}
            </div> */}
            {/* <div>
              <div className="mb-1 block">
                <Label value="Shop GSTIN No. *" />
              </div>
              <TextInput type="text" placeholder="Enter GSTIN No." {...register("gst_no",{required:"Gst No is required"})} />
                                                                    {errors.gst_no && (
  <p className="text-red-500 text-sm mt-1">{errors.gst_no.message}</p>
)}
            </div> */}

            {/* <div>
              <div className="mb-1 block">
                <Label value="Brand Name *" />
              </div>
              <TextInput type="text" placeholder="Enter Brand name" {...register("brand_name",{required:"Brand name is required"})} />
           {errors.brand_name && (
  <p className="text-red-500 text-sm mt-1">{errors.brand_name.message}</p>
)}
            </div> */}
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
            {/* <div>
              <div className="mb-1 block">
                <Label value="Address *" />
              </div>
              <Textarea placeholder="Enter Address" rows={4} {...register("shop_address",{required:"Address is required"})}/>
           {errors.shop_address && (
  <p className="text-red-500 text-sm mt-1">{errors.shop_address.message}</p>
)}
            </div> */}
                {/* <div>
              <div className="mb-1 block">
                <Label value="Zip Code *" />
              </div>
              <TextInput placeholder="Enter Zip Code"  {...register("zip_code",{required:"Zip code is required"})}/>
           {errors.zip_code && (
  <p className="text-red-500 text-sm mt-1">{errors.zip_code.message}</p>
)}
            </div> */}
            <h3 className="text-base text-[#191919] font-bold mb-1">
              Premium Upgrade
            </h3>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Subscription Tier
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                Basic
              </div>
            </div>
            <h3 className="text-base text-[#191919] font-bold mb-1">
              Wallets Balance
            </h3>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Current Balance
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                ₹ 20000
              </div>
            </div>
            <h3 className="text-base text-[#191919] font-bold mb-1">
              Points History
            </h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-[#F8F8F8] rounded-md p-3 text-center">
                <p className="text-[#697A8D] text-xs font-medium pb-2">
                  Points Earned
                </p>
                <p className="text-[#000000] text-xs font-medium">10,000</p>
              </div>
              <div className="bg-[#F8F8F8] rounded-md p-3 text-center">
                <p className="text-[#697A8D] text-xs font-medium pb-2">
                  Points Redeemed
                </p>
                <p className="text-[#000000] text-xs font-medium">7,000</p>
              </div>
              <div className="bg-[#F8F8F8] rounded-md p-3 text-center">
                <p className="text-[#697A8D] text-xs font-medium pb-2">
                  Points Expired
                </p>
                <p className="text-[#000000] text-xs font-medium">500</p>
              </div>
            </div>
            <div className="mb-0 block">
              <div className="flex gap-2">
                <button className="bg-[#05923C] hover:bg-black text-xs leading-[30px] rounded-md text-white font-normal px-4">
                  Issue points
                </button>
                <button className="bg-[#FF7760] hover:bg-black text-xs leading-[30px] rounded-md text-white font-normal px-4">
                  Revoke Points
                </button>
              </div>
            </div>
            <div className="mt-6 border border-[#E5E5E5] rounded-lg overflow-hidden">
              <h3 className="text-[#697A8D] text-sm font-semibold border-b border-[#E5E5E5] py-3 pl-6">
                Transaction History
              </h3>
              <div className="overflow-x-auto">
                <Table striped>
                  <TableHead>
                    <TableHeadCell className="font-semibild">
                      Date
                    </TableHeadCell>
                    <TableHeadCell className="font-semibild">
                      Type
                    </TableHeadCell>
                    <TableHeadCell className="font-semibild">
                      ₹ 500
                    </TableHeadCell>
                    <TableHeadCell className="font-semibild">
                      Reason
                    </TableHeadCell>
                  </TableHead>
                  <TableBody className="divide-y">
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell className="py-2 text-[#697A8D]">
                        03-07-25
                      </TableCell>
                      <TableCell className="py-2 text-[#05923C]">
                        Credit
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        ₹ 500
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        Refund
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell className="py-2 text-[#697A8D]">
                        03-07-25
                      </TableCell>
                      <TableCell className="py-2 text-[#05923C]">
                        Credit
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        ₹ 500
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        Refund
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell className="py-2 text-[#697A8D]">
                        03-07-25
                      </TableCell>
                      <TableCell className="py-2 text-[#05923C]">
                        Credit
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        ₹ 500
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        Refund
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell className="py-2 text-[#697A8D]">
                        03-07-25
                      </TableCell>
                      <TableCell className="py-2 text-[#F55D43]">
                        Debit
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        ₹ 500
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        Withdrawal
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell className="py-2 text-[#697A8D]">
                        03-07-25
                      </TableCell>
                      <TableCell className="py-2 text-[#F55D43]">
                        Debit
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        ₹ 500
                      </TableCell>
                      <TableCell className="py-2 text-[#697A8D]">
                        Withdrawal
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="mb-0 block">
              <div className="flex justify-end gap-2">
               
                <button type="button" onClick={handleDelete} className="bg-[#F85656] hover:bg-black text-xs leading-[30px] rounded-md text-white font-normal px-4">
                  Suspend Account
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button
            className="bg-white text-gray-700 hover:bg-[#9b1c1c] hover:text-white border border-gray-300"
            onClick={() => setOpenManageMerchantDetailsModal(false)}
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
export default UpdateMarchentModal;