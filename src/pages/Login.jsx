import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import logo from "../assets/fetch-logo.svg";
import background from "../assets/login-bg.jpeg";
import auth from "../utils/authorization";

export default function Login() {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({ email: "", name: "" });
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const user = auth.getUser();
    if (user) {
      navigate("/dogs");
    }
  }, [navigate]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setError(false);
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const nameValidator = (e) => {
    if (e.target.value.trim() == "") {
      setError(true);
      setErrMsg("Name field is empty");
    }
  };

  const emailValidator = (e) => {
    if (
      !e.target.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/)
    ) {
      setError(true);
      setErrMsg("Email not valid");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (error) {
      setErrMsg("Some of the the fields are incomplete");
      return;
    }
    try {
      console.log(`${import.meta.env.VITE_BASE_URL}`);
      await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(formState),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      auth.onLogin(formState);
      navigate("/dogs");
    } catch (err) {
      console.log(err);
      setErrMsg(err.message);
    }
  };

  return (
    <main
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          border: ".5px solid black",
          borderRadius: "1rem",
          width: "90%",
          maxWidth: "600px",
          margin: "0 auto",
          padding: "2rem",
          backgroundColor: "rgba(240, 234, 214, .9)",
        }}
      >
        <img
          src={logo}
          alt="Fetch"
          style={{
            width: "200px",
            marginTop: "1rem",
            marginBottom: "2rem",
          }}
        />
        <h1
          style={{
            color: "rgb(0, 0, 128)",
            margin: "3rem",
            fontSize: "2.5rem",
          }}
        >
          Fetch Your Best Friend
        </h1>
        <form
          onSubmit={submitHandler}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <div style={{ width: "100%", marginBottom: "1.5rem" }}>
            <label
              style={{
                color: "rgb(0, 0, 128)",
                display: "block",
                textAlign: "left",
                marginBottom: "0.5rem",
                fontSize: "1rem",
                fontWeight: "500",
              }}
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formState.name}
              onChange={inputChangeHandler}
              onBlur={nameValidator}
              style={{
                fontSize: "1rem",
                padding: "0.75rem",
                width: "100%",
                borderRadius: "0.5rem",
                border: "1px solid #ccc",
                backgroundColor: "white",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ width: "100%", marginBottom: "1.5rem" }}>
            <label
              style={{
                color: "rgb(0, 0, 128)",
                display: "block",
                textAlign: "left",
                marginBottom: "0.5rem",
                fontSize: "1rem",
                fontWeight: "500",
              }}
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formState.email}
              onChange={inputChangeHandler}
              onBlur={emailValidator}
              style={{
                fontSize: "1rem",
                padding: "0.75rem",
                width: "100%",
                borderRadius: "0.5rem",
                border: "1px solid #ccc",
                backgroundColor: "white",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            style={{
              marginTop: "1.5rem",
              backgroundColor: "rgb(0, 0, 128)",
              color: "rgb(240, 234, 214)",
              fontWeight: "bold",
              padding: "0.75rem 2rem",
              cursor: "pointer",
              border: "none",
              borderRadius: "0.5rem",
              fontSize: "1rem",
              transition: "background-color 0.2s ease",
            }}
          >
            Login
          </button>

          {errMsg !== "" && (
            <p
              style={{
                textAlign: "center",
                color: "red",
                fontSize: "0.9rem",
                marginTop: "1rem",
                fontWeight: "500",
              }}
            >
              {errMsg}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
