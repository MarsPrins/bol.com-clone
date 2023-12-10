import * as s from "@/styles/footer/footer.module.scss";
import Link from "next/link";

const CustomerServ = () => {
  return (
    <div className={s.customerService}>
      <div className={s.content}>
        <h3>Service & Contact</h3>
        <div className={s.container}>
          <div className={s.account}>
            <div className={s.svg}>
              <svg viewBox="0 0 48 48">
                <path
                  fill="currentColor"
                  d="M23.8 48c-6.5 0-14.6-1.5-18.1-5C4.6 41.9 4 40.6 4 39.3c0-8.3 6.2-15.5 14.5-17.7-3.7-1.9-6.2-5.7-6.2-10.2C12.4 5.1 17.5 0 23.8 0s11.5 5.1 11.5 11.5c0 4.4-2.5 8.2-6.2 10.2 8.3 2.2 14.5 9.4 14.5 17.7 0 5.5-10.2 8.6-19.8 8.6zm0-25.1C14.2 22.9 6 30.4 6 39.3c0 .8.4 1.6 1.1 2.3 2.6 2.6 9.4 4.4 16.6 4.4h.1c8.6 0 17.8-2.7 17.8-6.7 0-8.9-8.1-16.4-17.8-16.4zm0-20.9c-5.2 0-9.5 4.2-9.5 9.5s4.2 9.5 9.5 9.5c5.2 0 9.5-4.2 9.5-9.5S29 2 23.8 2z"
                />
              </svg>
            </div>
            <div className={s.text}>
              <strong>Snel regelen in je account</strong>
              <p>
                <Link href="/nl/soon">Volg je bestelling</Link>,{" "}
                <Link href="/nl/soon">betaal facturen</Link> of{" "}
                <Link href="/nl/soon">retourneer facturen</Link>.
              </p>
            </div>
          </div>
          <div className={s.service}>
            <div className={s.svg}>
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.52 14A9.07 9.07 0 106 7.23a8.43 8.43 0 00-3.51 2.13 8.6 8.6 0 00-1 10.92l-.71 2.93 2.93-.73a8.58 8.58 0 0010.93-1 8.62 8.62 0 002.12-3.58 8.5 8.5 0 003.12-1.27l2.74.69a.69.69 0 00.44-.15.4.4 0 00.15-.44zm-8.62 6.8a7.57 7.57 0 01-9.65.89l-.34-.25-1.81.39.44-1.76-.25-.34a7.58 7.58 0 1111.61 1.08zm6-5.19a.38.38 0 00-.4.05 7.74 7.74 0 01-2.5 1.17 8.55 8.55 0 00-2.37-7.47A8.67 8.67 0 007.12 7 7.81 7.81 0 019.2 3.33a8.16 8.16 0 0111.46 0 8.1 8.1 0 01.93 10.29.5.5 0 00-.05.39l.46 2.15zm-5.9-.28a5.2 5.2 0 01-5.29 5.14 5.24 5.24 0 01-5.29-5.14.47.47 0 01.49-.49.47.47 0 01.49.49 4.25 4.25 0 004.31 4.16A4.25 4.25 0 0013 15.33a.5.5 0 011 0z"
                />
              </svg>
            </div>
            <div className={s.text}>
              <strong>Heb je ons nodig?</strong>
              <p>
                Wij helpen je graag.{" "}
                <Link href="/nl/soon">Onze klantenservice</Link> is dag en nacht
                open
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerServ;
