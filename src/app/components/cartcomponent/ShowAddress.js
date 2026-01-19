"use client";

import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Divider } from "@mui/material";
import styles from "./ShowAddress.module.css";
import { useState, useEffect } from "react";
import { getData, postData } from "../../../../services/fetchNodeService";

export default function ShowAddress({
  address,
  drawerStatus,
  setDrawerStatus,
}) {
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");

  const fetchAllStudents = async () => {
    const id = address.enrollmentno
    var response = await postData("users/fetch_all_address",{enrollmentno:id})
    setStateName(response.data[0].current_statename)
    setCityName(response.data[0].current_cityname)
  }

  useEffect(() => {
    fetchAllStudents()

  }, [])

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
          <p className={styles.addressText}>{stateName}</p>
          <p className={styles.addressText}>{cityName}</p>
          <p className={styles.addressText}>{address.current_pincode}</p>
          <p className={styles.phoneText}>Phone: {address.mobileno}</p>
        </div>
      </div>
    </div>
  );
}
