import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import UserForm from "./pages/userForm";

// material ui

import { createTheme, ThemeProvider} from '@mui/material/styles';

import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Navbar from "./components/navbar";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Login />}>
      <Route path="/" element={<Dashboard />} />
      {/* <Route path="login" element={<UserForm />} /> */}
    </Route>
  )
);
const theme = createTheme({
  palette: {
    primary: {
      main: "#272829",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
