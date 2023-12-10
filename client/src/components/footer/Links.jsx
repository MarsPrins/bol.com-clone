import * as s from "@/styles/footer/footer.module.scss";
import Link from "next/link";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faTwitter,
  faPinterest,
  faInstagram,
  faYoutube,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Links = () => {
  return (
    <div className={s.links}>
      <div className={s.content}>
        <div className={s.object}>
          <Link className={s.temp} href="/nl/soon">
            <h2>Klantenservice</h2>
            <button className={s.cta}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </Link>
          <div className={s.noLink}>
            <Link href="/nl/soon">
              <h2>Klantenservice</h2>
            </Link>
          </div>
          <ul>
            <li>
              <Link href="/nl/soon">Contact opnemen</Link>
            </li>
            <li>
              <Link href="/nl/soon">Bestellen & leveren</Link>
            </li>
            <li>
              <Link href="/nl/soon">Betalen</Link>
            </li>
            <li>
              <Link href="/nl/soon">Retourneren</Link>
            </li>
            <li>
              <Link href="/nl/soon">Garantie & reparatie</Link>
            </li>
          </ul>
        </div>
        <div className={s.object}>
          <Link className={s.temp} href="/nl/soon">
            <h2>Over Mars.prins</h2>
            <button className={s.cta}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </Link>
          <div className={s.noLink}>
            <Link href="/nl/soon">
              <h2>Over Mars.prins</h2>
            </Link>
          </div>
          <ul>
            <li>
              <Link href="/nl/soon">De voordelen van Mars.prins</Link>
            </li>
            <li>
              <Link href="/nl/soon">Nieuws</Link>
            </li>
            <li>
              <Link href="/nl/soon">Werken bij Mars.prins</Link>
            </li>
            <li>
              <Link href="/nl/soon">Mars.prins & duurzaamheid</Link>
            </li>
            <li>
              <Link href="/nl/soon">Prinsendozen</Link>
            </li>
            <li>
              <Link href="/nl/soon">De Mars.prins app</Link>
            </li>
            <li>
              <Link href="/nl/soon">Bedrijfsgegevens</Link>
            </li>
          </ul>
        </div>
        <div className={s.object}>
          <Link className={s.temp} href="/nl/soon">
            <h2>Zakendoen met Mars.prins</h2>
            <button className={s.cta}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </Link>
          <div className={s.noLink}>
            <Link href="/nl/soon">
              <h2>Zakendoen met Mars.prins</h2>
            </Link>
          </div>
          <ul>
            <li>
              <Link href="/nl/soon">Zakelijk verkopen</Link>
            </li>
            <li>
              <Link href="/nl/soon">zakelijk bestellen</Link>
            </li>
            <li>
              <Link href="/nl/soon">Zakelijke cadeaukaarten</Link>
            </li>
            <li>
              <Link href="/nl/soon">Adverteren</Link>
            </li>
            <li>
              <Link href="/nl/soon">Affiliate marketing</Link>
            </li>
          </ul>
        </div>
        <div className={s.socials}>
          <strong>Wil je ons volgen?</strong>
          <ul>
            <li>
              <FontAwesomeIcon icon={faSquareFacebook} />
            </li>
            <li>
              <FontAwesomeIcon icon={faTwitter} />
            </li>
            <li>
              <FontAwesomeIcon icon={faPinterest} />
            </li>
            <li>
              <FontAwesomeIcon icon={faInstagram} />
            </li>
            <li>
              <FontAwesomeIcon icon={faYoutube} />
            </li>
            <li>
              <FontAwesomeIcon icon={faLinkedin} />
            </li>
          </ul>
          <p>
            <Link href="/nl/soon">Meld je aan</Link> voor korting en inspiratie
            in je mailbox{" "}
          </p>
        </div>
        <span className={s.line}></span>
      </div>
    </div>
  );
};

export default Links;
