"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";
import { Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import styles from "./otp.module.css";
import { OtpInput } from "reactjs-otp-input";
import { useSelector } from "react-redux";
import { generateOTP } from "../../../../services/fetchNodeService";

const OtpContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone");
  const [otp, setOtp] = useState("");
  const [gOtp, setGOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const user = useSelector((state) => state.user);
  const mobileno = Object.keys(user)[0];
  const params = useSearchParams();
  const from = params.get("from");

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(function () {
    var otp = generateOTP();
    setGOtp(otp);
    alert(otp);
  }, []);

  function checkOtp() {
    if (gOtp) {
      if (from == "MP") {
        router.push("/order-review");
      } else {
        router.push("/homepage");
      }
    } else {
      alert("Not Correct");
    }
  }

  const handleResend = () => {
    setTimer(30);
    setCanResend(false);
    // Add resend logic here
    console.log("Resending OTP...");
  };

  const isOtpComplete = otp.length === 6;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <button
          className={styles.backButton}
          aria-label="back"
          onClick={() => router.back()}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </button>

        <div className={styles.header}>
          <h1 className={styles.title}>Verify OTP</h1>
          <p className={styles.subtitle}>
            Enter the OTP sent to <strong>+91-{mobileno}</strong>
          </p>
          <Link href="/signin" style={{ textDecoration: "none" }}>
            <span className={styles.updateLink}>Update number</span>
          </Link>
        </div>

        <div className={styles.otpWrapper}>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            isInputNum={true}
            shouldAutoFocus={true}
            containerStyle={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
            }}
            inputStyle={{
              width: "48px",
              height: "56px",
              fontSize: "1.5rem",
              fontWeight: "600",
              border: "2px solid #e0e0e0",
              borderRadius: "12px",
              backgroundColor: "#fafafa",
              color: "#333",
              transition: "all 0.2s ease",
              outline: "none",
            }}
            focusStyle={{
              border: "2px solid #0071bc",
              backgroundColor: "#fff",
              boxShadow: "0 0 0 3px rgba(0, 113, 188, 0.15)",
            }}
          />
        </div>

        <div className={styles.resendContainer}>
          {canResend ? (
            <Button
              onClick={handleResend}
              sx={{
                textTransform: "none",
                color: "#0071bc",
                p: 0,
                minWidth: "auto",
              }}
            >
              Resend OTP
            </Button>
          ) : (
            <span className={styles.timerText}>Resend OTP in {timer}s</span>
          )}
        </div>

        <div className={styles.footer}>
          <Button
            fullWidth
            variant="contained"
            disabled={!isOtpComplete}
            onClick={checkOtp}
            sx={{
              borderRadius: 8,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "none",
              backgroundColor: isOtpComplete ? "#0078AD" : "#e0e0e0",
              color: "#fff",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: isOtpComplete ? "#0C5273" : "#e0e0e0",
                boxShadow: "none",
              },
              "&.Mui-disabled": {
                backgroundColor: "#e0e0e0",
                color: "#a0a0a0",
              },
            }}
          >
            Verify OTP
          </Button>
        </div>
      </div>
    </div>
  );
};

const OtpPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtpContent />
    </Suspense>
  );
};

export default OtpPage;
