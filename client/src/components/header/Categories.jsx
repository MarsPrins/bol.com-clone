"use client";
import * as s from "@/styles/header/menus.module.scss";
import Link from "next/link";
import { useState } from "react";

function Categories(props) {
  const [catArray] = useState(props.array);

  const mobile = props.mobile;

  return (
    <>
      {!mobile && <span className={s.top}></span>}
      <div className={s.category}>
        <div className={mobile ? `${s.content} ${s.mobile}` : s.content}>
          {!mobile && <strong>Categorieën</strong>}
          <ul>
            {catArray.map((category, index) => (
              <Link
                onClick={props.onClick}
                key={index}
                href={`/nl/category/x/${category.category}`}
              >
                <li key={index}>
                  <img src={category.img} alt="category image" />
                  <span>{category.category}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Categories;
