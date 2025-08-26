import { useState } from "react";
import { Plus, Pencil, Trash2, Image, Link } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommonModal from "../../../components/Common/CommonModal";

const Announcement = () => {
  const [announcement, setAnnouncement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add"); // 'add' | 'edit' | 'delete'
  const [tempData, setTempData] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
    setTempData(type === "edit" ? announcement : {});
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTempData({});
    setIsUploading(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        setTempData({ ...tempData, image: URL.createObjectURL(file) });
        setIsUploading(false);
        toast.success("Image uploaded successfully!");
      }, 500); // Simulate upload delay
    }
  };

  const handleSave = () => {
    if (modalType === "add" || modalType === "edit") {
      if (!tempData.title || !tempData.url) {
        toast.error("Title and Link are required!");
        return;
      }
      setAnnouncement(tempData);
      toast.success(
        modalType === "add"
          ? "Announcement added successfully!"
          : "Announcement updated successfully!"
      );
    } else if (modalType === "delete") {
      setAnnouncement(null);
      toast.success("Announcement deleted successfully!");
    }
    closeModal();
  };

  return (
    <div className="">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Announcements</h1>
          
        </div>
        {!announcement ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <p className="text-lg text-gray-500 mb-6">No announcements available.</p>
            <button
              onClick={() => openModal("add")}
              className="px-8 py-4 bg-gradient-to-r from-[#D30579] to-[#FAB558] text-white rounded-lg flex items-center gap-2 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus size={20} /> Add Announcement
            </button>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden md:w-1/2 lg:w-1/4">
            {announcement.image && (
              <img
                src={announcement.image}
                alt="Announcement"
                className="w-full h-72 object-cover rounded-t-xl"
              />
            )}
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {announcement.title}
              </h2>
              <a
                href={announcement.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 transition-colors duration-200"
              >
                <Link size={16} /> {announcement.url}
              </a>
            </div>
            <div className="flex justify-end gap-3 p-4 bg-gray-50 border-t border-gray-200">
              <button
                onClick={() => openModal("edit")}
                className="flex items-center gap-2 px-5 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Pencil size={16} /> Edit
              </button>
              <button
                onClick={() => openModal("delete")}
                className="flex items-center gap-2 px-5 py-2 bg-white border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        )}

        <CommonModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={
            modalType === "add"
              ? "Add Announcement"
              : modalType === "edit"
              ? "Edit Announcement"
              : "Delete Announcement"
          }
        >
          {modalType === "delete" ? (
            <div className="text-center space-y-6">
              <p className="text-gray-600">
                Are you sure you want to delete this announcement?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200"
                  onClick={handleSave}
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                <label className="cursor-pointer text-blue-600 hover:text-blue-700 transition">
                  {isUploading ? (
                    <div className="text-gray-500">Uploading...</div>
                  ) : tempData.image ? (
                    <img
                      src={tempData.image}
                      alt="Preview"
                      className="mx-auto h-40 object-cover rounded-lg shadow-sm"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Image size={24} className="text-blue-600" />
                      <p className="text-sm">Upload Image</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={tempData.title || ""}
                    onChange={(e) =>
                      setTempData({ ...tempData, title: e.target.value })
                    }
                    placeholder="Enter announcement title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                  />
                  <Pencil
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={tempData.url || ""}
                    onChange={(e) =>
                      setTempData({ ...tempData, url: e.target.value })
                    }
                    placeholder="Enter announcement URL"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                  />
                  <Link
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  className="border border-[#FF2D55] px-4 py-2 rounded-md"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-3 bg-gradient-to-r from-[#D30579] to-[#FAB558] text-white rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={handleSave}
                >
                  {modalType === "add" ? "Add" : "Update"}
                </button>
              </div>
            </div>
          )}
        </CommonModal>
      </div>
    </div>
  );
};

export default Announcement;