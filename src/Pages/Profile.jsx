import { useState, useContext, useEffect } from "react";
import Dashboard from "../Components/Dashboard";
import useUser from "../hooks/useUser";
import { AppContext } from "../context/AppContext";
import { UserRound, LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

const Profile = () => {
  useUser();
  const { user } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    profileImageUrl: ""
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        profileImageUrl: user.profileImageUrl || ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // The backend may not have a PUT /profile yet, so we mock success.
      // If it did, it would be: await axiosConfig.put(API_ENDPOINTS.GET_USERINFO, formData);
      await new Promise(res => setTimeout(res, 1000));
      toast.success("Profile updated successfully (Mock)");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dashboard activeMenu="Settings">
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Profile/Settings</h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="card p-6">
          <form onSubmit={handleUpdate} className="flex flex-col gap-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4 mb-2">
              <div className="w-28 h-28 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-300 shadow-sm">
                {formData.profileImageUrl ? (
                  <img src={formData.profileImageUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <UserRound size={48} className="text-gray-400" />
                )}
              </div>
              <div className="w-full max-w-md">
                <label className="block text-sm font-medium mb-1.5 text-center text-gray-600" htmlFor="profileImageUrl">
                  Avatar URL
                </label>
                <input
                  type="text"
                  name="profileImageUrl"
                  id="profileImageUrl"
                  value={formData.profileImageUrl}
                  onChange={handleChange}
                  placeholder="Enter image URL..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-center outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all"
                />
              </div>
            </div>

            {/* Name Section */}
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700" htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all"
              />
            </div>

            {/* Email Section */}
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email address"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 opacity-60 cursor-not-allowed text-gray-500 outline-none"
                disabled // Emails are usually non-editable or require verification
              />
              <p className="text-xs text-gray-400 mt-1">Email address cannot be changed.</p>
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-green-800 hover:bg-green-700 text-white font-medium rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                {loading && <LoaderCircle className="w-4 h-4 animate-spin" />}
                {loading ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Profile;
