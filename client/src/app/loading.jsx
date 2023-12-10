import * as s from "@/styles/loading.module.scss";

function loading() {
  return (
    <div className={s.loading}>
      <div className={s.loadingCont}>
        <div className={s.loader}></div>
      </div>
    </div>
  );
}

export default loading;
