export default function CheckFilter(props) {
  //

  return (
    <>
      <input id={props.title} type="checkbox" />
      <label htmlFor={props.title}>{props.title}</label>
    </>
  );
}
