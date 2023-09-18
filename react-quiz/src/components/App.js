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

// ********************************* */
// useReducer Hook takes two augments:
// 1. A reducer function 2. An initial state
const initalState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finish'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
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
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
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

    default:
      throw new Error("Action unkown");
  }
}

export default function App() {
  // Uncontruct the states
  const [{ questions, status, index, answer, points, highScore }, dispatch] =
    useReducer(reducer, initalState);

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
              answer={answer}
            />

            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
            />
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
