import { useState } from "react";
import {
  RiDeleteBin5Line,
  RiEditBoxLine,
  RiEqualizerLine,
} from "react-icons/ri";
import { ChartSpline, Search } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommonModal from "../../../components/Common/CommonModal";

const initialUsers = [
  {
    id: 1,
    name: "John Anderson",
    email: "john.anderson@blueoceanlogistics.com",
    company_name: "Blue Ocean Logistics",
    ship_name: "MV Pacific Star",
    role: "User",
  },
  {
    id: 2,
    name: "Sophie Martinez",
    email: "sophie.martinez@nauticore.com",
    company_name: "Nauticore Shipping",
    ship_name: "SS Horizon Dawn",
    role: "Admin",
  },
  {
    id: 3,
    name: "Robert Kim",
    email: "robert.kim@maritechglobal.com",
    company_name: "Maritech Global",
    ship_name: "MV Atlantic Crest",
    role: "User",
  },
  {
    id: 4,
    name: "Alice Thompson",
    email: "alice.thompson@oceanixmarine.com",
    company_name: "Oceanix Marine",
    ship_name: "MV Neptune Voyager",
    role: "User",
  },
  {
    id: 5,
    name: "Michael Chen",
    email: "michael.chen@seawavecarriers.com",
    company_name: "Seawave Carriers",
    ship_name: "SS Aurora Tide",
    role: "Moderator",
  },
  {
    id: 6,
    name: "Emily Nguyen",
    email: "emily.nguyen@deepbluefreight.com",
    company_name: "Deep Blue Freight",
    ship_name: "MV Coral Wind",
    role: "User",
  },
  {
    id: 7,
    name: "David Rodriguez",
    email: "david.rodriguez@navistarlines.com",
    company_name: "Navistar Lines",
    ship_name: "SS Ocean Spirit",
    role: "User",
  },
];

const Users = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tokenToDelete, setTokenToDelete] = useState(null);
  const [selectedToken, setSelectedToken] = useState(null);

  const handleEdit = (user) => {
    setSelectedToken(user);
    setIsEditModalOpen(true);
  };

  const handleUpdateToken = () => {
    try {
      if (
        !selectedToken.name ||
        !selectedToken.email ||
        !selectedToken.company_name ||
        !selectedToken.ship_name ||
        !selectedToken.role
      ) {
        toast.error("All fields are required!");
        return;
      }
      setUsers(
        users.map((user) =>
          user.id === selectedToken.id ? selectedToken : user
        )
      );
      toast.success("User updated successfully!");
      setIsEditModalOpen(false);
      setSelectedToken(null);
    } catch (error) {
      toast.error("Failed to update user!");
      console.log(error);
    }
  };

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
      console.log(error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term);
    const matchesRole =
      roleFilter === "All" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex items-center gap-3">
        <div className="p-6 rounded-lg shadow-sm bg-[#ECF1EA] border border-[#DBDADA] w-full">
          <div className="flex items-center justify-center gap-7">
            <div className="text-center">
              <p className="text-sm font-medium opacity-80">Total Users</p>
              <p className="text-3xl font-bold mt-1 text-[#909451]">
                {users.length}
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-lg shadow-sm bg-[#E1F6EB] border border-[#DBDADA] w-full">
          <div className="flex items-center justify-center gap-7">
            <div className="text-center">
              <p className="text-sm font-medium opacity-80">Active Offers</p>
              <p className="text-3xl font-bold mt-1 text-[#22C55E]">12</p>
            </div>
            <ChartSpline className="w-8 h-8 text-[#22C55E]" />
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center justify-between mt-8 mb-4 relative">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none w-full"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="w-5 h-5" />
          </span>
        </div>

        <div className="relative">
          <button
            onClick={() => setFilterDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 bg-[#F8ECEE] px-4 py-2 rounded-lg ml-4 hover:bg-[#a0730b] transition"
          >
            <RiEqualizerLine className="text-2xl" />
          </button>
          {filterDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow z-10">
              {["All", "User", "Admin", "Moderator"].map((role) => (
                <div
                  key={role}
                  onClick={() => {
                    setRoleFilter(role);
                    setFilterDropdownOpen(false);
                  }}
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                    roleFilter === role ? "font-bold text-[#D30579]" : ""
                  }`}
                >
                  {role}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-xl p-5">
        <h2 className="text-2xl font-semibold mb-5">All Users</h2>
        <table className="min-w-full rounded-xl text-center overflow-hidden">
          <thead>
            <tr className="text-sm bg-[#F8ECEE]">
              <th className="p-4 text-left">User Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Company Name</th>
              <th className="p-4">Ship Name</th>
              <th className="p-4">Role</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-center">
            {filteredUsers.map((user, idx) => (
              <tr key={idx} className="border-t border-gray-200">
                <td className="py-3 px-4 text-left">{user.name || "N/A"}</td>
                <td className="py-4 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.company_name || "N/A"}</td>
                <td className="py-3 px-4">{user.ship_name}</td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-3 px-4 flex items-center justify-center gap-5">
                  <button onClick={() => handleEdit(user)}>
                    <RiEditBoxLine className="cursor-pointer text-xl" />
                  </button>
                  <button onClick={() => handleDeleteClick(user)}>
                    <RiDeleteBin5Line className="text-red-500 hover:text-red-700 transition cursor-pointer text-xl" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="6" className="py-6 text-gray-400 italic">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <CommonModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedToken(null);
          }}
          title="Edit User"
        >
          {selectedToken && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full border border-blue-300 rounded-md p-2"
                  placeholder="Name"
                  value={selectedToken.name || ""}
                  onChange={(e) =>
                    setSelectedToken({ ...selectedToken, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full border border-blue-300 rounded-md p-2"
                  placeholder="Email"
                  value={selectedToken.email || ""}
                  onChange={(e) =>
                    setSelectedToken({ ...selectedToken, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  className="w-full border border-blue-300 rounded-md p-2"
                  placeholder="Company Name"
                  value={selectedToken.company_name || ""}
                  onChange={(e) =>
                    setSelectedToken({ ...selectedToken, company_name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ship Name</label>
                <input
                  type="text"
                  className="w-full border border-blue-300 rounded-md p-2"
                  placeholder="Ship Name"
                  value={selectedToken.ship_name || ""}
                  onChange={(e) =>
                    setSelectedToken({ ...selectedToken, ship_name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  className="w-full border border-blue-300 rounded-md p-2"
                  value={selectedToken.role || ""}
                  onChange={(e) =>
                    setSelectedToken({ ...selectedToken, role: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="Moderator">Moderator</option>
                </select>
              </div>
              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="border border-[#FF2D55] px-4 py-2 rounded-md w-full"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateToken}
                  className="text-white px-4 py-2 rounded-md bg-gradient-to-r from-[#D30579] to-[#FAB558] w-full"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </CommonModal>

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

export default Users;