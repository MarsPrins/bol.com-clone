import * as s from "@/styles/product/productPage/page.module.scss";

import MainInfo from "@/components/products/productPage/MainInfo";
import SecondaryInfo from "@/components/products/productPage/SecondaryInfo";
import useApiUrl from "@/components/apiUrl";
import RatingComp from "@/components/products/Rating";
import Third from "@/components/products/productPage/Third";

export default async function Page({ params }) {
  const productId = params.productId;

  const apiUrl = useApiUrl();

  const res = await fetch(`${apiUrl}/products/find/${productId}`, {
    cache: "no-store",
  }).then((res) => res.json());

  return res !== null ? (
    <div className={s.container}>
      <div className={s.content}>
        <h1 id="product">{res.title}</h1>
        <ul className={s.seoInfo}>
          <li>Merk: {res.brand}</li>
          <li className={s.xx}>
            <div className={s.rating}>
              <RatingComp rating={res.starRating} />
            </div>
            {res.starRating.toFixed(1)}/5 ({res.reviewsAmnt})
          </li>
        </ul>
        <div className={s.items}>
          <div className={s.wrapper}>
            <div className={s.top}>
              <MainInfo product={res} />
            </div>
            <div className={s.bottom}>
              <SecondaryInfo product={res} />
            </div>
          </div>
          <div className={s.third}>
            <Third product={res} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>product doesnt exist</div>
  );
}
