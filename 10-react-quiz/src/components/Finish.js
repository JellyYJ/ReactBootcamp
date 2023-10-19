import { useQuiz } from "../context/QuizContext";

function Finish() {
  const { points, maxPoints, highScore, dispatch } = useQuiz();

  const percentage = (points / maxPoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🙌";
  if (percentage >= 70 && percentage < 100) emoji = "💪";
  if (percentage >= 40 && percentage < 70) emoji = "👌";
  if (percentage >= 0 && percentage < 40) emoji = "^_^";
  if (percentage === 0) emoji = "🤔";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        You scored <strong>{points}</strong> out of {maxPoints}({" "}
        {Math.ceil(percentage)}%)
      </p>

      <p className="highscore">(High: {highScore})</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default Finish;
