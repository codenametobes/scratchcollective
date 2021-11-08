import React, { useEffect } from "react";

import { userActions } from "../../store/user-slice";
import { useDispatch } from "react-redux";

import { CssBaseline } from "@material-ui/core";

import CreateMint from "./CreateMint";
import CreateHelp1 from "./CreateHelp1";
import CreateHelp2 from "./CreateHelp2";
import CreateHelp3 from "./CreateHelp3";

const Create = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.token) {
      dispatch(userActions.setAuthFalse());
    }
  });

  return (
    <div>
      <CssBaseline />
      <CreateMint />
      <CreateHelp1 />
      <CreateHelp2 />
      <CreateHelp3 />
    </div>
  );
};

export default Create;
