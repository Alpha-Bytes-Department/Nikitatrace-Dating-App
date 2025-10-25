import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import useFetch from "../../../lib/useFetch"
import usePost from "../../../lib/usePost";
import {siteSettingsUrl} from "../../../../endpoints"
import Loading from "../../../components/Common/Loading"

// Debounce hook for optimizing onChange
function useDebounce(callback, delay) {
  const timeoutRef = useRef(null);
  return useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => callback(...args), delay);
  }, [callback, delay]);
}

const TermsCondition = () => {
  const {data, loading, error} = useFetch(siteSettingsUrl);
  const {postResource, loading: submitting, error: postErrors} = usePost()

  console.log(data);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState("");

  const [formData, setFormData] = useState({"terms": ""});

  useEffect(() => {
    if (data) {
      setFormData({"terms": data.terms_and_conditions});
    }
  }, [data]);

  // Debounced onChange to reduce re-renders during typing
  const debouncedSetDescription = useDebounce(setDescription, 300);

  const handleEditClick = useCallback(() => {
    setDescription(formData.terms);
    setIsEditing(true);
  }, [formData.terms]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, terms: description }));
    setIsEditing(false);
    try {
      await postResource(siteSettingsUrl, {"terms_and_conditions": description});
      toast.success('Successfully updated!', {
        duration: 2000,
        position: 'top-right',
      });
    } catch (err) {
      toast.error('Failed to update. Please try again.', err);
    }
  }, [description, postResource]);

  // Memoize modules to prevent unnecessary re-renders
  const modules = useMemo(() => ({
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
  }), []);

  // Memoized Quill component to avoid re-mounting
  const QuillEditor = useMemo(() => (
    <ReactQuill
      value={description}
      onChange={debouncedSetDescription}
      theme="snow"
      modules={modules}
      placeholder="Write your privacy policy here..."
      className="quill-custom h-[670px] text-black "
    />
  ), [description, debouncedSetDescription, modules]);

  // Memoized display content to avoid re-parsing HTML
  const displayContent = useMemo(() => 
    ({ __html: formData.terms || '' }), 
    [formData.terms]
  );

  // Error handling
  useEffect(() => {
    if (error) {
      toast.error('Failed to load data. Please refresh.');
    }
    if (postErrors) {
      toast.error('Failed to submit. Please try again.');
    }
  }, [error, postErrors]);

  if (loading) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit} className="">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer"
            title="Go back"
            type="button"
          >
            <IoArrowBackOutline className="text-xl" />
          </button>
          <h2 className="font-semibold text-lg">Terms & Conditions</h2>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        {!isEditing ? (
          <div
            className="leading-7 privacy-content text-sm"
            dangerouslySetInnerHTML={displayContent}
          />
        ) : (
          QuillEditor
        )}
      </div>

      {/* Edit and Update Button */}
      {!isEditing && (
        <div className="flex justify-end px-5 pb-5 ">
          <button
            type="button"
            onClick={handleEditClick}
            className="text-white px-4 py-2 rounded-md bg-[#CE8B38]"
            disabled={submitting}
          >
            ✎ Edit
          </button>
        </div>
      )}
      {isEditing && (
        <div className="flex justify-end px-5 pb-5 mt-10">
          <button
            type="submit"
            className="text-white px-4 py-2 rounded-md bg-[#CE8B38] disabled:opacity-50"
            disabled={submitting}
          >
            {submitting ? 'Updating...' : 'Update Info'}
          </button>
        </div>
      )}
    </form>
  );
};

export default TermsCondition;