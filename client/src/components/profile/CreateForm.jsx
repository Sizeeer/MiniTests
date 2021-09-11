//Core
import { Field, FieldArray, Formik, getIn } from "formik";
import { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import * as yup from "yup";

//Other
import { AlertContext } from "../../App";

const initialValues = {
  title: "",
  description: "",
  questions: [],
  result: [],
};

const validationSchema = yup.object().shape({
  title: yup.string().required("Заголовок теста обязателен!"),
  description: yup.string().required("Описание теста обязательно!"),
  questions: yup
    .array()
    .of(
      yup.object().shape({
        title: yup.string().required("Заголовок вопроса обязателен!"),
        answers: yup
          .array()
          .of(
            yup.object().shape({
              title: yup.string().required("Заголовок ответа обязателен!"),
              weight: yup
                .number("Вы ввели не число!")
                .required("Количество баллов за ответ обязательно!"),
            })
          )
          .min(2, "Минимум ответов - 2"),
      })
    )
    .min(1, "Минимум вопросов - 1"),
  result: yup.array().of(
    yup.object().shape({
      title: yup.string().required("Заголовок результата обязателен!"),
      from: yup.number().required("Введите пожалуйста диапазон баллов!"),
      to: yup.number().required("Введите пожалуйста диапазон баллов!"),
    })
  ),
});

const ErrorMessage = ({ name }) => (
  <Field name={name}>
    {({ form }) => {
      const error = getIn(form.errors, name);
      const touch = getIn(form.touched, name);
      return touch && error ? (
        <div className="invalid-feedback" style={{ marginBottom: 15 }}>
          {error}
        </div>
      ) : null;
    }}
  </Field>
);

export const CreateForm = ({ addNewTest }) => {
  const setAlertListHandler = useContext(AlertContext);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          await addNewTest(values);
          window.location.reload();
        } catch (e) {
          setAlertListHandler(e);
        }
      }}
    >
      {({ values, handleSubmit, handleChange, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit} name="createTestForm">
          <Form.Group>
            <Form.Label>Заголовок теста</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              isInvalid={touched.title && errors.title}
            />
            <ErrorMessage name="title" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Описание теста</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={values.description}
              onChange={handleChange}
              isInvalid={touched.description && errors.description}
            />
            <ErrorMessage name="description" />
          </Form.Group>

          <Form.Group>
            <Form.Label className="d-block">Вопросы</Form.Label>
            <FieldArray
              name="questions"
              render={(arrayHelpersQuestions) => (
                <>
                  {values.questions.length > 0 &&
                    values.questions.map((question, questionIndex) => (
                      <div key={questionIndex}>
                        <h3 style={{ fontWeight: 700 }}>
                          Вопрос номер - {questionIndex + 1}
                        </h3>
                        <Form.Group
                          key={questionIndex}
                          style={{
                            border: "3px solid #ffd540",
                            padding: "5px 10px",
                          }}
                        >
                          <Form.Label className="d-flex justify-content-between align-items-center">
                            Заголовок вопроса {questionIndex + 1}
                            <Button
                              variant="primary"
                              onClick={() => {
                                arrayHelpersQuestions.remove(questionIndex);
                              }}
                            >
                              <i class="bi bi-x-square"></i>
                            </Button>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name={`questions[${questionIndex}].title`}
                            isInvalid={
                              touched.questions &&
                              errors.questions &&
                              touched.questions[questionIndex]?.title &&
                              errors.questions[questionIndex]?.title
                            }
                            value={question.title}
                            onChange={handleChange}
                            style={{ marginBottom: 15 }}
                          />
                          <ErrorMessage
                            name={`questions[${questionIndex}].title`}
                          />

                          <FieldArray
                            name={`questions[${questionIndex}].answers`}
                          >
                            {(arrayHelpersAnswers) => (
                              <>
                                {values.questions[questionIndex].answers
                                  .length > 0 &&
                                  values.questions[questionIndex].answers.map(
                                    (answer, answerIndex) => (
                                      <div key={answerIndex}>
                                        <h4>Ответ номер - {answerIndex + 1}</h4>
                                        <Form.Group>
                                          <Form.Label className="d-flex justify-content-between align-items-center">
                                            Заголовок ответа {answerIndex + 1}
                                            <Button
                                              variant="primary"
                                              onClick={() => {
                                                arrayHelpersAnswers.remove(
                                                  answerIndex
                                                );
                                              }}
                                            >
                                              <i class="bi bi-x-square"></i>
                                            </Button>
                                          </Form.Label>
                                          <Form.Control
                                            type="text"
                                            name={`questions[${questionIndex}].answers[${answerIndex}].title`}
                                            isInvalid={
                                              touched.questions &&
                                              errors.questions &&
                                              touched.questions[questionIndex]
                                                ?.answers[answerIndex]?.title &&
                                              errors.questions[questionIndex]
                                                ?.answers[answerIndex]?.title
                                            }
                                            value={answer.title}
                                            onChange={handleChange}
                                          />
                                          <ErrorMessage
                                            name={`questions[${questionIndex}].answers[${answerIndex}].title`}
                                          />
                                        </Form.Group>
                                        <Form.Group>
                                          <Form.Label>
                                            Количество баллов за ответ{" "}
                                            {answerIndex + 1}
                                          </Form.Label>
                                          <Form.Control
                                            type="number"
                                            min="0"
                                            name={`questions[${questionIndex}].answers[${answerIndex}].weight`}
                                            isInvalid={
                                              touched.questions &&
                                              errors.questions &&
                                              touched.questions[questionIndex]
                                                ?.answers[answerIndex]
                                                ?.weight &&
                                              errors.questions[questionIndex]
                                                ?.answers[answerIndex]?.weight
                                            }
                                            value={answer.weight}
                                            onChange={handleChange}
                                          />
                                          <ErrorMessage
                                            name={`questions[${questionIndex}].answers[${answerIndex}].weight`}
                                          />
                                        </Form.Group>
                                      </div>
                                    )
                                  )}
                                <Button
                                  variant="primary"
                                  onClick={() => {
                                    arrayHelpersAnswers.push({
                                      title: "",
                                      weight: undefined,
                                    });
                                  }}
                                >
                                  Добавить ответ
                                </Button>
                              </>
                            )}
                          </FieldArray>
                        </Form.Group>
                      </div>
                    ))}

                  <Button
                    variant="primary"
                    onClick={() => {
                      arrayHelpersQuestions.push({
                        title: "",
                        answers: [],
                      });
                    }}
                  >
                    Добавить вопрос
                  </Button>
                </>
              )}
            ></FieldArray>
          </Form.Group>

          <Form.Group>
            <Form.Label className="d-block">Результаты</Form.Label>
            <FieldArray name={`result`}>
              {(arrayHelpersResults) => (
                <>
                  {values.result.length > 0 &&
                    values.result.map((resultVal, resultIndex) => (
                      <div key={resultIndex}>
                        <h4>Результат номер - {resultIndex + 1}</h4>
                        <Form.Group>
                          <Form.Label className="d-flex justify-content-between align-items-center">
                            Заголовок результата {resultIndex + 1}
                            <Button
                              variant="primary"
                              onClick={() => {
                                arrayHelpersResults.remove(resultIndex);
                              }}
                            >
                              <i class="bi bi-x-square"></i>
                            </Button>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name={`result[${resultIndex}].title`}
                            isInvalid={
                              touched.result &&
                              errors.result &&
                              touched.result[resultIndex]?.title &&
                              errors.result[resultIndex]?.title
                            }
                            value={resultVal.title}
                            onChange={handleChange}
                          />
                          <ErrorMessage name={`result[${resultIndex}].title`} />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>
                            Минимальное количество баллов ответа{" "}
                            {resultIndex + 1}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            min="0"
                            name={`result[${resultIndex}].from`}
                            isInvalid={
                              touched.result &&
                              errors.result &&
                              touched.result[resultIndex]?.from &&
                              errors.result[resultIndex]?.from
                            }
                            value={resultVal.from}
                            onChange={handleChange}
                          />
                          <ErrorMessage name={`result[${resultIndex}].from`} />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>
                            Максимальное количество баллов ответа{" "}
                            {resultIndex + 1}
                          </Form.Label>
                          <Form.Control
                            type="number"
                            min="0"
                            name={`result[${resultIndex}].to`}
                            isInvalid={
                              touched.result &&
                              errors.result &&
                              touched.result[resultIndex]?.to &&
                              errors.result[resultIndex]?.to
                            }
                            value={resultVal.to}
                            onChange={handleChange}
                          />
                          <ErrorMessage name={`result[${resultIndex}].to`} />
                        </Form.Group>
                      </div>
                    ))}
                  <Button
                    variant="primary"
                    onClick={() => {
                      console.log(values);
                      arrayHelpersResults.push({
                        title: "",
                        from: undefined,
                        to: undefined,
                      });
                    }}
                  >
                    Добавить результат
                  </Button>
                </>
              )}
            </FieldArray>
          </Form.Group>

          <Button variant="primary" type="submit">
            Создать тест
          </Button>
        </Form>
      )}
    </Formik>
  );
};
