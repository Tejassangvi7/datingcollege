"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Heart, Sparkles, Users, Mail, Lock, Calendar, Star } from "lucide-react";

// Interests and years
const INTERESTS = [ "Music", "Movies", "Reading", "Hiking", "Cooking", "Gaming", "Photography", "Dancing", "Travelling", "Sports", "Art", "Fitness", "Technology", "Fashion", "Food", "Nature", "Pets", "Writing", "Yoga", "Swimming" ];
const YEARS = [ "1st Year", "2nd Year", "3rd Year", "4th Year", "Graduated", "Other" ];

// Preset Avatars
const presetAvatars = [ "https://img.b2bpic.net/premium-psd/lego-man-with-sunglasses-purple-suit_1217673-201927.jpg",
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

export default function RegistrationForm({ email }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: email || "",
    password: "",
    age: "",
    gender: "",
    year: "",
    interests: [],
    profile: "", // ✅ avatar selection
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.length < 2) newErrors.name = "Name must be at least 2 characters";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!formData.email.endsWith("@mail.jiit.ac.in")) newErrors.email = "Email must end with @mail.jiit.ac.in";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!formData.age) newErrors.age = "Age is required";
    else if (isNaN(formData.age) || formData.age < 18 || formData.age > 100) newErrors.age = "Age must be between 18 and 100";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.year) newErrors.year = "Year is required";
    if (formData.interests.length === 0) newErrors.interests = "Select at least one interest";
    if (!formData.profile) newErrors.profile = "Please choose an avatar"; // ✅ avatar validation
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) 
      {setErrors((prev) => ({ ...prev, [field]: undefined }))}
  };

  const toggleInterest = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
    if (errors.interests) setErrors((prev) => ({ ...prev, interests: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await axios.post("https://collegedating-6.onrender.com/api/v1/profile/createProfile", formData);
      if (response.status === 200 || response.status === 201) {
        toast.success("🎉 Registration successful! Redirecting...");
        setFormData({ name: "", email: "", password: "", age: "", gender: "", year: "", interests: [], profile: "" });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Network error. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-gray-800">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex justify-center items-center p-4 relative">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="bg-gray-800/70 backdrop-blur-lg rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-lg relative z-10">
          <div className="text-center mb-6">
            <div className="flex justify-center items-center gap-2 text-pink-400 text-3xl font-bold">
              <Heart className="animate-pulse" />
              Join Our Community
              <Sparkles className="text-violet-400 animate-bounce" />
            </div>
            <p className="text-gray-300 mt-2 text-sm sm:text-base">
              Create your profile and start connecting with amazing people.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-gray-200 flex items-center gap-1">
                <Users size={18} /> Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full mt-1 p-2 rounded bg-gray-700/50 text-white border border-gray-600 focus:ring-2 focus:ring-pink-400"
              />
              {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-200 flex items-center gap-1">
                <Lock size={18} /> Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="w-full mt-1 p-2 rounded bg-gray-700/50 text-white border border-gray-600 focus:ring-2 focus:ring-pink-400"
              />
              {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
            </div>

            {/* Age & Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-200 flex items-center gap-1">
                  <Calendar size={18} /> Age
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="w-full mt-1 p-2 rounded bg-gray-700/50 text-white border border-gray-600 focus:ring-2 focus:ring-pink-400"
                />
                {errors.age && <p className="text-red-400 text-sm">{errors.age}</p>}
              </div>
              <div>
                <label className="text-gray-200 flex items-center gap-1">
                  <Users size={18} /> Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-full mt-1 p-2 rounded bg-gray-700/50 text-white border border-gray-600 focus:ring-2 focus:ring-pink-400"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p className="text-red-400 text-sm">{errors.gender}</p>}
              </div>
            </div>

            {/* Year */}
            <div>
              <label className="text-gray-200 flex items-center gap-1">
                <Calendar size={18} /> Year
              </label>
              <select
                value={formData.year}
                onChange={(e) => handleInputChange("year", e.target.value)}
                className="w-full mt-1 p-2 rounded bg-gray-700/50 text-white border border-gray-600 focus:ring-2 focus:ring-pink-400"
              >
                <option value="">Select Year</option>
                {YEARS.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              {errors.year && <p className="text-red-400 text-sm">{errors.year}</p>}
            </div>

            {/* Interests */}
            <div>
              <label className="text-gray-200 flex items-center gap-1">
                <Star size={18} /> Interests ({formData.interests.length} selected)
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {INTERESTS.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1 rounded-full text-sm border transition-all ${
                      formData.interests.includes(interest)
                        ? "bg-pink-500 text-white border-pink-500"
                        : "bg-gray-700/50 text-gray-300 border-gray-600 hover:border-pink-400 hover:text-pink-400"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
              {errors.interests && <p className="text-red-400 text-sm">{errors.interests}</p>}
            </div>

            {/* Avatar Picker */}
            <div>
              <label className="text-gray-200 block mb-2 font-semibold">Choose Your Avatar</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-64 overflow-y-scroll scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-gray-800 p-2 border border-gray-600 rounded bg-gray-700/50">
                {presetAvatars.map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar}
                    alt={`Avatar ${index}`}
                    onClick={() => handleInputChange("profile", avatar)}
                    className={`cursor-pointer rounded-full w-20 h-20 object-cover border-2 transition-all ${
                      formData.profile === avatar
                        ? "border-pink-500 scale-105"
                        : "border-transparent hover:border-pink-300"
                    }`}
                  />
                ))}
              </div>
              {errors.profile && (
                <p className="text-red-400 text-sm mt-1">{errors.profile}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Create My Profile"}
            </button>
          </form>

          <p className="text-center text-gray-300 mt-4">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-pink-400 hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
