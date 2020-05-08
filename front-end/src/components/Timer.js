import React, { useState, useEffect } from 'react'
import User from '../data/User'

export default function Timer() {
    const [ seconds, setSeconds ] = useState(0);
    const [ minutes, setMinutes ] = useState(0);
    
    function incrementSeconds(){
        setTimeout(() => {
            setSeconds(seconds+1)
            if(seconds === 60){
                setSeconds(0)
                setMinutes(minutes+1)
            }
        }, 1000)
    }
    
    useEffect(() => {
        if(User.using_now){
            incrementSeconds()
        }
    }, [seconds])
    
    function incrementSeconds(){
        setTimeout(() => {
            setSeconds(seconds+1)
            if(seconds === 60){
                setSeconds(0)
                setMinutes(minutes+1)
            }
        }, 1000)
    }
    return(
        
        
        
        <div className="timer">
            <div>{minutes}m:{seconds}s</div>        
        </div>
    )
}