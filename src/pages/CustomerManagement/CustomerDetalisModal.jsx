import { Button, Modal } from "flowbite-react"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCustomerDetails } from "../../Reducer/CustomerSlice";

const CustomerDetalisModal=({ openCustomerDetailsModal,
    setOpenCustomerDetailsModal,selectedCustomer,setOpenManageCustomerDetailsModal})=>{
        const{singleCustomer}=useSelector((state)=>state?.coustomers)
        const dispatch=useDispatch()

// useEffect(()=>{
// dispatch(getCustomerDetails(selectedCustomer))
// },[])
        

  const handleManageCustomerDetails = () => {
    setOpenManageCustomerDetailsModal(true);
    setOpenCustomerDetailsModal(false);
  };
    return(
    <>
      <Modal
        show={openCustomerDetailsModal}
        onClose={() => setOpenCustomerDetailsModal(false)}
      >
        <Modal.Header className="text-[#435971]">Customer Details</Modal.Header>
        <Modal.Body>
          <div className="space-y-4 h-[700px] overflow-y-scroll">
            <h3 className="text-base text-[#191919] font-bold mb-1">Details</h3>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Customer Name
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                {selectedCustomer?.originalData?.full_name || 'N/A'}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Phone Number
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                {selectedCustomer?.originalData?.mobile || 'N/A'}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Status
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                {selectedCustomer?.originalData?.status === 1 ? 'Active' : 'Inactive'}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Member Since
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                {selectedCustomer?.originalData?.created_at 
                  ? new Date(selectedCustomer.originalData.created_at).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })
                  : 'N/A'}
              </div>
            </div>

            <h3 className="text-base text-[#191919] font-bold mb-1">
              Wallet Balance
            </h3>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Current Balance
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                ₹ {selectedCustomer?.originalData?.wallet?.balance || '0'}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Currency
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                {selectedCustomer?.originalData?.wallet?.currency || 'INR'}
              </div>
            </div>

            {selectedCustomer?.originalData?.last_transaction && (
              <>
                <h3 className="text-base text-[#191919] font-bold mb-1">
                  Last Transaction
                </h3>
                <div className="flex gap-4">
                  <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                    Amount
                  </div>
                  <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                    ₹ {selectedCustomer.originalData.last_transaction.amount}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                    Type
                  </div>
                  <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                    {selectedCustomer.originalData.last_transaction.transaction_type}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                    Purpose
                  </div>
                  <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                    {selectedCustomer.originalData.last_transaction.transaction_purpose}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                    Date
                  </div>
                  <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                    {new Date(selectedCustomer.originalData.last_transaction.created_at).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </>
            )}

            <h3 className="text-base text-[#191919] font-bold mb-1">
              Points History
            </h3>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Total Points
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                {selectedCustomer?.originalData?.promoCoins?.total_points || 0} pts
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Valid Points
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                {selectedCustomer?.originalData?.promoCoins?.valid_points || 0} pts
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-sm text-[#697A8D] font-medium mb-2 w-6/12">
                Expired Points
              </div>
              <div className="text-sm text-[#2A2A3C] font-medium mb-2 w-6/12">
                {selectedCustomer?.originalData?.promoCoins?.expired_points || 0} pts
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button
            className="bg-white text-gray-700 hover:bg-[#9b1c1c] hover:text-white border border-gray-300"
            onClick={() => setOpenCustomerDetailsModal(false)}
          >
            Cancel
          </Button>
          <Button
             onClick={()=>handleManageCustomerDetails()}
            className="bg-[#686AF8] hover:bg-black"
          >
            Manage Customer
          </Button>
        </Modal.Footer>
      </Modal>
    
    </>)
}
export default CustomerDetalisModal