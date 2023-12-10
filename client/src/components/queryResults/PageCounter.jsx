"use client";

import { useEffect, useState } from "react";
import * as s from "@/styles/queryResults/pageCounter.module.scss";
import { useRouter, Router } from "next/navigation";

export default function PageCounter(props, { refresh }) {
  const [max, setMax] = useState();
  const [current, setCurrent] = useState(Number(props.page));
  const [params, setParams] = useState();

  const router = useRouter();

  let done = false;

  const array = [];

  const value = max ? max : props.max;

  if (done === false) {
    for (var i = 0; i < value - 1; i++) {
      array.push(i + 1);
      done = true;
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // if (typeof window !== "undefined") {
    setMax(
      parseInt(params.get("max") ? parseInt(params.get("max")) : props.max)
    );
    setParams(params);
    // }
  }, []);

  const setPage = (e) => {
    const page = e.target.outerText;
    setCurrent(Number(page));
    router.push(`${page}?${params.toString()}`);
  };

  return (
    <div className={s.container}>
      <div className={s.content}>
        <ul>
          {array.map((page, index) => (
            <li
              className={page === current ? s.current : null}
              key={page}
              onClick={setPage}
            >
              {page}
            </li>
          ))}
        </ul>
        <span
          onClick={setPage}
          className={props.page == Math.floor(value) ? s.current : null}
        >
          {max > 0 ? max : 1}
        </span>
      </div>
    </div>
  );
}
