"use client";

import * as s from "@/styles/main/bigPromo.module.scss";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Loading from "../Loading";
import dummyToMongodb from "../dummyToMongodb";

const BigPromo = () => {
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  // get current time
  const now = new Date();

  const currentDate =
    now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();

  // get time inbetween now and 24:00:00

  const countDownDate = new Date(`${currentDate} 24:00:00`).getTime();
  const distance = countDownDate - now;

  // start up countdown component with time inbetween

  const Completionist = () => <span>afgelopen</span>;

  return isClient ? (
    <section className={s.bigPromo}>
      <div className={s.content}>
        <Link href="/nl/soon">
          <div className={s.left}>
            <div className={s.first}>
              <div className={s.title}>
                <span>Dag</span>
                <svg viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M6.6951 2.23866C6.24019 1.25284 5.32568 0.498648 4.17546 0.295832C2.31042 -0.0330246 0.531916 1.2123 0.203059 3.07734C0.00117558 4.22228 0.392547 5.3346 1.15635 6.09895C2.94359 4.08757 4.30177 3.09528 6.6951 2.23866ZM20.6626 15.3901C19.676 20.9852 14.3405 24.7212 8.74536 23.7346C3.15023 22.748 -0.585736 17.4125 0.400835 11.8174C1.38741 6.22226 6.72292 2.48629 12.318 3.47286C17.9132 4.45943 21.6491 9.79495 20.6626 15.3901ZM18.0241 4.2368C18.7888 3.46602 19.9061 3.07009 21.0563 3.2729C22.9214 3.60176 24.1667 5.38027 23.8378 7.24531C23.6359 8.39025 22.8877 9.30163 21.9086 9.75865C20.917 7.2573 19.9802 5.86032 18.0241 4.2368ZM12.4188 7.84265L10.7303 7.54492L9.24219 15.9872L15.1519 17.0292L15.4496 15.3407L11.228 14.5963L12.4188 7.84265Z"
                  />
                </svg>
                <span>Deal</span>
              </div>
              {
                <Countdown
                  daysInHours={true}
                  className={s.timer}
                  date={Date.now() + distance}
                >
                  <Completionist />
                </Countdown>
              }
            </div>
            <div className={s.thumbnail}>
              <img
                src="https://i.dummyjson.com/data/products/54/thumbnail.jpg"
                alt=""
              />
            </div>
            <div className={s.text}>
              <p className={s.title}>
                1+1 gratis* op iedere simpele landing pagina
              </p>
              <span>*op de meest getoonde prijs</span>
            </div>
          </div>
        </Link>

        <div className={s.right}>
          <div className={s.text}>
            <h3>Nieuwe collectie</h3>
            <p>bol.com clones</p>
          </div>
          <img
            src="https://s.s-bol.com/nl/upload/images/ps/banners/flexbannerdames.jpg"
            alt=""
          />
          <button className={s.cta}>
            <Link href={"/nl/soon"}>
              <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          </button>
        </div>
      </div>
    </section>
  ) : (
    <div className={s.loading}>
      <Loading height="295px" width="100%" />
      <Loading height="295px" width="100%" />
    </div>
  );
};

export default BigPromo;
