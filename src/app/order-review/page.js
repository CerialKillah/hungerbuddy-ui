"use client";
import { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import SelectAddressDrawer from "../components/cartcomponent/SelectAddressDrawer";
import AddAddressDrawer from "../components/cartcomponent/AddAddressDrawer";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { postData } from "../../../services/fetchNodeService";

export default function OrderReviewPage() {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));
  var cart = useSelector((state) => state.cart);
  var products = Object.values(cart);
  const dispatch = useDispatch();

  // Step management: 0 = My Cart, 1 = Order Review, 2 = Payment
  // Start at 1 for Order Review
  const [currentStep, setCurrentStep] = useState(1);
  const [drawerStatus, setDrawerStatus] = useState(false);
  const [addAddressDrawerStatus, setAddAddressDrawerStatus] = useState(false);
  const [userData, setUserData] = useState(null);
  const { error, isLoading, Razorpay } = useRazorpay();
  const mrpTotal = products.reduce(
    (sum, item) => sum + Number(item.fullprice) * item.qty,
    0
  );
  const discount = products.reduce(
    (sum, item) =>
      sum +
      (Number(item.offerprice) > 0
        ? Number(item.fullprice) - Number(item.offerprice)
        : 0) *
      item.qty,
    0
  );
  const deliveryFee = 0;
  const total = mrpTotal - discount + deliveryFee;

  useEffect(() => {
    const storedUser = localStorage.getItem("USER");
    console.log(storedUser);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user != null) {
          setUserData(Object.values(user)[0]);
        }
      } catch (e) {
        localStorage.removeItem("USER");
      }
    }
  }, []);

  const btnMessage = userData == null ? "Sign In" : "Make Payment";

  const handleOpenAddAddress = () => {
    setDrawerStatus(false);
    setAddAddressDrawerStatus(true);
  };

  const handleCloseAddAddress = () => {
    setAddAddressDrawerStatus(false);
    setDrawerStatus(true);
  };

  const handleMakePayment = () => {
    if (userData == null) {
      router.push("/signin?from=MP");
    } else {
      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();
    }
    setCurrentStep(2); // Move to Payment step
  };

  const options = {
    key: "rzp_test_S4YgFZOAftxXG8",
    amount: total * 100, // Amount in paise
    currency: "INR",
    name: "Hunger Buddy",
    description: "Test Transaction",
    order_id: "", // Generate order_id on server
    handler: async (response) => {
      //console.log(response);
      await postData("order/submit_order", { paymentid: response.razorpay_payment_id, orderdate: new Date(), delivery_status: "Not Delivered", payment_type: "None" }).then(async (res) => {
        await postData("order/submit_order_detail", { orderid: res.orderid, enrollmentno: userData.enrollmentno, emailid: userData.emailid, mobileno: userData.mobileno, data: products })
      })
      dispatch({ type: "EMPTY_CART" })
      router.push("/homepage")
    },
    prefill: {
      name: userData?.studentname,
      email: userData?.emailid,
      contact: userData?.mobileno,
    },
    theme: {
      color: "#F37254",
    },
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
                {userData != null ? (
                  <ShowAddress
                    drawerStatus={drawerStatus}
                    setDrawerStatus={setDrawerStatus}
                    address={userData}
                  />
                ) : (
                  <></>
                )}
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
                    {btnMessage}
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
