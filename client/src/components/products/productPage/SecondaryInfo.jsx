"use client";

import * as s from "@/styles/product/productPage/secondayInfo.module.scss";
import Link from "next/link";
import Price from "../Price";
import Stock from "../Stock";
import Atc from "../Atc";
import Heart from "../Heart";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function SecondaryInfo(props) {
  const [selected, setSelected] = useState(
    props.product.sizes.length > 0 ? false : true
  );
  const p = props.product;

  const inStock = p.stock > 0 ? true : p.sizes.length > 0 ? undefined : false;

  // check if products multi tag is empty or not
  const multi = p.multi && p.multi;

  console.log(p.sizes);

  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // map and link

  const handleSelected = (e) => {
    const x = e.target.value;
    const y = x === "select" ? false : true;
    setSelected(y);
  };

  return (
    <div className={s.container}>
      <div className={s.content}>
        <div className={s.choices}>
          <ul className={s.blocks}>
            {multi &&
              multi.map((choice, index) => (
                <li className={s.blocksLi} key={index}>
                  <span className={s.title}>{choice.title}</span>
                  <ul className={s.items}>
                    {choice.items.map((item, index) => (
                      <Link
                        key={index}
                        href={
                          item.productId !== null
                            ? `/nl/product/${item.productId}`
                            : "#product"
                        }
                      >
                        <li
                          className={
                            item.productId === null ? s.current : undefined
                          }
                        >
                          {item.title}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </li>
              ))}
          </ul>
          {p.sizes.length > 0 && (
            <div className={s.sizes}>
              <span>
                Grootte<red>*</red>
              </span>
              <select onChange={handleSelected} name="sizes" id="sizes">
                <option value="select">Selecteer...</option>
                {p.sizes.map((size, index) => (
                  <option value={size.title} key={index}>
                    {size.title && capitalizeWords(size.title)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className={s.orderInfo}>
          <div className={s.price}>
            <Price
              price={p.onSale ? p.onSale.newPrice : p.price}
              priceDecimal={
                p.onSale ? p.onSale.newPriceDecimal : p.priceDecimal
              }
              onSale={p.onSale && true}
              percentage={p.onSale && p.onSale.percent}
              oldPrice={p.price}
              oldPriceDecimal={p.priceDecimal}
              size={"40"}
            />
          </div>
          <div className={s.stock}>
            <Stock inStock={inStock} />
          </div>
          <span className={s.seller}>
            Verkoop door{" "}
            <Link href="https://www.upwork.com/freelancers/~018cd4b08f1448ba85">
              Mars.prins
            </Link>
          </span>
          <div className={s.interactive}>
            {inStock && (
              <div className={s.cart}>
                <Atc
                  size={selected}
                  disabled={selected ? false : true}
                  productId={p._id}
                  text={true}
                />
              </div>
            )}
            <div className={s.heart}>
              <Heart product={p} hearted={false} />
            </div>
          </div>
          <div className={s.orderPromises}>
            <ul>
              <li>
                <FontAwesomeIcon icon={faCheck} /> Bestellen en betalen via
                Mars.prins
              </li>
              <li>
                <b>
                  <FontAwesomeIcon icon={faCheck} /> Inclusief{" "}
                </b>
                verzendkosten, verstuurd door{" "}
                <Link href="https://www.upwork.com/freelancers/~018cd4b08f1448ba85">
                  Mars.prins
                </Link>
              </li>
              <li>
                <FontAwesomeIcon icon={faCheck} /> 30 dagen bedenktijd en{" "}
                <b>gratis</b> retourneren
              </li>
              <li>
                <FontAwesomeIcon icon={faCheck} /> Wettelijke garantie via{" "}
                <Link href="https://www.upwork.com/freelancers/~018cd4b08f1448ba85">
                  Mars.prins
                </Link>
              </li>
              {p.deliveryTime === 1 && (
                <li>
                  <FontAwesomeIcon icon={faCheck} /> Eerste werkdag besteld,
                  volgende werkdag in huis
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondaryInfo;
