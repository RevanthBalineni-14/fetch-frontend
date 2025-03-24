import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import auth from "../utils/authorization";
import MenuBar from "./MenuBar";

export default function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    const currUser = auth.getUser();
    console.log("currUser: ", currUser);
    if (!currUser) {
      navigate("/");
    }
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#F5F3E7",
        minHeight: "100vh",
        width: "100%",
        margin: 0,
        padding: 0,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
      }}
    >
      <MenuBar />
      <Outlet />
    </div>
  );
}
