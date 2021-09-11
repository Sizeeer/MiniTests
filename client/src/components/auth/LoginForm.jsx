//Core
import React, { useContext } from "react";
import { Formik } from "formik";
import { Form, Button, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import * as yup from "yup";

//Hooks
import { useLogin } from "../../hooks/useLogin";

//Other
import { AlertContext } from "../../App";

//Components
import Loader from "../common/Loader";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Поле Email обязательно!")
    .email("Введите пожалуйста email по образцу!"),
  password: yup.string().required("Поле Пароль обязательно!"),
});

const LoginForm = () => {
  const { login, loading } = useLogin();

  const setAlertListHandler = useContext(AlertContext);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column vh-100">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              await login(values);
              window.location.reload();
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
                name="loginForm"
                style={{
                  width: 400,
                  position: "relative",
                  paddingTop: 20,
                  margin: "0 auto",
                }}
              >
                <h2
                  className="text-left font-weight-bold"
                  style={{ fontSize: 31, marginBottom: 30 }}
                >
                  Войдите в систему
                </h2>
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
                  Войти
                </Button>
              </Form>
              <Container
                className="d-flex justify-content-center"
                style={{
                  marginTop: 15,
                }}
              >
                <Row>
                  Если у вас нет аккаунта, то создайте его тут:{" "}
                  <NavLink
                    className="link-primary"
                    to={"/signUp"}
                    style={{ marginLeft: 5 }}
                  >
                    Sign Up
                  </NavLink>
                </Row>
              </Container>
            </>
          )}
        </Formik>
      </div>
      {loading && <Loader />}
    </>
  );
};

export default LoginForm;
