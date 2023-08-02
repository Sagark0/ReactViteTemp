import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall, encryptedStorage } from "../utils/utilityFunctions";

import { auth } from "../firebase";
import {
  getRedirectResult,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
// Material UI Components
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Grid";
import { Paper, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

function UserForm() {
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUserFormSubmit = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        navigate("/", { replace: true });
        // IdP data available using getAdditionalUserInfo(result)
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        setLoading(false);
      });
  };

  // styling box element
  const boxStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  };

  return (
    <>
      <Box component="form" noValidate autoComplete="off" style={boxStyle}>
        <Paper sx={{ width: "40%", p: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                Login
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                value={uname}
                onChange={(e) => {
                  setUname(e.target.value);
                }}
                label="Username"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                label="Password"
                type="password"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                disabled={loading}
                color="success"
                sx={{ width: "100%" }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <LoadingButton
              variant="contained"
              startIcon={<GoogleIcon />}
              onClick={handleUserFormSubmit}
              loading={loading}
            >
              Login With Google
            </LoadingButton>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}

export default UserForm;
