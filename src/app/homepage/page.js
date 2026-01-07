"use client";

import { useSearchParams } from "next/navigation";
import { postData, getData } from "../../../services/fetchNodeService";
import AdvertisementComponent from "../components/AdvertisementComponent";
import DrinksComponent from "../components/DrinksComponent";
import FoodItemCard from "../components/FoodItemCard";
import FooterComponent from "../components/FooterComponent";
import Header from "../components/Header";
import SnacksComponent from "../components/SnacksComponent";
import { useState, useEffect, useRef } from "react";

export default function HomePage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const [snacksList, setSnacksList] = useState([]);
  const [drinkList, setDrinkList] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [hasScrolled, setHasScrolled] = useState(false);
  const aboutRef = useRef();

  const fetchAllFood = async (cn) => {
    var response = await postData("users/fetch_all_fooditems_by_category", {
      categoryname: cn,
    });
    if (cn == "Snacks") setSnacksList(response.data);
    else if (cn == "Drinks") setDrinkList(response.data);
  };

  const fetchAllFoodItems = async () => {
    var response = await getData("users/fetch_all_fooditems");
    setFoodList(response.data)
  };

  const fetchAllFoodByCategoryId = async (cid) => {
    var response = await postData("users/fetch_all_fooditems_by_category_id", {
      categoryid: cid,
    });
    setFoodList(response.data);
  };

  useEffect(function () {
    fetchAllFood("Snacks");
    fetchAllFood("Drinks");

    if (categoryId) {
      fetchAllFoodByCategoryId(categoryId);
    } else {
      fetchAllFoodItems();
    }
  }, [categoryId]);

  // Scroll to top immediately on mount
  useEffect(function () {
    window.scrollTo(0, 0);
  }, []);

  // Scroll to food section only when categoryId is present and data has loaded
  useEffect(function () {
    if (categoryId && foodList.length > 0 && !hasScrolled && aboutRef.current) {
      setHasScrolled(true);
      setTimeout(() => {
        aboutRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [categoryId, foodList.length, hasScrolled]);
  return (
    <div>
      <div>
        <Header dataref={aboutRef} foodList={foodList} setFoodList={setFoodList} />
      </div>

      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <SnacksComponent data={snacksList} />
      </div>

      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <DrinksComponent data={drinkList} />
      </div>

      <div ref={aboutRef}>
        <FoodItemCard data={foodList} />
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <AdvertisementComponent />
      </div>
      <FooterComponent />
    </div>
  );
}
