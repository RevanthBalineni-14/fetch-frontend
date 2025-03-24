import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import auth from "../utils/authorization";
import MenuBar from "./MenuBar";

export default function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const currUser = auth.getUser();
    console.log("currUser: ", currUser);
    // If the user is not authenticated, navigate to the login page
    if (!currUser) {
      navigate("/");
    }
  }, [navigate]); // Added navigate to dependency array to avoid React warning

  return (
    <div
      style={{
        backgroundColor: "#F5F3E7",
        minHeight: "100vh",
        width: "100%",
        margin: 0,
        padding: 0,
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        top: 0,
        left: 0,
      }}
    >
      <MenuBar />
      <Outlet />
    </div>
  );
}
