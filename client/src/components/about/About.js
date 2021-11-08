import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";

import { CssBaseline } from "@material-ui/core";

import NavbarDark from "../layout/NavbarDark";
import AboutPage1 from "./AboutPage1";
import AboutPage2 from "./AboutPage2";
import AboutPage3 from "./AboutPage3";
import AboutPage4 from "./AboutPage4";
import AboutPage5 from "./AboutPage5";
import AboutPage6 from "./AboutPage6";
import AboutPage9 from "./AboutPage9";
import AboutPage11 from "./AboutPage11";

const About = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.token) {
      dispatch(userActions.setAuthFalse());
    }
  });

  return (
    <div>
      <CssBaseline />
      <NavbarDark />
      <AboutPage1 />
      <AboutPage2 />
      <AboutPage3 />
      <AboutPage4 />
      <AboutPage5 id="about-page-5" />
      <AboutPage6 id="howTo" />
      <AboutPage9 />
      <AboutPage11 />
    </div>
  );
};

export default About;
