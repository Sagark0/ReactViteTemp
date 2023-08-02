import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

const Dashboard = () => {
  return (
    <>
      Dashboard
      {/* {uid} */}
    </>
  );
};

export default Dashboard;
