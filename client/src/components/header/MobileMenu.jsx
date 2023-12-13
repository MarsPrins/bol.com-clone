"use client";

import * as s from "@/styles/header/header.module.scss";
import { useState } from "react";
import Dutch from "@/img/netherlands.png";
import English from "@/img/united-kingdom.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faX,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import Categories from "./Categories";
import Link from "next/link";
import Image from "next/image";

function MobileMenu(props) {
  const [open, setOpen] = useState(false);
  const [array] = useState(props.array);
  const [catOpen, setCatOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open && true);

    open
      ? document.body.classList.remove("menuOpen")
      : document.body.classList.add("menuOpen");
  };

  const handleCat = () => {
    setCatOpen(!catOpen && true);
  };

  return (
    <div className={s.mobileMenu}>
      <div className={s.icon}>
        <FontAwesomeIcon icon={faBars} onClick={handleClick} />
      </div>
      <div className={s.menuCont}>
        <div className={open ? `${s.menu} ${s.active}` : s.menu}>
          <div className={s.top}>
            <div className={s.countries}>
              {/* <ul>
                <li role="button">
                  <Link href="#">
                    <Image
                      src={Dutch}
                      width={24}
                      height={24}
                      alt="Picture of the author"
                    />
                  </Link>
                </li>
                <li role="button">
                  <Link href="#">
                    <Image
                      src={English}
                      width={24}
                      height={24}
                      alt="Picture of the author"
                    />
                  </Link>
                </li>
              </ul> */}
            </div>
            <div onClick={handleClick} className={s.cross}>
              <FontAwesomeIcon icon={faX} />
            </div>
          </div>
          <div className={s.bottom}>
            <div className={s.products}>
              <ul className={s.blocks}>
                <li>
                  <div onClick={handleCat} className={s.title}>
                    <span>Categorieën</span>
                    <FontAwesomeIcon
                      className={catOpen ? `${s.open} ${s.closed}` : s.closed}
                      icon={faChevronDown}
                    />
                  </div>
                  <div className={catOpen ? `${s.cats} ${s.active}` : s.cats}>
                    <Categories
                      onClick={handleClick}
                      mobile={true}
                      array={array}
                    />
                  </div>
                </li>
                <li>
                  <Link onClick={handleClick} href={"/nl/category/sale"}>
                    <div className={`${s.title} ${s.border}`}>
                      <span>Aanbiedingen</span>
                      <FontAwesomeIcon
                        className={s.closed}
                        icon={faChevronDown}
                      />
                    </div>
                  </Link>
                </li>
                <li>
                  <Link onClick={handleClick} href={"/nl/category/sale"}>
                    <div className={`${s.title} ${s.border}`}>
                      <span>Aanbevolen</span>
                      <FontAwesomeIcon
                        className={s.closed}
                        icon={faChevronDown}
                      />
                    </div>
                  </Link>
                </li>
                <li>
                  <Link onClick={handleClick} href={"/nl/soon"}>
                    <div className={`${s.title} ${s.big}`}>
                      <span>Webdevelopment</span>
                      <FontAwesomeIcon
                        className={s.closed}
                        icon={faChevronDown}
                      />
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
            <div className={s.account}>
              <ul>
                <li>
                  <Link onClick={handleClick} href={"/nl/soon"}>
                    <span>Zakelijk</span>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </Link>
                </li>
                <li>
                  <Link onClick={handleClick} href={"/nl/soon"}>
                    <span>Cadeaukaart</span>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </Link>
                </li>
                <li>
                  <Link onClick={handleClick} href={"/nl/soon"}>
                    <span>Bestelstatus</span>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </Link>
                </li>
                <li>
                  <Link onClick={handleClick} href={"/nl/soon"}>
                    <span>Klantenservice</span>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={handleClick}
        className={open ? `${s.overlay} ${s.active}` : s.overlay}
      ></div>
    </div>
  );
}

export default MobileMenu;
