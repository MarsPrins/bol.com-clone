import * as s from "@/styles/main/aanbiedingRIj.module.scss";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const AanbiedingRij = () => {
  return (
    <section className={s.aanbiedingRij}>
      <div className={s.content}>
        <div className={s.left}>
          <span className={s.title}>Alle aanbiedingen</span>
          <span className={s.caption}>op een rij</span>
          <Link href={`/nl/category/sale`}>
            <button className={s.cta}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </Link>
        </div>
        <div className={s.right}>
          <div className={s.img}></div>
        </div>
      </div>
    </section>
  );
};

export default AanbiedingRij;
