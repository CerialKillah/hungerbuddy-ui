"use client";

import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Divider } from "@mui/material";
import styles from "./ShowAddress.module.css";

// Sample address data (will be replaced with real data from API/Redux)
const sampleAddress = {
  studentname: "Ayushman Gupta",
  mobileno: "+91-9583235265",
  current_address:
    "GH 755, Deen Dayal Nagar, Near G Sector Dussehra Maidan Pani ki tanki",
  current_city: "Gwalior",
  current_pincode: "474020",
  current_state: "Madhya Pradesh",
};

export default function ShowAddress({
  address = sampleAddress,
  drawerStatus,
  setDrawerStatus,
}) {

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Delivery Address</h2>
      </div>

      {/* Address Card */}
      <div className={styles.addressCard}>
        {/* Name and Type Row */}
        <div className={styles.nameRow}>
          <div className={styles.nameContainer}>
            <span className={styles.name}>{address.studentname}</span>
          </div>
          <IconButton
          onClick={() => setDrawerStatus(true)}
            className={styles.editButton}
            sx={{
              backgroundColor: "#f5f5f5",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            <EditIcon sx={{ fontSize: 18, color: "#333" }} />
          </IconButton>
        </div>

        {/* Divider */}
        <Divider sx={{ borderColor: "#e0e0e0" }} />

        {/* Address Details */}
        <div className={styles.addressDetails}>
          <p className={styles.addressText}>{address.current_address}</p>
          <p className={styles.addressText}>{address.current_city}</p>
          <p className={styles.addressText}>{address.current_state}</p>
          <p className={styles.addressText}>{address.current_pincode}</p>
          <p className={styles.phoneText}>Phone: {address.mobileno}</p>
        </div>
      </div>
    </div>
  );
}
