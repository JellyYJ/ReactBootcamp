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
import Footer from "./Footer";

import { useQuiz } from "../context/QuizContext";

function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <Start />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
              <PreviousButton />
            </Footer>
          </>
        )}
        {status === "finished" && <Finish />}
      </Main>
    </div>
  );
}
export default App;
