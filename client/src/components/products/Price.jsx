import * as s from "@/styles/product/price.module.scss";

function Price(props) {
  const price = props.price;
  const priceDecimal = props.priceDecimal >= 100 ? null : props.priceDecimal;
  const onSale = props.onSale ? props.onSale : null;
  const oldPrice = onSale ? props.oldPrice : null;
  const oldPriceDecimal = onSale ? props.oldPriceDecimal : null;
  const salePercentage = onSale ? props.percentage : null;

  const floatSize = JSON.stringify((Number(props.size) / 3) * 2);

  const styles = props.size ? { fontSize: props.size + "px" } : null;
  const stylesFloat = props.size ? { fontSize: floatSize + "px" } : null;

  return (
    <div className={s.container}>
      <div className={s.content}>
        {onSale ? (
          <div className={s.sale}>
            <div className={s.prices}>
              <div className={s.main}>
                <div className={s.price}>
                  <h2 className={s.int} style={styles}>
                    {price},
                  </h2>
                  <span className={s.float} style={stylesFloat}>
                    {priceDecimal}
                  </span>
                </div>
                <div className={s.label}>
                  <span>Korting</span>
                </div>
              </div>
              <span className={s.oldPrice}>
                Meestal{" "}
                <s>
                  {oldPrice},{oldPriceDecimal}
                </s>
              </span>
            </div>
            <p className={s.percentage}>Je bespaart {salePercentage}%</p>
          </div>
        ) : (
          <div className={s.regular}>
            <span className={s.int} style={styles}>
              {price},
            </span>
            <span className={s.float} style={stylesFloat}>
              {priceDecimal}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Price;
