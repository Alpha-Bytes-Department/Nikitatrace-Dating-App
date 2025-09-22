import { useEffect, useState } from "react";

import useFetch from "../../../lib/useFetch";
import useForm from "../../../lib/useForm";
import { fetchAdUrl, createAddUrl, editAdUrl } from "../../../../endpoints";

import Loading from "../../../components/Common/Loading";
import CommonModal from "../../../components/Common/CommonModal";

const AdsManagement = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});

  const [ad, setAdd] = useState(null);
  const [adData, setAdData] = useState({
    id: "",
    title: "",
    company: "",
    link: "",
    banner: "",
    start_date: "",
    end_date: "",
    note: "",
  });

  const { data, loading, error } = useFetch(fetchAdUrl);
  const {postResource, loading: submitting, error: submitError} = useForm()

  useEffect(() => {
    if (data && data.title) {
      setAdd(data);
      setAdData(data);
      if (typeof data.banner === "string") {
        setPreviewImage(data.banner);
      }
    }
  }, [data]);


  const handleAddClick = () => {
    setPreviewImage(adData?.banner);
    setErrors({});
    setIsAddModalOpen(true);
  };

  const validateForm = () => {
    let tempErrors = {};

    if (!adData.title || adData.title.trim() === "") {
      tempErrors.title = "Title is required";
    }
    if (!adData.company || adData.company.trim() === "") {
      tempErrors.company = "Company name is required";
    }
    if (!adData.link || adData.link.trim() === "") {
      tempErrors.link = "Link is required";
    }
    if (!adData.start_date) {
      tempErrors.start_date = "Start date is required";
    }
    if (!adData.end_date) {
      tempErrors.end_date = "End date is required";
    }
    if (!adData.banner && !previewImage) {
      tempErrors.banner = "Banner image is required";
    }
    // if (adData.banner && !adData.banner instanceof File) {
    //     tempErrors.banner = "Banner image is required";
    // }
    if (!adData.note) {
      tempErrors.note = "Note is required";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const mangeAdd = async (event, action) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append("title", adData.title);
    formData.append("company", adData.company);
    formData.append("link", adData.link);
    formData.append("start_date", adData.start_date);
    formData.append("end_date", adData.end_date);
    formData.append("note", adData.note);

    if (adData.banner && adData.banner instanceof File) {
      formData.append("banner", adData.banner);
    } else if (previewImage && previewImage instanceof File) {
      formData.append("banner", previewImage);
    }

    formData.forEach((value, key) => {
      console.log(key, value);
    });
    try {
      const url = action == "add" ? createAddUrl : editAdUrl;
      const result = await postResource(url, formData);
      console.log("Ad posted:", result);
      // Reset form and UI here if needed
      setIsAddModalOpen(false);
      setPreviewImage(null);
      setAdData(result)
      setAdd(result)
  } catch (err) {
      console.error("Ad submission failed:", err);
  }
  };



  // Handle image selection for Add modal
  const handleAddImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
        setAdData({ ...adData, banner: file });
      };
      reader.readAsDataURL(file);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div>
      <div className="p-6 rounded-xl shadow-lg border border-gray-200">
        <div className="flex justify-between mb-5">
          <h1 className="text-2xl font-semibold">Your Ad</h1>
          <button
            onClick={handleAddClick}
            className="py-2 px-5 bg-[#CE8B38] cursor-pointer rounded-xl hover:shadow-2xl text-white"
          >
            {ad ? "+ Update" : "Add"}
          </button>
        </div>
        {ad ? (
          <div className="flex gap-8 items-start p-4 rounded-lg shadow-sm">
            {/* Details */}
            <ul className="flex-1 list-inside space-y-2 text-gray-700">
              <li>
                <strong>Title:</strong> {ad.title}
              </li>
              <li>
                <strong>Company:</strong> {ad.company}
              </li>
              <li>
                <strong>Link:</strong>{" "}
                <a
                  href={ad.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {ad.link}
                </a>
              </li>
              <li>
                <strong>Start Date:</strong> {ad.start_date}
              </li>
              <li>
                <strong>End Date:</strong> {ad.end_date}
              </li>
              <li>
                <strong>Note:</strong> {ad.note}
              </li>
            </ul>

            {/* Banner Image */}
            {ad.banner && (
              <div className="w-56 h-56 rounded-lg overflow-hidden shadow-sm flex-shrink-0">
                <img
                  src={ad.banner}
                  alt="Ad Banner"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500 italic">No ad found. Please add one.</p>
        )}


        {/* Add Modal */}
        <CommonModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title={ad ? "Edit Ad" : "Add New Ad"}
        >
          <form method="POST" onSubmit={(event) => ad ? mangeAdd(event, "edit") : mangeAdd(event)} encType="multipart/form-data">
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
                    name="banner"
                    onChange={handleAddImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                {errors.banner && <p className="text-red-500 text-sm mt-1">{errors.banner}</p>}
              </div>
              <input
                type="text"
                value={adData?.title || ""}
                onChange={(e) => setAdData({ ...adData, title: e.target.value })}
                placeholder="Give your title"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}

              <input
                type="text"
                value={adData?.company || ""}
                onChange={(e) => setAdData({ ...adData, company: e.target.value })}
                placeholder="Give your company name"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}

              <input
                type="text"
                value={adData?.link || ""}
                onChange={(e) => setAdData({ ...adData, link: e.target.value })}
                placeholder="Give your link"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link}</p>}

              <div className="flex gap-4">
                <input
                  type="date"
                  value={adData?.start_date || ""}
                  onChange={(e) => setAdData({ ...adData, start_date: e.target.value })}
                  placeholder="mm/dd/yyyy"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="date"
                  value={adData?.end_date || ""}
                  onChange={(e) => setAdData({ ...adData, end_date: e.target.value })}
                  placeholder="mm/dd/yyyy"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              {
                errors.start_date || errors.end_date
                ?
                <p className="text-red-500 text-sm mt-1">Start & End Date is required</p>
                :
                ""
              }
              <input
                type="text"
                value={adData?.note || ""}
                onChange={(e) => setAdData({ ...adData, note: e.target.value })}
                placeholder="Provide note"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.note && <p className="text-red-500 text-sm mt-1">{errors.note}</p>}

              {ad ? (
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full py-2 text-white rounded-md ${submitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#D4A017]"}`}
                >
                  {submitting ? "Updating..." : "Update"}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full py-2 text-white rounded-md ${submitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#D4A017]"}`}
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              )}

            </div>
          </form>
        </CommonModal>
      </div>
    </div>
  );
};

export default AdsManagement;
