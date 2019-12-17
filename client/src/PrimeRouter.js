import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./basics/Main";
import Menu from "./basics/Menu";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import PrivateRouter from "./auth/PrivateRouter";

import CreatePm from "./prayers/CreatePm";
// import SinglePm from "./prayers/SinglePm";
// import EditPm from "/";
// import DeletePm from "/";
// import AllPmPrayers from "./prayers/AllPmPrayers";

const PrimeRouter = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Main} />

      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />

      <PrivateRouter exact path="/user/:userId" component={Profile} />
      {/* <Route exact path="/all/pm/:userId" component={AllPmPrayers} /> */}
      <PrivateRouter exact path="/create/new/pm" component={CreatePm} />

      {/* <PrivateRouter exact path="/pm/:pmId" component={SinglePm} /> */}
    </Switch>
  </div>
);

export default PrimeRouter;
