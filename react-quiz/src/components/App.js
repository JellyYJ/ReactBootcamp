import { useEffect, useReducer } from "react";

import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import Start from "./Start";
import Main from "./Main";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finish from "./Finish";
import Timer from "./Timer";
import Footer from "./Footer";
import PreviousButton from "./PreviousButton";

const TIME_PER_QUESTION = 30;

// ********************************* */
// useReducer Hook takes two augments:
// 1. A reducer function 2. An initial state

// This is the initial state
// avoiding re-create initial states
const initalState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finish'
  status: "loading",
  index: 0,
  // answer: null,
  answers: [], // added prevQuestion function, so need an array to store user's answers
  points: 0,
  highScore: 0,
  secondRemaining: null,
};

// This is the reducer function
// Warning:
// NO mutation to the exsiting state/object
// Instead, need to return new object
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      const initialAnswers = Array.from(
        { length: state.questions.length },
        () => null
      );
      return {
        ...state,
        questions: action.payload,
        answers: initialAnswers,
        status: "ready",
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * TIME_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      const newAnswers = [...state.answers];
      newAnswers[state.index] = action.payload;

      return {
        ...state,
        // answer: action.payload,
        answers: newAnswers,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "prevQuestion":
      return {
        ...state,
        index: state.index - 1,
        // answer: state.answer,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        // answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initalState,
        questions: state.questions,
        status: "ready",
      };
    // return {
    //   ...state,
    //   points: 0,
    //   highScore: 0,
    //   index: 0,
    //   answer: null,
    //   statuse: "ready",
    // };
    case "clock":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unkown");
  }
}

export default function App() {
  // Uncontruct the states
  const [
    { questions, status, index, answers, points, highScore, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initalState);

  const numQuestions = questions.length;
  // array.reduce(callback, initialValue) generic JS fucntion
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, [dispatch]); // !!! dispatch in the ependency array to avoid unecessary re-fetching

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <Start numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              // answer={answer}
              answer={answers[index]}
            />

            <Question
              question={questions[index]}
              dispatch={dispatch}
              // answer={answer}
              answer={answers[index]}
            />

            <Footer>
              <Timer dispatch={dispatch} secondRemaining={secondRemaining} />
              <NextButton
                dispatch={dispatch}
                // answer={answer}
                answer={answers[index]}
                index={index}
                numQuestions={numQuestions}
              />
              <PreviousButton
                dispatch={dispatch}
                // answer={answer}
                answer={answers[index]}
                index={index}
              />
            </Footer>
          </>
        )}

        {status === "finished" && (
          <Finish
            dispatch={dispatch}
            points={points}
            maxPoints={maxPoints}
            highScore={highScore}
          />
        )}
      </Main>
    </div>
  );
}
