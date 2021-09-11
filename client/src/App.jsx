//Core
import React, {
  createContext,
  lazy,
  useEffect,
  useState,
  Suspense,
} from "react";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";

//Hooks
import { useRoutes } from "./routes";

//Styles
import "bootstrap/dist/css/bootstrap.min.css";
import { splitApolloError } from "./helpers";

//Components
import Loader from "./components/common/Loader";
const AlertComponent = lazy(() => import("./components/common/AlertComponent"));

//Other
const axios = require("axios");

const initialAlertState = {
  setAlertList: () => {},
};

export const AlertContext = createContext(initialAlertState);

export const App = () => {
  const [alertList, setAlertList] = useState([]);

  const [isAuth, setIsAuth] = useState(true);
  const routes = useRoutes(isAuth, yup);

  useEffect(() => {
    axios
      .get("https://miniquizapplication.herokuapp.com/isAuth")
      .then((res) => res.data)
      .then((data) => {
        setIsAuth(!!data.token);
      });
  }, []);

  const setAlertListHandler = (error, state = "Ошибка") => {
    setAlertList((prev) => [
      ...prev,
      {
        id: uuidv4(),
        title: state,
        description: splitApolloError(error),
        backgroundColor: state === "Ошибка" ? "#d9534f" : "#5cb85c",
      },
    ]);
  };

  return (
    <Suspense fallback={<Loader />}>
      <AlertContext.Provider value={setAlertListHandler}>
        {routes}
      </AlertContext.Provider>
      <AlertComponent
        toastList={alertList}
        position="bottom-right"
        autoDelete={true}
        dismissTime={5000}
      />
    </Suspense>
  );
};
