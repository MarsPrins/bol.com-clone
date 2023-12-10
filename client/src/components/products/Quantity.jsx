"use client";

import * as s from "@/styles/product/quantity.module.scss";
import { useState } from "react";
import useApiUrl from "../apiUrl";
import axios from "axios";
import Cookies from "js-cookie";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Quantity(props) {
  const [quantity, setQuantity] = useState(props.product.quantity);
  const [inputOn, setInputOn] = useState(
    props.product.quantity > 10 ? true : false
  );

  console.log(props);

  const apiUrl = useApiUrl();
  const p = props.product;

  const setQuantityInDB = async (q) => {
    if (typeof props.product.userId === "undefined") {
      const cart = JSON.parse(localStorage.getItem("cart"));
      console.log(cart);

      const newCart = cart.map((item, index) => {
        if (item.productId === props.product._id) {
          return { ...item, quantity: q };
        }
        return item;
      });

      console.log(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      const token = Cookies.get("token");

      const oldProducts = props.cartData;

      function findId(item) {
        return item.productId === p._id;
      }

      const i = oldProducts.findIndex(findId);

      oldProducts[i].quantity = Number(q);

      const data = {
        userId: p.userId,
        products: oldProducts,
      };
      console.log(data);

      const res = await axios
        .put(`${apiUrl}/carts/${p.userId}`, data, {
          headers: {
            token: token,
          },
        })
        .then((res) => res.data);
      console.log(res);
    }
  };

  const handleQuantity = (e) => {
    const valueWOstr = Number(e.target.value.replace(/\D/g, ""));
    const value =
      valueWOstr > p.stock ? p.stock : valueWOstr < 1 ? 1 : valueWOstr;
    setQuantity(value);
    setQuantityInDB(value);
  };
  const handleQuantitySelect = (e) => {
    const value = e.target.value;
    if (value === "none") {
      return;
    } else {
      setQuantity(value);
      console.log(value);
      setQuantityInDB(value);
    }
    props.onInput();
  };
  const handleInputOn = () => {
    setInputOn(true);
  };

  return (
    <>
      <input
        type="text"
        min={1}
        max={p.stock}
        value={quantity}
        onChange={handleQuantity}
        className={inputOn ? s.input : s.disabled}
      />
      <div className={!inputOn ? s.dropdown : s.disabled}>
        <select value={quantity} onChange={handleQuantitySelect}>
          <option id="quantity" value={1}>
            1
          </option>
          <option id="quantity" value={2}>
            2
          </option>
          <option id="quantity" value={3}>
            3
          </option>
          <option id="quantity" value={4}>
            4
          </option>
          <option id="quantity" value={5}>
            5
          </option>
          <option id="quantity" value={6}>
            6
          </option>
          <option id="quantity" value={7}>
            7
          </option>
          <option id="quantity" value={8}>
            8
          </option>
          <option id="quantity" value={9}>
            9
          </option>
          <option id="quantity" value={10}>
            10
          </option>
          <option id="quantity" onClick={handleInputOn} value={"none"}>
            Meer...
          </option>
        </select>
        <FontAwesomeIcon icon={faChevronDown} />
      </div>
    </>
  );
}

export default Quantity;
