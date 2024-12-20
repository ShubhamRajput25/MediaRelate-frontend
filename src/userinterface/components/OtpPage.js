import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { postData } from "../../services/fetchnodeservices";
import "../css/OtpPage.css";
import { Box, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function OtpPage({ isModalOpen, setModalOpen, data, typeOfOtp }) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpValue = otp.join("");
    console.log("OTP value:", otpValue); // Debugging OTP value

    if (otpValue.length === 4) {
      setSubmitLoading(true);
      try {
        const endpoint =
          typeOfOtp === "forget-password"
            ? "auth/change-password-by-forget-password"
            : "auth/verify-signup-otp";

        const result = await postData(endpoint, { ...data, otp: otpValue });
        console.log("API Response:", result); // Debugging API response

        if (result?.status) {
          toast.success(result?.message);
         
          navigate("/signin");
        } else {
          toast.error(result?.message);
        }
        setModalOpen(false)
      } catch (error) {
        console.error("Error in API call:", error);
        toast.error("An error occurred while submitting OTP");
      } finally {
        setSubmitLoading(false);
      }
    } else {
      toast.error("Please enter a complete 4-digit OTP.");
    }
  };

  const handleChange = (e, index) => {
    const value = e?.target?.value;

    // Allow only single digit input
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input
    if (value && index < 3) {
      inputRefs?.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        if (index > 0) {
          inputRefs?.current[index - 1]?.focus();
        }
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return isModalOpen ? (

    <Modal open={isModalOpen} onClose={handleClose}>
      <Box
        className="modal-box"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: "300px",
          textAlign: "center",
        }}
      >
        <h1>Enter OTP</h1>
        <form onSubmit={handleSubmit} className="otp-form">
          <div className="otp-inputs">
            {otp?.map((digit, index) => {
              return (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  onChange={(e) => handleChange(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              );
            })}
          </div>
          <button type="submit">
            {submitLoading ? <img src="/btn-loading-img.png" alt="loading" /> : "Submit"}
          </button>
        </form>
      </Box>
    </Modal>
  ) : null;
}
