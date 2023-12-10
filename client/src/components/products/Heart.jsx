"use client";

import * as s from "@/styles/product/heart.module.scss";
import axios from "axios";
import useApiUrl from "../apiUrl";
import Cookies from "js-cookie";
import parseJwt from "../parseJWT";
import { useEffect, useState } from "react";

function Heart(props) {
  const p = props.product;
  const [hearted, setHearted] = useState(false);
  const [user, setUser] = useState();

  const round = props.round;

  const apiUrl = useApiUrl();

  const token = Cookies.get("token");

  const userId = parseJwt(token).id;

  useEffect(() => {
    const fetch = async () => {
      const res = await axios
        .get(`${apiUrl}/users/find/${userId}`, { headers: { token: token } })
        .then((res) => res.data);

      setUser(res);

      const included = res.wishlist.includes(p._id);

      setHearted(included ? true : false);
    };
    if (userId) {
      fetch();
    }
  }, []);

  // add product to wishlist
  const handleAdd = async () => {
    const res = await axios
      .get(`${apiUrl}/users/find/${userId}`, { headers: { token: token } })
      .then((res) => res.data);

    const included = res.wishlist.includes(p._id);

    console.log(included);

    if (!included) {
      const res = await axios
        .get(`${apiUrl}/users/find/${userId}`, { headers: { token: token } })
        .then((res) => res.data);

      setHearted(true);

      const newWishlist = [...res.wishlist, p._id];

      delete res.wishlist;

      const data = {
        ...res,
        wishlist: newWishlist,
      };

      const putRes = await axios.put(`${apiUrl}/users/${userId}`, data, {
        headers: { token: token },
      });

      setUser(putRes.data);

      props.onClick && props.onClick();
    } else {
      setHearted(true);
    }
  };

  const handleDelete = async () => {
    const res = await axios
      .get(`${apiUrl}/users/find/${userId}`, { headers: { token: token } })
      .then((res) => res.data);

    setHearted(false);

    const newWishlist = res.wishlist.filter(function (item) {
      return item !== p._id;
    });

    const data = {
      ...res,
      wishlist: newWishlist,
    };

    const putRes = await axios.put(`${apiUrl}/users/${userId}`, data, {
      headers: { token: token },
    });

    setUser(putRes.data);

    props.onClick && props.onClick();
  };

  const handleClick = (e) => {
    if (userId) {
      hearted ? handleDelete() : handleAdd();
    } else {
      alert("not logged in");
    }
  };

  // get products from wishlist based on user

  // crud products on wishlist

  return (
    <div
      onClick={handleClick}
      role="button"
      className={round ? `${s.round} ${s.heart}` : s.heart}
    >
      {hearted ? (
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M16.949 2C16.0952 2 15.2499 2.16821 14.4611 2.49501C13.6724 2.82182 12.9558 3.30082 12.3523 3.90464L11.9997 4.25721L11.647 3.90448C10.4279 2.6854 8.77449 2.00053 7.05046 2.00053C5.32643 2.00053 3.67301 2.6854 2.45393 3.90448C1.23486 5.12355 0.549988 6.77697 0.549988 8.50101C0.549988 10.3536 1.73993 12.103 2.84258 13.2057L11.3413 21.7044C11.5289 21.892 11.7832 21.9973 12.0484 21.9973C12.3136 21.9973 12.568 21.892 12.7555 21.7044L21.2543 13.2057C21.5108 12.9493 21.8404 12.6157 22.1441 12.2526C22.4407 11.8981 22.7593 11.4612 22.955 10.9888C23.2818 10.2001 23.45 9.35475 23.45 8.50101C23.45 7.64726 23.2818 6.80189 22.955 6.01317C22.6282 5.2246 22.149 4.50779 21.5453 3.90431C20.9419 3.30064 20.2254 2.82176 19.4368 2.49501C18.6481 2.16821 17.8027 2 16.949 2Z"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M14.4612 2.49501C15.2499 2.16821 16.0953 2 16.949 2C17.8027 2 18.6481 2.16821 19.4368 2.49501C20.2254 2.82176 20.9419 3.30064 21.5454 3.90431C22.149 4.50779 22.6282 5.2246 22.955 6.01317C23.2818 6.80189 23.45 7.64726 23.45 8.50101C23.45 9.35475 23.2818 10.2001 22.955 10.9888C22.7593 11.4612 22.4407 11.8981 22.1441 12.2526C21.8405 12.6157 21.5108 12.9493 21.2543 13.2057C21.2542 13.2057 21.2543 13.2056 21.2543 13.2057L12.7555 21.7044C12.568 21.892 12.3137 21.9973 12.0484 21.9973C11.7832 21.9973 11.5289 21.892 11.3413 21.7044L2.8426 13.2057C1.73995 12.103 0.550003 10.3536 0.550003 8.50101C0.550003 6.77697 1.23487 5.12355 2.45395 3.90448C3.67302 2.6854 5.32644 2.00053 7.05047 2.00053C8.77451 2.00053 10.4279 2.6854 11.647 3.90448L11.9997 4.25721L12.3523 3.90464C12.9558 3.30082 13.6724 2.82182 14.4612 2.49501ZM16.949 4C16.358 4 15.7728 4.11645 15.2267 4.34268C14.6807 4.56892 14.1847 4.90051 13.7669 5.31853L12.7068 6.37853C12.3163 6.76906 11.6832 6.76906 11.2926 6.37853L10.2328 5.31869C9.38878 4.47469 8.24407 4.00053 7.05047 4.00053C5.85687 4.00053 4.71216 4.47469 3.86816 5.31869C3.02416 6.16269 2.55 7.30741 2.55 8.50101C2.55 9.56601 3.29639 10.8311 4.25681 11.7915L12.0484 19.5831L19.8401 11.7915C20.0945 11.5372 20.3686 11.2581 20.61 10.9695C20.8586 10.6723 21.0265 10.4183 21.1073 10.2233C21.3336 9.67725 21.45 9.09202 21.45 8.50101C21.45 7.90999 21.3336 7.32476 21.1073 6.77876C20.8811 6.23275 20.5495 5.73667 20.1315 5.31886C19.7137 4.90085 19.2173 4.56892 18.6712 4.34268C18.1252 4.11644 17.54 4 16.949 4Z"
          />
        </svg>
      )}
    </div>
  );
}

export default Heart;
