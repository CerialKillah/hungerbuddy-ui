"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import styles from "./CarouselComponent.module.css";
import { useRouter } from "next/navigation";

const MobileNextArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      right: "5px",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 1,
      bgcolor: "rgba(255, 255, 255, 0.5)", // Semi-transparent white for better visibility on images
      color: "#333", // Dark icon
      "&:hover": { bgcolor: "rgba(255, 255, 255, 0.8)" },
      width: 30,
      height: 30,
      padding: 0,
    }}
  >
    <ChevronRightIcon sx={{ fontSize: 20 }} />
  </IconButton>
);

const MobilePrevArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      left: "5px",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 1,
      bgcolor: "rgba(255, 255, 255, 0.5)",
      color: "#333", // Dark icon
      "&:hover": { bgcolor: "rgba(255, 255, 255, 0.8)" },
      width: 30,
      height: 30,
      padding: 0,
    }}
  >
    <ChevronLeftIcon sx={{ fontSize: 20 }} />
  </IconButton>
);

export default function CarouselComponent({
  products,
  title = "Liked it? Try these!",
}) {
  const theme = useTheme();
  var navigate = useRouter();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const sliderRef = useRef();
  const [activeIndex, setActiveIndex] = useState(null);

  const handleFoodChange = (foodid) => {
    navigate.push(`/productinterface/${foodid}`);
  };

  const mobileSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <MobileNextArrow />,
    prevArrow: <MobilePrevArrow />,
  };

  if (!products || products.length === 0) {
    return null;
  }

  const settings = {
    dots: false,
    infinite: products.length > (matches ? 3 : 4),
    speed: 500,
    slidesToShow: matches
      ? Math.max(1, Math.min(3, products.length))
      : Math.max(1, Math.min(4, products.length)),
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
  };

  return (
    <div className={styles.carouselContainer}>
      <div
        className={styles.carouselTitle}
        style={{ fontSize: matches ? 14 : 16 }}
      >
        {title}
      </div>
      <div
        className={styles.carouselWrapper}
        style={{ padding: matches ? "0 30px" : "0 40px" }}
      >
        {matches ? (
          <>
            <MobileNextArrow onClick={() => sliderRef.current?.slickNext()} />
          </>
        ) : (
          <IconButton
            onClick={() => sliderRef.current?.slickPrev()}
            sx={{
              position: "absolute",
              left: 0,
              top: "35%",
              bgcolor: "#ffe500",
              color: "#333",
              width: 32,
              height: 32,
              zIndex: 10,
              "&:hover": { bgcolor: "#ffd700" },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        )}

        <Slider ref={sliderRef} {...settings}>
          {products.map((product, index) => (
            <div key={index} className={styles.sliderItem}>
              <div
                onClick={() => {
                  setActiveIndex(index);
                  handleFoodChange(product.fooditemid);
                }}
                className={`${styles.productBox} ${
                  activeIndex === index ? styles.active : ""
                }`}
              >
                <img
                  src={`${serverUrl}/images/${product.picture}`}
                  alt={product.name || `Product ${index + 1}`}
                  className={
                    matches ? styles.productImageMobile : styles.productImage
                  }
                />
              </div>
            </div>
          ))}
        </Slider>

        {matches ? (
          <>
            <MobilePrevArrow onClick={() => sliderRef.current?.slickPrev()} />
          </>
        ) : (
          <IconButton
            onClick={() => sliderRef.current?.slickNext()}
            sx={{
              position: "absolute",
              right: 0,
              top: "35%",
              bgcolor: "#ffe500",
              color: "#333",
              width: 32,
              height: 32,
              zIndex: 10,
              "&:hover": { bgcolor: "#ffd700" },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
}
