import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { ethActions } from "../../store/eth-slice";
import { setSnackbar } from "../../store/alert-actions";

import MetaMaskOnboarding from "@metamask/onboarding";

import { provider } from "../../ethereum/web3";

import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Typography,
  Box,
  Menu,
  MenuItem,
  Button,
} from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import HomeIcon from "@material-ui/icons/Home";
import LinearProgress from "@material-ui/core/LinearProgress";
import Popover from "@material-ui/core/Popover";

import MainMenu from "./Menu";

const onboarding = new MetaMaskOnboarding();

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#000000",
  },
  appbar: {
    background: "none",
  },
  appbarWrapper: {
    width: "90%",
    margin: "0 auto",
    flexGrow: "1",
  },
  appbarTitle: {
    flexGrow: "1",
    color: "transparent",
    fontSize: "1.1vw",
  },
  colorText: {
    color: "transparent",
  },
  icon: {
    color: "#2D2C2C",
    fontSize: "2rem",
  },
  networkText: {
    fontSize: "0.7vw",
  },
  avatarText: {
    fontSize: "0.8vw",
  },
  avatarIcon: {
    cursor: "pointer",
  },
  network: {
    borderStyle: "solid",
    borderWidth: "1px",
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: "10%",
    borderColor: "#bcbcbc",
    background: "#eeeeee",
    cursor: "default",
  },
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
  supportedFilesText: {
    fontSize: 10,
  },
}));

