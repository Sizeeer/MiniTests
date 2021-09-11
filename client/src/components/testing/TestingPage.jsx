//Core
import { useEffect, useState, Suspense, lazy } from "react";
import { Modal, Button, Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Question } from "./Question";

import logo from "../../assets/images/MyTests.svg";

import Loader from "../common/Loader";

const ResultModal = ({ show, handleClose, result }) => {
  return (
    <Modal show={show} onHide={handleClose} animation={false} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">
          Ваш результат
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{result}</p>
        <Link className="link-primary" to="/tests">
          Отправить
        </Link>
      </Modal.Body>
    </Modal>
  );
};

const TestingPage = () => {
  const [questions, setQuestions] = useState([]);
  const [result, setResult] = useState([]);
  const [testTitle, setTestTitle] = useState("");

  const [currentQuestion, setCurrentQuestion] = useState(1);

  const [answers, setAnswers] = useState([]);
  const [resultState, setResultState] = useState("");

  const [isShowResult, setIsShowResult] = useState(false);

  useEffect(() => {
    setQuestions(JSON.parse(localStorage.getItem("questions")));
    setResult(JSON.parse(localStorage.getItem("result")));
    setTestTitle(JSON.parse(localStorage.getItem("testTitle")));

    return () => {
      setQuestions([]);
      setResult([]);
      setTestTitle("");
    };
  }, []);

  const handleClose = () => setIsShowResult(false);
  const handleShow = () => setIsShowResult(true);

  const addAnswer = (answer) => {
    setAnswers((prev) => [...prev, answer]);
  };

  const toNext = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  const checkResult = () => {
    const sum = answers.reduce((acc, curr) => acc + curr);

    const currentResult = result.find((el) => {
      if (sum >= el.from && sum <= el.to) {
        return el;
      }
    });

    setResultState(currentResult.title);
    handleShow();
  };

  return (
    <Suspense fallback={<Loader />}>
      <div
        style={{
          backgroundImage: `url(https://i.stack.imgur.com/90nGa.jpg)`,
          width: "100%",
          height: "100vh",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
        ></div>
        <Navbar>
          <Navbar.Brand>
            <Link to="/tests">
              <img
                src={logo}
                alt="Logo"
                className="d-inline-block align-top"
                style={{ width: 130 }}
              />
            </Link>
          </Navbar.Brand>
        </Navbar>
        <Container className="d-flex justify-content-center align-items-center vh-100">
          {questions.length && (
            <Question
              questionLength={questions.length}
              question={questions[currentQuestion - 1]}
              addAnswer={addAnswer}
              currentQuestion={currentQuestion}
              toNext={toNext}
              checkResult={checkResult}
              testTitle={testTitle}
            />
          )}
        </Container>

        <ResultModal
          show={isShowResult}
          handleClose={handleClose}
          result={resultState}
        />
      </div>
    </Suspense>
  );
};

export default TestingPage;
