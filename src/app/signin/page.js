"use client";
import React, { useState } from "react";
import { TextField, InputAdornment, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./signin.module.css";

const SigninPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  const handlePhoneChange = (event) => {
    const value = event.target.value;
    // Allow only numbers and max 10 digits
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const isButtonActive = phoneNumber.length === 10;

/*   const handleSignIn = () => {
    if (isButtonActive) {
      router.push(`/signin/otp?phone=${phoneNumber}`);
    }
  }; */

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <div className={styles.header}>
          <h1 className={styles.title}>Sign In</h1>
          <p className={styles.subtitle}>Simply sign in to hungerbuddy app</p>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Mobile Number</label>
          <TextField
            fullWidth
            variant="outlined"
            placeholder=""
            value={phoneNumber}
            onChange={handlePhoneChange}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: "#000",
                        mr: 0.5,
                      }}
                    >
                      +91-
                    </Typography>
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 2,
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                },
              },
            }}
          />
        </div>

        <div className={styles.footer}>
          <span className={styles.terms}>
            By signing in, you agree to our{" "}
            <Link href="#" className={styles.link}>
              Terms and Conditions of Use
            </Link>{" "}
            and{" "}
            <Link href="#" className={styles.link}>
              Privacy Policy
            </Link>
            .
          </span>

          <Button
            fullWidth
            variant="contained"
            onClick={null}
            disabled={!isButtonActive}
            sx={{
              borderRadius: 8,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "none",
              backgroundColor: isButtonActive ? "#0078AD" : "#e0e0e0",
              color: "#fff",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: isButtonActive ? "#0C5273" : "#e0e0e0",
                boxShadow: "none",
              },
              "&.Mui-disabled": {
                backgroundColor: "#e0e0e0",
                color: "#a0a0a0",
              },
            }}
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
