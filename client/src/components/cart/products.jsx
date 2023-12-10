"use client";

import Cookies from "js-cookie";
import useApiUrl from "../apiUrl";
import parseJwt from "../parseJWT";
import CartProduct from "./CartProduct";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading";
import * as s from "@/styles/cart/products.module.scss";
import { useRouter } from "next/navigation";

export default function Products({ onDelete }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartData, setCartData] = useState();
  const [productArray, setProductArray] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalPrice, setTotalPrice] = useState(null);
  const [totalPriceShipping, setTotalPriceShipping] = useState(null);
  const [loggedIn, setLoggedIn] = useState(Boolean);
  const [isCart, setIsCart] = useState(Boolean);

  const [shippingCost, setShippingCost] = useState(4.95);
  const [minShippingPrice, setMinShippingPrice] = useState(77);

  const apiUrl = useApiUrl();

  const token = Cookies.get("token");
  const userId = parseJwt(token).id;

  const router = useRouter();

  const fetchCart = async () => {
    if (!userId) {
      if (
        JSON.parse(localStorage.getItem("cart")) &&
        JSON.parse(localStorage.getItem("cart")).length > 0
      ) {
        console.log("not logged in");
        setCartItems(JSON.parse(localStorage.getItem("cart")));
        setCartData(JSON.parse(localStorage.getItem("cart")));
        console.log(JSON.parse(localStorage.getItem("cart")));
        setLoggedIn(false);
        setIsCart(true);
      } else {
        setIsCart(false);
        setIsLoaded(true);
      }
    } else {
      const cartData = await fetch(`${apiUrl}/carts/find/${userId}`, {
        headers: {
          token: token,
        },
      }).then((res) => res.json());
      console.log(cartData);
      setLoggedIn(true);
      if (cartData) {
        if (cartData.products.length > 0) {
          setCartItems(cartData.products);
          setCartData(cartData);
          setIsCart(true);
        } else {
          setIsCart(false);
          setIsLoaded(true);
        }
      } else {
        setIsCart(false);
        setIsLoaded(true);
      }
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const prices = [];
  const pricesDecimals = [];

  const fetchProducts = async () => {
    let i = 0;
    while (i < cartItems.length) {
      const productId = cartItems[i].productId;
      const productRes = await axios.get(
        `${apiUrl}/products/find/${productId}`
      );
      if (productRes.data !== null) {
        const productData = await productRes.data;
        const quantity = cartItems[i].quantity;
        productData.quantity = quantity;
        productData.userId = userId;
        productArray.push(productData);
        const price = productData.price * productData.quantity;
        const priceDecimal = productData.priceDecimal * productData.quantity;
        prices.push(price);
        pricesDecimals.push(priceDecimal);
      } else {
        const newProducts = cartItems.filter(
          (item) => item.productId !== productId
        );

        const data = {
          userId: userId,
          products: [...newProducts],
        };

        const res = await axios.put(`${apiUrl}/carts/${userId}`, data, {
          headers: {
            token: Cookies.get("token"),
          },
        });
        console.log(res.data);
      }
      //   console.log("quantity:", productData, cartItems[i].quantity);
      i++;
    }
    i === cartItems.length ? setIsLoaded(true) : null;

    if (prices.length === productArray.length) {
      const decimals =
        pricesDecimals.reduce(function (a, b) {
          return a + b;
        }) / 100;
      const int = prices.reduce(function (a, b) {
        return a + b;
      });

      var countDecimals = function (value) {
        if (Math.floor(value) === value) return 0;
        return value.toString().split(".")[1].length || 0;
      };

      const intAndDecimal = int + decimals;
      const intAndDecimalWShipping =
        intAndDecimal < minShippingPrice ? intAndDecimal + shippingCost : false;

      const totalPrice =
        countDecimals(intAndDecimal) === 0
          ? intAndDecimal + ".00"
          : countDecimals(intAndDecimal) === 1
          ? intAndDecimal + "0"
          : intAndDecimal;

      const totalPriceWShipping =
        intAndDecimalWShipping !== false
          ? countDecimals(intAndDecimalWShipping) === 0
            ? intAndDecimalWShipping + ".00"
            : countDecimals(intAndDecimalWShipping) === 1
            ? intAndDecimalWShipping + "0"
            : countDecimals(intAndDecimalWShipping) >= 2 &&
              (Math.round(intAndDecimalWShipping * 100) / 100).toFixed(2)
          : totalPrice;

      setTotalPrice(totalPrice);
      setTotalPriceShipping(totalPriceWShipping);

      if (loggedIn) {
        const data = {
          ...cartData,
          totalPrice: totalPriceWShipping,
        };
        const setTotalRes = await axios.put(`${apiUrl}/carts/${userId}`, data, {
          headers: {
            token: token,
          },
        });
        console.log(setTotalRes.data);
      }
    }
  };
  if (productArray.length < cartItems.length && isCart) {
    fetchProducts();
  }

  const handlePayment = () => {
    router.push(`/nl/cart/${userId ? userId : "xx0vtv12"}`);
  };

  return isLoaded ? (
    isCart ? (
      <section className={s.container}>
        <div className={s.content}>
          <ul className={s.products}>
            {productArray.map((p, i) => (
              <li key={i}>
                <CartProduct
                  cartData={cartItems}
                  product={p}
                  onDelete={onDelete}
                  loggedIn={loggedIn}
                />
              </li>
            ))}
          </ul>
          <ul className={s.paymentInfo}>
            <div className={s.padding}>
              <h2>Overzicht</h2>
              <li className={s.prices}>
                <ul>
                  <li>
                    <div>
                      Artikelen <small>({cartItems.length})</small>
                    </div>
                    <div>€{totalPrice}</div>
                  </li>
                  <li>
                    <div className={s.together}>
                      <div>Verzendkosten</div>
                      <small>gratis boven €{minShippingPrice},00</small>
                    </div>
                    <div
                      className={
                        totalPrice === totalPriceShipping ? s.free : undefined
                      }
                    >
                      €
                      {totalPrice === totalPriceShipping
                        ? "0.00"
                        : shippingCost}
                    </div>
                  </li>
                </ul>
              </li>
            </div>
            <li className={s.price}>
              <div>Nog te betalen:</div>
              <div>€{totalPriceShipping}</div>
            </li>
            <div className={s.padding}>
              <li className={s.cta}>
                <button onClick={handlePayment}>Verder naar bestellen</button>
              </li>
            </div>
          </ul>
        </div>
      </section>
    ) : (
      <span>Je winkelwagentje is nog leeg</span>
    )
  ) : (
    <section className={s.container}>
      <div className={s.content}>
        <ul>
          <Loading height="500px" />
        </ul>
        <ul>
          <Loading height="370px" />
        </ul>
      </div>
    </section>
  );
}
