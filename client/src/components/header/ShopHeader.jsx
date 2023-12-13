"use client";

import * as s from "@/styles/header/header.module.scss";
import Link from "next/link";
import { faAngleDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Dutch from "@/img/netherlands.png";
import English from "@/img/united-kingdom.png";
import Categories from "./Categories";
import { useEffect, useState } from "react";
import useApiUrl from "../apiUrl";
import categoryArray from "../categoryArray";

function ShopHeader() {
  const [isHoveringCat, setIsHoveringCat] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const [array, setArray] = useState([]);

  const handleMouseOver = (e) => {
    setIsHoveringCat(true);
    setIsHovering(true);
  };

  const handleMouseOut = (e) => {
    setIsHoveringCat(false);
    setIsHovering(false);
  };

  const Get = async () => {
    const apiUrl = useApiUrl();
    const res = await fetch(`${apiUrl}/products/categories/`);
    const data = await res.json();
    const arr = categoryArray(data);
    setArray(arr);
  };
  useEffect(() => {
    Get();
  }, []);

  return (
    <div className={s.shopCont}>
      <div className={s.topShopHeader}>
        <div className={s.container}>
          <div className={s.left}>
            <ul>
              <li onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                <p>
                  Categorieën <FontAwesomeIcon icon={faAngleDown} />
                </p>
              </li>
              <li>
                <Link href={"/nl/category/sale"}>
                  <p>
                    Aanbiedingen <FontAwesomeIcon icon={faAngleDown} />
                  </p>
                </Link>
              </li>
              <li>
                <Link href={"/nl/category/sale"}>
                  <p>
                    Aanbevolen <FontAwesomeIcon icon={faAngleDown} />
                  </p>
                </Link>
              </li>
            </ul>
          </div>
          <div className={s.right}>
            <ul>
              <li>
                <button>
                  <Link href="/nl/soon">Zakelijk</Link>
                </button>
              </li>
              <li>
                <button>
                  <Link href="/nl/soon">Cadeaukaart</Link>
                </button>
              </li>
              <li>
                <button>
                  <Link href="/nl/soon">Bestelstatus</Link>
                </button>
              </li>
              <li>
                <button>
                  <Link href="/nl/soon">Klantenservice</Link>
                </button>
              </li>
              {/* <li>
                <button>
                  <Link href="/nl/soon">
                    <Image
                      src={Dutch}
                      width={24}
                      height={24}
                      alt="Picture of the author"
                    />
                  </Link>
                </button>
              </li>
              <li className={s.country}>
                <button>
                  <Link href="/nl/soon">
                    <Image
                      src={English}
                      width={24}
                      height={24}
                      alt="Picture of the author"
                    />
                  </Link>
                </button>
              </li> */}
            </ul>
          </div>
        </div>
        {isHoveringCat && (
          <div
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            className={s.menuWrapper}
          >
            <div className={s.menuContent}>
              <Categories onClick={handleMouseOut} array={array} />
            </div>
          </div>
        )}
      </div>
      <div className={s.bottomShopHeader}>
        <div className={s.container}>
          <ul>
            <li>
              <button>
                <Link href="/nl/soon">Energie Besparen</Link>
              </button>
            </li>
            <li>
              <button>
                <Link href="/nl/soon">Elektronika Acties</Link>
              </button>
            </li>
            <li>
              <button>
                <Link href="/nl/soon">Drogisterijdeals</Link>
              </button>
            </li>
            <li>
              <button>
                <Link href="/nl/soon">Duurzaamheid</Link>
              </button>
            </li>
            <li className={s.special}>
              <button>
                <Link
                  href="https://www.upwork.com/freelancers/~018cd4b08f1448ba85"
                  target="blank"
                >
                  Webdevelopment <FontAwesomeIcon icon={faChevronRight} />
                </Link>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <span
        className={isHovering ? `${s.overlay} ${s.active}` : s.overlay}
      ></span>
    </div>
  );
}

export default ShopHeader;
