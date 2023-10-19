import React from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Start from "./Start";
import Finish from "./Finish";
import Timer from "./Timer";
import Progress from "./Progress";
import NextButton from "./NextButton";
import PreviousButton from "./PreviousButton";
import Question from "./Question";

import { useQuiz } from "../Context/QuizContext";

const TIME_PER_QUESTION = 30;

function App() {
  const { state, dispatch } = useQuiz();

  const numQuestions = state.questions.length;
  const maxPoints = state.questions.reduce((prev, cur) => prev + cur.points, 0);

  return (
    <div className="app">
      <Header />
      <Main>
        {state.status === "loading" && <Loader />}
        {state.status === "error" && <Error />}
        {state.status === "ready" && (
          <Start numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {state.status === "active" && (
          <>
            <Progress
              index={state.index}
              numQuestions={numQuestions}
              points={state.points}
              maxPoints={maxPoints}
              answer={state.answers[state.index]}
            />
            <Question
              question={state.questions[state.index]}
              dispatch={dispatch}
              answer={state.answers[state.index]}
            />
            <div>
              <Timer
                dispatch={dispatch}
                secondRemaining={state.secondRemaining}
              />
              <NextButton
                dispatch={dispatch}
                answer={state.answers[state.index]}
                index={state.index}
                numQuestions={numQuestions}
              />
              <PreviousButton
                dispatch={dispatch}
                answer={state.answers[state.index]}
                index={state.index}
              />
            </div>
          </>
        )}
        {state.status === "finished" && (
          <Finish
            dispatch={dispatch}
            points={state.points}
            maxPoints={maxPoints}
            highScore={state.highScore}
          />
        )}
      </Main>
    </div>
  );
}
export default App;
