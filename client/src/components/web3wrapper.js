import React, { useEffect } from "react";
import { web3 } from "../ethereum/web3";
import setAuthToken from "../utils/setAuthToken";

import { useDispatch, useSelector } from "react-redux";
import { loadUser, authenticateUser } from "../store/user-slice";
import { userActions } from "../store/user-slice";
import { setSnackbar } from "../store/alert-actions";
import { ethActions } from "../store/eth-slice";

const Web3wrapper = (props) => {
  const authenticatedStatus = useSelector(
    (state) => state.user.isAuthenticated
  );
  const isNewUser = useSelector((state) => state.user.isNewUser);
  const accountConnected = useSelector((state) => state.eth.isConnected);
  const chainId = useSelector((state) => state.eth.currentChain);

  const dispatch = useDispatch();

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  //************************* EVENT LISTENERS (METAMASK) ***********************************/

  const isMetaMaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  if (isMetaMaskInstalled()) {
    window.ethereum.on("accountsChanged", () => {
      console.log(`ethereum listener, accounts changed`);
      localStorage.removeItem("token");
      dispatch(userActions.setAuthFalse());
      dispatch(
        setSnackbar(
          true,
          "info",
          "Switched accounts? Go to metamask, and click sign to confirm login."
        )
      );
    });

    window.ethereum.on("chainChanged", () => {
      console.log(`ethereum listener, chain changed`);
      localStorage.removeItem("token");
      dispatch(userActions.setAuthFalse());
      dispatch(
        setSnackbar(
          true,
          "info",
          `Network has been changed. Go to metamask and confirm to login.`
        )
      );
      window.location.reload();
    });
  }

  //************************* USED IN USEEFFECT ***********************************/

  // checks to see if user metamask is connected
  const checkConnected = async () => {
    const wrapperAccountList = web3.eth.getAccounts();
    const wrapperActualList = await wrapperAccountList;
    return wrapperActualList.length > 0;
  };

  // grabs the current address[0]
  const getPublicAddress = async () => {
    let response = await web3.eth.getAccounts();
    response = await response[0];
    return response;
  };

  // fetch nonce helper function
  const fetchNonce = async (address) => {
    let response = await fetch("/api/users/nonce/" + address);
    response = await response.json();
    return response.nonce;
  };

  // sign msg/nonce with address, returns signature
  const getSignature = async (tempnonce, address) => {
    const msg = `ScratchCollective Login (Click Sign to login): ${tempnonce}`;
    const signed = await web3.eth.personal.sign(msg, address);
    return signed;
  };

  // dispatches load user if JWT token is present, authenticate if no JWT token
  const initialAuthCheck = async (signature, address) => {
    if (!localStorage.token) {
      const authenticateBody = { signature, publicAddress: address };
      dispatch(authenticateUser(authenticateBody));
    } else if (localStorage.token) {
      dispatch(loadUser());
    }
  };

  const sendChainIdToState = async () => {
    const currentChainId = await web3.eth.net.getId();
    dispatch(ethActions.setCurrentChain(currentChainId));
  };

  // run authentication/login checks order of operations synchronously
  const inOrder = async () => {
    const isConnected = await checkConnected();

    if (!isConnected) {
      dispatch(ethActions.setIsNotConnected());
    } else {
      dispatch(ethActions.setIsConnected());

      const publicAddress = await getPublicAddress();
      const nonce = await fetchNonce(publicAddress);
      const signature = await getSignature(nonce, publicAddress);

      const isToken = await initialAuthCheck(signature, publicAddress);
    }
  };

  useEffect(() => {
    if (!isMetaMaskInstalled()) {
      dispatch(ethActions.setMetamaskNotInstalled());
    }

    if (!localStorage.token) {
      dispatch(userActions.setAuthFalse());
    }

    if (authenticatedStatus === false && isMetaMaskInstalled()) {
      dispatch(ethActions.setMetamaskInstalled());
      inOrder();
      sendChainIdToState();
    }

    if (isNewUser === true) {
      dispatch(
        setSnackbar(
          false,
          "success",
          "New User? Welcome. Set up your profile by clicking your avatar -> 'Edit Profile' in the top right corner"
        )
      );
      dispatch(
        setSnackbar(
          true,
          "success",
          "New User? Welcome. Set up your profile by clicking your avatar -> 'Edit Profile' in the top right corner"
        )
      );
    }

    if (
      (chainId === 3 || chainId === 4 || chainId === 5 || chainId === 42) &&
      !isNewUser
    ) {
      let whatNetwork;
      if (chainId === 3) {
        whatNetwork = "Ropsten";
      } else if (chainId === 4) {
        whatNetwork = "Rinkeby";
      } else if (chainId === 5) {
        whatNetwork = "Goerli";
      } else if (chainId === 42) {
        whatNetwork = "Kovan";
      }
      dispatch(
        setSnackbar(
          true,
          "info",
          `You are on the ${whatNetwork} testnet. Switch to Ethereum Mainnet to mint sellable NFTs`
        )
      );
    }

    if (chainId === 1) {
      dispatch(setSnackbar(true, "success", `You are on the Ethereum Mainnet`));
    }
  }, [authenticatedStatus, isNewUser, accountConnected, dispatch]);

  return <div>{props.children}</div>;
};

export default Web3wrapper;
