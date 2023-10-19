import { useQuiz } from "../context/QuizContext";

// Decide if it wants to render itself or not
function NextButton() {
  const { dispatch, answers, index, numQuestions } = useQuiz();
  const answer = answers.at(index);

  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      </div>
    );

  if (index === numQuestions - 1)
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finish" })}
        >
          Finish
        </button>
      </div>
    );
}

export default NextButton;
