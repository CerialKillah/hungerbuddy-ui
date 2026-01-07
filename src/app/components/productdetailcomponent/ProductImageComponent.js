"use client";
import { useState, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styles from "./ProductImageComponent.module.css";

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

export default function ProductImageComponent({
  data,
  pictures,
  productName = "Product",
  bgColor, // Accept bgColor as prop
}) {
  const images = [
    data?.picture,
    ...(pictures?.picture ? pictures.picture.split(",") : []),
  ].filter(Boolean);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const handleImageClick = (index) => {
    setCurrentSlide(index);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handlePrevious = () => sliderRef.current?.slickPrev();
  const handleNext = () => sliderRef.current?.slickNext();

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

  const modalSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    cssEase: "linear",
    initialSlide: currentSlide,
    beforeChange: (_, newIndex) => setCurrentSlide(newIndex),
  };

  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

  if (images.length === 0) return null;

  const getImageSrc = (img) => {
    if (!img) return "";
    if (img.startsWith("/") || img.startsWith("http")) return img;
    return `${serverURL}/images/${img}`;
  };

  return (
    <div className={styles.imageContainer}>
      {matches ? (
        <div className={styles.mobileCarousel}>
          <Slider {...mobileSettings} ref={sliderRef}>
            {images.map((item, index) => (
              <div key={index} onClick={() => handleImageClick(index)}>
                <img
                  src={getImageSrc(item)}
                  alt=""
                  className={styles.mobileImage}
                  style={{ backgroundColor: bgColor }}
                />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div>
          <img
            src={getImageSrc(images[0])}
            alt=""
            className={styles.mainImage}
            onClick={() => handleImageClick(0)}
            style={{ backgroundColor: bgColor, cursor: "pointer" }}
          />
          <div
            className={styles.thumbnailRow}
            style={{ justifyContent: "flex-start" }}
          >
            {images.slice(1).map((item, index) => (
              <img
                key={index}
                src={getImageSrc(item)}
                alt=""
                onClick={() => handleImageClick(index + 1)}
                className={styles.thumbnail}
                style={{
                  backgroundColor: bgColor,
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "& .MuiBackdrop-root": { backgroundColor: "rgba(255,255,255,0.95)" },
        }}
      >
        <div className={styles.modalContent}>
          <div
            className={
              matches ? styles.slideCounterMobile : styles.slideCounter
            }
          >
            {currentSlide + 1}/{images.length}
          </div>

          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 20,
              right: matches ? 10 : 30,
              bgcolor: "#1db954",
              color: "white",
              "&:hover": { bgcolor: "#18a34a" },
              width: matches ? 36 : 44,
              height: matches ? 36 : 44,
            }}
          >
            <CloseIcon sx={{ fontSize: matches ? 20 : 24 }} />
          </IconButton>

          <IconButton
            onClick={handlePrevious}
            sx={{
              position: "absolute",
              left: matches ? 10 : 30,
              top: "50%",
              bgcolor: "#ffe500",
              color: "#333",
              "&:hover": { bgcolor: "#ffd700" },
              width: matches ? 40 : 48,
              height: matches ? 40 : 48,
              zIndex: 10,
            }}
          >
            <ChevronLeftIcon sx={{ fontSize: matches ? 24 : 32 }} />
          </IconButton>

          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: matches ? 10 : 30,
              top: "50%",
              bgcolor: "#ffe500",
              color: "#333",
              "&:hover": { bgcolor: "#ffd700" },
              width: matches ? 40 : 48,
              height: matches ? 40 : 48,
              zIndex: 10,
            }}
          >
            <ChevronRightIcon sx={{ fontSize: matches ? 24 : 32 }} />
          </IconButton>

          <div
            className={
              matches ? styles.sliderWrapperMobile : styles.sliderWrapper
            }
          >
            <Slider key={currentSlide} ref={sliderRef} {...modalSettings}>
              {images.map((image, index) => (
                <div key={index}>
                  <div className={styles.slideItem}>
                    <img
                      src={getImageSrc(image)}
                      alt={`Product ${index + 1}`}
                      className={styles.modalImage}
                      style={{ maxHeight: matches ? "50vh" : "60vh" }}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          <div
            className={matches ? styles.productNameMobile : styles.productName}
          >
            {productName}
          </div>
        </div>
      </Modal>
    </div>
  );
}
