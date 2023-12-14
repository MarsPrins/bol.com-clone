import Products from "@/components/queryResults/Products";
import QueryInfo from "@/components/queryResults/QueryInfo";
import PageCounter from "@/components/queryResults/PageCounter";
import Filter from "@/components/queryResults/Filter";
import * as s from "@/styles/queryResults/results.module.scss";
import useApiUrl from "@/components/apiUrl";

export default async function QueryResults({ params }) {
  const query = decodeURIComponent(params.query).replaceAll("+", " ");
  const apiUrl = useApiUrl();
  const productsLimit = 10;
  const skip = (params.page - 1) * productsLimit;

  const res = await fetch(
    `${apiUrl}/products/search/${query}?skip=${skip}&limit=${productsLimit}`,
    { cache: "no-store" }
  ).then((res) => res.json());

  const data = [];

  data.length = 0;

  let i = 0;
  while (i < res.length) {
    const pRes = await fetch(
      `${apiUrl}/products/find/${res[i]._id}?total=true`
    ).then((res) => res.json());
    data.push(pRes);
    i++;
  }

  const searchResTotal = await fetch(`${apiUrl}/products/search/${query}`)
    .then((res) => res.json())
    .then((data) => data.length);

  return (
    <div className={s.resultsContainer}>
      <div className={s.left}>
        <Filter data={data} />
      </div>
      <div className={s.right}>
        <QueryInfo data={data} title={query} />
        <Products
          page={params.page}
          query={query}
          data={data}
          resultsAmount={searchResTotal}
          productsLimit={productsLimit}
        />
      </div>
    </div>
  );
}
