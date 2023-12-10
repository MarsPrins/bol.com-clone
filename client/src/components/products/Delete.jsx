import * as s from "@/styles/product/delete.module.scss";

function Delete(props) {
  return (
    <div className={s.deleteCont}>
      <div onClick={props.onClick} role="button" className={s.delete}>
        <svg viewBox="0 0 14 14">
          <path
            fill="currentColor"
            d="M4 4l.484 7.752a.266.266 0 00.257.248H9.26a.262.262 0 00.257-.248L10 4h1l-.445 8.002c-.03.551-.493.998-1.058.998H4.503a1.07 1.07 0 01-1.058-.998L3 4h1zM2 3a1 1 0 01.999-1H6.04v-.003A.948.948 0 017 1c.552 0 1 .453 1 .997V2h2.99c.558 0 1.01.453 1.01 1H2zm3.5 1h1v5.509a.5.5 0 01-1 0V4zm2 0h1v5.509a.5.5 0 01-1 0V4z"
          />
        </svg>
      </div>
    </div>
  );
}

export default Delete;
