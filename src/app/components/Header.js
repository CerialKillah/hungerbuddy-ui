"use client";
import CategoryComponent from "./CategoryComponent";
import styles from "./Header.module.css";
import SearchBar from "./SearchBar";
import User from "./User";
import { getData } from "../../../services/fetchNodeService";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Header({ dataref, foodList, setFoodList }) {
  const [categorylist, setCategoryList] = useState([]);
  var cart = useSelector((state) => state.cart);
  var totalItems = Object.keys(cart);
  var total = totalItems?.length;

  const fetchAllCategory = async () => {
    var response = await getData("users/fetch_all_category");
    setCategoryList(response.data);
  };
  //  (useEffect)HOOK== IT IS USE TO RENDER THE COMPONENET WHEN STATE GETS CHANGE//
  useEffect(function () {
    fetchAllCategory();
  }, []);

  return (
    <div className={styles.maincontainer}>
      <div className={styles.stylebar}>
        <div className={styles.styletext}>
          <div className={styles.styleone}>HungerBuddy in</div>

          <div className={styles.styletwo}>20 minutes</div>
          <div>
            <span className={styles.stylethree}>Home</span> -{" "}
            <span className={styles.stylename}>Jackie Thomas</span>
          </div>
        </div>
        <User totalItems={total}/>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <SearchBar />
      </div>

      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <CategoryComponent data={categorylist} dataref={dataref} foodList={foodList} setFoodList={setFoodList} />
      </div>
    </div>
  );
}
