import { Children } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";

const QuizContext = createContext();

const TIME_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answers: [],
  points: 0,
  highScore: 0,
  secondRemaining: null,
};

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
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
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
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
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

function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Fetch data from your API or wherever you get your quiz questions
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => {
        // Dispatch the dataReceived action to update the state with the received questions
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch((err) => {
        // Dispatch the dataFailed action in case of an error
        dispatch({ type: "dataFailed" });
      });
  }, [dispatch]);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext); // tell React which context we want to read from
  if (context === undefined) {
    throw new Error("CitiesContext is used outside the CitiesProvider");
  }
  return context;
}

export { QuizProvider, useQuiz };
