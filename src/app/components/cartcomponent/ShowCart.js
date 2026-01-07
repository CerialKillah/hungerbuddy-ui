"use client";

import FlashOnIcon from "@mui/icons-material/FlashOn";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import styles from "./ShowCart.module.css";
import QuantityCounter from "./QuantityCounter";
import { usePathname } from "next/navigation";

// Minimum order amount for grocery
const MINIMUM_ORDER_AMOUNT = 99;

export default function ShowCart({ items, refresh, setRefresh }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? "";
  var path = usePathname();

  const totalItems = items.length;
  // Calculate total price using offerprice
  //const totalPrice = items.reduce((sum, item) => sum + (Number(item.offerprice) || 0),0);
  const totalPrice = items.reduce(
    (sum, item) =>
      sum +
      (Number(item.offerprice) > 0
        ? Number(item.offerprice) * item.qty
        : Number(item.fullprice) * item.qty),
    0
  );
  const isBelowMinimum = totalPrice < MINIMUM_ORDER_AMOUNT;
  const amountNeeded = MINIMUM_ORDER_AMOUNT - totalPrice;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.basketTitle}>
          Quick Basket <span className={styles.itemCount}>({totalItems})</span>
        </h2>
        <span className={styles.totalPrice}>₹{totalPrice.toFixed(2)}</span>
      </div>

      {/* Conditional Banner based on total price */}
      {isBelowMinimum ? (
        <div className={styles.warningBanner}>
          {/* No delivery banner when below minimum */}
        </div>
      ) : (
        <div className={styles.deliveryBanner}>
          <span className={styles.bannerText}>
            Yay! You get Free delivery with this Basket
          </span>
        </div>
      )}

      {/* Cart Card */}
      <div className={styles.cartCard}>
        {/* Quick Delivery Header */}
        <div className={styles.quickHeader}>
          <div className={styles.quickBadge}>
            <FlashOnIcon className={styles.flashIcon} />
            <span className={styles.quickText}>Quick</span>
          </div>
          <span className={styles.deliveryTime}>Delivery in 10 to 30 min</span>
        </div>

        {/* Minimum Order Warning - shown when below minimum */}
        {isBelowMinimum && (
          <div className={styles.minimumOrderBanner}>
            <div className={styles.minimumOrderHeader}>
              <WarningAmberIcon className={styles.warningIcon} />
              <span className={styles.minimumOrderText}>
                Minimum purchase amount is ₹{MINIMUM_ORDER_AMOUNT.toFixed(2)}
              </span>
            </div>
            <div className={styles.minimumOrderAction}>
              <div className={styles.addItemsText}>
                Add items worth ₹{amountNeeded.toFixed(2)} from Inventory to
                proceed
              </div>
              <div>
                <Button
                  variant="contained"
                  className={styles.addItemsBtn}
                  size="small"
                >
                  Add Items
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Cart Items */}
        {items.map((item, index) => {
          // Calculate savings for display
          const fullprice = Number(item.fullprice) || 0;
          const offerprice = Number(item.offerprice) || 0;
          const savings = (fullprice - offerprice) * item.qty;
          const amt = (offerprice > 0 ? offerprice : fullprice) * item.qty;

          return (
            <div key={item.fooditemid}>
              {index > 0 && <div className={styles.itemDivider} />}
              <div
                className={styles.cartItem}
                style={{ flexWrap: isSmallMobile ? "wrap" : "nowrap" }}
              >
                <div
                  className={styles.itemImage}
                  style={{
                    width: isSmallMobile ? "60px" : "100px",
                    height: isSmallMobile ? "60px" : "100px",
                  }}
                >
                  <img
                    src={`${serverUrl}/images/${item.picture}`}
                    alt={item.fooditemname}
                    className={styles.productImg}
                  />
                </div>
                <div className={styles.itemDetails}>
                  <span className={styles.itemName}>{item.fooditemname}</span>
                  <div className={styles.priceRow}>
                    {offerprice == 0 ? (
                      <div style={{ display: "flex", width: "100%" }}>
                        <div className={styles.currentPrice}>
                          ₹{fullprice.toFixed(2)}/unit
                        </div>
                        <div className={styles.totalAmount}>
                          ₹{amt.toFixed(2)}
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{ display: "flex", width: "100%", gap: "8px" }}
                      >
                        <span className={styles.currentPrice}>
                          ₹{offerprice.toFixed(2)}/unit
                        </span>
                        <span className={styles.originalPrice}>
                          ₹{fullprice.toFixed(2)}/unit
                        </span>
                        <span className={styles.totalAmount}>
                          ₹{amt.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                  {offerprice > 0 && savings > 0 && (
                    <div className={styles.quickBadge}>
                      <div className={styles.quickText}>
                        You Save ₹{savings.toFixed(2)}
                      </div>
                    </div>
                  )}
                  <span className={styles.sellerText}>
                    Sold by:{" "}
                    <span className={styles.sellerName}>HungerBuddy Foods</span>
                  </span>
                  <span className={styles.sizeText}>
                    Qty: <span className={styles.sizeValue}>{item.qty}</span>
                  </span>
                  {path == "/order-review" ? (
                    <div></div>
                  ) : (
                    <QuantityCounter
                      qty={item.qty}
                      data={item}
                      refresh={refresh}
                      setRefresh={setRefresh}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
