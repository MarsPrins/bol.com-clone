"use client";

import * as s from "@/styles/wishlist.module.scss";
import parseJwt from "@/components/parseJWT";
import useApiUrl from "@/components/apiUrl";
import BigProduct from "@/components/products/BigProduct";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../Loading";

export default function WishlistProducts({ onClick }) {
  const [productArray, setProductArray] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  const token = Cookies.get("token");

  const userId = parseJwt(token).id;

  const apiUrl = useApiUrl();

  const get = async () => {
    const res = await fetch(`${apiUrl}/users/find/${userId}`, {
      headers: { token: token },
    }).then((res) => res.json());

    const data = res.wishlist;
    //   setData(res.wishlist);

    const productArray = [];

    let i = 0;
    if (data) {
      while (i < data.length) {
        const item = await fetch(`${apiUrl}/products/find/${data[i]}`).then(
          (res) => res.json()
        );
        productArray.push(item);
        i++;
      }
      setLoaded(true);
    }
    setProductArray(productArray);
  };

  useEffect(() => {
    get();
  }, []);

  return isLoaded ? (
    userId !== undefined ? (
      productArray.length > 0 ? (
        <ul>
          {productArray.map((p, i) => (
            <li key={p._id}>
              <BigProduct onHeart={onClick} product={p} />
            </li>
          ))}
        </ul>
      ) : (
        <span>leeg</span>
      )
    ) : (
      <span>
        Oops, u moet inloggen om uw verlanglijstje te gebruiken. Klik{" "}
        <Link href={"/nl/auth/login"}>hier</Link> om in te loggen
      </span>
    )
  ) : (
    <>
      <Loading height="227px" width="100%" />
    </>
  );
}
