"use client";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import styles from "./ProductInfoComponent.module.css";

export default function ProductInfoComponent({
  rating,
  categoryname,
  fooditemname,
  fullprice,
  offerprice,
  description,
}) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.infoContainer}>
      <div className={styles.ratingRow}>
        <Rating
          value={Number(rating) || 0}
          precision={0.5}
          readOnly
          size={matches ? "small" : "medium"}
        />
        <span
          className={styles.reviewCount}
          style={{ fontSize: matches ? 12 : 14 }}
        >
          ({rating})
        </span>
      </div>
      <div className={styles.category} style={{ fontSize: matches ? 10 : 12 }}>
        {categoryname}
      </div>
      <h1
        className={styles.productName}
        style={{ fontSize: matches ? 22 : 28 }}
      >
        {fooditemname}
      </h1>
      <div className={styles.price} style={{ fontSize: matches ? 20 : 24 }}>
        {/* <span
          className={styles.currencySymbol}
          style={{ fontSize: matches ? 16 : 20 }}
        >
          ₹
        </span>{" "} */}

        <div className={styles.fullprice}>
          {offerprice == 0 ? (
            <span style={{ fontWeight: "bold", color: "#000" }}>
              ₹{fullprice}
            </span>
          ) : (
            <>
              <span
                style={{
                  fontWeight: "bold",
                  marginRight: "2%",
                  color: "#000",
                }}
              >
                ₹{offerprice}
              </span>{" "}
              <s>₹{fullprice}</s>
            </>
          )}
        </div>
      </div>
      <div className={styles.taxNote} style={{ fontSize: matches ? 10 : 12 }}>
        Tax included. Shipping calculated at checkout.
      </div>
      <p
        className={`${styles.description} ${
          !isExpanded ? styles.clampText : ""
        }`}
        style={{ fontSize: matches ? 12 : 14 }}
      >
        {description}
      </p>
      {description && (
        <button
          className={styles.readMoreBtn}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}
