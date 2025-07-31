import React, { useState } from "react";
import EnterEmail from "./EnterEmail";
import EnterOTP from "./EnterOTP";
import EnterNewPassword from "./EnterNewPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const goToOTP = (emailFromStep1) => {
    setEmail(emailFromStep1);
    setStep(2);
  };

  const goToResetPassword = () => setStep(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex justify-center items-center p-4 relative overflow-hidden">
      <ToastContainer />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      
      {step === 1 && <EnterEmail onNext={goToOTP} />}
      {step === 2 && <EnterOTP email={email} onNext={goToResetPassword} />}
      {step === 3 && <EnterNewPassword email={email} />}
    </div>
  );
};

export default ForgotPasswordPage;
