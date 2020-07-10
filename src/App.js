import React from "react";
import Slider from "./Layout";
import PrivateRoute from "./PrivateRoute";
import Home from "./pages/Home";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Create from "./pages/CreateCard";
import EditItem from "./pages/EditItem";
import {
  PATH,
  PATH_CREATE_ITEM,
  PATH_EDIT_ITEM,
  PATH_LOGIN,
  PATH_REGISTER,
} from "./routeList";

const App = () => {
  return (
    <Slider>
      <Switch>
        <PrivateRoute exact path={PATH} component={Home} />
        <Route path={PATH_LOGIN} component={Login} />
        <Route path={PATH_REGISTER} component={SignUp} />
        <PrivateRoute path={PATH_CREATE_ITEM} component={Create} />
        <PrivateRoute path={PATH_EDIT_ITEM} component={EditItem} />
        <Redirect to={PATH_LOGIN} />
      </Switch>
    </Slider>
  );
};

export default App;
