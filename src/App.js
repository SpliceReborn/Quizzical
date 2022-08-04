import React, {useState, useEffect} from 'react';
import './style.css'
import Start from './Start'
import Quiz from './Quiz'
import {filterQuestionArray} from './utilities'

export default function App() {

    const [gameStarted, setGameStarted] = useState(false)
    const [gameOngoing, setGameOngoing] = useState(false)
    const [questionArray, setQuestionArray] = useState([])

    function checkOrRestart() {
        setGameOngoing(prevGameOngoing => !prevGameOngoing)
    }

    function startGame() {
        setGameStarted(true)
        setGameOngoing(true)
    }

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => {
                if (gameStarted && gameOngoing) setQuestionArray(filterQuestionArray(data.results))
            })
        
    },[gameStarted, gameOngoing])

    return gameStarted ? 
            <main className="container">
                <Quiz 
                    questionArray={questionArray} 
                    gameOngoing={gameOngoing}
                    checkOrRestart={checkOrRestart}
                />
            </main> : 
            <main className="container">
                <Start startGame={startGame}/>
            </main>

}
