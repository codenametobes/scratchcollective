// React
import React from "react";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import history from "./history";

// Components
import Landing from "./components/landing/Landing";
import Create from "./components/mint/Create";
import View from "./components/art/View";
import Collection from "./components/collection/Collection";
import ViewProfile from "./components/profile/ViewProfile";
import About from "./components/about/About";
import Creators from "./components/profile/Creators";
import Web3wrapper from "./components/web3wrapper";
import CustomSnackbar from "./components/layout/Snackbar";
import ConnectMetamaskModal from "./components/layout/ConnectMetamaskModal";
import InstallMetamaskModal from "./components/layout/InstallMetamaskModal";
import EditProfile from "./components/profile/EditProfile";
import NotFoundPage from "./components/layout/NotFoundPage";
import ScrollToTop from "./components/layout/ScrollToTop";

// MUI
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Sora", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#856bc9",
    },
    secondary: {
      main: "#23dd7a",
    },
  },
  mixins: {
    toolbar: {
      minHeight: "28px",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <ScrollToTop />
        <Web3wrapper>
          <Switch>
            <Route path="/" exact>
              <Landing />
            </Route>
            <Route path="/create" exact>
              <Create />
            </Route>
            <Route path="/view" exact>
              <Redirect to="/view/collection" />
            </Route>
            <Route path="/view/collection" exact>
              <Collection />
            </Route>
            <Route path="/view/:id" exact>
              <View />
            </Route>
            <Route path="/editprofile" exact>
              <EditProfile />
            </Route>
            <Route path="/profile/:publicAddress" exact>
              <ViewProfile />
            </Route>
            <Route path="/about" exact>
              <About />
            </Route>
            <Route path="/creators" exact>
              <Creators />
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </Web3wrapper>
      </Router>
      <CustomSnackbar />
      <ConnectMetamaskModal />
      <InstallMetamaskModal />
    </ThemeProvider>
  );
}

export default App;
