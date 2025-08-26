import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Search } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommonModal from "../../../components/Common/CommonModal";

const initialUsers = [
  {
    id: 1,
    name: "John Anderson",
    email: "john.anderson@blueoceanlogistics.com",
    joined_at: "2023-06-12",
    subscription_expires: "2025-06-12",
    role: "User",
  },
  {
    id: 2,
    name: "Sophie Martinez",
    email: "sophie.martinez@nauticore.com",
    joined_at: "2022-11-03",
    subscription_expires: "2025-11-03",
    role: "Admin",
  },
  {
    id: 3,
    name: "Robert Kim",
    email: "robert.kim@maritechglobal.com",
    joined_at: "2024-02-21",
    subscription_expires: "2025-02-21",
    role: "User",
  },
  {
    id: 4,
    name: "Alice Thompson",
    email: "alice.thompson@oceanixmarine.com",
    joined_at: "2023-08-17",
    subscription_expires: "2025-08-17",
    role: "User",
  },
  {
    id: 5,
    name: "Michael Chen",
    email: "michael.chen@seawavecarriers.com",
    joined_at: "2023-10-01",
    subscription_expires: "2025-10-01",
    role: "Moderator",
  },
  {
    id: 6,
    name: "Emily Nguyen",
    email: "emily.nguyen@deepbluefreight.com",
    joined_at: "2024-04-10",
    subscription_expires: "2025-04-10",
    role: "User",
  },
  {
    id: 7,
    name: "David Rodriguez",
    email: "david.rodriguez@navistarlines.com",
    joined_at: "2022-12-20",
    subscription_expires: "2025-12-20",
    role: "User",
  },
];

const PrivateMode = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tokenToDelete, setTokenToDelete] = useState(null);

  const handleDeleteClick = (user) => {
    setTokenToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    try {
      setUsers(users.filter((user) => user.id !== tokenToDelete.id));
      toast.success("User deleted successfully!");
      setIsDeleteModalOpen(false);
      setTokenToDelete(null);
    } catch (error) {
      toast.error("Failed to delete user!");
      console.error(error);
    }
  };

  // Filter users by name or email
  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Summary Cards */}
      <div className="flex items-center gap-3">
        <div className="p-6 rounded-lg shadow-sm bg-[#F8ECEE] border border-[#DBDADA] w-full">
          <div className="flex items-center justify-center gap-7">
            <div className="text-center">
              <p className="text-sm font-medium opacity-80">
                Total Subscribers
              </p>
              <p className="text-3xl font-bold mt-1 text-[#E03D6F]">
                {users.length}
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-lg shadow-sm bg-[#F8ECEE] border border-[#DBDADA] w-full">
          <div className="text-center">
            <p className="text-sm font-medium opacity-80">Total Earning</p>
            <p className="text-3xl font-bold mt-1 text-[#F18960]">$12k</p>
          </div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="mt-8 mb-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none w-full"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="w-5 h-5" />
          </span>
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-xl p-5">
        <h2 className="text-2xl font-semibold mb-5">Recent Users</h2>
        <table className="min-w-full rounded-xl text-center overflow-hidden">
          <thead>
            <tr className="text-sm bg-[#F8ECEE]">
              <th className="p-4 text-left">User Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Joining Date</th>
              <th className="p-4">Subscription Ends</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-center">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, idx) => (
                <tr key={idx} className="border-t border-gray-200">
                  <td className="py-3 px-4 text-left">{user.name}</td>
                  <td className="py-4 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.joined_at}</td>
                  <td className="py-3 px-4">{user.subscription_expires}</td>
                  <td className="py-3 px-4 flex items-center justify-center gap-5">
                    <button onClick={() => handleDeleteClick(user)}>
                      <RiDeleteBin5Line className="text-red-500 hover:text-red-700 transition cursor-pointer  text-xl" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Delete Confirmation Modal */}
        <CommonModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Confirm Delete"
        >
          {tokenToDelete && (
            <div className="space-y-4 text-center">
              <p className="text-lg">Are you sure you want to delete?</p>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="border border-[#FF2D55] px-4 py-2 rounded-md w-full"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="text-white px-4 py-2 rounded-md bg-gradient-to-r from-[#D30579] to-[#FAB558] w-full"
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

export default PrivateMode;
