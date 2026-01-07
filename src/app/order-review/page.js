"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Grid, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ShowCart from "../components/cartcomponent/ShowCart";
import ShowAddress from "../components/cartcomponent/ShowAddress";
import PaymentDetails from "../components/cartcomponent/PaymentDetails";
import CouponComponent from "../components/cartcomponent/CouponComponent";
import CounterComponent from "../components/cartcomponent/CounterComponent";
import styles from "./order-review.module.css";
import { useSelector } from "react-redux";
import SelectAddressDrawer from "../components/cartcomponent/SelectAddressDrawer";
import AddAddressDrawer from "../components/cartcomponent/AddAddressDrawer";

export default function OrderReviewPage() {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));
  var cart = useSelector((state) => state.cart);
  var products = Object.values(cart);

  // Step management: 0 = My Cart, 1 = Order Review, 2 = Payment
  // Start at 1 for Order Review
  const [currentStep, setCurrentStep] = useState(1);
  const [drawerStatus, setDrawerStatus] = useState(false);
  const [addAddressDrawerStatus, setAddAddressDrawerStatus] = useState(false);
  var user = useSelector((state) => state.user);

  const handleOpenAddAddress = () => {
    setDrawerStatus(false);
    setAddAddressDrawerStatus(true);
  };

  const handleCloseAddAddress = () => {
    setAddAddressDrawerStatus(false);
    setDrawerStatus(true);
  };

  const handleMakePayment = () => {
    setCurrentStep(2); // Move to Payment step
  };

  return (
    <div>
      {products.length == 0 ? (
        <div>Cart is empty</div>
      ) : (
        <div
          className={styles.pageContainer}
          style={{
            padding: isSmallMobile ? "12px" : isMobile ? "16px" : "24px",
          }}
        >
          {/* Page Header */}
          <h1
            className={styles.pageTitle}
            style={{
              fontSize: isMobile ? "20px" : "24px",
              marginBottom: isMobile ? "16px" : "24px",
            }}
          >
            Order Review
          </h1>

          {/* Main Content using MUI Grid */}
          <Grid
            container
            spacing={isMobile ? 2 : 3}
            className={styles.mainContent}
          >
            {/* Left Section - Address + Cart */}
            <Grid size={{ xs: 12, md: 8 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <ShowAddress
                  drawerStatus={drawerStatus}
                  setDrawerStatus={setDrawerStatus}
                />
                <ShowCart items={products} />
              </div>
            </Grid>

            {/* Right Section - Stepper, Payment & Coupon */}
            <Grid size={{ xs: 12, md: 4 }}>
              <div className={styles.rightSection}>
                {/* Stepper */}
                <CounterComponent currentStep={currentStep} />
                <PaymentDetails items={products} />
                <CouponComponent />
                {currentStep === 1 ? (
                  <Button
                    variant="contained"
                    fullWidth
                    className={styles.placeOrderBtn}
                    onClick={handleMakePayment}
                  >
                    Make Payment
                  </Button>
                ) : (
                  <div>Payment Step Placeholder</div>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      )}
      <SelectAddressDrawer
        drawerStatus={drawerStatus}
        setDrawerStatus={setDrawerStatus}
        onAddAddress={handleOpenAddAddress}
      />
      <AddAddressDrawer
        drawerStatus={addAddressDrawerStatus}
        setDrawerStatus={setAddAddressDrawerStatus}
        onBack={handleCloseAddAddress}
        onSave={() => {
          setAddAddressDrawerStatus(false);
          setDrawerStatus(true);
        }}
      />
    </div>
  );
}
