import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../Components/Input";
import { AppContext } from "../context/AppContext";
import { LoaderCircle, Cloud } from "lucide-react";
import { validation } from "../util/validation";
import axiosConfig from "../util/axiosconfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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

    // login api call
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        setUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        console.error("Something went wrong in login", error);
        setError(error.message);
      }
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

        {/* Explore / Guest Cloud */}
        <div 
          onClick={() => {
            setEmail("hfimnv98c2@ozsaip.com");
            setPassword("Strong@123");
          }}
          className="absolute top-6 right-6 z-20 bg-white/95 backdrop-blur-sm p-4 rounded-[2rem] rounded-tr-lg shadow-xl border border-blue-100 cursor-pointer hover:scale-105 hover:shadow-2xl transition-all max-w-[280px] flex items-center gap-3 animate-pulse-slow"
        >
          <div className="bg-blue-100 p-2 rounded-full text-blue-600">
            <Cloud size={24} />
          </div>
          <p className="text-xs font-medium text-gray-700 leading-tight">
            If you are here just to explore and want to skip signup then <span className="text-blue-600 font-bold underline">click here</span>
          </p>
        </div>

        {/* logo */}
        <div className="relative z-10 w-full max-w-md px-6 ">
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
              Login to your Account
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-center mb-6">
                {/* add profile image */}
              </div>

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

              {error && (
                <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
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
                  "Log In"
                )}
              </button>

              <p className="text-sm text-slate-800 text-center mt-6">
                Don't have an Account? Create One !{" "}
                <Link
                  to="/signup"
                  className="font-medium text-blue-800  hover:text-blue-900 transition-colors underline"
                >
                  SignUp
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
