//Core
import React, { lazy, useContext } from "react";
import { Formik } from "formik";
import { NavLink } from "react-router-dom";
import { Form, Button, Container, Row } from "react-bootstrap";
import * as yup from "yup";

//Hooks
import { useSignUp } from "../../hooks/useSignUp";

//Other
import { AlertContext } from "../../App";
import { Suspense } from "react";

//Components
import Loader from "../common/Loader";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const validationSchema = yup.object().shape({
  firstName: yup.string().required("Поле FirstName обязательно!"),
  lastName: yup.string().required("Поле LastName обязательно!"),
  email: yup
    .string()
    .required("Поле Email обязательно!")
    .email("Введите пожалуйста email по образцу!"),
  password: yup.string().required("Поле Пароль обязательно!"),
});

const SignUpForm = () => {
  const { signUp, loading: signUpLoading } = useSignUp();

  const setAlertListHandler = useContext(AlertContext);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column vh-100">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            try {
              signUp(values);
              setAlertListHandler("Вы успешно зарегестрировались!", "Успех");
            } catch (e) {
              setAlertListHandler(e);
            }
          }}
        >
          {({ values, handleSubmit, handleChange, touched, errors }) => (
            <>
              <Form
                noValidate
                onSubmit={handleSubmit}
                name="signUpForm"
                style={{
                  width: 400,
                  position: "relative",
                  paddingTop: 20,
                }}
              >
                <h2
                  className="text-left font-weight-bold"
                  style={{ fontSize: 31, marginBottom: 30 }}
                >
                  Зарегистрируйтесь в системе
                </h2>

                <Form.Group controlId="formBasicFirstName">
                  <Form.Label>Имя</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    isInvalid={touched.firstName && errors.firstName}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicLastName">
                  <Form.Label>Фамилия</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    isInvalid={touched.lastName && errors.lastName}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="hello@gmail.com"
                    value={values.email}
                    isInvalid={touched.email && errors.email}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={values.password}
                    isInvalid={touched.password && errors.password}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Зарегистрироваться
                </Button>
              </Form>
              <Container
                className="d-flex justify-content-center"
                style={{
                  marginTop: 15,
                }}
              >
                <Row>
                  Если у вас уже есть аккаунт, то войдите в него тут:{" "}
                  <NavLink
                    className="link-primary"
                    to={"/"}
                    style={{ marginLeft: 5 }}
                  >
                    Login
                  </NavLink>
                </Row>
              </Container>
            </>
          )}
        </Formik>
      </div>
      {signUpLoading && <Loader />}
    </>
  );
};

export default SignUpForm;
