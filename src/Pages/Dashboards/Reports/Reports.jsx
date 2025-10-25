import { useEffect, useState } from "react";
import { format } from "date-fns";
import useReports from "../../../lib/useReports";
import apiClient from "../../../lib/api-client";
import toast from "react-hot-toast";

const Reports = () => {
  const { report, data, loading, error } = useReports();
  const [localData, setLocalData] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    report();
  }, [report]);

  useEffect(() => {
    setLocalData(data || []);
  }, [data]);

  // === Loading State ===
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // === Error State ===
  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <p className="text-red-800 font-semibold text-lg">
            Failed to load reports
          </p>
          <p className="text-red-600 text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  // === Empty State ===
  if (!localData || localData.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <p className="text-xl font-medium text-gray-700">No reports found</p>
        <p className="text-gray-500 mt-1">
          Check back later or submit a new report.
        </p>
      </div>
    );
  }

  // === Update Status ===
  const updateStatus = async (id, newStatus) => {
    if (updatingId === id) return;
    setUpdatingId(id);

    try {
      await apiClient.put(`/administration/report/update/${id}/`, {
        status: newStatus,
      });
      toast.success("Status updated successfully!");
      setLocalData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err.message ||
        "Failed to update status";
      alert(msg);
    } finally {
      setUpdatingId(null);
    }
  };

  // === Delete Report ===
  const deleteReport = async (id) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;

    setDeletingId(id);

    try {
      await apiClient.delete(`/administration/report/delete/${id}/`);
      toast.success("Report Delete successfully!");
      setLocalData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err.message ||
        "Failed to delete report";
      alert(msg);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Reports
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mt-1">
          All user-submitted reports
        </p>
      </div>

      {/* Reports List */}
      <div className="space-y-6">
        {localData.map((item) => (
          <div
            key={item.id}
            className="rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            {/* Header: User + Status + Actions */}
            <div className="p-4 sm:p-5 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="relative">
                    {item.user.photo ? (
                      <img
                        src={item.user.photo}
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png";
                        }}
                        alt={item.user.full_name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                        {item.user.full_name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <div>
                    <p className="font-semibold text-gray-900">
                      {item.user.full_name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {format(
                        new Date(item.created_at),
                        "MMM d, yyyy 'at' h:mm a"
                      )}
                    </p>
                  </div>
                </div>

                {/* Actions: Status Dropdown + Delete */}
                <div className="flex items-center gap-2">
                  {/* Status Dropdown */}
                  <select
                    value={item.status}
                    onChange={(e) => updateStatus(item.id, e.target.value)}
                    disabled={updatingId === item.id}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                      item.status === "Action Taken"
                        ? "bg-green-100 text-green-800 border-green-300"
                        : "bg-yellow-100 text-yellow-800 border-yellow-300"
                    } ${updatingId === item.id ? "opacity-50" : ""}`}
                  >
                    <option value="Action Pending">Action Pending</option>
                    <option value="Action Taken">Action Taken</option>
                  </select>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteReport(item.id)}
                    disabled={deletingId === item.id}
                    className={`ml-2 p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors ${
                      deletingId === item.id ? "opacity-50" : ""
                    }`}
                    title="Delete Report"
                  >
                    {deletingId === item.id ? (
                      <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Body: Description */}
            <div className="p-4 sm:p-5">
              <p className="text-gray-700 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Attachments */}
            {item.attachments.length > 0 && (
              <div className="px-4 sm:px-5 pb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Attachments ({item.attachments.length})
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {item.attachments.map((att) => (
                    <div
                      key={att.id}
                      className="group cursor-pointer block rounded-lg overflow-hidden border border-gray-300 hover:border-gray-400 transition-colors"
                    >
                      <img
                        src={att.image}
                        alt={`Attachment ${att.id}`}
                        className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer: ID + Updated */}
            <div className="px-4 sm:px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
              <span>Report ID: #{item.id}</span>
              <span>
                Updated {format(new Date(item.updated_at), "MMM d, h:mm a")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
