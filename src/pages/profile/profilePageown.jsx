

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Save, UserCircle2, Eye, EyeOff } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import LoadingSpinner from '../../components/LoadingComponent';
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import api from "../../api/api"

const presetAvatars = ["https://img.b2bpic.net/premium-psd/lego-man-with-sunglasses-purple-suit_1217673-201927.jpg",
  "https://img.b2bpic.net/premium-psd/cute-3d-cartoon-portrait-business-man_735731-3298.jpg",
  "https://img.b2bpic.net/premium-psd/people-3d-illustration_551318-2159.jpg",
  "https://img.b2bpic.net/premium-psd/man-with-sunglasses-sunset-background_1073400-442.jpg",
  "https://img.b2bpic.net/premium-psd/3d-render-cartoon-avatar-isolated_460336-542.jpg",
  "https://img.b2bpic.net/premium-psd/3d-model-3d-3d-model-3d-model_1393761-202.jpg",
  "https://img.b2bpic.net/premium-psd/smiling-3d-cartoon-man_975163-758.jpg",
  "https://img.b2bpic.net/premium-psd/3d-render-cartoon-avatar-isolated_570939-57.jpg",
  "https://img.b2bpic.net/premium-psd/3d-avatar-character_975163-699.jpg",
  "https://img.b2bpic.net/premium-psd/3d-memoji-style-green-boy-15s-korean-stylish-hair-no-glasses-smiling-only-face-white-background_1263326-76114.jpg",
  "https://img.b2bpic.net/premium-psd/chibi-character-cute-cartoon-transparent-background_357958-1279.jpg",
  "https://img.b2bpic.net/premium-psd/3d-cartoon-avatar-smiling-man_1020-5127.jpg",
  "https://img.b2bpic.net/premium-psd/picture-boy-wearing-jacket-with-hood-it_1322068-36139.jpg",
  "https://img.b2bpic.net/premium-psd/3d-male-cute-cartoon-character-avatar-isolated-illustration_530669-1705.jpg",
  "https://img.b2bpic.net/premium-psd/people-fashion-3d_535401-2671.jpg",
  "https://img.b2bpic.net/premium-psd/boy-3d-cartoon-character-png-isolated-transparent-background_1311822-3971.jpg",
  "https://img.b2bpic.net/premium-psd/3d-cartoon-avatar_975163-826.jpg",
  "https://img.b2bpic.net/premium-psd/whiskers-giggles-tale-animal-companions-joyful-kids_984027-3805.jpg",
  "https://img.b2bpic.net/premium-psd/cute-boy-with-jacket-that-says-cat-front_1322068-36357.jpg",
  "https://img.b2bpic.net/premium-psd/gammer-3d_535401-2023.jpg",
  "https://img.b2bpic.net/premium-psd/cartoon-boy-wearing-winter-jacket-transparent-background_1173776-906.jpg",
  "https://img.b2bpic.net/premium-psd/chibi-character-cute-cartoon-transparent-background_357958-2162.jpg",
  "https://img.b2bpic.net/premium-psd/chibi-character-cute-cartoon-transparent-background_357958-1276.jpg",
  "https://img.b2bpic.net/premium-psd/3d-designer_382786-1252.jpg",
  "https://img.b2bpic.net/premium-psd/3d-avatar-graphic-designer_855820-360.jpg",
  "https://img.b2bpic.net/premium-psd/blue-radio-with-blue-knob-it_1106435-4356.jpg",
  "https://img.b2bpic.net/premium-psd/cute-cartoon-boy-casual-outfit_1301196-13377.jpg",
  "https://img.b2bpic.net/premium-psd/3d-avatar-character_975163-690.jpg",
  "https://img.b2bpic.net/premium-psd/3d-cartoon-character-avatar_975163-763.jpg",
  "https://img.b2bpic.net/premium-psd/3d-avatar-character_975163-682.jpg",
  "https://img.b2bpic.net/premium-psd/cute-kid-boy-hand-drawn-cartoon-character-illustration_996087-606.jpg",
  "https://img.b2bpic.net/premium-psd/3d-frog-character-kid-costume_10376-1421.jpg",
  "https://img.b2bpic.net/premium-psd/3d-avatar-girl_855820-321.jpg",
  "https://img.b2bpic.net/premium-psd/3d-rendering-toddler-girl-standing-smiling-transparent-background-ai-generated_768733-36540.jpg",
  "https://img.b2bpic.net/premium-psd/3d-avatar-character_975163-684.jpg",
  "https://img.b2bpic.net/premium-psd/cute-short-hair-girl-chibi_748274-35.jpg",
  "https://img.b2bpic.net/premium-psd/3d-girl-cartoon-character_837431-192.jpg",
  "https://img.b2bpic.net/premium-psd/3d-rendering-toddler-girl-standing-smiling-transparent-background-ai-generated_768733-36472.jpg",
  "https://img.b2bpic.net/premium-psd/cartoon-3d-render-girl-with-pink-glasses_1192480-1487.jpg",
  "https://img.b2bpic.net/premium-psd/doll-with-glasses-sweater-face_1322068-37392.jpg",
  "https://img.b2bpic.net/premium-psd/cartoon-3d-render-girl-with-red-hair-glasses_1192480-1482.jpg",
  "https://img.b2bpic.net/premium-psd/doll-with-glasses-sweater-with-face-that-says-girl_1322068-37388.jpg",
  "https://img.b2bpic.net/premium-psd/3d-rendering-cartoon-cute-young-girl-standing-transparent-background-ai-generated_768733-41567.jpg",
  "https://img.b2bpic.net/premium-psd/upset-stressed-asian-cartoon-character-showing-disappointment-sadness_1233986-35013.jpg",
  "https://img.b2bpic.net/premium-psd/animated-girl-lofi-character-finds-solace-music-through-headphones_950157-6793.jpg",
  "https://img.b2bpic.net/premium-psd/3d-cartoon-girl-avatar_975163-798.jpg",
  "https://img.b2bpic.net/premium-psd/cute-anime-girl-with-pink-hair-pink-umbrella_854727-21913.jpg",
  "https://img.b2bpic.net/premium-psd/3d-girl-portrait-transparent-background_983677-8070.jpg",
  "https://img.b2bpic.net/premium-psd/adorable-3d-rendered-girl-with-brown-hair-big-eyes-freckles-wearing-beige-dress_632498-28111.jpg",
  "https://img.b2bpic.net/premium-psd/3d-memoji-style-green-boy-15s-korean-stylish-hair-no-glasses-smiling-only-face-white-background_1263326-76681.jpg",
  "https://img.b2bpic.net/premium-psd/model-girl-wearing-glasses-with-pair-glasses_1233986-24140.jpg",
  "https://img.b2bpic.net/premium-psd/cute-stylized-3d-rendering-young-woman-with-brown-hair-wearing-round-glasses-dark-grey-business-suit_709622-298.jpg",
  "https://img.b2bpic.net/premium-psd/smiling-girl-with-yellow-beanie-hoodie_1216555-923.jpg",
  "https://img.b2bpic.net/premium-psd/cute-3d-boy-character-portrait-with-blonde-hair-brown-eyes_1216555-1406.jpg",
  "https://img.b2bpic.net/premium-psd/female-avatar-illustration-3d_571948-1806.jpg",

  "https://img.b2bpic.net/premium-psd/girl-png-image_712567-6461.jpg",
  "https://img.b2bpic.net/premium-psd/3d-rendering-toddler-girl-standing-smiling-transparent-background-ai-generated_768733-36355.jpg",
  "https://img.b2bpic.net/premium-psd/friendly-avatar-png-personal-branding-social-media-use_980129-8903.jpg",
  "https://img.b2bpic.net/premium-psd/3d-avatar-character_975163-707.jpg",
  "https://img.b2bpic.net/premium-psd/3d-woman-avatar-png-image-social-media-psd-flyer-post-blue-shirt-character-transparent-backgroud_1356503-273.jpg",
  "https://img.b2bpic.net/premium-psd/3d-avatar-security-guard_855820-363.jpg",
  "https://img.b2bpic.net/premium-psd/3d-cartoon-woman-avatar_975163-781.jpg",
  "https://img.b2bpic.net/premium-psd/3d-woman-character-as-software-developer-transparent-background_894067-55988.jpg",
  "https://img.b2bpic.net/premium-psd/rebellious-young-adult-woman-with-blonde-hair-from-asian-ethnicity-dressed-environmental-scientist-attire-poses-close-up-eyes-style-against-pastel-green-background_410516-158766.jpg"


];

