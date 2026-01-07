"use client";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { postData, getData } from "../../../../services/fetchNodeService";
import styles from "./page.module.css";
import ProductImageComponent from "../../components/productdetailcomponent/ProductImageComponent";
import ProductInfoComponent from "../../components/productdetailcomponent/ProductInfoComponent";
import AddToCartComponent from "../../components/productdetailcomponent/AddToCartComponent";
import CarouselComponent from "../../components/productdetailcomponent/CarouselComponent";
import DropdownComponent from "../../components/productdetailcomponent/DropdownComponent";
import FooterComponent from "../../components/FooterComponent";
import Header from "@/app/components/Header";
import { useSelector } from "react-redux";

export default function ProductInterface() {
  var params = useParams();
  var { id } = useParams();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md")); // Changed isMobile to matches to be consistent with other files if needed, but keeping isMobile var name is fine too.
  const isMobile = matches;
  const [bgColor, setBgColor] = useState("#f5f5f5");
  const [foodItem, setFoodItem] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [pictureList, setPictureList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const aboutRef = useRef();
  var cart = useSelector((state) => state.cart);

  const fetchFoodDetails = async () => {
    var cartKeys = Object.keys(cart);
    var data = {};
    if (cartKeys.includes(id)) {
      data = cart[id];
      setFoodItem(data);
    } else {
      var response = await postData("users/fetch_all_fooditems_by_id", {
        fooditemid: id,
      });
      data = response.data[0];
      data["qty"] = 0;
      setFoodItem(data);
    }
    await fetchAllFoodByCategoryId(data?.categoryid);
  };

  const fetchAllFoodByCategoryId = async (cn) => {
    var response = await postData("users/fetch_all_fooditems_by_category_id", {
      categoryid: cn,
    });
    setCategoryList(response.data);
  };

  const fetchAllFoodPicture = async () => {
    var response = await postData("morepictures/fetch_all_morepictures", {
      fooditemid: id,
    });
    setPictureList(response.data);
  };

  useEffect(
    function () {
      fetchFoodDetails();
      fetchAllFoodPicture();
    },
    [id]
  );

  const myColors = [
    "#EF9A9A", // Red 200
    "#F48FB1", // Pink 200
    "#CE93D8", // Purple 200
    "#B39DDB", // Deep Purple 200
    "#9FA8DA", // Indigo 200
    "#90CAF9", // Blue 200
    "#81D4FA", // Light Blue 200
    "#80DEEA", // Cyan 200
    "#80CBC4", // Teal 200
    "#A5D6A7", // Green 200
    "#C5E1A5", // Light Green 200
    "#E6EE9C", // Lime 200
    "#FFF59D", // Yellow 200
    "#FFE082", // Amber 200
    "#FFCC80", // Orange 200
    "#FFAB91", // Deep Orange 200
    "#BCAAA4", // Brown 200
    "#EEEEEE", // Grey 200
    "#B0BEC5", // Blue Grey 200
    "#E1BEE7", // Purple 100
  ];

  useEffect(() => {
    setBgColor(myColors[Math.floor(Math.random() * myColors.length)]);
  }, []);

  const productData = {
    images: ["/images/red.png", "/images/blue.webp", "/images/green.webp"],
    rating: 4.5,
    reviewCount: 3,
    category: "WAFERS",
    productName: "Crunchem - Masala Masti",
    price: 40,
    description:
      "Get ready to binge on the snack that's got everyone hooked. Bold desi spices, a kick of heat, and a crispy crunch that'll make you go 'just one more!'",
    weights: ["48g", "145g"],
    ingredients:
      "Potato (87%), Edible Vegetable Oil (Palmolein), Sugar, Spices & Condiments 1% (Chilli, Dry Mango, Coriander, Cumin, Black Pepper, Ginger, Clove), Edible Common Salt, Black Salt",
  };

  const handleAddToCart = (data) => console.log("Add to cart:", data);
  const handleBuyNow = (data) => console.log("Buy now:", data);

  return (
    <>
      <div>
        <div>
          <Header dataref={aboutRef} />
        </div>
        <div
          className={`${styles.pageContainer} ${
            isMobile ? styles.pageContainerMobile : ""
          }`}
          style={{ backgroundColor: bgColor }}
        >
          <div
            className={`${styles.productWrapper} ${
              isMobile ? styles.productWrapperMobile : ""
            }`}
          >
            <div className={styles.leftColumn}>
              <ProductImageComponent
                data={foodItem}
                pictures={pictureList}
                productName={foodItem?.fooditemname}
                bgColor={bgColor}
              />
            </div>
            <div className={styles.rightColumn}>
              <ProductInfoComponent
                rating={foodItem?.rating}
                categoryname={foodItem?.categoryname}
                fooditemname={foodItem?.fooditemname}
                fullprice={foodItem?.fullprice}
                description={foodItem?.description}
                offerprice={foodItem?.offerprice}
              />
              <AddToCartComponent
                data={foodItem}
                fullprice={foodItem?.fullprice}
                halfprice={foodItem?.halfprice}
                offerprice={foodItem?.offerprice}
                fooditemid={foodItem?.fooditemid}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                refresh={refresh}
                setRefresh={setRefresh}
              />
              <CarouselComponent
                products={categoryList}
                title="Liked it? Try these!"
              />
              <DropdownComponent ingredients={foodItem?.ingredients} />
            </div>
          </div>
        </div>
        <FooterComponent />
      </div>
    </>
  );
}
