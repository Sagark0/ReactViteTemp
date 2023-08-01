import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import QuestionPaper from './pages/questionPaper'
import UserForm from './pages/userForm'

// material ui
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from '@mui/material';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<UserForm />} />
      <Route path="questions" element={<QuestionPaper />} />
    </Route>
  )
)
const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif'
  },
});
function App() {

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Typography variant="h5" align="center"> Exam Portal </Typography>
        <RouterProvider router={router} />
      </Container>
    </ThemeProvider>

  )
}

export default App
