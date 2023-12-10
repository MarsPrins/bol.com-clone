"use client";

import WishlistProducts from "@/components/products/WishlistProducts";
import * as s from "@/styles/wishlist.module.scss";
import { useState } from "react";

export default function page() {
  const [seed, setSeed] = useState(1);
  const reset = () => {
    setSeed(Math.random());
  };

  return (
    <div className={s.container}>
      <div className={s.content}>
        <h1>Verlanglijstje</h1>
        <WishlistProducts onClick={reset} key={seed} />
      </div>
    </div>
  );
}
