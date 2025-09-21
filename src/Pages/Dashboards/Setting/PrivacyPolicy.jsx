import { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

import useFetch from "../../../lib/useFetch"
import usePost from "../../../lib/usePost";
import {siteSettingsUrl} from "../../../../endpoints"

import Loading from "../../../components/Common/Loading"


const PrivacyPolicy = () => {

  const {data, loading, error} = useFetch(siteSettingsUrl);
  const {postResource, loading: submitting, error: postErrors} = usePost()

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState("");

  const [formData, setFormData] = useState({"terms": ""});

  useEffect(() => {
    if(data) {
      setFormData({"terms": data.terms_and_conditions})
    }
  }, [data])

  const handleEditClick = () => {
    setDescription(formData.terms); // 🟢 Load old data into editor
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, terms: description })); // 🟢 Save updated text
    setIsEditing(false);
    console.log("Saved data:", description); // API call here
    await postResource(siteSettingsUrl, {"terms_and_conditions": description})
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }, { font: [] }],
      ["bold", "italic", "underline", "strike"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ align: [] }],
      ["link", "image"],
    ],
  };

  return (
    loading
    ?
    <Loading />
    :
    <form onSubmit={handleSubmit} className="">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer"
            title="Go back"
          >
            <IoArrowBackOutline className="text-xl" />
          </button>
          <h2 className="font-semibold text-lg">Privacy Policy</h2>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        {!isEditing ? (
          <div
            className="leading-7 privacy-content text-sm"
            dangerouslySetInnerHTML={{ __html: formData.terms }}
          />
        ) : (
          <ReactQuill
            value={description}
            onChange={setDescription}
            theme="snow"
            modules={modules}
            placeholder="Write your privacy policy here..."
            className="quill-custom bg-[#FFF1CE] text-black"
          />
        )}
      </div>

      {/* Edit and Update Button */}
      {!isEditing && (
        <div className="flex justify-end px-5 pb-5">
          <button
            type="button"
            onClick={handleEditClick}
            className="text-white px-4 py-2 rounded-md bg-[#CE8B38]"
          >
            ✎ Edit
          </button>
        </div>
      )}
      {isEditing && (
        <div className="flex justify-end px-5 pb-5">
          <button
            type="submit"
            className="text-white px-4 py-2 rounded-md bg-[#CE8B38]"
          >
            Update Info
          </button>
        </div>
      )}
    </form>
  );
};

export default PrivacyPolicy;
