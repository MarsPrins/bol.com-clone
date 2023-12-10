"use client";

import * as s from "@/styles/cart/cartProduct.module.scss";
import { useEffect, useState } from "react";
import Price from "../products/Price";
import Heart from "../products/Heart";
import Quantity from "../products/Quantity";
import Delete from "../products/Delete";
import axios from "axios";
import useApiUrl from "../apiUrl";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import RatingComp from "../products/Rating";
import Stock from "../products/Stock";

export default function CartProduct(props) {
  const p = props.product;
  const c = props.cartData;
  const hearted = false;

  const apiUrl = useApiUrl();
  const router = useRouter();

  const handleDelete = async () => {
    const newProducts = c.filter((item) => item.productId !== p._id);

    console.log(c);
    console.log(newProducts);

    if (!props.loggedIn) {
      localStorage.setItem("cart", JSON.stringify(newProducts));
    } else {
      const data = {
        userId: p.userId,
        products: [...newProducts],
      };

      const res = await axios.put(`${apiUrl}/carts/${p.userId}`, data, {
        headers: {
          token: Cookies.get("token"),
        },
      });
      console.log(res.data);
    }

    props.onDelete();

    // make a onclick function through props that when cart is deleted
    // the cart items get reloaded
  };

  return (
    <div className={s.container}>
      <div className={s.content}>
        <div className={s.thumbnail}>
          <img src={p.thumbnail} alt="" />
        </div>
        <div className={s.away}>
          <div className={s.info}>
            <div className={s.mainInfo}>
              <span className={s.brand}>{p.brand} </span>
              <span className={s.title}>{p.title} </span>
              <span className={s.rating}>
                <span className={s.starRating}>
                  <RatingComp rating={p.starRating} />
                </span>
                <span>({p.reviewsAmnt})</span>
              </span>
            </div>
            <div className={s.other}>
              <div className={s.crud}>
                <Quantity
                  cartData={c}
                  onInput={() => {
                    props.onDelete();
                  }}
                  product={p}
                />
                <div className={s.heart}>
                  <Heart product={p} />
                </div>
                <Delete onClick={handleDelete} />
              </div>
              <div className={s.stock}>
                <Stock inStock={p.stock > 0 ? true : false} />
              </div>
            </div>
          </div>
          <div className={s.price}>
            <Price
              price={p.onSale ? p.onSale.newPrice : p.price}
              priceDecimal={p.priceDecimal}
              onSale={p.onSale ? true : false}
              percentage={p.onSale ? p.onSale.percent : false}
              oldPrice={p.onSale ? p.price : false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
