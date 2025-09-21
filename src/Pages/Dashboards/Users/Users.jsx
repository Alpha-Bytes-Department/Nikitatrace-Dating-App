import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Search } from "lucide-react";

import {userListUrl, deleteUserUrl} from "../../../../endpoints"
import useFetch from "../../../lib/useFetch";
import useDelete from "../../../lib/useDelete";

import Loading from "../../../components/Common/Loading"
import CommonModal from "../../../components/Common/CommonModal";


const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const {data = [], loading, error} = useFetch(userListUrl);

  const [users, setUsers] = useState([]);

  const {deleteResource} = useDelete();

 useEffect(() => {
  if (data) setUsers(data);
}, [data]);


  const handleViewClick = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    try {
      
      deleteResource(deleteUserUrl(selectedUser.id));

      setUsers(users.filter((user) => user.id !== selectedUser.id));
      toast.success("User deleted successfully!");
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
      
      // Adjust current page if necessary after deletion
      const totalPages = Math.ceil(
        users.filter(
          (user) =>
            user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email_address.toLowerCase().includes(searchTerm.toLowerCase())
        ).length / usersPerPage
      );
      if (currentPage > totalPages) {
        setCurrentPage(totalPages || 1);
      }
    } catch (error) {
      toast.error("Failed to delete user!");
      console.log(error);
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email_address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if(loading) {
    return (
      <Loading />
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-7">User Management</h1>
      <div className="flex items-center justify-between mt-7 mb-7">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 border border-gray-200 shadow-lg rounded-xl outline-none w-full"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="w-5 h-5" />
          </span>
        </div>
      </div>
      <div className="p-6 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold mb-5">Users</h2>
        {currentUsers.length > 0 ? (
          currentUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between mb-4 border-b border-gray-200 p-2"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full">
                  <img
                  src={user.photo || import.meta.env.VITE_DEFAULT_AVATAR_PATH}
                  alt={user.full_name}
                  className="w-full h-full object-cover rounded-full border-2 border-gray-200 shadow-sm"
                />
                </div>
                <span>
                  <p className="font-semibold">{user.full_name}</p>
                  <p className="text-gray-500">{user.email_address}</p>
                </span>
              </div>
              <div className="flex gap-6">
                <button
                  onClick={() => handleViewClick(user)}
                  className="py-2 px-5 border border-gray-400 rounded-xl hover:bg-gray-100"
                >
                  View
                </button>
                <button
                  onClick={() => handleDeleteClick(user)}
                  className="py-2 px-5 border border-gray-400 rounded-xl hover:bg-gray-100"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No users found.</p>
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
                  currentPage === number
                    ? "bg-[#FFF1CE] "
                    : "hover:bg-[#FFF1CE] "
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
                src={selectedUser.photo || import.meta.env.VITE_DEFAULT_AVATAR_PATH}
                alt={selectedUser.name}
                className="h-24 w-24 rounded-full mx-auto"
              />
              <p className="text-lg font-semibold">{selectedUser.full_name}</p>
              <p className="text-gray-500">Email: {selectedUser.email_address}</p>
              <p className="text-gray-500">Age: {selectedUser.profile?.age}</p>
              <p className="text-gray-500">Location: {selectedUser.profile?.location}</p>
              <p className="text-gray-500">Gender: {selectedUser.profile?.gender}</p>
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

        {/* Delete Modal */}
        <CommonModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Confirm Delete"
        >
          {selectedUser && (
            <div className="space-y-4 text-center">
              <p className="text-lg">
                Are you sure you want to delete {selectedUser.name}?
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="border border-gray-400 px-4 py-2 rounded-md w-full"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="text-white px-4 py-2 rounded-md bg-[#CE8B38] w-full"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </CommonModal>
      </div>
    </div>
  );
};

export default Users;