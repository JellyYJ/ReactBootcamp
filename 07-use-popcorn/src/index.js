import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./App";
import StarRating from "./StarRating";

// Allows the consumer  wants to use the rating value elsewhere
function Test() {
  const [rating, setRating] = useState(0);
  return (
    <div>
      <StarRating
        color="green"
        maxRating={10}
        onSetRatingExternal={setRating}
      ></StarRating>
      <p>This movie is rated {rating} stars</p>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={5} />
    <StarRating />
    <StarRating maxRating={10} color="red" size={24} className="test" />
    <StarRating
      maxRating={5}
      messages={["Terrible", "Ok", "Good", "Great", "Amazing"]}
    />

    <Test />
  </React.StrictMode>
);
