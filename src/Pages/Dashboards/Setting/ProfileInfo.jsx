import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Common/Loading";
import useFetch from "../../../lib/useFetch";
import { profileInformationUrl } from "../../../../endpoints";

const ProfileInformation = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || ""; // Ensure you have VITE_API_BASE_URL in your .env
  const { data, loading, error } = useFetch(`${baseUrl}${profileInformationUrl}`);
  const navigate = useNavigate();

  const handleBackClick = (e) => {
    e.preventDefault();
    console.log("Back button clicked, navigating to previous route");
    navigate(-1);
    setTimeout(() => {
      if (window.history.state.idx === 0) {
        console.log("No previous route, navigating to fallback");
        navigate("/dashboard");
      }
    }, 100);
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 text-center p-4">Error: {error.message}</div>;

  return (
    <div className="">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={handleBackClick}
          className="text-2xl text-gray-600 hover:text-gray-800 transition-colors"
          aria-label="Go back"
        >
          <RiArrowLeftLine />
        </button>
        <h2 className="text-2xl font-semibold text-gray-800">Personal Information</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        {/* Profile Image & Role */}
        <div className="w-full lg:w-1/4 flex flex-col items-center bg-[#FFF1CE] rounded-lg p-8">
          <img
            src={data?.photo || import.meta.env.VITE_DEFAULT_AVATAR_PATH}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <p className="text-gray-600 text-sm">Profile</p>
          <p className="text-xl font-semibold text-gray-800">Admin</p>
        </div>

        {/* Form Fields */}
        <div className="w-full lg:w-3/4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={data?.full_name || ""}
              disabled
              className="w-full bg-[#FFF1CE] rounded-lg p-3 outline-none text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={data?.email_address || ""}
              disabled
              className="w-full bg-[#FFF1CE] rounded-lg p-3 outline-none text-gray-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;