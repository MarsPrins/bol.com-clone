"use client";

import * as s from "@/styles/main/saleList.module.scss";
import Product from "../products/Product";
import { useEffect, useRef, useState } from "react";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../Loading";
import axios from "axios";
import useApiUrl from "../apiUrl";

export default function SaleList(props) {
  const [data, setData] = useState();
  const [scrollAmount, setScrollAmount] = useState(200);
  const productAmount = 6;
  const apiUrl = useApiUrl();

  const scroll = useRef(null);

  const scrollSmooth = (m) => {
    const speedUp = 5;
    const maxTime = scrollAmount / speedUp;
    let time = 0;
    const interval = setInterval(() => {
      if (m === "minus") {
        scroll.current.scrollLeft -= speedUp;
      } else {
        scroll.current.scrollLeft += speedUp;
      }
      time = time + 1;
      if (time >= maxTime) {
        clearInterval(interval);
      }
    }, 1);
  };

  useEffect(() => {
    async function getProducts() {
      const res = await axios.get(`${apiUrl}/products?sale=${productAmount}`);
      const x = props.highest
        ? res.data.products.sort((a, b) => b.onSale.percent - a.onSale.percent)
        : res.data.products;
      setData(x);
      console.log(x);
    }
    getProducts();
  }, []);

  const handleArrows = (n, e) => {
    scroll.current ? scrollSmooth(n, e) : null;
  };

  return (
    <section className={s.saleList}>
      <div className={s.content}>
        <h2>Bekijk onze topdeals</h2>
        <ul ref={scroll}>
          {data ? (
            data.map((product, index) => (
              <li key={product._id}>
                <Product product={product} width={180} />
              </li>
            ))
          ) : (
            <>
              <Loading padding=".2rem" height="209px" />
              <Loading padding=".2rem" height="209px" />
              <Loading padding=".2rem" height="209px" />
              <Loading padding=".2rem" height="209px" />
              <Loading padding=".2rem" height="209px" />
              <Loading padding=".2rem" height="209px" />
            </>
          )}
        </ul>
        <button
          onClick={() => {
            handleArrows();
          }}
          className={s.next}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <button
          onClick={() => {
            handleArrows("minus");
          }}
          className={s.previous}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>
    </section>
  );
}
