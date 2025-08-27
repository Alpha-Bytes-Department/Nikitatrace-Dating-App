import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaLeftLong } from "react-icons/fa6";
import logo from "../../assets/logo/logo.svg";

const OtpVerification = () => {
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const [otpValues, setOtpValues] = useState(["", "", "", ""]);

  // Submit handler to redirect to reset password page
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("OTP Entered:", otpValues.join(""));
    navigate('/reset_password');
  };

  // Auto move next and update OTP values
  const handleInputChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) && value.length === 1) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);
      if (index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Backspace to previous
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = "";
      setOtpValues(newOtpValues);
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "Backspace" && !e.target.value && index === 0) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = "";
      setOtpValues(newOtpValues);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center px-4">
      <div className="flex items-center justify-center px-10 py-16 w-1/4 bg-[#FCFDEC] border border-[#CE8B38] rounded-lg shadow-md">
        <div className="w-full">
          {/* Logo + Heading */}
          <div className="flex flex-col items-center">
            <img src={logo} alt="Logo" className="w-32 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Verify Email
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Please enter the OTP sent to your email and proceed.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-6">
            {/* OTP Fields */}
            <div className="flex justify-center gap-4">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={otpValues[index]}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-16 h-12 text-center rounded-full border border-gray-200 focus:border-[#CE8B38] outline-none"
                />
              ))}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="text-white px-4 py-2 rounded-xl bg-[#CE8B38] w-full"
            >
              Proceed to Reset Password
            </button>
          </form>

          {/* Back Button */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => window.history.back()}
              className="text-blue-500 flex items-center hover:underline"
            >
              <FaLeftLong className="mr-2" /> Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;