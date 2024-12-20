import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { postData } from "../../services/fetchnodeservices";
import "../css/OtpPage.css";
import { Box, Modal, TextField, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import OtpPage from "./OtpPage";

export default function ForgetPasswordPage({ open, setOpen, email, password, setPassword, confirmPassword, setConfirmPassword, isModalOpen, setModalOpen }) {
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // For password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // For confirm password visibility
  const [error, setError] = useState({});
  
  
  

  const handleVerify = () => {
    let error = false;

    if (password?.length == 0) {
      handleError("password", "Please Enter Password");
      error = true;
    }

    if (confirmPassword?.length == 0) {
      handleError("confirmPassword", "Please Confirm Your Password");
      error = true;
    }

    if (password !== confirmPassword) {
      handleError("confirmPassword", "Passwords do not match");
      error = true;
    }

    return error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || email.trim() === "") {
      toast.error("Please enter a valid email");
      return;
    }

    if (!handleVerify()) {
      setSubmitLoading(true);
      let result = await postData("auth/send-otp-for-forget-password", {email});
      setSubmitLoading(false);

      if (result?.status) {
        setOpen(false)
        setModalOpen(true);
      }
    }
  };

  // Handle modal close
  const handleClose = () => {
    setOpen(false);
  };

  const handleError = (name, label) => {
    setError((prev) => {
      return {
        ...prev,
        [name]: label,
      };
    });
  };
  

  return (
    <Modal open={open} onClose={handleClose}>
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
          width: "50%",
          textAlign: "center",
        }}
      >
        <h1>Enter New Password</h1>
        <form onSubmit={handleSubmit} className="otp-form">
          <Box sx={{ position: "relative", marginBottom: 2, width: "100%" }}>
            <TextField
              type={passwordVisible ? "text" : "password"} // Toggle visibility
              fullWidth
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => handleError("password", "")}
              error={!!error?.password}
              helperText={error?.password}
            />
            <IconButton
              onClick={() => setPasswordVisible((prev) => !prev)}
              sx={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
              }}
            >
              {passwordVisible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Box>

          <Box sx={{ position: "relative", marginBottom: 2, width: "100%" }}>
            <TextField
              type={confirmPasswordVisible ? "text" : "password"} // Toggle visibility
              fullWidth
              label="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => handleError("confirmPassword", "")}
              error={!!error?.confirmPassword}
              helperText={error?.confirmPassword}
            />
            <IconButton
              onClick={() => setConfirmPasswordVisible((prev) => !prev)}
              sx={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
              }}
            >
              {confirmPasswordVisible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Box>

          <button type="submit">
            {submitLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </Box>
      
    </Modal>
  );
}
