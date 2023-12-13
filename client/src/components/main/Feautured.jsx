"use client";

import * as s from "@/styles/main/feautured.module.scss";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function Feautured() {
  const scroll = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

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

  const scrollSmooth = (e, m) => {
    const maxTime = e / 3;
    let time = 0;
    const interval = setInterval(() => {
      if (m === "minus") {
        scroll.current.scrollLeft -= 3;
      } else {
        scroll.current.scrollLeft += 3;
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
    <section className={s.featured}>
      <div className={s.top}>
        <div className={s.content}>
          <img
            src="https://bol.images.contentstack.eu/v3/assets/bltf814e9f78be52b93/blta2601415dc9de772/64ef7237f2dd8c9dd1655945/31791-Mode-hoofdbeeld_cp_headerv2.jpg?environment=blt0fb12aeb38c76113&locale=nl-nl&width=600&crop=1920,1080&quality=80&auto=webp"
            alt="MainImage"
            loading="lazy"
          />
          <div className={s.interactive}>
            <div className={s.text}>
              <h2>Webdevelopment</h2>
              <p>ontdek de toptrends</p>
            </div>
            <div className={s.cta}>
              <Link
                target="blank"
                href="https://www.upwork.com/freelancers/~018cd4b08f1448ba85"
              >
                <button className={s.mobile}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
                <button className={s.desktop}>
                  <span>Bekijk nu</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div ref={scroll} className={s.bottom}>
        <div className={s.content}>
          <div className={`${s.slide} ${s.slide1}`}>
            <div className={s.text}>
              <span className={s.thick}>Tot 50% korting*</span>
              <span>op blog sites</span>
            </div>
            <img
              src="https://s.s-bol.com/nl/upload/images/ps/banners/DailyCare/wk37_38_mond_MWB.jpg"
              alt=""
              className={s.product}
            />
            <Link href={"/nl/soon"}>
              <button className={s.cta}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </Link>
            <span className={s.asterisk}>*op advies prijs</span>
          </div>
          <div id="slide2" className={`${s.slide} ${s.slide2}`}>
            <div className={s.text}>
              <span className={s.thick}>Tot 60% korting*</span>
              <span>op o.a Seo optimisatie</span>
            </div>
            <img
              src="https://s.s-bol.com/nl/upload/images/ps/banners/supermarkt/2023/HC_wk37_Henkel_Reckitt.jpg"
              alt=""
              className={s.product}
            />
            <Link href={"/nl/soon"}>
              <button className={s.cta}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </Link>
            <span className={s.asterisk}>*op advies prijs</span>
          </div>
          <div id="slide3" className={`${s.slide} ${s.slide3}`}>
            <div className={s.text}>
              <span className={s.thick}>Tot 20% korting* op</span>
              <span>E-commerce webshop</span>
            </div>
            <img
              src="https://s.s-bol.com/nl/upload/images/ps/banners/speelgoed/LEGO_adultspromo_W37.jpg"
              alt=""
              className={s.product}
            />
            <Link href={"/nl/soon"}>
              <button className={s.cta}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </Link>
            <span className={s.asterisk}>*op meest getoonde prijs</span>
          </div>
          <div id="slide4" className={`${s.slide} ${s.slide4}`}>
            <div className={s.text}>
              <span className={s.thick}>Nieuwe collectie</span>
              <span>bol.com clones</span>
            </div>
            <img
              src="https://s.s-bol.com/nl/upload/images/ps/banners/campagne/2023/mode/flexbannerheren.jpg"
              alt=""
              className={s.product}
            />
            <Link href={"/nl/soon"}>
              <button className={s.cta}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </Link>
          </div>
        </div>
      </div>
      {showRightButton && (
        <button
          onClick={() => {
            handleArrows(290);
          }}
          className={s.next}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      )}
      {showLeftButton && (
        <button
          onClick={() => {
            handleArrows(290, "minus");
          }}
          className={s.previous}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      )}
    </section>
  );
}

export default Feautured;
