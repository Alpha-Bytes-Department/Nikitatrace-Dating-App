import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Plus } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommonModal from "../../../components/Common/CommonModal";

// Initial ship data
const initialShipData = [
  { id: 1, shipName: "MV Oceanic Pearl", companyName: "Blue Ocean Logistics" },
  { id: 2, shipName: "SS Golden Horizon", companyName: "Golden Anchor Transport" },
  { id: 3, shipName: "MV Neptune Rider", companyName: "Red Wave Shipping" },
  { id: 4, shipName: "SS Arctic Breeze", companyName: "Silver Line Shipping" },
  { id: 5, shipName: "MV Pacific Titan", companyName: "Green Earth Transport" },
  { id: 6, shipName: "SS Coral Dream", companyName: "Orange Sky Logistics" },
  { id: 7, shipName: "MV Emerald Spirit", companyName: "Purple Horizon Carriers" },
  { id: 8, shipName: "SS Voyager One", companyName: "Yellow Sea Freight" },
  { id: 9, shipName: "MV Atlantic Crest", companyName: "White Wave Logistics" },
  { id: 10, shipName: "SS Black Pearl", companyName: "Black Pearl Freight" },
];

const Ships = () => {
  const [ships, setShips] = useState(initialShipData);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [shipToDelete, setShipToDelete] = useState(null);

  // For add ship modal form
  const [newShipName, setNewShipName] = useState("");
  const [newCompanyName, setNewCompanyName] = useState("");

  // Delete ship
  const handleDeleteClick = (ship) => {
    setShipToDelete(ship);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setShips((prev) => prev.filter((s) => s.id !== shipToDelete.id));
    toast.success("Ship deleted successfully!");
    setShipToDelete(null);
    setIsDeleteModalOpen(false);
  };

  // Add ship
  const handleAddShip = () => {
    if (!newShipName.trim() || !newCompanyName.trim()) {
      toast.error("Both fields are required!");
      return;
    }
    const newShip = {
      id: Date.now(),
      shipName: newShipName.trim(),
      companyName: newCompanyName.trim(),
    };
    setShips((prev) => [newShip, ...prev]);
    setNewShipName("");
    setNewCompanyName("");
    setIsAddModalOpen(false);
    toast.success("Ship added successfully!");
  };

  return (
    <div className="">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold">Ship List</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="text-white px-4 py-2 rounded-md bg-gradient-to-r from-[#D30579] to-[#FAB558] flex items-center gap-2"
        >
          <Plus size={18} /> Add Ship
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-xl p-5">
        <table className="min-w-full text-center">
          <thead>
            <tr className="text-sm bg-[#F8ECEE]">
              <th className="p-4 text-left">Ship Name</th>
              <th className="p-4">Company</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-center">
            {ships.length > 0 ? (
              ships.map((ship, idx) => (
                <tr key={idx} className="border-t border-gray-200">
                  <td className="py-3 px-4 text-left">{ship.shipName}</td>
                  <td className="py-4 px-4">{ship.companyName}</td>
                  <td className="py-3 px-4">
                    <button onClick={() => handleDeleteClick(ship)}>
                      <RiDeleteBin5Line className="text-red-500 hover:text-red-700 transition cursor-pointer" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-4 text-gray-500">
                  No ships found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <CommonModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Delete"
      >
        {shipToDelete && (
          <div className="space-y-4 text-center">
            <p className="text-lg">Are you sure you want to delete this ship?</p>
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

      {/* Add Ship Modal */}
      <CommonModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Ship"
      >
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Ship Name</label>
            <input
              type="text"
              value={newShipName}
              onChange={(e) => setNewShipName(e.target.value)}
              placeholder="Enter ship name"
              className="w-full border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Company Name</label>
            <input
              type="text"
              value={newCompanyName}
              onChange={(e) => setNewCompanyName(e.target.value)}
              placeholder="Enter company name"
              className="w-full border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-pink-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="border border-gray-400 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleAddShip}
              className="text-white px-4 py-2 rounded-md bg-gradient-to-r from-[#D30579] to-[#FAB558]"
            >
              Add Ship
            </button>
          </div>
        </div>
      </CommonModal>
    </div>
  );
};

export default Ships;
