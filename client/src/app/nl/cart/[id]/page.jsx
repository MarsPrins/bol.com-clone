"use client";

import React, { useEffect, useState } from "react";
import * as s from "@/styles/payment/pay.module.scss";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import useApiUrl from "@/components/apiUrl";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

// send sizes

const KEY =
  "pk_test_51Nyr3bLq5PC0CwWa1wi3RLIRtdWzJCpVYtOF3SH76zFmWPvOUHtXHh4P6uAiB33fHZvu804Bq0hDTN69nVl1BQdZ00lXZs6bkP";

export default function Payment({ params }) {
  const userId = params.id;
  const apiUrl = useApiUrl();
  const [amount, setAmount] = useState();
  const [cartData, setCartData] = useState({});
  const [products, setProducts] = useState([]);

  const router = useRouter();

  const fetchData = async () => {
    if (userId !== "xx0vtv12") {
      const res = await axios.get(`${apiUrl}/carts/find/${userId}`, {
        headers: {
          token: Cookies.get("token"),
        },
      });
      setCartData(res.data);
      setProducts(res.data.products);
      console.log(res.data);
      setAmount(parseInt(res.data.totalPrice.replace(".", "")));
    } else if (userId === "xx0vtv12") {
      const ps = JSON.parse(localStorage.getItem("cart"));
      setProducts(ps);

      const prices = [];
      const decimals = [];

      let i = 0;
      while (i < ps.length) {
        const res = await axios
          .get(`${apiUrl}/products/find/${ps[i].productId}`)
          .then((res) => res.data);

        console.log(res);

        prices.push(Number(res.price) * Number(ps[i].quantity));
        decimals.push(Number(res.priceDecimal) * Number(ps[i].quantity));

        i++;
      }

      console.log(prices);
      console.log(decimals);

      const decimal =
        decimals.reduce(function (a, b) {
          return a + b;
        }) / 100;
      const int = prices.reduce(function (a, b) {
        return a + b;
      });

      var countDecimals = function (value) {
        if (Math.floor(value) === value) return 0;
        return value.toString().split(".")[1].length || 0;
      };

      const intAndDecimal = JSON.stringify(int + decimal);

      const fullPrice =
        countDecimals(intAndDecimal) === 0
          ? intAndDecimal + ".00"
          : countDecimals(intAndDecimal) === 1
          ? intAndDecimal + "0"
          : intAndDecimal;

      // add up the ints and decimals

      console.log("full price", Number(fullPrice.replace(".", "")));

      setAmount(Number(fullPrice.replace(".", "")));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onToken = (token) => {
    const fetchData = async () => {
      try {
        const res = await axios.post(`${apiUrl}/checkout/payment`, {
          tokenId: token.id,
          amount: amount,
        });
        console.log("data...", res.data);

        const uid = userId !== "xx0vtv12" ? cartData.userId : res.data.id;
        const orderRes = await axios.post(`${apiUrl}/orders/`, {
          userId: uid,
          products: products,
          amount: res.data.amount,
          address: res.data.billing_details.address,
          stripeRes: res.data,
        });
        console.log(orderRes.data);
        res.data.paid && console.log("paid");
        if (userId !== "xx0vtv12") {
          const deleteRes = await axios.delete(
            `${apiUrl}/carts/${cartData.userId}`,
            { headers: { token: Cookies.get("token") } }
          );
          console.log(deleteRes);
        } else {
          localStorage.removeItem("cart");
        }
        router.push(`/nl/orders/success/${cartData.userId}`);

        // delete cart
      } catch (error) {
        console.log(error);
        if (error.response.data.decline_code === "insufficient_funds") {
          console.log("insufficient funds");
        }
      }
    };
    fetchData();
  };

  // make presented amount look better with . before last 2 chars

  function insertDecimal(num) {
    return (num / 100).toFixed(2);
  }

  const amountWcommas = insertDecimal(Number(amount));

  return (
    <StripeCheckout
      name="bol.com"
      image="https://pers.bol.com/content/uploads/2020/10/bol_logo_blue_rgb-scaled.jpg"
      billingAddress
      shippingAddress
      description={`Your total is €${amountWcommas}`}
      amount={amount}
      token={onToken}
      stripeKey={KEY}
    >
      <button className={s.button}>Pay Now</button>
    </StripeCheckout>
  );
}
