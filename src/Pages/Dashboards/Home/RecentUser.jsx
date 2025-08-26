import { useState } from "react";
import { RiDeleteBin5Line, RiEditBoxLine } from "react-icons/ri";
import CommonModal from "../../../components/Common/CommonModal";

const RecentUser = () => {
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


  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [tokenToDelete, setTokenToDelete] = useState(null);
  // const [selectedToken, setSelectedToken] = useState(null);

  // const handleEdit = (token) => {
  //   setSelectedToken(token);
  //   setIsEditModalOpen(true);
  // };

  // const handleUpdateToken = () => {
  //   console.log("Updated token:", selectedToken);
  //   setIsEditModalOpen(false);
  //   setSelectedToken(null);
  //   // TODO: Update the token in your list or via API
  // };

  // const handleDeleteClick = (token) => {
  //   setTokenToDelete(token);
  //   setIsDeleteModalOpen(true);
  // };

  // const confirmDelete = () => {
  //   console.log("Deleted user:", tokenToDelete);
  //   // TODO: Remove token from list or trigger API call here
  //   setIsDeleteModalOpen(false);
  //   setTokenToDelete(null);
  // };

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-xl p-5">
      <h2 className="text-2xl font-semibold mb-5">Recent User</h2>
      <table className="min-w-full rounded-xl text-center overflow-hidden">
        <thead>
          <tr className="text-sm  bg-[#F8ECEE] ">
            <th className="p-4 text-left">User Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Company Name</th>
            <th className="p-4">Ship Name</th>
            {/* <th className="p-4">Action</th> */}
          </tr>
        </thead>
        <tbody className="text-sm text-center">
          {initialUsers?.map((user, idx) => (
            <tr key={idx} className="border-t border-gray-200">
              <td className="py-3 px-4 text-left">{user?.name || "N/A"}</td>
              <td className="py-4 px-4">{user?.email}</td>
              <td className="py-3 px-4">{user?.company_name || "N/A"}</td>
              <td className={`py-3 px-4 `}>{user?.ship_name}</td>
              {/* <td className="py-3 px-4 flex items-center justify-center gap-5">
                <button onClick={() => handleEdit(user)}>
                  <RiEditBoxLine className="cursor-pointer" />
                </button>
                <button onClick={() => handleDeleteClick(user)}>
                  <RiDeleteBin5Line className="text-red-500 hover:text-red-700 transition cursor-pointer" />
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* <CommonModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedToken(null);
        }}
        title="Edit User"
      >
        {selectedToken && (
          <>
            <input
              type="text"
              placeholder="Author Name"
              className="w-full border border-blue-300 rounded-md p-2 mb-4"
            />
            <select
              name="category"
              className="w-full border border-blue-300 rounded-md p-2 mb-4"
              value={selectedToken.category}
              onChange={(e) =>
                setSelectedToken({ ...selectedToken, category: e.target.value })
              }
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="sad">Sad</option>
              <option value="success">Success</option>
              <option value="motivation">Motivation</option>
              <option value="life">Life</option>
              <option value="love">Love</option>
              <option value="happiness">Happiness</option>
            </select>

            <textarea
              rows={4}
              className="w-full border border-blue-300 rounded-md p-2"
              placeholder="Edit token"
              value={selectedToken.token}
              onChange={(e) =>
                setSelectedToken({ ...selectedToken, token: e.target.value })
              }
            />

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="border px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button onClick={handleUpdateToken} className="btn-primary">
                Save
              </button>
            </div>
          </>
        )}
      </CommonModal> */}

      {/* ✅ Delete Confirmation Modal */}
      {/* <CommonModal
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
                className="border px-5 py-3 rounded-md"
              >
                Cancel
              </button>
              <button onClick={confirmDelete} className="btn-primary">
                Confirm
              </button>
            </div>
          </div>
        )}
      </CommonModal> */}
    </div>
  );
};

export default RecentUser;
