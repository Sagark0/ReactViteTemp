import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Outlet } from "react-router-dom";
import { auth } from "../firebase";

import Navbar from "../components/navbar";
import UserForm from "./userForm";

import { Container, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
const Login = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar />
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          minHeight: "80dvh",
          mt: 4
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            {user ? (
              <Box component="main" sx={{ width: "100%" }}>
                <Outlet />
              </Box>
            ) : (
              <UserForm />
            )}
          </>
        )}
      </Container>
    </>
  );
};
export default Login;
