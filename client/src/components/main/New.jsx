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

export default function SaleList() {
  const [data, setData] = useState();
  const [scrollAmount, setScrollAmount] = useState(200);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const apiUrl = useApiUrl();

  const scroll = useRef(null);

  useEffect(() => {
    const container = scroll.current;

    const handleScroll = () => {
      const newScrollLeft = container.scrollLeft;
      setScrollLeft(newScrollLeft);

      const isLeftButtonVisible = newScrollLeft > 0;
      const isRightButtonVisible =
        newScrollLeft < container.scrollWidth - container.clientWidth;

      setShowLeftButton(isLeftButtonVisible);
      setShowRightButton(isRightButtonVisible);
    };

    container.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      const res = await axios.get(`${apiUrl}/products?new=6`);
      setData(res.data);
    }
    getProducts();
  }, []);

  const handleArrows = (n, e) => {
    scroll.current ? scrollSmooth(n, e) : null;
  };

  return (
    <section className={s.saleList}>
      <div className={s.content}>
        <h2>Nieuw binnen</h2>
        <ul ref={scroll}>
          {data ? (
            data.products.map((product) => (
              <li key={product._id}>
                <Product product={product} width={180} />
              </li>
            ))
          ) : (
            <>
              <Loading padding=".2rem" height="180px" />
              <Loading padding=".2rem" height="180px" />
              <Loading padding=".2rem" height="180px" />
              <Loading padding=".2rem" height="180px" />
              <Loading padding=".2rem" height="180px" />
              <Loading padding=".2rem" height="180px" />
            </>
          )}
        </ul>
        {showRightButton && (
          <button
            onClick={() => {
              handleArrows();
            }}
            className={s.next}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        )}
        {showLeftButton && (
          <button
            onClick={() => {
              handleArrows("minus");
            }}
            className={s.previous}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        )}
      </div>
    </section>
  );
}