const ProfilePage = () => {
   const navigate = useNavigate();

 const [loading, setLoading] = useState(true);
useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("You are not logged in. Please login first.", { theme: "dark" });
        setTimeout(() => navigate('/login'), 3000);
        return;
      }
      try {
        const response = await api.post("/api/v1/auth/check");
        if (response.status !== 200) {
          throw new Error("Invalid session");
        }
        setLoading(false);
      } catch {
        toast.error("Session expired. Please login again.", { theme: "dark" });
        setTimeout(() => navigate('/login'), 3000);
      }
    };
    checkAuth();
  }, [navigate]);








  const [profiledata, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/api/v1/profile/getMyProfile");
        if (response.status === 200) {
          setProfile(response.data);
        } else {

          console.log("not able to get profile data");

        }
        // assuming response.data holds the profile
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);





  const [editing, setEditing] = useState(false);
  const [avatarMode, setAvatarMode] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  

  const handleInputChange = (e) => {
    setProfile({ ...profiledata, [e.target.name]: e.target.value });
  };


  const handleAvatarSelect = (avatarUrl) => {
    setProfile({ ...profiledata, profile: avatarUrl });
    setAvatarMode(false);
  };

  const handleDeleteProfile = async () => {
  const confirmDelete = window.confirm("Are you sure you want to delete your profile?");
  if (!confirmDelete) return;

  try {
    const res = await api.delete("/api/v1/profile/deleteProfile");
    if (res.status === 200) {
      toast.success("🗑️ Profile deleted successfully!");
      localStorage.clear(); // clear any user data
      window.location.href = "/login"; // redirect to login or homepage
    } else {
      toast.error("Failed to delete profile.");
    }
  } catch (error) {
    console.error("Delete failed:", error);
    toast.error("An error occurred while deleting the profile.");
  }
};

  const handleSave = async () => {
    try {
      const updatedProfile = {
        name: profiledata.name,
        bio: profiledata.bio,
        age: profiledata.age,
        year: profiledata.year,
        profile: profiledata.profile,
      };

      const res = await api.put("/api/v1/profile/editProfile", updatedProfile);

      if (res.status === 200) {
        toast.success("✅ Profile updated successfully!");
      } else {
        toast.error("Something went wrong!");
      }

    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update profile.");
    }

    setEditing(false);
  };

  const handlePasswordChange = () => {
    if (!oldPassword || !newPassword) {
      toast.error("Please fill both old and new password.");
      return;
    }
 


    toast.success("🔐 Password updated!", { autoClose: 1500 });
    setPasswordEdit(false);
    setOldPassword("");
    setNewPassword("");
  };

  const toggleOnline = () => {
    const updated = { ...profiledata, isOnline: !profiledata.isOnline };
    setProfile(updated);
    localStorage.setItem("profileData", JSON.stringify(updated));
  };

  return loading?<LoadingSpinner/> :(
    <div className="h-screen overflow-y-auto font-sans scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-gray-800">
      <ToastContainer />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex justify-center items-center p-4 relative">
        {/* Background animation */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 bg-gray-800/70 backdrop-blur-lg rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-3xl text-white"
        >
          {/* Profile Display */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-12">
            <div className="flex justify-center sm:block">
              <img
                src={profiledata.profile}
                alt="Profiledata"
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-pink-400 object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                <h2 className="text-2xl font-bold tracking-wide">{profiledata.name}</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditing(true)}
                    className="border border-pink-400 px-4 py-1.5 rounded text-base font-medium hover:bg-pink-600 transition"
                  >
                    Edit Profile
                  </button>
                  
                </div>
              </div>
              <p className="text-gray-300 mb-1 text-base leading-relaxed tracking-wide">{profiledata.bio}</p>
              <div className="flex flex-wrap items-center gap-3 text-base text-gray-400 tracking-wide">
                <span>Age: {profiledata.age}</span>
                <span>•</span>
                <span>{profiledata.year}</span>
                <span>•</span>
                <span className={profiledata.isOnline ? "text-green-400" : "text-gray-500"}>
                  {profiledata.isOnline ? "Online" : "Offline"}
                </span>
                <button
                  onClick={toggleOnline}
                  className="ml-1 px-2 py-0.5 border border-gray-500 rounded text-xs hover:bg-gray-700"
                >
                  Toggle
                </button>
              </div>
            </div>
          </div>

          {/* Editing Section */}
          {editing && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-4">
                
                <button
                  onClick={() => setAvatarMode(!avatarMode)}
                  className="text-base font-semibold text-purple-300 hover:underline"
                >
                  Choose from Avatars
                </button>
              </div>
              {avatarMode && (
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {presetAvatars.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt="avatar"
                      className="w-16 h-16 rounded-full object-cover border border-gray-300 hover:ring-2 hover:ring-pink-400 cursor-pointer"
                      onClick={() => handleAvatarSelect(url)}
                    />
                  ))}
                </div>
              )}

              {/* Editable Fields */}
              <div>
                <label className="block text-base font-semibold text-pink-300">Bio</label>
                <textarea
                  name="bio"
                  value={profiledata.bio}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 text-base"
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-pink-300">Age</label>
                <input
                  type="number"
                  name="age"
                  value={profiledata.age}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 text-base"
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-pink-300">Year</label>
                <select
                  name="year"
                  value={profiledata.year}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 text-base"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="Final Year">Final Year</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleSave}
                  className="bg-pink-500 text-white px-5 py-2 rounded font-semibold hover:bg-pink-600 transition text-base"
                >
                  <Save size={16} className="inline-block mr-1" /> Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="border border-gray-400 px-5 py-2 rounded hover:bg-gray-700 text-white transition text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteProfile}
                  className="border border-red-400 px-4 py-1.5 rounded text-base font-medium hover:bg-red-600 transition"
                >
                  Delete Profile
                </button>
              </div>
            </div>
          )}

          {/* Password Edit */}
          {passwordEdit && (
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-base font-semibold text-pink-300">Old Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 text-base pr-10"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-base font-semibold text-pink-300">New Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 text-base"
                />
              </div>
              <button
                onClick={handlePasswordChange}
                className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition font-semibold text-base"
              >
                Save Password
              </button>
            </div>
          )}

          {/* Footer */}
          {profiledata.lastUpdated && (
            <p className="mt-6 text-center text-sm text-gray-400 font-light tracking-wide">
              Last updated: {profiledata.lastUpdated}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
