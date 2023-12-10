import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

export default function RatingComp(props) {
  const withChecked = props.check;
  const value = props.rating;
  if (props.rating == undefined) {
    return "undefined";
  } else {
    if (withChecked) {
      return (
        <div>
          <input
            onClick={props.onClick}
            type="radio"
            id={`0${props.rating}`}
            name="rating"
            defaultChecked={props.selected}
          />
          <label htmlFor={`0${props.rating}`}>
            <Rating
              name="read-only"
              value={value}
              readOnly
              precision={0.1}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
          </label>
        </div>
      );
    } else {
      return (
        <div>
          <Rating
            name="read-only"
            value={value}
            readOnly
            precision={0.1}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
        </div>
      );
    }
  }
  return;
}
