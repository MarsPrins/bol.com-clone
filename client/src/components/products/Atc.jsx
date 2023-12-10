"use client";

import * as s from "@/styles/product/atc.module.scss";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import useApiUrl from "../apiUrl";
import parseJwt from "../parseJWT";
import axios from "axios";
import { useEffect, useState } from "react";

function Atc(props) {
  const productId = props.productId;
  const size = props.size && props.size;

  // make sure to add quantity if already in cart

  const disabled = props.disabled ? props.disabled : false;

  const apiUrl = useApiUrl();

  const addToCart = async () => {
    const token = Cookies.get("token");

    // get user id
    const userId = parseJwt(token).id;

    // check if user has a cart
    const cartRes = await fetch(`${apiUrl}/carts/find/${userId}`, {
      headers: {
        token: token,
      },
    })
      .then((res) => res.json())
      .then((res) => (typeof res === "string" ? "not logged in" : res));

    if (cartRes === "not logged in") {
      console.log(cartRes);

      const exists = localStorage.getItem("cart");

      // get index of the object that exists

      // up the quantity by one of that index

      const data = exists
        ? JSON.parse(exists)
        : !size
        ? [{ productId: productId, quantity: 1 }]
        : [{ productId: productId, quantity: 1, size: size }];

      const itemExists =
        exists && data.find(({ productId }) => productId === props.productId);

      const index = data.indexOf(itemExists);

      index < 0
        ? exists && !size
          ? data.push({ productId: productId, quantity: 1 })
          : data.push({ productId: productId, quantity: 1, size: size })
        : (data[index].quantity = Number(data[index].quantity) + 1);

      console.log(data);

      localStorage.setItem("cart", JSON.stringify(data));
      setTimeout(function () {
        setNoti(false);
      }, 400);
    } else {
      if (cartRes === null) {
        // if not create one
        try {
          const dataWOsize = {
            userId: userId,
            products: [
              {
                productId: productId,
              },
            ],
          };
          const dataWsize = {
            userId: userId,
            products: [
              {
                productId: productId,
              },
              {
                size: size,
              },
            ],
          };
          const data = size ? dataWsize : dataWOsize;
          const res = await axios.post(`${apiUrl}/carts/`, data, {
            headers: {
              token: token,
            },
          });
          console.log(res.data);
          setTimeout(function () {}, 400);
        } catch (error) {
          console.log(error);
        }
      } else if (cartRes !== null) {
        // otherwise update the cart

        // check if already in cart

        // make sure user can add multiple of the same products with different sizes

        try {
          const productsArray = cartRes.products;
          const index = productsArray.findIndex(
            (p) => p.productId === productId
          );
          if (index >= 0) {
            console.log("already in cart");
            const token = Cookies.get("token");

            const data = {
              quantity: productsArray[index].quantity + 1,
            };

            const res = await axios.put(
              `${apiUrl}/carts/${userId}/${productId}`,
              data,
              {
                headers: {
                  token: token,
                },
              }
            );
            console.log(res.data);
          } else {
            productsArray.push({
              productId: productId,
            });

            const data = {
              userId: userId,
              products: productsArray,
            };
            const res = await axios.put(`${apiUrl}/carts/${userId}`, data, {
              headers: {
                token: token,
              },
            });
            console.log(res.data);
            setTimeout(function () {}, 400);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <button disabled={disabled} onClick={addToCart} className={s.atc}>
      {!props.text && (
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z"
          />
        </svg>
      )}
      <FontAwesomeIcon icon={faCartShopping} />
      {props.text && <span>In winkelwagen</span>}
    </button>
  );
}

export default Atc;
