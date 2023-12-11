"use client";

import * as s from "@/styles/main/categorylist.module.scss";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import categoryArray from "../categoryArray";
import Loading from "../Loading";
import useApiUrl from "../apiUrl";
import Link from "next/link";

const CategoryList = () => {
  const [data, setData] = useState([]);
  const [scrollAmount, setScrollAmount] = useState(null);
  const [screenSize, setScreenSize] = useState({
    width: null,
    height: null,
  });
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const apiUrl = useApiUrl();

  useEffect(() => {
    const get = async () => {
      const res = await fetch(`${apiUrl}/products/categories/`);
      const data = await res.json();
      const arr = categoryArray(data);
      setData(arr);
    };
    get();

    if (typeof window !== "undefined") {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  }, []);
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

  if (screenSize.width !== null && scrollAmount === null) {
    if (screenSize.width >= 770) {
      setScrollAmount(267);
    } else {
      setScrollAmount(200);
    }
  }

  const scrollSmooth = (m) => {
    const speedUp = 5;
    const maxTime = scrollAmount / speedUp;
    let time = 0;

    const container = scroll.current;

    const interval = setInterval(() => {
      if (m === "minus") {
        container.scrollLeft -= speedUp;
      } else {
        container.scrollLeft += speedUp;
      }
      time = time + 1;
      if (time >= maxTime) {
        clearInterval(interval);
      }
    }, 1);
  };

  const handleArrows = (n, e) => {
    scroll.current ? scrollSmooth(n, e) : null;
  };

  return (
    <section className={s.categoryList}>
      <div className={s.content}>
        <h2>Kies een categorie</h2>
        <ul ref={scroll} className={s.list}>
          {data.length > 0 ? (
            data.map((category, index) => (
              <li key={index}>
                <Link href={`/nl/category/x/${category.category}`}>
                  <img src={category.img} alt="category image" />
                  <p>{category.category}</p>
                </Link>
              </li>
            ))
          ) : (
            <>
              <Loading padding=".3rem" height="150px" />
              <Loading padding=".3rem" height="150px" />
              <Loading padding=".3rem" height="150px" />
              <Loading padding=".3rem" height="150px" />
              <Loading padding=".3rem" height="150px" />
              <Loading padding=".3rem" height="150px" />
              <Loading padding=".3rem" height="150px" />
              <Loading padding=".3rem" height="150px" />
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
};

export default CategoryList;
