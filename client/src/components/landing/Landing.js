import React, { useEffect } from "react";

import { userActions } from "../../store/user-slice";

import { useDispatch } from "react-redux";

import { CssBaseline } from "@material-ui/core";

import PageOne from "./PageOne";
import Header from "./Header";

const Landing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.token) {
      dispatch(userActions.setAuthFalse());
    }
  });

  return (
    <div>
      <CssBaseline />
      <Header id="header" />
      <PageOne />
    </div>
  );
};

export default Landing;
