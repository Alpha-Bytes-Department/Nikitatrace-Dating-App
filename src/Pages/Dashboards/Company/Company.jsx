import { useState } from "react";
import { EllipsisVertical, Plus } from "lucide-react";
import CommonModal from "../../../components/Common/CommonModal";

const Company = () => {
  const [companyData, setCompanyData] = useState([
    { id: 1, name: "Blue Ocean Logistics", ships: 5 },
    { id: 2, name: "Green Earth Transport", ships: 3 },
    { id: 3, name: "Red Wave Shipping", ships: 4 },
    { id: 4, name: "Yellow Sea Freight", ships: 2 },
    { id: 5, name: "Purple Horizon Carriers", ships: 6 },
    { id: 6, name: "Orange Sky Logistics", ships: 1 },
    { id: 7, name: "Silver Line Shipping", ships: 3 },
    { id: 8, name: "Golden Anchor Transport", ships: 4 },
    { id: 9, name: "Black Pearl Freight", ships: 2 },
    { id: 10, name: "White Wave Logistics", ships: 5 },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(""); // add | edit | delete
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const [form, setForm] = useState({ name: "", ships: "" });

  // Handlers
  const handleAddOpen = () => {
    setForm({ name: "", ships: "" });
    setModalType("add");
    setOpenModal(true);
  };

  const handleEditOpen = (company) => {
    setSelectedCompany(company);
    setForm({ name: company.name, ships: company.ships });
    setModalType("edit");
    setOpenModal(true);
    setDropdownOpen(null);
  };

  const handleDeleteOpen = (company) => {
    setSelectedCompany(company);
    setModalType("delete");
    setOpenModal(true);
    setDropdownOpen(null);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedCompany(null);
    setForm({ name: "", ships: "" });
  };

  const handleAdd = () => {
    const newCompany = {
      id: Date.now(),
      name: form.name,
      ships: Number(form.ships),
    };
    setCompanyData([...companyData, newCompany]);
    handleModalClose();
  };

  const handleEdit = () => {
    const updated = companyData.map((c) =>
      c.id === selectedCompany.id ? { ...c, name: form.name, ships: Number(form.ships) } : c
    );
    setCompanyData(updated);
    handleModalClose();
  };

  const handleDelete = () => {
    setCompanyData(companyData.filter((c) => c.id !== selectedCompany.id));
    handleModalClose();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <h2 className="text-2xl font-semibold">Company List</h2>
        <button
          onClick={handleAddOpen}
          className="text-white px-4 py-2 rounded-md bg-gradient-to-r from-[#D30579] to-[#FAB558] flex items-center gap-2"
        >
          <Plus /> Add Company
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {companyData.map((company) => (
          <div
            key={company.id}
            className="border border-gray-300 p-4 rounded-lg shadow-sm mb-4 flex items-center justify-between relative"
          >
            <div>
              <h3 className="text-lg font-semibold">{company.name}</h3>
              <p className="text-xs text-gray-400">Ships: {company.ships}</p>
            </div>
            <div className="relative">
              <EllipsisVertical
                className="h-4 cursor-pointer"
                onClick={() =>
                  setDropdownOpen(dropdownOpen === company.id ? null : company.id)
                }
              />
              {dropdownOpen === company.id && (
                <div className="absolute z-10 right-0 top-6 bg-white border border-gray-200 shadow-md rounded-md">
                  <button
                    onClick={() => handleEditOpen(company)}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-sm border-b border-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteOpen(company)}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-sm text-red-500"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Section */}
      <CommonModal isOpen={openModal} onClose={handleModalClose}>
        {modalType === "add" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Add Company</h2>
            <input
              type="text"
              placeholder="Company Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-200 p-2 rounded mb-3"
            />
            <input
              type="number"
              placeholder="Number of Ships"
              value={form.ships}
              onChange={(e) => setForm({ ...form, ships: e.target.value })}
              className="w-full border border-gray-200 p-2 rounded mb-3"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleModalClose}
                className="border border-[#FF2D55] px-4 py-2 rounded-md w-full"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="text-white px-4 py-2 rounded-md bg-gradient-to-r from-[#D30579] to-[#FAB558] w-full"
              >
                Add
              </button>
            </div>
          </div>
        )}

        {modalType === "edit" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Edit Company</h2>
            <input
              type="text"
              placeholder="Company Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-200 p-2 rounded mb-3"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleModalClose}
                className="border border-[#FF2D55] px-4 py-2 rounded-md w-full"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                className="text-white px-4 py-2 rounded-md bg-gradient-to-r from-[#D30579] to-[#FAB558] w-full"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {modalType === "delete" && (
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-4">Delete Company</h2>
            <p className="mb-4">
              Are you sure you want to delete{" "}
              <strong>{selectedCompany?.name}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleModalClose}
                className="border border-[#FF2D55] px-4 py-2 rounded-md w-full"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="text-white px-4 py-2 rounded-md bg-gradient-to-r from-[#D30579] to-[#FAB558] w-full"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </CommonModal>
    </div>
  );
};

export default Company;
