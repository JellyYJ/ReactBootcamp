import { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

function Timer() {
  const { dispatch, secondRemaining } = useQuiz();

  const mins = Math.floor(secondRemaining / 60);
  const seconds = secondRemaining % 60;

  useEffect(
    function () {
      // Need cleanup function to stop the timer
      const id = setInterval(function () {
        dispatch({ type: "clock" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
