import { useState, useRef, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaCamera } from "react-icons/fa";
import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import Loading from "../../../components/Common/Loading"

import useFetch from "../../../lib/useFetch"
import {profileInformationUlr} from "../../../../endpoints"


const ProfileInformation = () => {
  
  const {data, loading, error} = useFetch(profileInformationUlr);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        profileImage: imageUrl,
      }));
    }
  };

  const navigate = useNavigate();


  return (
    loading
    ?
    <Loading />
    :
    <form className="">
      <div className="flex justify-between items-center mb-6 pb-4">
        <div className="flex items-center gap-3">
          <button className="text-2xl cursor-pointer" onClick={() => navigate(-1)}>
          <RiArrowLeftLine />
        </button>
        <h2 className="font-semibold text-2xl">Personal Information</h2>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 py-5 px-20">
        {/* Left (Profile Image & Role) */}
        <div className="w-full lg:w-1/4 flex flex-col items-center  bg-[#FFF1CE] border border-[#FFF1CE] p-14 rounded-md relative">
          <div className="relative">
            <img
              src={data.photo || import.meta.env.VITE_DEFAULT_AVATAR_PATH}
              alt="profile"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
          <p className="mt-4 text-gray-700">Profile</p>
          <p className="text-2xl font-semibold mt-3">Admin</p>
        </div>

        {/* Right (Form Fields) */}
        <div className="w-full lg:w-3/4 space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={data.full_name}
              disabled
              className="w-full  bg-[#FFF1CE] rounded-lg p-5 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1">E-mail</label>
            <input
              type="email"
              value={data.email_address}
              disabled
              className="w-full  bg-[#FFF1CE] rounded-lg p-5 outline-none"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfileInformation;
