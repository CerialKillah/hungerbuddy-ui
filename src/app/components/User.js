"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "@mui/material";

export default function User({ totalItems }) {
  var navigate = useRouter();
  const [userData, setUserData] = useState("Not Login");

  useEffect(() => {
    const storedUser = localStorage.getItem("USER");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user != null) {
          setUserData(Object.values(user)[0]);
        }
      } catch (e) {
        localStorage.removeItem("USER");
      }
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        width: "auto",
      }}
    >
      <Badge badgeContent={totalItems} color="error">
        <div
          onClick={() => navigate.push("/cart")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: 20,
            background: "#000",
            cursor: "pointer",
          }}
        >
          <Image src="/images/cart.png" width={25} height={25} alt="" />
        </div>
      </Badge>

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: 20,
            background: "#000",
            cursor: "pointer",
          }}
        >
          <Image src="/images/wallet.jpg" width={25} height={25} alt="" />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 30,
            width: 45,
            height: 15,
            background: "#30336b",
            border: "0.5 solid #fff",
            borderRadius: 10,
            zIndex: 1,
          }}
        >
          <div style={{ color: "#fff", fontSize: 9, fontWeight: "bold" }}>
            &#8377;20
          </div>
        </div>
      </div>

      {userData == "Not Login" ? (
        <div
          onClick={() => navigate.push("/signin?from=HP")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: 20,
            background: "#000",
            cursor: "pointer",
          }}
        >
          <Image src="/images/user.png" width={25} height={25} alt="" />
        </div>
      ) : (
        <div>
          <Avatar sx={{ background: "orange", color: "#fff" }}>
            {userData?.studentname[0]}
          </Avatar>
        </div>
      )}
    </div>
  );
}
