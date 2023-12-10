import * as s from "@/styles/header/header.module.scss";

import Link from "next/link";
import Search from "@/components/header/Search";
import { cookies } from "next/headers";
import useApiUrl from "../apiUrl";
import parseJwt from "../parseJWT";
import MobileMenu from "./MobileMenu";
import categoryArray from "../categoryArray";

async function MainHeader() {
  const Cookies = cookies();

  const token = Cookies.get("token") && Cookies.get("token").value;
  const userId = token && parseJwt(token).id;

  const loggedIn = token && true;

  const apiUrl = useApiUrl();

  const cartRes = await fetch(`${apiUrl}/carts/find/${userId}`, {
    headers: {
      token: token,
    },
  });

  // update everytime endpoint changes

  const cartData = token ? await cartRes.json() : null;

  if (cartData == null) {
    console.log("no cart");
    // get localstorage items

    // set quantity
  }

  const arr = [];

  cartData !== null && cartData.products.length > 0
    ? cartData.products.map((p, i) => {
        arr.push(p.quantity);
      })
    : null;

  const quantity =
    arr.length > 0 &&
    arr.reduce(function (a, b) {
      return a + b;
    });

  console.log(quantity);

  const res = await fetch(`${apiUrl}/products/categories/`).then((res) =>
    res.json()
  );
  const catArray = categoryArray(res);

  // count up the quantitys of the cart items

  return (
    <div>
      <header className={s.mobileHeader}>
        <div className={s.topHeaderCont}>
          <div className={s.left}>
            <button className={s.menuButton}>
              <MobileMenu array={catArray} />
            </button>
            {/* <span className={s.overlay}></span> */}
            <button>
              <Link href="/" className={s.logo}>
                <span>
                  Mars<b>.</b>
                </span>
              </Link>
            </button>
          </div>
          <div className={s.right}>
            <ul>
              <li>
                <button>
                  <Link href={loggedIn == true ? "" : "/auth/login"}>
                    <svg viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12 24c-3 0-7.1-.7-9-2.5-.6-.6-1-1.4-1-2.2 0-3.8 2.6-7.2 6.3-8.6C6.9 9.6 6 7.9 6 6c0-3.3 2.7-6 6-6s6 2.7 6 6c0 1.9-.9 3.6-2.3 4.7 3.6 1.4 6.3 4.8 6.3 8.6 0 3.4-6 4.7-10 4.7zm0-12c-4.3 0-8 3.3-8 7.3 0 .1 0 .4.4.7 1.1 1.1 4.3 2 7.6 2 4.5 0 8-1.5 8-2.7 0-4-3.7-7.3-8-7.3zm0-10C9.8 2 8 3.8 8 6s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"
                      />
                    </svg>
                  </Link>
                </button>
              </li>
              <li>
                <button>
                  <Link href="/nl/wishlist">
                    <svg viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M14.4612 2.49501C15.2499 2.16821 16.0953 2 16.949 2C17.8027 2 18.6481 2.16821 19.4368 2.49501C20.2254 2.82176 20.9419 3.30064 21.5454 3.90431C22.149 4.50779 22.6282 5.2246 22.955 6.01317C23.2818 6.80189 23.45 7.64726 23.45 8.50101C23.45 9.35475 23.2818 10.2001 22.955 10.9888C22.7593 11.4612 22.4407 11.8981 22.1441 12.2526C21.8405 12.6157 21.5108 12.9493 21.2543 13.2057C21.2542 13.2057 21.2543 13.2056 21.2543 13.2057L12.7555 21.7044C12.568 21.892 12.3137 21.9973 12.0484 21.9973C11.7832 21.9973 11.5289 21.892 11.3413 21.7044L2.8426 13.2057C1.73995 12.103 0.550003 10.3536 0.550003 8.50101C0.550003 6.77697 1.23487 5.12355 2.45395 3.90448C3.67302 2.6854 5.32644 2.00053 7.05047 2.00053C8.77451 2.00053 10.4279 2.6854 11.647 3.90448L11.9997 4.25721L12.3523 3.90464C12.9558 3.30082 13.6724 2.82182 14.4612 2.49501ZM16.949 4C16.358 4 15.7728 4.11645 15.2267 4.34268C14.6807 4.56892 14.1847 4.90051 13.7669 5.31853L12.7068 6.37853C12.3163 6.76906 11.6832 6.76906 11.2926 6.37853L10.2328 5.31869C9.38878 4.47469 8.24407 4.00053 7.05047 4.00053C5.85687 4.00053 4.71216 4.47469 3.86816 5.31869C3.02416 6.16269 2.55 7.30741 2.55 8.50101C2.55 9.56601 3.29639 10.8311 4.25681 11.7915L12.0484 19.5831L19.8401 11.7915C20.0945 11.5372 20.3686 11.2581 20.61 10.9695C20.8586 10.6723 21.0265 10.4183 21.1073 10.2233C21.3336 9.67725 21.45 9.09202 21.45 8.50101C21.45 7.90999 21.3336 7.32476 21.1073 6.77876C20.8811 6.23275 20.5495 5.73667 20.1315 5.31886C19.7137 4.90085 19.2173 4.56892 18.6712 4.34268C18.1252 4.11644 17.54 4 16.949 4Z"
                      />
                    </svg>
                  </Link>
                </button>
              </li>
              <li>
                <button className={s.cart}>
                  <Link href="/nl/cart">
                    <svg viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M23.9 6.5c0-.8-.7-1.5-1.5-1.5H5.8l-1-4H1c-.6 0-1 .4-1 1s.4 1 1 1h2.2L4 6.2l2.9 11.6c-.5.6-.9 1.4-.9 2.2 0 1.7 1.3 3 3 3s3-1.3 3-3c0-.4-.1-.7-.2-1h4.4c-.1.3-.2.6-.2 1 0 1.7 1.3 3 3 3s3-1.3 3-3c0-.9-.4-1.6-.9-2.2l2.7-11c0-.1.1-.2.1-.3zM10 20c0 .6-.4 1-1 1s-1-.4-1-1 .4-1 1-1 1 .4 1 1zm9 1c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm.2-4H8.8L6.3 7h15.4l-2.5 10z"
                      />
                    </svg>
                    {cartData !== null && cartData.products.length > 0 && (
                      <div className={s.amount}>{quantity}</div>
                    )}
                  </Link>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className={s.bottomHeaderCont}>
          <Search />
        </div>
      </header>

      {/* desktop */}

      <header className={s.desktopHeader}>
        <div className={s.mainHeaderCont}>
          <div className={s.content}>
            <div className={s.left}>
              <button>
                <Link href="/" className={s.logo}>
                  <span>
                    Mars<b>.</b>
                  </span>
                </Link>
              </button>
            </div>
            <Search />
            <div className={s.right}>
              <ul>
                <li>
                  <button>
                    <Link
                      href={loggedIn ? "/nl/auth/logout" : "/nl/auth/login"}
                    >
                      <p>{loggedIn ? "Uitloggen" : "Inloggen"}</p>
                    </Link>
                  </button>
                </li>
                <li>
                  <button>
                    <Link href="/nl/wishlist">
                      <svg viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M14.4612 2.49501C15.2499 2.16821 16.0953 2 16.949 2C17.8027 2 18.6481 2.16821 19.4368 2.49501C20.2254 2.82176 20.9419 3.30064 21.5454 3.90431C22.149 4.50779 22.6282 5.2246 22.955 6.01317C23.2818 6.80189 23.45 7.64726 23.45 8.50101C23.45 9.35475 23.2818 10.2001 22.955 10.9888C22.7593 11.4612 22.4407 11.8981 22.1441 12.2526C21.8405 12.6157 21.5108 12.9493 21.2543 13.2057C21.2542 13.2057 21.2543 13.2056 21.2543 13.2057L12.7555 21.7044C12.568 21.892 12.3137 21.9973 12.0484 21.9973C11.7832 21.9973 11.5289 21.892 11.3413 21.7044L2.8426 13.2057C1.73995 12.103 0.550003 10.3536 0.550003 8.50101C0.550003 6.77697 1.23487 5.12355 2.45395 3.90448C3.67302 2.6854 5.32644 2.00053 7.05047 2.00053C8.77451 2.00053 10.4279 2.6854 11.647 3.90448L11.9997 4.25721L12.3523 3.90464C12.9558 3.30082 13.6724 2.82182 14.4612 2.49501ZM16.949 4C16.358 4 15.7728 4.11645 15.2267 4.34268C14.6807 4.56892 14.1847 4.90051 13.7669 5.31853L12.7068 6.37853C12.3163 6.76906 11.6832 6.76906 11.2926 6.37853L10.2328 5.31869C9.38878 4.47469 8.24407 4.00053 7.05047 4.00053C5.85687 4.00053 4.71216 4.47469 3.86816 5.31869C3.02416 6.16269 2.55 7.30741 2.55 8.50101C2.55 9.56601 3.29639 10.8311 4.25681 11.7915L12.0484 19.5831L19.8401 11.7915C20.0945 11.5372 20.3686 11.2581 20.61 10.9695C20.8586 10.6723 21.0265 10.4183 21.1073 10.2233C21.3336 9.67725 21.45 9.09202 21.45 8.50101C21.45 7.90999 21.3336 7.32476 21.1073 6.77876C20.8811 6.23275 20.5495 5.73667 20.1315 5.31886C19.7137 4.90085 19.2173 4.56892 18.6712 4.34268C18.1252 4.11644 17.54 4 16.949 4Z"
                        />
                      </svg>
                    </Link>
                  </button>
                </li>
                <li>
                  <button className={s.cart}>
                    <Link href="/nl/cart">
                      <svg viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M23.9 6.5c0-.8-.7-1.5-1.5-1.5H5.8l-1-4H1c-.6 0-1 .4-1 1s.4 1 1 1h2.2L4 6.2l2.9 11.6c-.5.6-.9 1.4-.9 2.2 0 1.7 1.3 3 3 3s3-1.3 3-3c0-.4-.1-.7-.2-1h4.4c-.1.3-.2.6-.2 1 0 1.7 1.3 3 3 3s3-1.3 3-3c0-.9-.4-1.6-.9-2.2l2.7-11c0-.1.1-.2.1-.3zM10 20c0 .6-.4 1-1 1s-1-.4-1-1 .4-1 1-1 1 .4 1 1zm9 1c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm.2-4H8.8L6.3 7h15.4l-2.5 10z"
                        />
                      </svg>
                      {cartData !== null && cartData.products.length > 0 && (
                        <div className={s.amount}>{quantity}</div>
                      )}
                    </Link>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default MainHeader;
