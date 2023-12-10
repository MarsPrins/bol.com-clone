"use client";

import * as s from "@/styles/header/header.module.scss";
import { useEffect, useReducer, useRef, useState } from "react";
import useKeyPress from "../useKeyPress";
import { useRouter } from "next/navigation";
import useApiUrl from "../apiUrl";
import axios from "axios";

const initialState = { selectedIndex: 0 };

export default function Search() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  const [isClient, setClient] = useState(false);
  const li = useRef(null);
  const inputRef = useRef(null);

  const router = useRouter();

  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");
  const [state, dispatch] = useReducer(reducer, initialState);

  const apiUrl = useApiUrl();

  async function getSearch(e) {
    setInput(e.target.value);
    const i = e.target.value;
    const res = await axios.get(`${apiUrl}/products/autocomplete?q=${i}`);
    setData(res.data);
  }
  function reducer(state, action) {
    switch (action.type) {
      case "arrowUp":
        return {
          selectedIndex:
            state.selectedIndex !== 0
              ? state.selectedIndex - 1
              : data.length - 1,
        };
      case "arrowDown":
        return {
          selectedIndex:
            state.selectedIndex !== data.length - 1
              ? state.selectedIndex + 1
              : 0,
        };
      case "select":
        return { selectedIndex: action.payload };
      default:
        throw new Error();
    }
  }

  useEffect(() => {
    setClient(true);

    if (arrowUpPressed) {
      dispatch({ type: "arrowUp" });
    }
  }, [arrowUpPressed]);

  useEffect(() => {
    if (arrowDownPressed) {
      dispatch({ type: "arrowDown" });
    }
  }, [arrowDownPressed]);

  const onKeyPressHandler = (e) => {
    // e.preventDefault();
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    // if (isClient) {
    const x = input.replace(/\s/g, "+");
    router.push(`/nl/q/${x}/1?view=list`);
    inputRef.current.blur();
    setFocused(false);
    // }
  };

  useEffect(() => {
    const value = data[state.selectedIndex];
    value && setInput(value.title);
  }, [state.selectedIndex]);

  return (
    <>
      <div className={s.inputCont}>
        <div className={s.fullInput}>
          <input
            onKeyPress={onKeyPressHandler}
            onChange={getSearch}
            type="text"
            placeholder="Waar ben je naar opzoek?"
            value={input}
            onClick={() => {
              setFocused(true);
            }}
            ref={inputRef}
          />
          <button onClick={handleSearch}>
            <svg viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M23 24c-.3 0-.5-.1-.7-.3l-6-6C14.6 19.2 12.4 20 10 20 4.5 20 0 15.5 0 10S4.5 0 10 0s10 4.5 10 10c0 2.4-.8 4.6-2.3 6.3l6 6c.2.2.3.5.3.7s-.1.5-.3.7-.4.3-.7.3zM10 2c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z"
              />
            </svg>
          </button>
        </div>
      </div>
      {focused ? (
        <>
          <div
            className={`${s.output} ${
              data && data.length === 0 && s.outputNoData
            } }`}
          >
            {data && data.length !== 0 ? <span>Zoek suggesties</span> : null}
            {input ? (
              <ul>
                {data
                  ? data.map((product, i) => (
                      <li
                        ref={li}
                        key={i}
                        className={i === state.selectedIndex ? s.hovered : null}
                        onClick={() => {
                          setInput(product.title);
                          dispatch({ type: "select", payload: i });
                          inputRef.current.focus();
                        }}
                        role="button"
                        aria-pressed={i === state.selectedIndex}
                        tabIndex={0}
                        onKeyPress={onKeyPressHandler}
                      >
                        <button>{product.title}</button>
                      </li>
                    ))
                  : null}
              </ul>
            ) : null}
          </div>
          <span
            className={s.overlay}
            onClick={() => {
              setFocused(false);
            }}
          ></span>
        </>
      ) : null}
    </>
  );
}
