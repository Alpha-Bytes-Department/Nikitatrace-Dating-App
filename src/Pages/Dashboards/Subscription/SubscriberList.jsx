import { useState } from "react";
import CommonModal from "../../../components/Common/CommonModal";
import { toast } from "react-toastify";

const SubscriberList = ({subscribers}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const [users, setUsers] = useState(subscribers);

  console.log("subscribers", users)
  
  const handleViewClick = (subscription) => {
    setSelectedUser(subscription);
    setIsViewModalOpen(true);
  };


  // Calculate pagination
  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="p-6 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold mb-5">Subscribers</h2>
      {currentUsers.length > 0 ? (
        currentUsers.map((subscription, index) => (
          <div
            key={index}
            className="flex items-center justify-between mb-4 border-b border-gray-200 p-2"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full">
                <img src={subscription.user.photo || import.meta.env.VITE_DEFAULT_AVATAR_PATH} alt="" className="w-full h-full object-cover rounded-full border-2 border-gray-200 shadow-sm" />
              </div>
              <span>
                <p className="font-semibold">{subscription.user.full_name}</p>
                <p className="text-gray-500">{subscription.user.email_address}</p>
              </span>
            </div>
            <div className="flex gap-6">
              <button
                onClick={() => handleViewClick(subscription)}
                className="py-2 px-5 border border-gray-400 rounded-xl hover:bg-gray-100"
              >
                View
              </button>
            </div>
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
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "hover:bg-[#FFF1CE]"
            }`}
          >
            Previous
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`py-2 px-4 rounded-xl ${
                currentPage === number ? "bg-[#FFF1CE] " : "hover:bg-[#FFF1CE] "
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`py-2 px-4 border border-gray-200 rounded-xl ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "hover:bg-[#FFF1CE]"
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
              src={selectedUser.user.photo || import.meta.env.VITE_DEFAULT_AVATAR_PATH}
              alt={selectedUser.user.full_name}
              className="h-24 w-24 rounded-full mx-auto"
            />
            <p className="text-lg font-semibold">{selectedUser.user.full_name}</p>
            <p className="text-gray-500">Email: {selectedUser.user.email_address}</p>
            <p className="text-gray-500">Age: {selectedUser.user.age}</p>
            <p className="text-gray-500">Location: {selectedUser.user.location}</p>
            <p className="text-gray-500">Gender: {selectedUser.user.gender}</p>
            <p className="text-gray-500">Plan: {selectedUser.plan.name}</p>
            <p className="text-gray-500">Subscribed on: {new Date(selectedUser.created_at).toLocaleDateString()}</p>
            <p className="text-gray-500">Expires on: {new Date(selectedUser.expires_at).toLocaleDateString()}</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="border border-gray-400 hover:shadow-xl px-4 py-2 rounded-md w-full"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </CommonModal>
    </div>
  );
};

export default SubscriberList;
