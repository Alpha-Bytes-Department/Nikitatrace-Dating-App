import { useForm } from "react-hook-form";
import logo from "../../assets/logo/logo.svg";
import { useNavigate } from "react-router-dom";

const ResetPass = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    console.log("Submitted:", data);
    navigate('/')
    // TODO: Call reset password API here
  };

  return (
    <div className="flex min-h-screen justify-center items-center px-4">
      <div className="flex items-center justify-center px-10 py-16 w-1/4 bg-[#FCFDEC] border border-[#CE8B38] rounded-lg shadow-md">
        <div className="w-full">
          {/* Logo + Heading */}
          <div className="flex flex-col items-center">
            <img src={logo} alt="Logo" className="w-32 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Reset Password
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Your password must be 8–10 characters long.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* New Password */}
            <div>
              <label className="block text-sm mb-1">New Password</label>
              <input
                type="password"
                placeholder="New Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Minimum 8 characters" },
                  maxLength: { value: 10, message: "Maximum 10 characters" },
                })}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#CE8B38] outline-none"
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm mb-1">Confirm New Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Please re-enter password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#CE8B38] outline-none"
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className=" mt-4">
              <button
                type="submit"
                className="text-white px-4 py-2 rounded-xl bg-[#CE8B38] w-full"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
