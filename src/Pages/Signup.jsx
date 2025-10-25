import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {assets} from "../assets/assets";
import Input from "../Components/Input";
import { validation } from "../util/validation";
import { LoaderCircle } from "lucide-react";
import uploadProfileImage from "../util/uploadProfileImage";
import axiosConfig from "../util/axiosconfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import ProfilePhotoSelector from "../Components/ProfilePhotoSelector";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";
    setIsLoading(true);

    if (!fullName.trim()) {
      setError("Please enter Fullname");
      setIsLoading(false);
      return;
    }
    if (!validation(email)) {
      setError("Please enter valid email");
      setIsLoading(false);
      return;
    }
    if (!password.trim()) {
      setError("Please enter password");
      setIsLoading(false);
      return;
    }
    setError("");

    // signup api call
    try {
      // upload the image before api call
      if (profilePhoto) {
        const imageUrl = await uploadProfileImage(profilePhoto);
        profileImageUrl = imageUrl || "";
      }
      const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });
      if (response.status === 201) {
        toast.success("Profile created successfully");
        navigate("/login");
      }
    } catch (error) {
      console.error("Something went wrong in Signup", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
        <img
          src={assets.bgLogin}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover filter blur-sm"
        />

        {/* logo */}
        <div className="relative z-10 w-full max-w-lg px-6 ">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
            {/* Centered Responsive Logo */}
            <div className="flex justify-center mb-6">
              <img
                src={assets.logoblack}
                alt="logo"
                className="w-16 sm:w-20 md:w-24 lg:w-28 object-contain"
              />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-semibold text-black text-center mb-2">
              Create An Account
            </h3>

            {/* Subtitle */}
            <p className="text-sm text-slate-700 text-center mb-8">
              Join Fyn to track your spending's
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-center mb-6">
                <ProfilePhotoSelector
                  image={profilePhoto}
                  setImage={setProfilePhoto}
                />
              </div>
              <div className="grid grid-col-2 md:grid-cols-2 gap-4">
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  label="Full Name"
                  placeholder="firstname surname"
                  type="text"
                />
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                  placeholder="abcdef@xyz.com"
                  type="text"
                />
                <div className="col-span-2">
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
              </div>
              {error && (
                <p className="text-red-800 text-sm text-center bg-red-500/15 p-2 rounded">
                  {error}
                </p>
              )}

              <button
                disabled={isLoading}
                className={`w-full py-3 text-lg font-bold text-white rounded-md 
             bg-gradient-to-r from-indigo-600 to-purple-700 
             shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-purple-800 
             transition-all duration-300 flex items-center justify-center gap-2 ${
               isLoading ? "opacity-60 cursor-not-allowed" : ""
             }`}
                type="submit"
              >
                {isLoading ? (
                  <LoaderCircle className="animate-spin w-5 h-5">
                    Signing Up...
                  </LoaderCircle>
                ) : (
                  "SIGN UP"
                )}
              </button>

              <p className="text-sm text-slate-800 text-center mt-6">
                Already have an Account ?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-800  hover:text-blue-900 transition-colors"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
