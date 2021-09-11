//Core
import { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

//Components
import Loader from "./components/common/Loader";
const LoginForm = lazy(() => import("./components/auth/LoginForm"));
const SignUpForm = lazy(() => import("./components/auth/SignUpForm"));
const ProfilePage = lazy(() => import("./components/profile/ProfilePage"));
const TestingPage = lazy(() => import("./components/testing/TestingPage"));
const TestsPage = lazy(() => import("./components/tests/testsPage"));

export const useRoutes = (isAuth) => {
  if (isAuth) {
    return (
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/tests">
            <TestsPage />
          </Route>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/testing">
            <TestingPage />
          </Route>
          <Redirect to="tests" />
        </Switch>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route path="/login" exact>
          <LoginForm />
        </Route>
        <Route path="/signUp">
          <SignUpForm />
        </Route>
        <Redirect to="login" />
      </Switch>
    </Suspense>
  );
};
