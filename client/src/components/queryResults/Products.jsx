"use client";

import * as s from "@/styles/queryResults/products.module.scss";
import { useEffect, useState } from "react";
import BigProduct from "../products/BigProduct";
import { useRouter } from "next/navigation";
import PageCounter from "./PageCounter";
import Loading from "../Loading";

export default function Products(props) {
  const [data, setData] = useState(props.data);
  const [page, setPage] = useState(props.page);
  const [maxSet, setMaxSet] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const [view, setView] = useState("list");

  const router = useRouter();

  const handleNoti = (e) => {};

  const fetchData = async (params) => {
    const pagesMax = props.resultsAmount / props.productsLimit;
    console.log("Max amount of pages", pagesMax);
    params.set("max", Math.floor(pagesMax));
    router.push(`${page}?${params.toString()}`);
    setMaxSet(pagesMax);

    var newProducts = data;

    const isBranded = params.get("merken");
    const isCat = params.get("categorieën");
    const isDelivery = params.get("bezorg");
    const isSale = params.get("aanbiedingen");
    const isRating = params.get("rating");
    const isPrice = params.get("price") && params.get("price").split("-");
    const sort = params.get("sort") ? params.get("sort") : "relevance";
    if (isBranded) {
      newProducts = newProducts.filter((el) => el.brand === isBranded);
    }
    if (isCat) {
      newProducts = newProducts.filter((el) => el.category === isCat);
    }
    if (isDelivery) {
      newProducts = newProducts.filter(
        (el) => el.deliveryTime === Number(isDelivery)
      );
    }
    if (isSale) {
      newProducts = newProducts.filter((el) => el.onSale);
    }
    if (isRating) {
      newProducts = newProducts.filter(
        (el) => Number(el.starRating) >= Number(isRating)
      );
    }
    if (isPrice) {
      // try to make sale work
      newProducts = newProducts.filter(
        (el) =>
          Number(el.price) <= Number(isPrice[1]) &&
          Number(el.price) >= Number(isPrice[0])
      );
    }

    //

    if (sort === "relevance") {
      newProducts = data;
    } else if (sort === "rating") {
      newProducts = newProducts.sort(function (a, b) {
        return b.starRating - a.starRating;
      });
    } else if (sort === "price0") {
      newProducts = newProducts.sort(function (a, b) {
        return (
          (a.onSale ? a.onSale.newPrice : a.price) -
          (b.onSale ? b.onSale.newPrice : b.price)
        );
      });
    } else if (sort === "price1") {
      newProducts = newProducts.sort(function (a, b) {
        return (
          (b.onSale ? b.onSale.newPrice : b.price) -
          (a.onSale ? a.onSale.newPrice : a.price)
        );
      });
    } else if (sort === "popularity") {
      newProducts = newProducts.sort(function (a, b) {
        return b.reviewsAmnt - a.reviewsAmnt;
      });
    }

    newProducts !== data && setData(newProducts);
    setLoaded(true);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setView(params.get("view"));
    fetchData(params).catch(console.error);
  }, [page]);

  return (
    <>
      <span
        className={isLoaded || !props.data.length > 0 ? undefined : s.overlay}
      ></span>
      <ul
      // className={view === "grid" ? s.items : undefined}
      >
        {data ? (
          data.length > 0 ? (
            data.map((p, index) => (
              <li key={p._id}>
                <BigProduct product={p} />
              </li>
            ))
          ) : (
            <span className={s.oeps}>Oeps, geen producten gevonden.</span>
          )
        ) : (
          <>
            <Loading height="228px" />
            <Loading height="228px" />
            <Loading height="228px" />
            <Loading height="228px" />
            <Loading height="228px" />
            <Loading height="228px" />
            <Loading height="228px" />
            <Loading height="228px" />
            <Loading height="228px" />
            <Loading height="228px" />
          </>
        )}
        {maxSet !== null ? (
          <PageCounter page={props.page} max={maxSet} />
        ) : (
          <Loading height="30px" />
        )}
      </ul>
    </>
  );
}
