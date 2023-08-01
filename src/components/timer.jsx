import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
function Timer({timeInMinutes, handleSubmitTest, isTestSubmitted}) {
    const initialTime = timeInMinutes * 60; // 30 minutes in seconds
    const [seconds, setSeconds] = useState(initialTime);
    useEffect(() => {
        // Decrease the remaining time by 1 second every second
        const timerId = setInterval(() => {
            if(seconds > 0) {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }
            else if(!isTestSubmitted) {
                console.log('activated')
                handleSubmitTest();
            }
            
        }, 1000);

        // Clear the timer when the component unmounts or when time reaches 0
        return () => {
            clearInterval(timerId);
          };
    }, [seconds]);

    // Calculate minutes and seconds from remaining seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Format seconds and minutes with leading zeros
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return (
        <Typography variant="subtitle">
             Remaining Time-{formattedMinutes}:{formattedSeconds}
        </Typography>
    );
}

export default Timer;
