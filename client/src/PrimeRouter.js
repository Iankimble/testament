import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./basics/Main";
import Menu from "./basics/Menu";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import PrivateRouter from "./auth/PrivateRouter";

import CreatePrayer from "./prayers/CreatePrayer";
import AllPrayers from "./prayers/AllPrayers";
import SinglePrayer from "./prayers/SinglePrayer";
import EditPrayer from "./prayers/EditPrayer";
//-------------------------------------------------//
//pagination
import Ap from "./prayers/Ap";
//-----------------------------------------------//

const PrimeRouter = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Main} />

      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />

      <PrivateRouter exact path="/user/:userId" component={Profile} />
      <PrivateRouter
        exact
        path="/new/prayer/:userId"
        component={CreatePrayer}
      />
      <PrivateRouter exact path="/all/prayers/:userId" component={AllPrayers} />

      {/* pagination*/}
      <Route exact path="/all/:userId" component={Ap} />
      {/** pagination */}

      <Route exact path="/prayer/:prayerId" component={SinglePrayer} />
      <PrivateRouter
        exact
        path="/prayer/edit/:prayerId"
        component={EditPrayer}
      />
    </Switch>
  </div>
);

export default PrimeRouter;
