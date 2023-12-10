"use client";

import * as s from "@/styles/product/productPage/mainInfo.module.scss";

import React, { useState } from "react";

function MainInfo(props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const p = props.product;

  const imagesArray = [p.thumbnail, ...p.images];

  const handleIndex = (e) => {
    setCurrentIndex(e);
  };

  // extra info

  return (
    <div className={s.container}>
      <div className={s.content}>
        <div className={s.currImage}>
          <img src={imagesArray[currentIndex]} alt="main image" />
        </div>
        <div className={s.images}>
          <ul>
            {imagesArray.map((image, index) => (
              <li
                onClick={() => handleIndex(index)}
                className={index === currentIndex ? s.current : null}
                key={index}
              >
                <img src={image} alt="image thumbnail" />
              </li>
            ))}
          </ul>
        </div>
        {p.extraInfo.length > 0 && (
          <div className={s.extraInfo}>
            <ul>
              {p.extraInfo.map((info, index) => (
                <li key={index}>{info}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainInfo;