const NavbarDark = ({ mintIsLoading }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [displayMenu, setDisplayMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [networkName, setNetworkName] = useState("");
  const [networkColor, setNetworkColor] = useState("");

  const [anchorEl2, setAnchorEl2] = useState(null);
  const [openedPopoverId, setOpenedPopoverId] = useState(null);

  const currentUser = useSelector((state) => state.user.user);
  const authState = useSelector((state) => state.user.isAuthenticated);
  const chainId = useSelector((state) => state.eth.currentChain);
  const metamaskInstalled = useSelector(
    (state) => state.eth.isMetaMaskInstalled
  );
  const connected = useSelector((state) => state.eth.isConnected);

  const handleHome = () => {
    history.push("/#header");
  };

  const handleMenu = () => {
    setDisplayMenu(true);
  };

  const handleMenuClose = () => {
    setDisplayMenu(false);
  };

  const handleAvatarMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditProfile = () => {
    history.push("/editProfile");
  };

  const handleViewProfile = () => {
    history.push(`/profile/${currentUser.publicAddress}`);
  };

  const installMetamask = async () => {
    onboarding.startOnboarding();
  };

  const connectToMetamask = async () => {
    const accounts = await provider.request({
      method: "eth_requestAccounts",
    });
    if (accounts.length > 0) {
      dispatch(ethActions.setIsConnected());
    } else {
      console.log(`connect metamask didn't work`);
      dispatch(
        setSnackbar(
          true,
          "warning",
          "Metamask not connected. Please try again."
        )
      );
    }
  };

  // ************************** POPOVER HANDLERS **************************

  const multi = [
    {
      _id: 0,
      name: "name1",
      hoverText: "Home",
    },
    {
      _id: 1,
      name: "name2",
      hoverText: "Main Menu",
    },
    {
      _id: 2,
      name: "name3",
      hoverText: "Profile",
    },
  ];

  const handlePopoverOpenHome = (event, popOverId) => {
    setOpenedPopoverId(popOverId);
    setAnchorEl2(event.currentTarget);
  };

  const handlePopoverCloseHome = () => {
    setAnchorEl2(null);
    setOpenedPopoverId(null);
  };

  const handlePopoverOpenMenu = (event, popOverId) => {
    setOpenedPopoverId(popOverId);
    setAnchorEl2(event.currentTarget);
  };

  const handlePopoverCloseMenu = () => {
    setAnchorEl2(null);
    setOpenedPopoverId(null);
  };

  const handlePopoverOpenAvatar = (event, popOverId) => {
    setOpenedPopoverId(popOverId);
    setAnchorEl2(event.currentTarget);
  };

  const handlePopoverCloseAvatar = () => {
    setAnchorEl2(null);
    setOpenedPopoverId(null);
  };

  useEffect(() => {
    if (chainId === 1) {
      setNetworkName("Ethereum Mainnet");
      setNetworkColor("secondary");
    } else if (chainId === 3) {
      setNetworkName("Ropsten (Testnet)");
      setNetworkColor("primary");
    } else if (chainId === 4) {
      setNetworkName("Rinkeby (Testnet)");
      setNetworkColor("primary");
    } else if (chainId === 5) {
      setNetworkName("Goerli (Testnet)");
      setNetworkColor("primary");
    } else if (chainId === 42) {
      setNetworkName("Kovan (Testnet)");
      setNetworkColor("primary");
    }
  }, [chainId]);

  return (
    <div>
      <CssBaseline />

      <AppBar
        className={classes.appbar}
        elevation={0}
        // sstyle={{ position: "relative" }}
      >
        {mintIsLoading && <LinearProgress color="secondary" />}
        <Toolbar variant="dense" className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle}>
            This is <span className={classes.colorText}>ScratchCollective</span>
          </h1>

          {!metamaskInstalled && (
            <Box marginLeft={2}>
              {" "}
              <Button
                variant="contained"
                color="secondary"
                size="small"
                style={{ height: "25px", fontSize: "0.7vw" }}
                onClick={installMetamask}
              >
                Install MetaMask
              </Button>
            </Box>
          )}

          {!connected && (
            <Box>
              {" "}
              <Button
                variant="contained"
                color="secondary"
                size="small"
                style={{ height: "25px", fontSize: "0.7vw" }}
                onClick={connectToMetamask}
              >
                Connect Metamask
              </Button>
            </Box>
          )}

          {metamaskInstalled && (
            <Box marginLeft={2} className={classes.network}>
              <Typography color={networkColor} className={classes.networkText}>
                {networkName}
              </Typography>
            </Box>
          )}

          <IconButton
            onClick={handleHome}
            onMouseEnter={(e) => handlePopoverOpenHome(e, 1)}
            onMouseLeave={handlePopoverCloseHome}
          >
            <HomeIcon className={classes.icon} />
          </IconButton>
          <Popover
            id="mouse-over-popover1"
            className={classes.popover}
            classes={{
              paper: classes.paper,
            }}
            open={openedPopoverId === 1}
            anchorEl={anchorEl2}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handlePopoverCloseHome}
            disableRestoreFocus
          >
            <Typography className={classes.supportedFilesText}>
              {multi[0].hoverText}
            </Typography>
          </Popover>

          <IconButton
            onClick={handleMenu}
            onMouseEnter={(e) => handlePopoverOpenMenu(e, 2)}
            onMouseLeave={handlePopoverCloseMenu}
          >
            <SortIcon className={classes.icon} />
          </IconButton>
          <Popover
            id="mouse-over-popover"
            className={classes.popover}
            classes={{
              paper: classes.paper,
            }}
            open={openedPopoverId === 2}
            anchorEl={anchorEl2}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handlePopoverCloseMenu}
            disableRestoreFocus
          >
            <Typography className={classes.supportedFilesText}>
              {multi[1].hoverText}
            </Typography>
          </Popover>

          {authState && (
            <div>
              <Avatar
                alt="Account"
                src={currentUser.profilePicUrl || ""}
                onClick={handleAvatarMenu}
                onMouseEnter={(e) => handlePopoverOpenAvatar(e, 3)}
                onMouseLeave={handlePopoverCloseAvatar}
                className={classes.avatarIcon}
              />
              <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                  paper: classes.paper,
                }}
                open={openedPopoverId === 3}
                anchorEl={anchorEl2}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                onClose={handlePopoverCloseAvatar}
                disableRestoreFocus
              >
                <Typography className={classes.supportedFilesText}>
                  {multi[2].hoverText}
                </Typography>
              </Popover>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  className={classes.avatarText}
                  onClick={handleViewProfile}
                >
                  View Profile
                </MenuItem>
                <MenuItem
                  className={classes.avatarText}
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.appBarSpacer}></div>
      {displayMenu && (
        <MainMenu handleMenuClose={handleMenuClose} buttonState={displayMenu} />
      )}
    </div>
  );
};

export default NavbarDark;
