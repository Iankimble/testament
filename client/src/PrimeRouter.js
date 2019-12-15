import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./basics/Main";
import Menu from "./basics/Menu";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import PrivateRouter from "./auth/PrivateRouter";

const PrimeRouter = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Main} />

      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />

      <PrivateRouter exact path="/user/:userId" component={Profile} />
    </Switch>
  </div>
);

export default PrimeRouter;
