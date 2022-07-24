import React, {useState, useEffect} from 'react';
import './style.css'
import Start from './Start'
import Quiz from './Quiz'

export default function App() {

    const [game, setGame] = useState(false)
    const [questionArray, setQuestionArray] = useState([])

    function startGame() {
        setGame(true) 
    }

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => setQuestionArray(data.results))
    }, [])

    return (
        game ? 
            <main className="container"><Quiz questionArray={questionArray}/></main> : 
            <main className="container"><Start startGame={startGame}/></main>
    )
}
