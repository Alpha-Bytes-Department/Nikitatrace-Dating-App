import { useState } from "react";
import CommonModal from "../../../components/Common/CommonModal";
import { toast } from "react-toastify";

const AdsList = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const [users, setUsers] = useState([
    {
      id: 1,
      ads_name: "Tech Summit 2025",
      company_name: "Tech Innovate Inc.",
      link: "https://techsummit2025.com",
      start_date: "08/01/2025",
      end_date: "08/15/2025",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      click: 1234,
    },
    {
      id: 2,
      ads_name: "Fashion Week",
      company_name: "Style Hub Ltd.",
      link: "https://fashionweek.com",
      start_date: "09/01/2025",
      end_date: "09/10/2025",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      click: 5678,
    },
    {
      id: 3,
      ads_name: "Green Energy Expo",
      company_name: "Eco Solutions",
      link: "https://greenenergyexpo.org",
      start_date: "10/01/2025",
      end_date: "10/05/2025",
      image: "https://randomuser.me/api/portraits/men/65.jpg",
      click: 9012,
    },
    {
      id: 4,
      ads_name: "Health & Wellness",
      company_name: "Vitality Corp",
      link: "https://healthwellness.com",
      start_date: "11/01/2025",
      end_date: "11/10/2025",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      click: 3456,
    },
    {
      id: 5,
      ads_name: "Auto Show 2025",
      company_name: "MotorTrend Inc.",
      link: "https://autoshow2025.com",
      start_date: "12/01/2025",
      end_date: "12/07/2025",
      image: "https://randomuser.me/api/portraits/men/12.jpg",
      click: 7890,
    },
    {
      id: 6,
      ads_name: "Food Festival",
      company_name: "Gourmet Eats",
      link: "https://foodfestival.org",
      start_date: "01/01/2026",
      end_date: "01/05/2026",
      image: "https://randomuser.me/api/portraits/women/50.jpg",
      click: 4321,
    },
    {
      id: 7,
      ads_name: "Tech Gadgets Sale",
      company_name: "Gadget World",
      link: "https://techgadgetsale.com",
      start_date: "02/01/2026",
      end_date: "02/10/2026",
      image: "https://randomuser.me/api/portraits/men/80.jpg",
      click: 8765,
    },
    {
      id: 8,
      ads_name: "Travel Expo",
      company_name: "Wanderlust Tours",
      link: "https://travelexpo.com",
      start_date: "03/01/2026",
      end_date: "03/07/2026",
      image: "https://randomuser.me/api/portraits/women/21.jpg",
      click: 2345,
    },
    {
      id: 9,
      ads_name: "Home Decor Show",
      company_name: "Design Haven",
      link: "https://homedecorshow.com",
      start_date: "04/01/2026",
      end_date: "04/10/2026",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
      click: 6789,
    },
    {
      id: 10,
      ads_name: "Music Concert Series",
      company_name: "Harmony Events",
      link: "https://musicconcert.com",
      start_date: "05/01/2026",
      end_date: "05/05/2026",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
      click: 3456,
    },
  ]);


  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedUser({
      ads_name: "",
      company_name: "",
      link: "",
      start_date: "",
      end_date: "",
      image: null,
      click: 0,
    });
    setPreviewImage(null);
    setIsAddModalOpen(true);
  };

  const confirmDelete = () => {
    try {
      setUsers(users.filter((user) => user.id !== selectedUser.id));
      toast.success("Ad deleted successfully!");
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
      const totalPages = Math.ceil((users.length - 1) / usersPerPage);
      if (currentPage > totalPages) {
        setCurrentPage(totalPages || 1);
      }
    } catch (error) {
      toast.error("Failed to delete ad!");
      console.log(error);
    }
  };

  const confirmEdit = (updatedUser) => {
    setUsers(users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    ));
    toast.success("Ad updated successfully!");
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const confirmAdd = (newUser) => {
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const reader = new FileReader();
    reader.onload = (e) => {
      setUsers([...users, { ...newUser, id: newId, click: 0, image: e.target.result }]);
      toast.success("Ad added successfully!");
      setIsAddModalOpen(false);
      setSelectedUser(null);
      setPreviewImage(null);
    };
    if (newUser.image instanceof File) {
      reader.readAsDataURL(newUser.image);
    } else if (newUser.image) {
      setUsers([...users, { ...newUser, id: newId, click: 0, image: newUser.image }]);
      toast.success("Ad added successfully!");
      setIsAddModalOpen(false);
      setSelectedUser(null);
      setPreviewImage(null);
    } else {
      setUsers([...users, { ...newUser, id: newId, click: 0, image: "https://via.placeholder.com/150" }]); // Default image if none selected
      toast.success("Ad added successfully!");
      setIsAddModalOpen(false);
      setSelectedUser(null);
      setPreviewImage(null);
    }
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

  // Handle image selection for Edit modal
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedUser({ ...selectedUser, image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image selection for Add modal
  const [previewImage, setPreviewImage] = useState(null);
  const handleAddImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
        setSelectedUser({ ...selectedUser, image: file });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 rounded-xl shadow-lg border border-gray-200">
      <div className="flex justify-between mb-5">
        <h2 className="text-2xl font-semibold">Ads</h2>
        <button
          onClick={handleAddClick}
          className="py-2 px-5 bg-black cursor-pointer rounded-xl hover:shadow-2xl text-white"
        >
          + Add New Ads
        </button>
      </div>
      {currentUsers.length > 0 ? (
        currentUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between mb-4 border-b border-gray-200 p-2"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded">
                <img src={user.image} alt="" className="rounded" />
              </div>
              <span>
                <p className="font-semibold">{user.ads_name}</p>
                <p className="text-gray-500">{user.company_name}</p>
              </span>
            </div>
            <div className="flex gap-6">
              <div>
                <p>{user.click.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Click</p>
              </div>
              <button
                onClick={() => handleEditClick(user)}
                className="py-2 px-5 border border-gray-400 rounded-xl hover:bg-gray-100"
              >
                Edit
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
        <p className="text-gray-500 text-center">No ads found.</p>
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
        title="Ad Details"
      >
        {selectedUser && (
          <div className="space-y-4 text-center">
            <img
              src={selectedUser.image}
              alt={selectedUser.ads_name}
              className="h-24 w-24 rounded-full mx-auto"
            />
            <p className="text-lg font-semibold">{selectedUser.ads_name}</p>
            <p className="text-gray-500">Company: {selectedUser.company_name}</p>
            <p className="text-gray-500">Link: {selectedUser.link}</p>
            <p className="text-gray-500">Start Date: {selectedUser.start_date}</p>
            <p className="text-gray-500">End Date: {selectedUser.end_date}</p>
            <p className="text-gray-500">Clicks: {selectedUser.click.toLocaleString()}</p>
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
              Are you sure you want to delete {selectedUser.ads_name}?
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

      {/* Edit Modal */}
      <CommonModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Ad"
      >
        {selectedUser && (
          <div className="space-y-6 rounded-xl">
            <div className="flex flex-col items-center">
              <div className="w-full h-40 border-2 border-dashed border-[#D4A017] rounded-lg mb-4 relative">
                <img
                  src={selectedUser.image}
                  alt="Ad Image"
                  className="w-full h-full object-cover rounded-lg cursor-pointer"
                  onClick={() => document.getElementById(`imageInput-${selectedUser.id}`).click()}
                />
                <input
                  id={`imageInput-${selectedUser.id}`}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>
            <input
              type="text"
              value={selectedUser.ads_name || ""}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, ads_name: e.target.value })
              }
              placeholder="Give your title"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={selectedUser.company_name || ""}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, company_name: e.target.value })
              }
              placeholder="Give your company name"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={selectedUser.link || ""}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, link: e.target.value })
              }
              placeholder="Give your link"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <div className="flex gap-4">
              <input
                type="text"
                value={selectedUser.start_date || ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, start_date: e.target.value })
                }
                placeholder="mm/dd/yyyy"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                value={selectedUser.end_date || ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, end_date: e.target.value })
                }
                placeholder="mm/dd/yyyy"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              onClick={() => confirmEdit(selectedUser)}
              className="w-full py-2 bg-[#D4A017] text-white rounded-md"
            >
              Upload
            </button>
          </div>
        )}
      </CommonModal>

      {/* Add Modal */}
      <CommonModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Ad"
      >
        <div className="space-y-6 rounded-xl">
          <div className="flex flex-col items-center">
            <div className="w-full h-40 border-2 border-dashed border-[#D4A017] rounded-lg mb-4 relative">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Ad Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <p className="text-gray-500 text-center mt-16">+ Select Image</p>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleAddImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
          <input
            type="text"
            value={selectedUser?.ads_name || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, ads_name: e.target.value })
            }
            placeholder="Give your title"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={selectedUser?.company_name || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, company_name: e.target.value })
            }
            placeholder="Give your company name"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={selectedUser?.link || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, link: e.target.value })
            }
            placeholder="Give your link"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <div className="flex gap-4">
            <input
              type="date"
              value={selectedUser?.start_date || ""}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, start_date: e.target.value })
              }
              placeholder="mm/dd/yyyy"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="date"
              value={selectedUser?.end_date || ""}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, end_date: e.target.value })
              }
              placeholder="mm/dd/yyyy"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            onClick={() => confirmAdd(selectedUser || {})}
            className="w-full py-2 bg-[#D4A017] text-white rounded-md"
          >
            Upload
          </button>
        </div>
      </CommonModal>
    </div>
  );
};

export default AdsList;