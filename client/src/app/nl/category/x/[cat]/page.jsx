import * as s from "@/styles/category/category.module.scss";
import useApiUrl from "@/components/apiUrl";
import React from "react";
import BigProduct from "@/components/products/BigProduct";

async function Page({ params }) {
  const apiUrl = useApiUrl();

  const res = await fetch(`${apiUrl}/products/?category=${params.cat}`).then(
    (res) => res.json()
  );

  return (
    <div className={s.container}>
      <div className={s.content}>
        <h1>{params.cat}</h1>
        <small>{res.products.length} resultaten</small>
        <ul>
          {res.products.map((p, i) => (
            <li key={p._id}>
              <BigProduct view="grid" product={p} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Page;
