"use client";

import * as s from "@/styles/product/productPage/third.module.scss";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function Third(props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const p = props.product;
  return (
    <div className={s.container}>
      <div className={s.content}>
        <h2>Productbeschrijving</h2>
        <div className={s.bioWrapper}>
          <div className={open ? `${s.overflow} ${s.active}` : s.overflow}>
            <div className={s.bio} id="bio">
              {p.desc}
            </div>
          </div>
          <button onClick={handleOpen} className={s.arrow}>
            <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
            {open ? "Toon minder" : "Toon meer"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Third;
