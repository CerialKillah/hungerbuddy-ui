"use client";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import styles from "./AddToCartComponent.module.css";
import { useDispatch } from "react-redux";

export default function AddToCartComponent({
  fullprice,
  halfprice,
  offerprice,
  onAddToCart,
  onBuyNow,
  fooditemid,
  data,
  refresh,
  setRefresh
}) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  var dispatch = useDispatch();

  // Determine display price for "Full" option: Use offerprice if available, otherwise fullprice
  const mainPrice =
    Number(offerprice) > 0 ? Number(offerprice) : Number(fullprice);

  // Build available options
  const options = [];
  if (mainPrice > 0) options.push(mainPrice);
  if (Number(halfprice) > 0) options.push(Number(halfprice));

  const [selectedPrice, setSelectedPrice] = useState(options[0] || 0);
  const [quantity, setQuantity] = useState(data.qty);

  // Update selectedPrice when options change
  useEffect(() => {
    if (options.length > 0) {
      if (!selectedPrice || !options.includes(selectedPrice)) {
        setSelectedPrice(options[0]);
      }
    }
  }, [mainPrice, halfprice]);

  useEffect(function(){
    setQuantity(data.qty)
  },[data.qty])

  const handleInitialAdd = () => {
    setQuantity(1);
    data['qty'] = 1;
    dispatch({type:"ADD_CART",payload:[fooditemid,data]})
    setRefresh(!refresh)
    if (onAddToCart) onAddToCart({ price: selectedPrice, quantity: 1 });
  };

  const handleBuyNow = () => {
    const qty = quantity === 0 ? 1 : quantity;
    if (onBuyNow) onBuyNow({ price: selectedPrice, quantity: qty });
  };

  const handleIncrement = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    data['qty'] = newQty;
    dispatch({type:"ADD_CART",payload:[fooditemid,data]})
    setRefresh(!refresh)
    if (onAddToCart) onAddToCart({ price: selectedPrice, quantity: newQty });
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      data['qty'] = newQty;
      dispatch({type:"DELETE_CART",payload:[fooditemid,data]})
      setRefresh(!refresh)
      if (onAddToCart) onAddToCart({ price: selectedPrice, quantity: newQty });
    } else {
      setQuantity(0);
      data['qty'] = 0;
      dispatch({type:"DELETE_CART",payload:[fooditemid,data]})
      setRefresh(!refresh)
      if (onAddToCart) onAddToCart({ price: selectedPrice, quantity: 0 });
    }
  };

  return (
    <div
      className={styles.cartContainer}
      style={{ padding: matches ? 16 : 24, gap: matches ? 16 : 24 }}
    >
      <div className={styles.optionsRow}>
        <span
          className={styles.optionLabel}
          style={{ fontSize: matches ? 12 : 13 }}
        >
          Select Option
        </span>
        <div className={styles.priceOptions}>
          {options.map((price) => (
            <div
              key={price}
              onClick={() => setSelectedPrice(price)}
              className={`${styles.pricePill} ${
                selectedPrice === price ? styles.pricePillActive : ""
              }`}
            >
              ₹{price}
            </div>
          ))}
        </div>
      </div>

      <div
        className={styles.buttonsRow}
        style={{
          flexDirection: matches ? "column" : "row",
        }}
      >
        {quantity === 0 ? (
          <Button
            variant="outlined"
            onClick={handleInitialAdd}
            sx={{
              flex: 1,
              borderRadius: 50,
              height: 48,
              border: "1px solid #1db954",
              color: "#1db954",
              fontWeight: 700,
              fontSize: 14,
              textTransform: "none",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(29, 185, 84, 0.2)",
                backgroundColor: "#f8fff9",
                border: "1px solid #1db954",
              },
            }}
          >
            Add to cart
          </Button>
        ) : (
          <div className={styles.quantityParam}>
            <IconButton onClick={handleDecrement} className={styles.qtyBtn}>
              <RemoveIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <span className={styles.qtyValue}>{quantity}</span>
            <IconButton onClick={handleIncrement} className={styles.qtyBtn}>
              <AddIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </div>
        )}

        <Button
          variant="contained"
          onClick={handleBuyNow}
          sx={{
            flex: 1,
            borderRadius: 50,
            height: 48,
            bgcolor: "#1db954",
            fontWeight: 700,
            fontSize: 14,
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(29, 185, 84, 0.3)",
            "&:hover": {
              bgcolor: "#1aa34a",
              boxShadow: "0 6px 16px rgba(29, 185, 84, 0.4)",
            },
          }}
        >
          Buy it now
        </Button>
      </div>
    </div>
  );
}
