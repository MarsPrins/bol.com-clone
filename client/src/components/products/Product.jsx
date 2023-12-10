import * as s from "@/styles/product.module.scss";
import Heart from "./Heart";
import Link from "next/link";

const Product = (props) => {
  const p = props.product;
  const width = props.width; // standard 100%
  const onSale = p.onSale && true;

  return (
    <div style={width ? { width: width } : null} className={s.product}>
      <div className={s.heart}>
        <Heart product={p} round={true} />
      </div>
      <Link href={`/nl/product/${p._id}`}>
        <img src={p.thumbnail} alt={p.title} className={s.cover} />
      </Link>
      <Link href={`/nl/product/${p._id}`}>
        <span className={s.name}>{p.title}</span>
      </Link>
      <div className={s.prices}>
        <span className={onSale ? s.onSale : s.price}>
          {onSale ? p.onSale.newPrice : p.price},
          {onSale ? p.onSale.newPriceDecimal : p.priceDecimal}
        </span>
        {onSale ? (
          <span className={s.salePercent}>{p.onSale.percent}% </span>
        ) : null}
      </div>
    </div>
  );
};

export default Product;
