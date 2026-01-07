"use client";

import { IconButton, TextField, Button, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./AddAddress.module.css";

export default function AddAddress({ onClose, onSave }) {
  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleSaveWrapper = () => {
    // Logic to save address would go here
    if (onSave) onSave();
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Add/Edit Address</h1>
          <IconButton onClick={handleClose} edge="end">
            <CloseIcon sx={{ fontSize: 28, color: "#005a8d" }} />
          </IconButton>
        </div>

        {/* Address Details Section */}
        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Address Details</h2>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Pincode" variant="standard" fullWidth />
            </Grid>

            <Grid item xs={6}>
              <TextField label="House No." variant="standard" fullWidth />
            </Grid>

            <Grid item xs={6}>
              <TextField label="Floor No." variant="standard" fullWidth />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Tower No." variant="standard" fullWidth />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Building / Apartment Name"
                variant="standard"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Address *" variant="standard" fullWidth />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Landmark / Area *"
                variant="standard"
                fullWidth
              />
            </Grid>
          </Grid>
        </div>

        {/* Delivery Contact Details Section */}
        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Delivery Contact Details</h2>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Receivers Name *"
                variant="standard"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Receivers Number *"
                variant="standard"
                fullWidth
              />
            </Grid>
          </Grid>
        </div>

        <Button
          variant="contained"
          fullWidth
          onClick={handleSaveWrapper}
          sx={{
            backgroundColor: "#0078ad",
            color: "#fff",
            fontWeight: 700,
            fontSize: "16px",
            padding: "14px",
            borderRadius: "24px",
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#093e57",
              boxShadow: "none",
            },
          }}
        >
          Save & Proceed
        </Button>
      </div>
    </div>
  );
}
