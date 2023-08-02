import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase";

import Navbar from "../components/navbar";
import UserForm from "./userForm";

import { Container } from "@mui/material";
const Login = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const uid = user?.displayName;
  console.log("uid", user);
  return (
    <>
      <Navbar />
      <Container>
        {uid}
        {user ? (
          <main>
            <Outlet />
          </main>
        ) : (
          <UserForm />
        )}
      </Container>
    </>
  );
};
export default Login;
