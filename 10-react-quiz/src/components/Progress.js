import { useQuiz } from "../context/QuizContext";

function Progress() {
  const { numQuestions, index, points, maxPoints, answers } = useQuiz();
  const answer = answers.at(index);

  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />

      <p>
        Question <strong>{index + 1}</strong> /{numQuestions}
      </p>

      <p>
        Points <strong>{points}</strong> /{maxPoints}
      </p>
    </header>
  );
}

export default Progress;
