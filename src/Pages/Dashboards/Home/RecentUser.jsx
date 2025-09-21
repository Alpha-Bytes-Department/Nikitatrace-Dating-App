import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import CommonModal from "../../../components/Common/CommonModal";

import useDelete from "../../../lib/useDelete";
import { deleteUserUrl } from "../../../../endpoints";


const RecentUser = ({user_list}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const { deleteResource } = useDelete();

  useEffect(() => {
    setUsers(user_list)
  }, [])

  const sliceUser = users.slice(0,5)
  console.log("sliced users", sliceUser)

  const handleViewClick = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      
      await deleteResource(deleteUserUrl(selectedUser.id));
      console.log("user is delete")
      setUsers(users.filter((user) => user.id !== selectedUser.id));
      toast.success("User deleted successfully!");
      console.log("show toast")
      setIsDeleteModalOpen(false);
      setSelectedUser(null);

    } catch (error) {
      toast.error("Failed to delete user!");
      console.log(error);
    }
  };

  return (
    <div className="p-6 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold mb-5">Recent Users</h2>
      {sliceUser.map((user) => (
        <div key={user.id} className="flex items-center justify-between mb-4 border-b border-gray-200 p-2">
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
              className="py-2 px-5 border border-gray-400 rounded-xl"
            >
              View
            </button>
            <button
              onClick={() => handleDeleteClick(user)}
              className="py-2 px-5 border border-gray-400 rounded-xl"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

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
              alt={selectedUser.full_name}
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
            <p className="text-lg">Are you sure you want to delete {selectedUser.full_name}?</p>
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
  );
};

export default RecentUser;