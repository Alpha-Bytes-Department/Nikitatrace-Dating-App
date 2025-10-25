import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../../../components/Common/Loading";
import useFetch from "../../../lib/useFetch";
import { profileInformationUrl } from "../../../../endpoints";
import apiClient from "../../../lib/api-client";
import toast from "react-hot-toast";

const ProfileInformation = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
  const { data, loading, error } = useFetch(
    `${baseUrl}${profileInformationUrl}`
  );
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email_address: "",
  });
  const [saving, setSaving] = useState(false);

  // Initialize form when data loads
  useEffect(() => {
    if (data) {
      setFormData({
        full_name: data.full_name || "",
        email_address: data.email_address || "",
      });
    }
  }, [data]);

  const handleBackClick = (e) => {
    e.preventDefault();
    navigate(-1);
    setTimeout(() => {
      if (window.history.state?.idx === 0) {
        navigate("/dashboard");
      }
    }, 100);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (data) {
      setFormData({
        full_name: data.full_name || "",
        email_address: data.email_address || "",
      });
    }
  };

  const handleSave = async () => {
    if (!formData.full_name.trim() || !formData.email_address.trim()) {
      toast.success("Name and Email are required");
      return;
    }

    setSaving(true);
    try {
      await apiClient.put(`${baseUrl}/administration/account/update/`, {
        full_name: formData.full_name.trim(),
        email_address: formData.email_address.trim(),
      });

      setIsEditing(false);
      toast.success("Profile updated successfully!");
      // refetch();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err.message ||
        "Failed to update profile";
      alert(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="text-red-500 text-center p-4">Error: {error.message}</div>
    );

  return (
    <div className="">
      {/* Header with Back & Title */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBackClick}
            className="text-2xl text-gray-600 hover:text-gray-800 transition-colors"
            aria-label="Go back"
          >
            <RiArrowLeftLine />
          </button>
          <h2 className="text-2xl font-semibold text-gray-800">
            Personal Information
          </h2>
        </div>

        {/* Edit / Save / Cancel Buttons */}
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-[#CE8B38] text-white cursor-pointer rounded-lg hover:shadow-xl transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancel}
                disabled={saving}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-[#CE8B38] text-white cursor-pointer rounded-lg hover:shadow-xl transition-colors flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Profile Image & Role */}
        <div className="w-full lg:w-1/4 flex flex-col items-center bg-[#FFF1CE] rounded-lg p-8">
          <img
            src={data?.photo}
            onError={(e) => {
              e.currentTarget.src =
                "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png";
            }}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white shadow-md"
          />
          <p className="text-gray-600 text-sm">Profile</p>
          <p className="text-xl font-semibold text-gray-800">Admin</p>
        </div>

        {/* Form Fields */}
        <div className="w-full lg:w-3/4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) =>
                setFormData({ ...formData, full_name: e.target.value })
              }
              disabled={!isEditing}
              className={`w-full rounded-lg p-3 outline-none transition-colors ${
                isEditing
                  ? "bg-white border border-gray-300 focus:border-blue-500"
                  : "bg-[#FFF1CE] text-gray-800"
              }`}
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email_address}
              onChange={(e) =>
                setFormData({ ...formData, email_address: e.target.value })
              }
              disabled={!isEditing}
              className={`w-full rounded-lg p-3 outline-none transition-colors ${
                isEditing
                  ? "bg-white border border-gray-300 focus:border-blue-500"
                  : "bg-[#FFF1CE] text-gray-800"
              }`}
              placeholder="Enter email address"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
