"use client";

import React, { useState } from "react";
import axios from "axios";
import { Mail, Lock, RefreshCw } from "lucide-react";
import Spline from "@splinetool/react-spline";
import RegistrationForm from "./signupPage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmailVerification = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidJiEmail = (email) => {
    return email.endsWith("@mail.jiit.ac.in");
  };

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("❌ Please enter your email.");
      return;
    }
    if (!isValidJiEmail(email)) {
      toast.error("❌ Email must end with @mail.jiit.ac.in");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://collegedating-cbii.onrender.com/api/v1/auth/send-otp-1st",
        { email }
      );
      if (response.status === 200) {
        setStep(2);
        toast.success("✅ OTP sent to your email.");
      } else {
        toast.error(response.data.error || "❌ Failed to send OTP.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "❌ Something went wrong while sending OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("❌ Please enter the OTP.");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(
        "https://collegedating-1.onrender.com/api/v1/auth/verify-otp-1st",
        { email, otp }
      );
      if (response.status === 200) {
        toast.success("🎉 Email verified successfully!");
        setStep(3);
      } else {
        toast.error(response.data.error || "❌ Invalid OTP.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "❌ Something went wrong while verifying OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />

      {step === 3 ? (
        <RegistrationForm email={email} />
      ) : (
        <div className="h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-gray-800 relative">
          {/* Spline Background */}
          <Spline
            scene="https://prod.spline.design/G-yULbKpNsD9oqwT/scene.splinecode"
            className="absolute inset-0 w-full h-full"
          />

          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex justify-center items-center p-4 relative z-10">
            <div className="bg-gray-800/70 backdrop-blur-lg rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md relative">
              <div className="text-center mb-6">
                <div className="flex justify-center items-center gap-2 text-pink-400 text-3xl font-bold">
                  {step === 1 ? <Mail className="animate-pulse" /> : <Lock className="animate-bounce" />}
                  {step === 1 ? "Verify Your Email" : "Enter OTP"}
                </div>
                <p className="text-gray-300 mt-2 text-sm sm:text-base">
                  {step === 1 ? "Enter your JIIT email to receive a verification OTP." : "Enter the OTP sent to your email."}
                </p>
              </div>

              {step === 1 && (
                <>
                  <input
                    type="email"
                    placeholder="yourname@mail.jiit.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-1 p-3 rounded bg-gray-700/50 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-pink-400"
                  />
                  <button
                    onClick={handleSendOtp}
                    disabled={loading}
                    className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {loading ? "Sending OTP..." : "Send OTP"}
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full mt-1 p-3 rounded bg-gray-700/50 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-pink-400"
                  />
                  <button
                    onClick={handleVerifyOtp}
                    disabled={loading}
                    className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>

                  <button
                    onClick={handleSendOtp}
                    disabled={loading}
                    className="w-full mt-3 bg-gray-700/50 text-gray-300 py-3 px-6 rounded-lg hover:bg-gray-600 transition-all duration-300 disabled:opacity-50 flex justify-center items-center gap-2"
                  >
                    <RefreshCw size={16} />
                    {loading ? "Resending..." : "Resend OTP"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmailVerification;
