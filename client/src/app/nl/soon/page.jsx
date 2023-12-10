import * as s from "@/styles/comingSoon.module.scss";
import Link from "next/link";

function page() {
  return (
    <div className={s.container}>
      <div className={s.content}>
        <span className={s.coming}>
          <div className={s.comingCont}>
            <p>
              Coming <br /> Soon{" "}
            </p>
            <svg viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M6.6951 2.23866C6.24019 1.25284 5.32568 0.498648 4.17546 0.295832C2.31042 -0.0330246 0.531916 1.2123 0.203059 3.07734C0.00117558 4.22228 0.392547 5.3346 1.15635 6.09895C2.94359 4.08757 4.30177 3.09528 6.6951 2.23866ZM20.6626 15.3901C19.676 20.9852 14.3405 24.7212 8.74536 23.7346C3.15023 22.748 -0.585736 17.4125 0.400835 11.8174C1.38741 6.22226 6.72292 2.48629 12.318 3.47286C17.9132 4.45943 21.6491 9.79495 20.6626 15.3901ZM18.0241 4.2368C18.7888 3.46602 19.9061 3.07009 21.0563 3.2729C22.9214 3.60176 24.1667 5.38027 23.8378 7.24531C23.6359 8.39025 22.8877 9.30163 21.9086 9.75865C20.917 7.2573 19.9802 5.86032 18.0241 4.2368ZM12.4188 7.84265L10.7303 7.54492L9.24219 15.9872L15.1519 17.0292L15.4496 15.3407L11.228 14.5963L12.4188 7.84265Z"
              />
            </svg>
          </div>
        </span>
        <div className={s.bottom}>
          <div className={s.bottomCont}>
            <span className={s.head}>Deze pagina bestaat nog niet.</span>
            <p>
              Deze pagina is nog in ontwikkeling of is alleen een representatie
              dat deze pagina zou kunnen bestaan als u de ontwikkelaar,{" "}
              <Link
                target="blank"
                href="https://www.upwork.com/freelancers/~018cd4b08f1448ba85"
              >
                Mars Prins
              </Link>
              , zou inhuren voor uw projecten.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
