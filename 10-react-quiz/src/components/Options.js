import { useQuiz } from "../context/QuizContext";

function Options({ question }) {
  const { dispatch, answers, index } = useQuiz();
  const answer = answers.at(index);

  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          onClick={() => {
            if (!hasAnswered) {
              dispatch({ type: "newAnswer", payload: index });
            }
          }}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
