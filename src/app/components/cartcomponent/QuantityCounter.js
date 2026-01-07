import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "./QuantityCounter.module.css";
import { useDispatch } from "react-redux";

export default function QuantityCounter({ data, qty, refresh, setRefresh }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(qty);

  useEffect(() => {
    setQuantity(qty);
  }, [qty]);

  const handleIncrement = () => {
    const q = quantity + 1;
    const newData = { ...data, qty: q };
    setQuantity(q);
    dispatch({ type: "ADD_CART", payload: [data.fooditemid, newData] });
    setRefresh(!refresh)
  };

  const handleDecrement = () => {
    if (quantity === 1) {
      dispatch({ type: "DELETE_CART", payload: [data.fooditemid, data] });
    } else {
      const q = quantity - 1;
      const newData = { ...data, qty: q };
      setQuantity(q);
      dispatch({ type: "ADD_CART", payload: [data.fooditemid, newData] });
    }
    setRefresh(!refresh)
  };

  return (
    <div className={styles.counterSection}>
      <div className={styles.counterBtn} onClick={handleDecrement}>
        <RemoveIcon style={{ fontSize: 16 }} />
      </div>
      <span className={styles.counterValue}>{quantity}</span>
      <div className={styles.counterBtn} onClick={handleIncrement}>
        <AddIcon style={{ fontSize: 16 }} />
      </div>
    </div>
  );
}
