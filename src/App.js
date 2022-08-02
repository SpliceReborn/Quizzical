import React, {useState, useEffect} from 'react';
import './style.css'
import Start from './Start'
import Quiz from './Quiz'
import { nanoid } from 'nanoid'

var he = require('he')

export default function App() {

    const [gameFlag, setGameFlag] = useState(0)
    const [questionArray, setQuestionArray] = useState([])

    function handleGameState() {
        setGameFlag(prevGameFlag => (prevGameFlag+1) % 3)
    }

    function shuffle(array) {
        var m = array.length, t, i;
        while (m) {
            i = Math.floor(Math.random() * m--)
            t = array[m]
            array[m] = array[i]
            array[i] = t
        }
        return array 
    }

    function filterQuestionArray(array) {
        console.log(array)
        array.forEach( ({question, correct_answer, incorrect_answers}, index) => {
            question = he.decode(question)
            correct_answer = he.decode(correct_answer)
            const options = []
            options.push(correct_answer)
            incorrect_answers.forEach(ele => {
                options.push(he.decode(ele))
            })
            shuffle(options)
            const id = nanoid()
            array[index] = {id, question, correct_answer, options}
        })
        return array
    }

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => setQuestionArray(data.results))
    }, [])

    if (gameFlag === 0) {
        return <main className="container"><Start startGame={handleGameState}/></main>
    } else {
        return <main className="container"><Quiz gameFlag={gameFlag} questionArray={gameFlag === 1 ? filterQuestionArray(questionArray) : questionArray} setGameFlag={handleGameState}/></main> 
    }
}
