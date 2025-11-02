
// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { getCoinsLimitDetails } from "../../Reducer/CoinSlice"
// import { ToastContainer } from "react-toastify"
// import { Button } from "flowbite-react"

// const ManageCoin = () => {
//   const { limitCoins } = useSelector((state) => state?.coins)
//   const dispatch = useDispatch()
//   const [isEditing, setIsEditing] = useState(false)
//   const [maxLimit, setMaxLimit] = useState("")

//   useEffect(() => {
//     dispatch(getCoinsLimitDetails())
//   }, [dispatch])

//   useEffect(() => {
//     if (limitCoins?.data?.coin_use_percent_max_limit) {
//       setMaxLimit(limitCoins.data.coin_use_percent_max_limit)
//     }
//   }, [limitCoins])

//   console.log("limitCoins", limitCoins)

//   const handleUpdate = () => {
//     setIsEditing(true)
//   }

//   const handleSave = () => {
//     // Add your update API call here
//     console.log("Saving new limit:", maxLimit)
//     setIsEditing(false)
//     // dispatch(updateCoinLimit({ id: limitCoins.data.id, coin_use_percent_max_limit: maxLimit }))
//   }

//   const handleCancel = () => {
//     setMaxLimit(limitCoins?.data?.coin_use_percent_max_limit || "")
//     setIsEditing(false)
//   }

//   return (
//     <>
//       <div>
//         <ToastContainer />
//         <div className="wrapper_area my-0 mx-auto p-6 rounded-xl bg-white">
//           <div className="max-w-2xl mx-auto">
//             <div className="mb-6">
//               <h2 className="text-2xl font-semibold text-gray-800">
//                 Maximum Use of Coins
//               </h2>
//               <p className="text-sm text-gray-500 mt-1">
//                 Set the maximum percentage of coins that can be used per transaction
//               </p>
//             </div>

//             <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 shadow-sm border border-blue-100">
//               <div className="flex items-center justify-between mb-6">
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium text-gray-700 mb-3">
//                     Maximum Coin Usage Limit 
//                   </label>
                  
//                   {isEditing ? (
//                     <div className="flex items-center gap-3">
//                       <input
//                         type="number"
//                         min="0"
//                         max="100"
//                         value={maxLimit}
//                         onChange={(e) => setMaxLimit(e.target.value)}
//                         className="w-32 px-4 py-3 text-2xl font-bold text-indigo-600 border-2 border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                       />
//                       {/* <span className="text-2xl font-bold text-indigo-600">%</span> */}
//                     </div>
//                   ) : (
//                     <div className="flex items-center gap-2">
//                       <span className="text-5xl font-bold text-indigo-600">
//                         {maxLimit || 0}
//                       </span>
//                       {/* <span className="text-3xl font-bold text-indigo-600">%</span> */}
//                     </div>
//                   )}
//                 </div>

//                 <div className="ml-6">
//                   <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
//                     <svg
//                       className="w-12 h-12 text-white"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center justify-between pt-6 border-t border-indigo-200">
//                 <div className="text-sm text-gray-600">
//                   <span className="font-medium">Status:</span>{" "}
//                   <span
//                     className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${
//                       limitCoins?.data?.status === 1
//                         ? "bg-green-100 text-green-700"
//                         : "bg-gray-100 text-gray-700"
//                     }`}
//                   >
//                     {limitCoins?.data?.status === 1 ? "Active" : "Inactive"}
//                   </span>
//                 </div>

//                 <div className="flex gap-3">
//                   {isEditing ? (
//                     <>
//                       <Button
//                         onClick={handleCancel}
//                         className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium"
//                       >
//                         Cancel
//                       </Button>
//                       <Button
//                         onClick={handleSave}
//                         className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium"
//                       >
//                         Save Changes
//                       </Button>
//                     </>
//                   ) : (
//                     <Button
//                       onClick={handleUpdate}
//                       className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium"
//                     >
//                       Update Limit
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {limitCoins?.data?.updated_at && (
//               <div className="mt-4 text-sm text-gray-500 text-center">
//                 Last updated: {new Date(limitCoins.data.updated_at).toLocaleString()}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default ManageCoin





import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCoinsLimitDetails, setLimitDetails } from "../../Reducer/CoinSlice"
import { ToastContainer, toast } from "react-toastify"
import { Button } from "flowbite-react"

const ManageCoin = () => {
  const { limitCoins, loading } = useSelector((state) => state?.coins)
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [maxLimit, setMaxLimit] = useState("")

  useEffect(() => {
    dispatch(getCoinsLimitDetails())
  }, [dispatch])

  useEffect(() => {
    if (limitCoins?.data?.coin_use_percent_max_limit) {
      setMaxLimit(limitCoins.data.coin_use_percent_max_limit)
    }
  }, [limitCoins])

  console.log("limitCoins", limitCoins)

  const handleUpdate = () => {
    setIsEditing(true)
  }

  const handleSave = async () => {
    // Validation
    if (!maxLimit || maxLimit < 0 || maxLimit > 100) {
      toast.error("Please enter a valid limit between 0 and 100")
      return
    }

    try {
      const userInput = {
        id: limitCoins?.data?.id,
        coin_use_percent_max_limit: Number(maxLimit)
      }

      const response = await dispatch(setLimitDetails(userInput)).unwrap()
      
      if (response?.status) {
        toast.success(response?.message || "Coin limit updated successfully!")
        setIsEditing(false)
        // Refresh the data
        dispatch(getCoinsLimitDetails())
      } else {
        toast.error(response?.message || "Failed to update coin limit")
      }
    } catch (error) {
      console.error("Error updating coin limit:", error)
      toast.error(error?.message || "Failed to update coin limit")
    }
  }

  const handleCancel = () => {
    setMaxLimit(limitCoins?.data?.coin_use_percent_max_limit || "")
    setIsEditing(false)
  }

  return (
    <>
      <div>
        <ToastContainer />
        <div className="wrapper_area my-0 mx-auto p-6 rounded-xl bg-white">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Maximum Use of Coins
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Set the maximum percentage of coins that can be used per transaction
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 shadow-sm border border-blue-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Maximum Coin Usage Limit 
                  </label>
                  
                  {isEditing ? (
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min="0"
                        max="100"
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-indigo-200">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${
                      limitCoins?.data?.status === 1
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {limitCoins?.data?.status === 1 ? "Active" : "Inactive"}
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
                        onClick={handleSave}
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
                      Update Limit
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {limitCoins?.data?.updated_at && (
              <div className="mt-4 text-sm text-gray-500 text-center">
                Last updated: {new Date(limitCoins.data.updated_at).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageCoin