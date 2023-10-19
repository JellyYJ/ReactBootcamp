import { useQuiz } from "../context/QuizContext";

function PreviousButton() {
  const { dispatch, index } = useQuiz();

  if (index > 0)
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "prevQuestion" })}
        >
          Previous
        </button>
      </div>
    );
}

export default PreviousButton;
