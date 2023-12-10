"use client";

import * as s from "@/styles/auth/auth.module.scss";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function register() {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/auth/register",
        {
          username: e.target[0].value.toLowerCase(),
          email: e.target[1].value.toLowerCase(),
          password: e.target[2].value,
        }
      );
      console.log(res.data);
      router.push("/nl/auth/login", { shallow: true });
    } catch (error) {
      setErrorMessage(error.response.data);
      console.log(error);
    }
  };

  const handleEmail = (e) => {
    const value = e.target.value.toLowerCase();
    setEmail(value);
  };

  const handlePassword = () => {
    const newType = passwordType === "password" ? "text" : "password";
    setPasswordType(newType);
  };

  return (
    <div className={s.container}>
      <div className={s.content}>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email..."
            value={email}
            onChange={handleEmail}
            className={s.email}
          />
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Full Name..."
            className={s.username}
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
          <button>Register</button>
        </form>
        <p>
          Heeft u al een account? log <Link href="/nl/auth/login">hier</Link> in
        </p>
      </div>
    </div>
  );
}
