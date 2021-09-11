import { useState } from "react";
import { Card, Form, Nav } from "react-bootstrap";

const AnswerItem = ({ addAnswer, answer, setIsChecked }) => {
  return (
    <>
      <input
        id={`radio${answer.title}`}
        type="radio"
        name="radio"
        value={answer.weight}
        onClick={(e) => {
          setIsChecked(true);
          addAnswer(answer.weight);
        }}
      />
      <label htmlFor={`radio${answer.title}`}>{answer.title}</label>
    </>
  );
};

export const Question = ({
  questionLength,
  question,
  currentQuestion,
  checkResult,
  toNext,
  addAnswer,
  testTitle,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <div
        className="d-flex flex-column align-items-center w-100"
        style={{
          marginBottom: 40,
          marginTop: -30,
        }}
      >
        <h2
          className="font-weight-bold"
          style={{
            color: "#fff",
            zIndex: 5,
            marginBottom: 32,
            fontSize: 45,
          }}
        >
          {testTitle}
        </h2>
        <Card
          className="text-center w-100"
          style={{
            maxWidth: 355,
            borderRadius: 15,
            fontSize: 21,
            paddingTop: 25,
            paddingRight: 10,
            paddingLeft: 10,
          }}
        >
          <p>{question.title}</p>
          <Card.Body style={{ paddingTop: 0 }}>
            <Form
              className="d-flex flex-wrap justify-content-between"
              style={{
                marginBottom: 30,
              }}
            >
              {question.answers.map((answer) => (
                <div className="form_radio_btn" key={answer.title}>
                  <AnswerItem
                    addAnswer={addAnswer}
                    answer={answer}
                    setIsChecked={setIsChecked}
                  />
                </div>
              ))}
            </Form>
            <p>{`${currentQuestion}/${questionLength}`}</p>
            {currentQuestion >= questionLength ? (
              <Nav className="d-flex justify-content-center">
                <Nav.Item>
                  <Nav.Link
                    href="#"
                    disabled={!isChecked}
                    onSelect={checkResult}
                    className="link-primary"
                  >
                    Отправить
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            ) : (
              <Nav.Link
                className="link-primary"
                onSelect={() => {
                  toNext();
                  setIsChecked(false);
                }}
                href="#"
                disabled={!isChecked}
              >
                Вперед
              </Nav.Link>
            )}
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
