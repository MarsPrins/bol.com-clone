"use client";

import * as s from "@/styles/auth/auth.module.scss";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// add items to cart
// show items in cart
// pay with stripe ( lamaDev tut afkijken )
// crud in cart ( delete, change amount etc )

export default function login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setErrorMessage("");
      const res = await axios.post(`http://localhost:3001/api/v1/auth/login`, {
        email: e.target[0].value,
        password: e.target[1].value,
      });
      const token = res.data.accessToken;
      Cookies.set("token", token, { expires: 3 });
      window.location.href = "/";
    } catch (error) {
      setErrorMessage(error.response.data);
    }
  };

  const handlePassword = () => {
    const newType = passwordType === "password" ? "text" : "password";
    setPasswordType(newType);
  };

  return (
    <div className={s.container}>
      <div className={s.content}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            className={s.email}
            type="email"
            name="email"
            id="email"
            placeholder="Email..."
          />
          <div className={s.password}>
            <input
              type={passwordType}
              name="password"
              id="password"
              placeholder="Wachtwoord..."
            />
            <span className={s.showPassword} onClick={handlePassword}>
              {passwordType === "text" ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </span>
          </div>
          {errorMessage && <p>{errorMessage}</p>}
          <button>Login</button>
        </form>
        <p>
          Nog geen account? meld je <Link href="/nl/auth/register">hier</Link>{" "}
          aan
        </p>
      </div>
    </div>
  );
}
