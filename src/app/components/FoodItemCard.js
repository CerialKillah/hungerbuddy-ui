"use client";
import Image from "next/image";
import styles from "./FoodItemCard.module.css";
import { useRouter } from "next/navigation";

export default function FoodItemCard({ data }) {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? "";
  var myColor = [
    "#FCF8F8",
    "#EDFFF0",
    "#FFF8DE",
    "#F9F8F6",
    "#DDF6D2",
    "#FDFFB8",
    "#F1E7E7",
    "#A8F1FF",
    "#FBF3D5",
  ];
  var navigate = useRouter();

  const showFood = () => {
    return data.map((item) => {
      var percent = ((item.fullprice - item.offerprice) / item.fullprice) * 100;

      return (
        <div
          key={item.fooditemid}
          className={styles.card}
          onClick={() => navigate.push(`/productinterface/${item.fooditemid}`)}
        >
          <div
            className={styles.imageContainer}
            style={{ background: `${myColor[parseInt(Math.random() * 9)]}` }}
          >
            <div className={styles.imageStyle}>
              <img
                src={`${serverUrl}/images/${item.picture}`}
                alt=""
                style={{ width: "100%", height: "100" }}
              />
            </div>
            <div className={styles.discountBadge}>
              {item.offerprice == 0 ? (
                <></>
              ) : (
                <>
                  {percent.toFixed(0)}% OFF UPTO ₹
                  {item.fullprice - item.offerprice}
                </>
              )}
            </div>
          </div>

          <div className={styles.content}>
            <h3 className={styles.name}>
              {item.fooditemtype == "Veg" ? (
                <img src={`${serverUrl}/images/veg.png`} width="16" />
              ) : (
                <img src={`${serverUrl}/images/nonveg.png`} width="16" />
              )}{" "}
              <span style={{ marginLeft: "2%" }}> {item.fooditemname}</span>
              <span style={{ marginLeft: "4%" }}>
                {item.fooditemtaste == "Spicy" ? (
                  <img src={`${serverUrl}/images/spicy.png`} width={16} />
                ) : (
                  <></>
                )}
              </span>{" "}
            </h3>

            <div className={styles.ratingContainer}>
              <img
                src={`${serverUrl}/images/star.png`}
                alt=""
                width={20}
                height={20}
              />
              <span className={styles.rating}>
                {item.rating ? Number(item.rating).toFixed(1) : "N/A"}
              </span>
              <span className={styles.separator}>•</span>
              <span className={styles.deliveryTime}>30-35 mins</span>
            </div>
            <p className={styles.location}>
              {item.offerprice == 0 ? (
                <span style={{ fontWeight: "bold", color: "#000" }}>
                  ₹{item.fullprice}
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
                    ₹{item.offerprice}
                  </span>{" "}
                  <s>₹{item.fullprice}</s>
                </>
              )}
            </p>

            <p className={styles.cuisine}>North Indian</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div style={{ width: "100%", marginTop: 40 }}>
      <div
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 10,
          marginLeft: "6%",
        }}
      >
        Today's Menu
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {showFood()}
      </div>
    </div>
  );
}
