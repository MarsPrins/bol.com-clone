import * as s from "@/styles/bigProduct.module.scss";
import Price from "@/components/products/Price";

import Link from "next/link";
import RatingComp from "@/components/products/Rating";
import Stock from "./Stock";
import Atc from "./Atc";
import Heart from "./Heart";

function BigProduct(props) {
  const p = props.product;

  const inStock = p.stock > 0 ? true : false;
  const width = props.width ? props.width : null; // standard 100%

  return (
    <div style={width ? { width: width } : null} className={s.container}>
      <div
        className={props.view === "grid" ? `${s.content} ${s.grid}` : s.content}
      >
        <div className={props.view === "grid" ? `${s.main} ${s.grid}` : s.main}>
          <div className={s.one}>
            <Link href={`/nl/product/${p._id}#product`}>
              <img src={p.thumbnail} alt="thumbnail" />
            </Link>
          </div>
          <div className={s.two}>
            <div className={s.one2}>
              <span className={s.brandName}>{p.brand}</span>
              <Link href={`/nl/product/${p._id}#product`}>
                <h2>{p.title}</h2>
              </Link>
              <div className={s.rating}>
                <RatingComp rating={p.starRating} />
                <span className={s.numberReviews}>({p.reviewsAmnt})</span>
              </div>
              <p className={s.bio}>{p.desc}</p>
              <Link href={`/nl/product/${p._id}#bio`}>
                <span className={s.more}>Meer</span>
              </Link>
            </div>
          </div>
        </div>
        <div className={s.three}>
          <Price
            price={p.onSale ? p.onSale.newPrice : p.price}
            priceDecimal={p.onSale ? p.onSale.newPriceDecimal : p.priceDecimal}
            onSale={p.onSale && true}
            percentage={p.onSale && p.onSale.percent}
            oldPrice={p.price}
            oldPriceDecimal={p.priceDecimal}
          />
          <Stock inStock={inStock} />
          <div className={s.interactive}>
            <Atc disabled={!inStock && true} productId={p._id} />
            <div className={s.heart}>
              <Heart onClick={props.onHeart} product={p} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BigProduct;
