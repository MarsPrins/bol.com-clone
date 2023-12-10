import * as s from "@/styles/product/stock.module.scss";

function Stock(props) {
  const inStock = props.inStock;

  return inStock !== undefined ? (
    <div className={s.stock}>
      <span className={inStock ? null : s.out}>
        {inStock === true
          ? "Op voorraad"
          : inStock === false
          ? "Niet op voorraad"
          : null}
      </span>
      <p className={inStock ? null : s.not}>
        Voor 23:59 besteld, morgen in huis
      </p>
    </div>
  ) : null;
}

export default Stock;
