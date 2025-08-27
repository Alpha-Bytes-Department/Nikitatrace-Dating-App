import { useState } from "react";
import CommonModal from "../../../components/Common/CommonModal";
import { toast } from "react-toastify";

const RecentUser = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Anderson",
      email: "john.anderson@blueoceanlogistics.com",
      age: 23,
      location: "12/K, Block-9, London, UK",
      gender: "Male",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Sophia Martinez",
      email: "sophia.martinez@greenfieldtech.com",
      age: 29,
      location: "45B, Sunset Avenue, Los Angeles, USA",
      gender: "Female",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Liam Chen",
      email: "liam.chen@pacifictraders.com",
      age: 34,
      location: "22 Orchard Road, Singapore",
      gender: "Male",
      image: "https://randomuser.me/api/portraits/men/65.jpg",
    },
    {
      id: 4,
      name: "Emma Brown",
      email: "emma.brown@northwoodhealth.org",
      age: 27,
      location: "18 High Street, Manchester, UK",
      gender: "Female",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: 5,
      name: "David Kim",
      email: "david.kim@skylinefinance.com",
      age: 31,
      location: "102 Maple Avenue, Toronto, Canada",
      gender: "Male",
      image: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    {
      id: 6,
      name: "Olivia Garcia",
      email: "olivia.garcia@freshmarket.co",
      age: 26,
      location: "77 King Street, Sydney, Australia",
      gender: "Female",
      image: "https://randomuser.me/api/portraits/women/50.jpg",
    },
    {
      id: 7,
      name: "Ethan Wilson",
      email: "ethan.wilson@urbanbuilders.com",
      age: 28,
      location: "54 Queen’s Road, Auckland, New Zealand",
      gender: "Male",
      image: "https://randomuser.me/api/portraits/men/80.jpg",
    },
    {
      id: 8,
      name: "Ava Patel",
      email: "ava.patel@mediclinic.org",
      age: 30,
      location: "9 Park Lane, Mumbai, India",
      gender: "Female",
      image: "https://randomuser.me/api/portraits/women/21.jpg",
    },
    {
      id: 9,
      name: "Michael Johnson",
      email: "michael.johnson@silverlinegroup.com",
      age: 35,
      location: "200 Broadway, New York, USA",
      gender: "Male",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      id: 10,
      name: "Isabella Rossi",
      email: "isabella.rossi@italianstyle.it",
      age: 25,
      location: "Via Roma 56, Milan, Italy",
      gender: "Female",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
    },
  ]);

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
      setUsers(users.filter((user) => user.id !== selectedUser.id));
      toast.success("User deleted successfully!");
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
      {users.map((user) => (
        <div key={user.id} className="flex items-center justify-between mb-4 border-b border-gray-200 p-2">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full">
              <img src={user.image} alt="" className="rounded-full" />
            </div>
            <span>
              <p className="font-semibold">{user.name}</p>
              <p className="text-gray-500">{user.email}</p>
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
              src={selectedUser.image}
              alt={selectedUser.name}
              className="h-24 w-24 rounded-full mx-auto"
            />
            <p className="text-lg font-semibold">{selectedUser.name}</p>
            <p className="text-gray-500">Email: {selectedUser.email}</p>
            <p className="text-gray-500">Age: {selectedUser.age}</p>
            <p className="text-gray-500">Location: {selectedUser.location}</p>
            <p className="text-gray-500">Gender: {selectedUser.gender}</p>
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
            <p className="text-lg">Are you sure you want to delete {selectedUser.name}?</p>
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