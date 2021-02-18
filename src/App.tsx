import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";

import PrivateRoute from "./components/auth/PrivateRoute";
import PublicRoute from "./components/auth/PublicRoute";

import Dashboard from "./components/pages/Dashboard";
import ForgetPassword from "./components/pages/ForgetPassword";
import Homepage from "./components/pages/Homepage";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Header from "./components/sections/Header";
import Loader from "./components/Ui/Loader";
import firebase from "./firebase/config";
import {
  getUserById,
  setLoading,
  setNeedVerification,
} from "./redux/actions/authAction";
import { RootState } from "./redux/index";

const App: FC = () => {
  const { loading } = useSelector<RootState, RootState["auth"]>(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setLoading(true));
        await dispatch(getUserById(user.uid));
        if (!user.emailVerified) {
          dispatch(setNeedVerification());
        }
      }

      dispatch(setLoading(false));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  if (loading) {
    <Loader />;
  }
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <PublicRoute exact path="/" component={Homepage} />
        <PublicRoute exact path="/signup" component={SignUp} />
        <PublicRoute exact path="/signin" component={SignIn} />
        <PublicRoute exact path="/forgot-password" component={ForgetPassword} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
};
export default App;
