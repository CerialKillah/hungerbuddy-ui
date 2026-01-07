"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ShowCart from "../components/cartcomponent/ShowCart";
import PaymentDetails from "../components/cartcomponent/PaymentDetails";
import CouponComponent from "../components/cartcomponent/CouponComponent";
import CounterComponent from "../components/cartcomponent/CounterComponent";
import styles from "./cart.module.css";
import { useSelector } from "react-redux";

export default function CartPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));
  var cart = useSelector((state) => state.cart);
  var products = Object.values(cart);
  const navigate = useRouter();

  // Always Step 0 for Cart Page
  const currentStep = 0;

  const [refresh, setRefresh] = useState(false);

  const handlePlaceOrder = () => {
    navigate.push("/order-review");
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
            My Cart
          </h1>

          {/* Main Content*/}
          <Grid
            container
            spacing={isMobile ? 2 : 3}
            className={styles.mainContent}
          >
            {/* Left Section - Cart Items */}
            <Grid size={{ xs: 12, md: 8 }}>
              <ShowCart
                items={products}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            </Grid>

            {/* Right Section - Stepper, Payment & Coupon */}
            <Grid size={{ xs: 12, md: 4 }}>
              <div className={styles.rightSection}>
                {/* Stepper */}
                <CounterComponent currentStep={currentStep} />
                <PaymentDetails items={products} />
                <CouponComponent />
                <Button
                  variant="contained"
                  fullWidth
                  className={styles.placeOrderBtn}
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}
