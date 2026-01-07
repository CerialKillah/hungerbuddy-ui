"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";
import { Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./otp.module.css";

const OtpContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputsRef = useRef([]);

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

  const handleResend = () => {
    setTimer(30);
    setCanResend(false);
    // Add resend logic here
    console.log("Resending OTP...");
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Auto paste handling could be added here

  const isOtpComplete = otp.every((digit) => digit !== "");

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
            Enter the OTP sent to <strong>+91-{phone}</strong>
          </p>
          <Link href="/signin" style={{ textDecoration: "none" }}>
            <span className={styles.updateLink}>Update number</span>
          </Link>
        </div>

        <div className={styles.otpContainer}>
          {otp.map((data, index) => {
            return (
              <input
                className={styles.otpInput}
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={(e) => e.target.select()}
              />
            );
          })}
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
            sx={{
              borderRadius: 8,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "none",
              backgroundColor: isOtpComplete ? "#add8e6" : "#e0e0e0",
              color: "#fff",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: isOtpComplete ? "#87ceeb" : "#e0e0e0",
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
