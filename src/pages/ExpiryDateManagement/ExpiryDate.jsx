import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify"
import { Button } from "flowbite-react";
import { useDispatch } from "react-redux";
import { getExpiryDate, updateExpiredIn } from "../../Reducer/ExpiryDateSlice";
import { useSelector } from "react-redux";
const ExpiryDate = () =>{
    const [isEditing, setIsEditing] = useState(false);
    const [maxLimit, setMaxLimit] = useState("");
    const {expired_in,loading} = useSelector((state)=>state?.expiredIn);
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(getExpiryDate())
    },[dispatch])
    useEffect(()=>{
      if(expired_in?.expired_in){
          setMaxLimit(expired_in?.expired_in)
      }
    },[expired_in])
    // console.log(expired_in)
    const handleUpdate = () =>{
      setIsEditing(true)
    }
    const handleCancel = () =>{
      setIsEditing(false)
    }
    const handleSave = async (id) =>{
      try{
          if(!maxLimit){
            return toast.error("Please provide expired validity before proceed");
          }
          const userInput={
            expired_in:Number(maxLimit)
          }
          // console.log(userInput)
          const resp = await dispatch(updateExpiredIn({id,userInput}));
          // console.log(resp?.payload);
          if(resp?.payload.status_code === 200){
            toast.success(resp?.payload?.message);
            setIsEditing(false)
          }else{
            toast.error(resp?.payload?.message);
            setIsEditing(true)
          }
      } catch (error) {
      console.error("Error updating coin limit:", error);
      toast.error(error?.message || "Failed to update coin limit");
    }
      
    }
    return (
        <>
            <div>
                    <ToastContainer />
                    <div className="wrapper_area my-0 mx-auto p-6 rounded-xl bg-white">
                      <div className="max-w-2xl mx-auto">
                        <div className="mb-6">
                          <h2 className="text-2xl font-semibold text-gray-800">
                            Validity Period
                          </h2>
                          <p className="text-sm text-gray-500 mt-1">
                            Set the validity period for promo coins as per months
                          </p>
                        </div>
            
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 shadow-sm border border-blue-100">
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex-1">
                              <label className="block text-sm font-medium text-gray-700 mb-3">
                                Validity Period (months)
                              </label>
            
                              {isEditing ? (
                                <div className="flex items-center gap-3">
                                  <input
                                    type="number"
                                    value={maxLimit}
                                    onChange={(e) => setMaxLimit(e.target.value)}
                                    className="w-32 px-4 py-3 text-2xl font-bold text-indigo-600 border-2 border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                  />
                                  {/* <span className="text-2xl font-bold text-indigo-600">%</span> */}
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <span className="text-5xl font-bold text-indigo-600">
                                    {maxLimit || 0}
                                  </span>
                                  {/* <span className="text-3xl font-bold text-indigo-600">%</span> */}
                                </div>
                              )}
                            </div>
            
                            <div className="ml-6">
                              <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                                <svg
  className="w-12 h-12 text-white"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
>
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
</svg>
                              </div>
                            </div>
                          </div>
            
                          <div className="flex items-center justify-between pt-6 border-t border-indigo-200">
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Status:</span>{" "}
                              <span
                                className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${
                                  expired_in?.status === 1
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {expired_in?.status === 1 ? "Active" : "Inactive"}
                              </span>
                            </div>
            
                            <div className="flex gap-3">
                              {isEditing ? (
                                <>
                                  <Button
                                    onClick={handleCancel}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium"
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    onClick={()=>handleSave(expired_in?.id)}
                                    disabled={loading}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    {loading ? "Saving..." : "Save Changes"}
                                  </Button>
                                </>
                              ) : (
                                <Button
                                  onClick={handleUpdate}
                                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium"
                                >
                                  Update Date
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
            
                        {/* {limitCoins?.data?.updated_at && (
                          <div className="mt-4 text-sm text-gray-500 text-center">
                            Last updated:{" "}
                            {new Date(limitCoins.data.updated_at).toLocaleString()}
                          </div>
                        )} */}
                      </div>
                    </div>
                  </div>
        </>
    )
}
export default ExpiryDate