import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
// Material UI
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { AppBar, Avatar, Toolbar, Paper, Typography, IconButton, Snackbar, Alert } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

import { apiCall, encryptedStorage } from '../utils/utilityFunctions';
import Popup from '../components/popup';
import Timer from '../components/timer';

function QuestionPaper() {

    // Fetch the questions from encryptedStorage.getItem('testSession')
    const testSession = encryptedStorage.getItem('testSession');
    const firstName = localStorage.getItem('first_name')
    const lastName = localStorage.getItem('last_name')
    const techStack = localStorage.getItem('tech_stack')
    const [isDisabled, setIsDisabled] = useState(false);
    const [isTestSubmitted, setIsTestSubmitted] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [snackbarOpen, setSnackbbarOpen] = useState(false);
    const initialUnansweredQuestions = testSession.map((question, index) => index);
    const [unansweredQuestions, setUnansweredQuestions] = useState(initialUnansweredQuestions);

    // Initialize state to hold the answers for each question
    const [answers, setAnswers] = useState(
        testSession.reduce((acc, question) => {
            acc[question.Question] = ''; // Initialize each answer as an empty string
            return acc;
        }, {})
    );

    // Function to handle changes in the answer text field
    const handleAnswerChange = (questionId, index, event) => {
        const answerValue = event.target.value;
        console.log(index);
        // Update the answers state with the new answer for the specific question
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answerValue,
        }));
        if (answerValue !== '') {
            setUnansweredQuestions((prevUnanswered) =>
              prevUnanswered.filter((qIndex) => qIndex !== index)
            );
          } else {
            // If the answer is empty and the question index is not already in the unansweredQuestions array, add it
            if (!unansweredQuestions.includes(index)) {
              setUnansweredQuestions((prevUnanswered) => [...prevUnanswered, index]);
            }
          }
    };

    // Function to submit the test and send answers to the backend
    const handleSubmitTest = () => {
        setIsDisabled(true);
        console.log(answers)
        const formData = new FormData();
        formData.append('answers', JSON.stringify(answers));
        formData.append('first_name', firstName)
        formData.append('last_name', lastName)
        formData.append('tech_stack', techStack)
        apiCall(formData, '/userTestSubmit', 'post').then(
            (res) => {
                console.log(res)
                setPopupOpen(false)
                setSnackbbarOpen(true)
                setIsTestSubmitted(true);
            }
        )
    };

    console.log(testSession);
    if (testSession) {
        return (
            <>
                <AppBar sx={{ my: '15px', background: '#333' }} position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {techStack} Questions
                        </Typography>
                        <Timer timeInMinutes={20} handleSubmitTest={handleSubmitTest} isTestSubmitted={isTestSubmitted} />
                        <Typography variant="h6">
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <Avatar sx={{ bgcolor: deepOrange[500], width: 40, height: 40 }}>{firstName[0]}{lastName[0]}</Avatar>
                            </IconButton>
                            {firstName} {lastName}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid spacing={2} container>

                    {testSession.map((q, index) => {
                        return <Grid item md={12} key={q.Question}>
                            <Paper sx={{ padding: '15px' }}>
                                <Typography variant='overline' sx={{display: 'block'}} gutterBottom>
                                    {index + 1}. {q.Question}
                                </Typography>
                                <TextField
                                    id={`answer-${index}`}
                                    label="Answer"
                                    multiline
                                    rows={4}
                                    sx={{ width: '700px' }}
                                    value={answers[q.Question] || ''} // Set the value of the TextField to the corresponding answer in the state
                                    onChange={(e) => handleAnswerChange(q.Question, index, e)} // Call handleAnswerChange when the answer is changed
                                />
                            </Paper>
                        </Grid>
                    })}
                    {/* <Button
                        onClick={handleSubmitTest}
                        variant="contained"
                        color="success"
                        sx={{ mx: 'auto', my: '15px' }}
                        disabled={isDisabled}
                    >
                        Submit Test
                    </Button> */}
                    <Popup 
                    isDisabled={isDisabled} 
                    unansweredQuestions={unansweredQuestions} 
                    handleSubmitTest={handleSubmitTest}
                    open={popupOpen}
                    setOpen={setPopupOpen}
                     />
                </Grid>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={snackbarOpen}
                    autoHideDuration={6000}
                >
                    <Alert severity="success" sx={{ width: '100%', pt: '10px' }}>
                        Test Submitted Successfully
                        <Button component={Link} color="success" size="small" to="/" sx={{ display: 'block', mx: 'auto', width: '150px' }}>
                            go to homepage
                        </Button>
                    </Alert>

                </Snackbar>
            </>
        )
    } else {
        return (
            <Grid container>
                Go to User Form
            </Grid>
        )
    }
}

export default QuestionPaper