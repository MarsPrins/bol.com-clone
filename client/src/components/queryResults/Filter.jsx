"use client";

import * as s from "@/styles/queryResults/filter.module.scss";
import {
  faChevronDown,
  faChevronUp,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Rating from "@/components/products/Rating";
import { useRouter } from "next/navigation";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

function Filter(props) {
  const [i, setI] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const [max, setMax] = useState(
    props.data.length > 0
      ? props.data.reduce(function (prev, current) {
          return prev && prev.price > current.price ? prev : current;
        }).price
      : undefined
  );
  const [min, setMin] = useState(
    props.data.length > 0
      ? props.data.reduce(function (prev, current) {
          return prev && prev.price < current.price ? prev : current;
        }).price
      : undefined
  );
  const [values, setValues] = useState([min, max]);

  const [rating, setRating] = useState("");
  const [params, setParams] = useState("");
  const [currentSelected, setCurrentSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [categories] = useState([]);
  const [brands] = useState([]);
  const [delivery] = useState([]);

  const router = useRouter();

  const handleRating = (e) => {
    const id = e.target.id;
    params.set("rating", id);
    router.push(`${page}?${params.toString()}`, { scroll: false });
    window.location.reload(false);
  };

  const fetchCategories = async () => {
    // while loop to put every props.data category in array
    let i = 0;
    while (i < props.data.length) {
      const value = props.data[i].category;
      const included = categories.indexOf(value) > -1;
      !included && categories.push(value);
      i++;
    }
  };

  const fetchBrands = async () => {
    // while loop to put every props.data category in array
    let i = 0;
    while (i < props.data.length) {
      const value = props.data[i].brand;
      const included = brands.indexOf(value) > -1;
      !included && brands.push(value);
      i++;
    }
  };

  const fetchDelivery = async () => {
    // while loop to put every props.data category in array
    let i = 0;
    while (i < props.data.length) {
      const x = props.data[i].deliveryTime;
      const value =
        x === 1
          ? "morgen bezorgd"
          : x === 2
          ? "3-5 werkdagen"
          : x === 3
          ? "5-10 werkdagen"
          : x === 4
          ? "10-14 werkdagen"
          : "meer dan 14 werkdagen";
      const included = delivery.indexOf(value) > -1;
      !included && delivery.push(value);
      i++;
    }
  };

  const handleParams = (brand, id) => {
    params.set(brand, id);
    router.push(`${page}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const arr = [];

    for (const entry of params.entries()) {
      const data = entry[1];
      const x =
        entry[0] === "bezorg"
          ? data === "1"
            ? "morgen bezorgd"
            : data === "2"
            ? "3-5 werkdagen"
            : data === "3"
            ? "5-10 werkdagen"
            : data === "4"
            ? "10-14 werkdagen"
            : "meer dan 14 werkdagen"
          : data;
      arr.push(x);
    }

    setCurrentSelected(arr);

    const pathname = window.location.pathname.split("/");
    setPage(pathname[pathname.length - 1]);
    setParams(params);
    setRating(params.get("rating"));
    const x = params.get("price") && Number(params.get("price").split("-")[0]);
    const y = params.get("price") && Number(params.get("price").split("-")[1]);
    console.log(x, y);
    setMin(x);
    setMax(y);
    fetchCategories();
    fetchBrands();
    fetchDelivery();
  }, []);

  const handleValuesMin = (e) => {
    // const x = Number(e.target.value) >= min ? Number(e.target.value) : min;
    const x = Number(e.target.value.replace(/\D/g, ""));
    setValues([x, values[1]]);
  };

  const handleValuesMax = (e) => {
    // const x = Number(e.target.value) <= max ? Number(e.target.value) : max;
    const x = Number(e.target.value.replace(/\D/g, ""));
    setValues([values[0], x]);
  };

  const handlePrice = () => {
    const y = values[0] < min ? min : values[0];
    const x = values[1] > max ? max : values[1];
    params.set("price", `${y}-${x}`);
    router.push(`${page}?${params.toString()}`, { scroll: false });
    window.location.reload(false);
  };

  const filters = [
    {
      name: "categorieën",
      items: categories,
    },
    { name: "merken", items: brands },
    {
      name: "prijs",
      items: [
        <div className={s.priceSlider}>
          <div className={s.top}>
            <input
              type="text"
              name="min"
              value={values[0]}
              onChange={handleValuesMin}
            />
            <span>-</span>
            <input
              type="text"
              name="max"
              value={values[1]}
              onChange={handleValuesMax}
            />
            <button onClick={handlePrice}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <div className={s.bottom}>
            <RangeSlider
              min={min}
              max={max}
              value={values}
              onInput={setValues}
              className="rangeSlider"
            />
          </div>
        </div>,
      ],
    },
    {
      name: "minimale beoordeling",
      items: [
        <Rating
          onClick={handleRating}
          selected={rating === "00" && true}
          check={true}
          rating={0}
        />,
        <Rating
          onClick={handleRating}
          selected={rating === "01" && true}
          check={true}
          rating={1}
        />,
        <Rating
          onClick={handleRating}
          selected={rating === "02" && true}
          check={true}
          rating={2}
        />,
        <Rating
          onClick={handleRating}
          selected={rating === "03" && true}
          check={true}
          rating={3}
        />,
        <Rating
          onClick={handleRating}
          selected={rating === "04" && true}
          check={true}
          rating={4}
        />,
        <Rating
          onClick={handleRating}
          selected={rating === "05" && true}
          check={true}
          rating={5}
        />,
      ],
    },
    {
      name: "bezorg opties",
      items: delivery,
    },
    { name: "aanbiedingen", items: ["aanbiedingen"] },
  ];

  const handleClick = (e) => {
    const x = e.target.id;
    const y = i[x] === false ? true : false;
    setI({ ...i, [e.target.id]: y });
  };

  const handleItemClick = (item, title) => {
    const titleSplit = title.split(" ")[0];

    const currentTitle = params.get(titleSplit);

    console.log(item, titleSplit);
    const x =
      titleSplit === "bezorg"
        ? item === "morgen bezorgd"
          ? 1
          : item === "3-5 werkdagen"
          ? 2
          : item === "5-10 werkdagen"
          ? 3
          : item === "10-14 werkdagen"
          ? 4
          : 5
        : item;

    typeof item !== "object" && currentTitle === item
      ? (params.delete(title),
        router.push(`${page}?${params.toString()}`, { scroll: false }))
      : handleParams(titleSplit, x);

    window.location.reload(false);
  };

  return (
    <div className={props.mobile ? `${s.container}${s.mobile}` : s.container}>
      <div className={s.content}>
        <ul className={s.main}>
          {filters.map((filter, index) => (
            <li
              key={index}
              id={`${index}`}
              className={`${s.main}`}
              onClick={handleClick}
            >
              <div className={s.title}>
                {filter.name}
                <FontAwesomeIcon
                  icon={i[index] ? faChevronDown : faChevronUp}
                />
              </div>
              <ul
                id={s[`index${index}`]}
                className={i[index] ? `${s.beta} ${s.closed}` : `${s.beta} `}
              >
                {params &&
                  props.data.length > 0 &&
                  filter.items.map((item, i) => (
                    <li key={i}>
                      {typeof item === "string" ? (
                        <div>
                          <input
                            onChange={() => {
                              handleItemClick(item, filter.name);
                            }}
                            type="checkbox"
                            name={filter.name}
                            id={item}
                            value={item}
                            defaultChecked={currentSelected.indexOf(item) > -1}
                          />
                          <label htmlFor={item}>{item}</label>
                        </div>
                      ) : (
                        item
                      )}
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Filter;
