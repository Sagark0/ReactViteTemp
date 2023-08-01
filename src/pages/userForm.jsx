import { Link, useNavigate } from "react-router-dom";
import { apiCall, encryptedStorage } from "../utils/utilityFunctions";
import userFormImage from '../assets/userFormImage.jpg';
// Material UI Components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import { useState } from "react";
import { Paper, Typography } from "@mui/material";

function UserForm() {
    const [fName, setFname] = useState('');
    const [lName, setLName] = useState('');
    const [techStack, setTechStack] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);
    // Custom equality test function
    const isOptionEqualToValue = (option, value) => option.id === value?.id;

    const techStackOptions = [
        { label: 'Python', id: 1 },
        { label: 'SQL', id: 2 }
    ]
    const navigate = useNavigate()

    const formData = new FormData();
    formData.append('first_name', fName);
    formData.append('last_name', lName);
    formData.append('dob', '01/01/2000');
    if (techStack !== null) {
        formData.append('tech_stack', techStack.label);
    }
    const hanldeUserFormSubmit = () => {
        setIsDisabled(true);
        apiCall(formData, '/userFormSubmit', 'post').then(
            (res) => {
                console.log(res)
                if (res) {
                    encryptedStorage.setItem('testSession', res.data);
                    localStorage.setItem('first_name', fName);
                    localStorage.setItem('last_name', lName);
                    localStorage.setItem('tech_stack', techStack.label);
                    navigate("/questions", { replace: true });
                } else {
                    alert("error occurred")
                }
            }
        )
        setIsDisabled(false);
    }

    // styling box element
    const boxStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
    };

    return (
        <>
            <Box component="form" noValidate autoComplete="off" style={boxStyle}>
                <Paper sx={{ width: '80%' }}>
                    <Grid container>
                        <Grid
                            md={6}
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            item>
                            <img src={userFormImage} style={{ width: '400px' }} />
                        </Grid>
                        <Grid
                            md={6}
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            item>
                            <Grid
                                container
                                sx={{ p: '20px' }}
                                spacing={2}>
                                <Typography
                                    variant="h6"
                                    align="center"
                                    sx={{ width: '100%', background: '#e8f5e9', paddingLeft: '15px', ml: 2, p: 1 }}
                                >
                                    Login
                                </Typography>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        value={fName}
                                        onChange={(e) => { setFname(e.target.value) }}
                                        label="First Name"
                                        sx={{ width: '100%' }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        value={lName}
                                        onChange={(e) => { setLName(e.target.value) }}
                                        label="Last Name"
                                        sx={{ width: '100%' }}
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Autocomplete
                                        id="techStack"
                                        options={techStackOptions}
                                        value={techStack}
                                        onChange={(e, newValue) => {
                                            setTechStack(newValue);
                                        }}
                                        isOptionEqualToValue={isOptionEqualToValue}
                                        getOptionLabel={(option) => option.label}
                                        sx={{ width: '100%' }}
                                        renderInput={(params) => <TextField {...params} label="Tech Stack" required />}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        variant="contained"
                                        onClick={hanldeUserFormSubmit}
                                        disabled={isDisabled}
                                        color="success">
                                        Login
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </>
    )
}

export default UserForm