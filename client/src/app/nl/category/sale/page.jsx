import useApiUrl from "@/components/apiUrl";
import categoryArray from "@/components/categoryArray";
import SaleList from "@/components/main/SaleList";
import BigProduct from "@/components/products/BigProduct";
import * as s from "@/styles/category/sale.module.scss";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

async function page() {
  const productsAmount = 6;

  const apiUrl = useApiUrl();

  const res = await fetch(`${apiUrl}/products/categories?sale=true`, {
    cache: "no-store",
  }).then((res) => res.json());
  const data = categoryArray(res);

  const products = [];

  let i = 0;
  while (i < data.length) {
    const x = await fetch(
      `${apiUrl}/products?categorySale=${data[i].category}`
    ).then((res) => res.json());
    products.push(...x.products);
    i++;
  }

  return (
    <div className={s.container}>
      <div className={s.content}>
        <div className={s.top}>
          <img
            src="https://bol.images.contentstack.eu/v3/assets/bltf814e9f78be52b93/bltc220ab6067df1ff5/656f45f15722dc04076c7213/kerstkorting_2023_topbanner_default_web.jpg?environment=blt0fb12aeb38c76113&locale=nl-nl"
            alt="MainImage"
            loading="lazy"
          />
        </div>
        <div className={s.saleList}>
          <SaleList highest={true} />
        </div>
        <div className={s.saleItems}>
          <h1>Alle kortingen</h1>
          <ul className={s.titles}>
            {data.map((title, i) => (
              <li key={i}>
                <h2 className={s.category}>{title.category}</h2>
                <ul className={s.products}>
                  {products.map(
                    (p, i) =>
                      p.category === title.category && (
                        <li key={p._id}>
                          <BigProduct view="grid" product={p} />
                        </li>
                      )
                  )}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default page;
