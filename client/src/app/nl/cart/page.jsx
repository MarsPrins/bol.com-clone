"use client";

import Products from "@/components/cart/products";
import * as s from "@/styles/cart/page.module.scss";
import { useState } from "react";

function Page() {
  const [seed, setSeed] = useState(1);

  function reset() {
    setSeed(Math.random());
    console.log(seed);
  }

  return (
    <div className={s.container}>
      <div className={s.content}>
        <h1>Winkelwagentje</h1>
        <Products onDelete={reset} key={seed} />
      </div>
    </div>
  );
}

export default Page;
