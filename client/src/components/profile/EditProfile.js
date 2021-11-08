import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user-slice";
import { setSnackbar } from "../../store/alert-actions";
import { editUser } from "../../store/user-slice";

import ProfileDrop from "./ProfileDrop";

import setAuthToken from "../../utils/setAuthToken";

import {
  CssBaseline,
  Grid,
  Box,
  TextField,
  Button,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";

import NavbarDark from "../layout/NavbarDark";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    display: "flex",
  },
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  title: {
    fontSize: "3vw",
  },
  accountTitle: {
    fontSize: "1vw",
  },
  avatarTitle: {
    fontSize: "1vw",
  },
  margin: {
    marginTop: 8,
  },
  inputIcons: {
    fontSize: "3vh",
  },
  socialMediaButton: {
    fontSize: "1.5vh",
    marginTop: 10,
  },
}));

const EditProfile = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");

  const [images, setImages] = useState([]);
  const [showSocialMedia, setShowSocialMedia] = useState(false);

  const [emailValid, setEmailValid] = useState(true);
  const [twitterValid, setTwitterValid] = useState(true);
  const [instagramValid, setInstagramValid] = useState(true);
  const [facebookValid, setFacebookValid] = useState(true);

  const currentUser = useSelector((state) => state.user.user);
  const isAuth = useSelector((state) => state.user.isAuthenticated);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  // frontend checks for email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // frontend checks for twitter (@ symbol?)
  const handleTwitterChange = (e) => {
    console.log(`twitter: ${twitter}`);
    console.log(`type: ${typeof twitter}`);
    setTwitter(e.target.value);
  };

  // frontend checks for instagram
  const handleInstagramChange = (e) => {
    setInstagram(e.target.value);
  };

  // frontend checks for email
  const handleFacebookChange = (e) => {
    setFacebook(e.target.value);
  };

  // onFocus setEmailValid to true
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validateTwitterInsta = (handle) => {
    if (handle === undefined) {
      console.log(`validatetwitterinsta undefined: ${handle}`);
      return;
    } else if (handle.includes("@")) {
      console.log(`validatetwitterinsta includes @: ${handle}`);
      return true;
    }
  };

  const validateFacebook = (url) => {
    if (/^(https?:\/\/)?((w{3}\.)?)facebook.com\/.*/i.test(url)) {
      console.log(`facebook validate true: ${url}`);
      return true;
    } else {
      console.log(`facebook validate else: ${url}`);
    }
  };

  const emailErrors = (email) => {
    if (email === undefined) {
      console.log(`email undefined: ${email}`);
      return false;
    } else if (validateEmail(email)) {
      console.log(`email validate: ${email}`);
      setEmailValid(true);
      return false;
    } else {
      setEmailValid(false);
      console.log(`email errors else : ${email}`);
      return true;
    }
  };

  const twitterErrors = (twitter) => {
    if (twitter === undefined) {
      console.log(`twitterErrors: ${twitter}`);
      return false;
    } else if (validateTwitterInsta(twitter)) {
      console.log(`twitterErrors: ${twitter}`);
      setTwitterValid(false);
      return true;
    } else {
      setTwitterValid(true);
      return false;
    }
  };

  const instagramErrors = (instagram) => {
    if (instagram === undefined) {
      console.log(`instagram undefined: ${instagram}`);
      return false;
    } else if (validateTwitterInsta(instagram)) {
      console.log(`validatetwitterinsta Instagram: ${instagram}`);
      setInstagramValid(false);
      return true;
    } else {
      setInstagramValid(true);
      return false;
    }
  };

  const facebookErrors = (facebook) => {
    if (facebook === undefined) {
      console.log(`facebook undefined: ${facebook}`);
      return false;
    } else if (!validateFacebook(facebook)) {
      console.log(`not validate Facebook: ${facebook}`);
      setFacebookValid(false);
      return true;
    } else {
      console.log(`facebook Errors else: ${facebook}`);
      setFacebookValid(true);
      return false;
    }
  };

  const submitProfileChanges = async () => {
    console.log(`submitprofilechanges`);
    const formData = new FormData();

    // validation checks
    const hasErrors =
      emailErrors(email) ||
      twitterErrors(twitter) ||
      instagramErrors(instagram) ||
      facebookErrors(facebook);

    console.log(`hasErrors: ${hasErrors}`);
    console.log(`emailErrors: ${emailErrors(email)}`);
    console.log(`twitterErrors: ${twitterErrors(twitter)}`);
    console.log(`instagramErrors: ${instagramErrors(instagram)}`);
    console.log(`facebookErrors: ${facebookErrors(facebook)}`);

    if (hasErrors === false) {
      console.log(`hasErrors false: ${hasErrors}`);
      if (name) {
        formData.append("name", name);
      }
      if (bio) {
        formData.append("bio", bio);
      }
      if (email) {
        formData.append("email", email);
      }
      if (twitter) {
        formData.append("twitter", twitter);
      }
      if (instagram) {
        formData.append("instagram", instagram);
      }
      if (facebook) {
        formData.append("facebook", facebook);
      }

      // send profile pic to imgur
      if (images) {
        console.log(`submitprofilechanges images: ${images}`);
        formData.append("image", images);
      } else {
        console.log("where is images[0]?");
      }

      try {
        console.log("got to the try statement");
        dispatch(editUser(formData));
        dispatch(setSnackbar(true, "success", "Profile Saved!"));
      } catch (err) {
        console.log(`this is the err: ${err}`);
        dispatch(setSnackbar(true, "warning", "Could not save profile data"));
      }
    } else {
      console.log("has errors:");
      console.log(
        `name: ${name}\nbio: ${bio}\nemail:${email}\ntwitter: ${twitter}\ninstagram: ${instagram}\nfacebook: ${facebook}`
      );
      dispatch(setSnackbar(true, "warning", "Please correct profile inputs"));
    }
  };

  useEffect(() => {
    if (!localStorage.token) {
      dispatch(userActions.setAuthFalse());
    }
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    setName(currentUser.name);
    setBio(currentUser.bio);
    setEmail(currentUser.email);
    setTwitter(currentUser.twitter);
    setInstagram(currentUser.instagram);
    setFacebook(currentUser.facebook);
    setProfilePicUrl(currentUser.profilePicUrl);
  }, [isAuth, currentUser, dispatch]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavbarDark />
      <Box border="0px grey dotted" width="80vw" className={classes.box}>
        <Grid container>
          <Grid item xs={12}>
            <Box border="0px grey dotted" textAlign="center">
              <Typography className={classes.title}>
                Profile Settings
              </Typography>
            </Box>
            <Box border="0px grey dotted" textAlign="center" marginBottom={3}>
              <Typography className={classes.accountTitle}>
                Account: 0x1234567ABC12D
              </Typography>
            </Box>
          </Grid>

          <Grid
            item
            xs={7}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box border="0px grey dotted">
              <TextField
                className={classes.margin}
                id="name"
                label="Name (Username)"
                value={name || ""}
                fullWidth
                width="300px"
                variant="outlined"
                size="small"
                onChange={handleNameChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon className={classes.inputIcons} />
                    </InputAdornment>
                  ),
                  style: { fontSize: "1.7vh" },
                }}
                InputLabelProps={{
                  style: { fontSize: 10 },
                }}
              />
              <TextField
                className={classes.margin}
                id="bio"
                label="Bio"
                value={bio || ""}
                onChange={handleBioChange}
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon className={classes.inputIcons} />
                    </InputAdornment>
                  ),
                  style: { fontSize: "1.7vh" },
                }}
                InputLabelProps={{
                  style: { fontSize: 10 },
                }}
              />
              <TextField
                className={classes.margin}
                id="email"
                label="E-Mail"
                value={email || ""}
                onChange={handleEmailChange}
                // onBlur={emailCheck}
                error={!emailValid}
                helperText={!emailValid ? "Please enter a valid email" : ""}
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon className={classes.inputIcons} />
                    </InputAdornment>
                  ),
                  style: { fontSize: "1.7vh" },
                }}
                InputLabelProps={{
                  style: { fontSize: 10 },
                }}
              />
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                style={{ maxHeight: "20px" }}
                className={classes.socialMediaButton}
                onClick={() => setShowSocialMedia(!showSocialMedia)}
              >
                Add Social Media
              </Button>

              {showSocialMedia && (
                <Box>
                  {" "}
                  <TextField
                    className={classes.margin}
                    id="twitter"
                    label="Twitter"
                    value={twitter || ""}
                    onChange={handleTwitterChange}
                    error={!twitterValid}
                    helperText={!twitterValid ? "without the '@' symbol" : ""}
                    fullWidth
                    variant="outlined"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TwitterIcon className={classes.inputIcons} />
                        </InputAdornment>
                      ),
                      style: { fontSize: "1.7vh" },
                    }}
                    InputLabelProps={{
                      style: { fontSize: 10 },
                    }}
                  />
                  <TextField
                    className={classes.margin}
                    id="instagram"
                    label="Instagram"
                    value={instagram || ""}
                    onChange={handleInstagramChange}
                    error={!instagramValid}
                    helperText={!instagramValid ? "without the '@' symbol" : ""}
                    fullWidth
                    variant="outlined"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <InstagramIcon className={classes.inputIcons} />
                        </InputAdornment>
                      ),
                      style: { fontSize: "1.7vh" },
                    }}
                    InputLabelProps={{
                      style: { fontSize: 10 },
                    }}
                  />
                  <TextField
                    className={classes.margin}
                    id="facebook"
                    label="Facebook"
                    value={facebook || ""}
                    onChange={handleFacebookChange}
                    error={!facebookValid}
                    helperText={
                      !facebookValid ? "Please enter a valid facebook URL" : ""
                    }
                    fullWidth
                    variant="outlined"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FacebookIcon className={classes.inputIcons} />
                        </InputAdornment>
                      ),
                      style: { fontSize: "1.7vh" },
                    }}
                    InputLabelProps={{
                      style: { fontSize: 10 },
                    }}
                  />
                </Box>
              )}

              <Box border="0px grey dotted" marginTop={5}>
                <Button
                  key="one"
                  variant="contained"
                  color="secondary"
                  onClick={submitProfileChanges}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={5}
            style={{
              display: "flex",
              justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <Box border="0px grey dotted">
              <Box
                marginBottom={5}
                sx={{ alignItems: "center" }}
                // border="0px grey dotted"
                textAlign="center"
              >
                <Typography className={classes.avatarTitle}>
                  Profile Picture/Avatar
                </Typography>

                <ProfileDrop
                  setImage={setImages}
                  profilePicUrl={profilePicUrl || ""}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default EditProfile;
