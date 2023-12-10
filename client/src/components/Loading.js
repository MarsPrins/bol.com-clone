import * as s from "@/styles/smallLoading.module.scss";

function Loading(props) {
  return (
    <div style={{ height: props.height }} className={s.loading}>
      <div className={s.loadingCont} style={{ padding: props.padding }}>
        <div
          className={s.loader}
          style={props.width && { width: props.width, aspectRatio: "unset" }}
        ></div>
      </div>
    </div>
  );
}

export default Loading;
