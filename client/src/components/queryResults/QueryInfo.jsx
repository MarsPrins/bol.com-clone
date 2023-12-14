"use client";

import * as s from "@/styles/queryResults/queryInfo.module.scss";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { faChevronDown, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Filter from "./Filter";

function QueryInfo(props) {
  const [page, setPage] = useState(null);
  const [view, setView] = useState("");
  const [sort, setSort] = useState("");
  const [params, setParams] = useState("");
  const [open, setOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPage(params.get("page"));
    setView(params.get("view"));
    setSort(params.get("sort") ? params.get("sort") : null);
    setParams(params);
  }, []);

  const handleParams = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    id === "sort" ? setSort(value) : id === "view" ? setView(value) : null;
    params.set(id, value);
    router.push(`q?${params.toString()}`);
    // window.location.reload(false);
  };

  const openModal = () => {
    console.log("open");
  };

  const handleFilter = () => {
    setOpen(!open && true);

    open
      ? document.body.classList.remove("menuOpen")
      : document.body.classList.add("menuOpen");
  };

  return (
    <>
      <span
        onClick={handleFilter}
        className={!open ? s.overlay : `${s.overlay} ${s.active}`}
      ></span>
      <div className={!open ? s.fullFilter : `${s.fullFilter} ${s.active}`}>
        <div className={s.top}>
          <FontAwesomeIcon role="button" icon={faX} onClick={handleFilter} />
        </div>
        <div className={s.bottom}>
          <Filter data={props.data} />
        </div>
      </div>
      <div className={s.container}>
        <div className={s.content}>
          <h1>
            {`'${props.title ? props.title : "loading..."}'`} in alle artikelen
          </h1>
          <button onClick={handleFilter} className={s.filter}>
            <svg viewBox="0 0 14 14">
              <path
                fill="currentColor"
                //   fillRule="evenodd"
                d="M4.5 8.5a1.5 1.5 0 011.414 1h5.583c.247 0 .452.183.495.412L12 10c0 .276-.233.5-.503.5H5.915a1.5 1.5 0 01-2.83 0h-.58a.51.51 0 01-.497-.412L2 10c0-.276.214-.5.505-.5h.58a1.5 1.5 0 011.415-1zm0 1a.5.5 0 10.491.593L5 9.995l-.007-.085A.5.5 0 004.5 9.5zm5-4a1.5 1.5 0 011.414 1h.581a.51.51 0 01.497.412L12 7c0 .276-.214.5-.505.5h-.58a1.5 1.5 0 01-2.83 0H2.503a.509.509 0 01-.495-.412L2 7c0-.276.233-.5.503-.5h5.583a1.5 1.5 0 011.414-1zm0 1a.5.5 0 10.491.593L10 6.994l-.007-.084A.5.5 0 009.5 6.5zm-5-4a1.5 1.5 0 011.414 1h5.583c.247 0 .452.183.495.412L12 4c0 .276-.233.5-.503.5H5.915a1.5 1.5 0 01-2.83 0h-.58a.51.51 0 01-.497-.412L2 4c0-.276.214-.5.505-.5h.58a1.5 1.5 0 011.415-1zm0 1a.5.5 0 10.491.593L5 3.995l-.007-.085A.5.5 0 004.5 3.5z"
              />
            </svg>
          </button>
          <div className={s.interactive}>
            <div className={s.sort}>
              <div className={s.dropdown}>
                <select
                  id="sort"
                  // {...(sort ? (value = { sort }) : null)}
                  value={sort ? sort : undefined}
                  onChange={handleParams}
                >
                  <option id="sort" value="relevance">
                    relevantie
                  </option>
                  <option id="sort" value="popularity">
                    populariteit
                  </option>
                  <option id="sort" value="price0">
                    prijs laag - hoog
                  </option>
                  <option id="sort" value="price1">
                    prijs hoog - laag
                  </option>
                  <option id="sort" value="rating">
                    beordelingen
                  </option>
                </select>
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
              {/* <button onClick={openModal}>
                <svg viewBox="0 0 14 14">
                  <path
                    fill="currentColor"
                    d="M7 14A7 7 0 117 0a7 7 0 010 14zm-.033-1a6 6 0 100-12 6 6 0 000 12zm-.464-6.984a.512.512 0 01.509-.516h-.024c.283 0 .514.228.515.516l.027 3.968a.512.512 0 01-.509.516h.024a.516.516 0 01-.515-.516l-.027-3.968zM7.031 4.5a.5.5 0 110-1 .5.5 0 010 1z"
                  />
                </svg>
              </button> */}
            </div>
            {/* <button
            className={s.grid}
            id="view"
            value={view === "list" ? "grid" : "list"}
            onClick={handleParams}
          >
            <svg viewBox="0 0 14 14">
              <path
                fill="currentColor"
                d="M1.5 1.629h5v5h-5v-5zm1 1v3h3v-3h-3zm5-1h5v5h-5v-5zm1 1v3h3v-3h-3zm-1 5h5v5h-5v-5zm1 1v3h3v-3h-3zm-7-1h5v5h-5v-5zm1 1v3h3v-3h-3z"
              />
            </svg>
          </button> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default QueryInfo;
