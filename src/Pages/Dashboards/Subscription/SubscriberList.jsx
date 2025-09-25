import { useState } from "react";
import CommonModal from "../../../components/Common/CommonModal";

const SubscriberList = ({ subscribers }) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Use subscribers directly, avoid redundant state
  const totalPages = Math.ceil((subscribers?.length || 0) / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = subscribers?.slice(indexOfFirstUser, indexOfLastUser) || [];

  const handleViewClick = (subscription) => {
    setSelectedUser(subscription);
    setIsViewModalOpen(true);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="p-6 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold mb-5">Subscribers</h2>
      {currentUsers.length > 0 ? (
        currentUsers.map((subscription, index) => (
          <div
            key={subscription?.user?.id || index} // Use unique ID if available
            className="flex items-center justify-between mb-4 border-b border-gray-200 p-2"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full">
                <img
                  src={subscription?.user?.photo || import.meta.env.VITE_DEFAULT_AVATAR_PATH}
                  alt={subscription?.user?.full_name || "User"}
                  className="w-full h-full object-cover rounded-full border-2 border-gray-200 shadow-sm"
                />
              </div>
              <div>
                <p className="font-semibold">{subscription?.user?.full_name || "N/A"}</p>
                <p className="text-gray-500">{subscription?.user?.email_address || "N/A"}</p>
              </div>
            </div>
            <button
              onClick={() => handleViewClick(subscription)}
              className="py-2 px-5 border border-gray-400 rounded-xl hover:bg-gray-100"
            >
              View
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No subscribers found.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`py-2 px-4 border border-gray-200 rounded-xl ${
              currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-[#FFF1CE]"
            }`}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`py-2 px-4 rounded-xl ${
                currentPage === number ? "bg-[#FFF1CE]" : "hover:bg-[#FFF1CE]"
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`py-2 px-4 border border-gray-200 rounded-xl ${
              currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-[#FFF1CE]"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* View Modal */}
      <CommonModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="User Details"
      >
        {selectedUser && (
          <div className="space-y-4 text-center">
            <img
              src={selectedUser?.user?.photo || import.meta.env.VITE_DEFAULT_AVATAR_PATH}
              alt={selectedUser?.user?.full_name || "User"}
              className="h-24 w-24 rounded-full mx-auto"
            />
            <p className="text-lg font-semibold">{selectedUser?.user?.full_name || "N/A"}</p>
            <p className="text-gray-500">Email: {selectedUser?.user?.email_address || "N/A"}</p>
            <p className="text-gray-500">Age: {selectedUser?.user?.age || "N/A"}</p>
            <p className="text-gray-500">Location: {selectedUser?.user?.location || "N/A"}</p>
            <p className="text-gray-500">Gender: {selectedUser?.user?.gender || "N/A"}</p>
            <p className="text-gray-500">Plan: {selectedUser?.plan?.name || "N/A"}</p>
            <p className="text-gray-500">
              Subscribed on: {selectedUser?.created_at
                ? new Date(selectedUser.created_at).toLocaleDateString("en-US", {
                    month: "numeric",
                    day: "numeric",
                    year: "numeric",
                  })
                : "N/A"}
            </p>
            <p className="text-gray-500">
              Expires on: {selectedUser?.expires_at
                ? new Date(selectedUser.expires_at).toLocaleDateString("en-US", {
                    month: "numeric",
                    day: "numeric",
                    year: "numeric",
                  })
                : "N/A"}
            </p>
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="border border-gray-400 hover:shadow-xl px-4 py-2 rounded-md w-full"
            >
              Close
            </button>
          </div>
        )}
      </CommonModal>
    </div>
  );
};

export default SubscriberList;