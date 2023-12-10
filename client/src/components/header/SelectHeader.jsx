import * as s from "@/styles/header/header.module.scss";
import Link from "next/link";

function SelectHeader() {
  return (
    <div className={s.selectHeader}>
      <div className={s.container}>
        <div className={s.left}>
          <Link href="/nl/soon">
            <ul>
              <li>
                <b>Gratis</b> verzending vanaf 77,-
              </li>
              <li>Bezorgin dezelfde dag, &apos;s avonds of in het weekend*</li>
              <li>
                <b>Gratis</b> retourneren
              </li>
            </ul>
          </Link>
        </div>
        <div className={s.right}>
          <Link
            href="https://www.upwork.com/freelancers/~018cd4b08f1448ba85"
            target="blank"
          >
            <p>
              <b>MP Ultimate</b> Ontdek nu de 4 voordelen
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SelectHeader;
