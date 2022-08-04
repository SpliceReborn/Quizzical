import React, { useState, useEffect } from 'react';
import "./style.css"
import Question from './Question'
import {filterQuestionArray} from './utilities'

export default function Quiz(props) {

    const [gameOngoing, setGameOngoing] = useState(true)
    const [questionArray, setQuestionArray] = useState([])
    const [selectedOptions, setSelectedOptions] = useState({
        question1: "",
        question2: "",
        question3: "",
        question4: "",
        question5: "",
    })
    const [score, setScore] = useState(0)

    function checkOrRestart() {
        if (gameOngoing) {
            questionArray.forEach((ele, index) => {
                if (selectedOptions[`question${index+1}`] === ele.correct_answer) {
                    setScore(prevScore => prevScore + 1)
                }
            })
            setGameOngoing(prevGameOngoing => !prevGameOngoing)
        } else {
            fetch("https://opentdb.com/api.php?amount=5")
                .then(res => res.json())
                .then(data => {
                    setQuestionArray(filterQuestionArray(data.results))
                    setScore(0)
                })
        }       
    }    

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => {
                setQuestionArray(filterQuestionArray(data.results))
            })
    }, [])

    useEffect(() => {
        setGameOngoing(prevGameOngoing => !prevGameOngoing)
    }, [questionArray])

    function handleChange(event, questionNumber) {
        const {value} = event.target
        setSelectedOptions(prevSelectedOptions => ({
            ...prevSelectedOptions,
            [questionNumber]: value
        }))
    }

    const questions = questionArray.map(({id, question, correct_answer, options}, index) => { 
        return (
            <Question 
                key={id} 
                number={`question${index+1}`} 
                question={question} 
                options={options}
                answer={correct_answer}
                handleChange={handleChange}
                gameOngoing={gameOngoing}
            />
        )
    })

    return (
        <div className="question-page">
            {props.initialLoad ? <h1>Loading ... </h1> : questions}
            {props.initialLoad ? <></> : gameOngoing ? 
                <button className="button" onClick={checkOrRestart}>Check answers</button> : 
                <div className="scoreContainer">
                    <p>You scored {score}/5 correct answers</p>
                    <button className="button" onClick={checkOrRestart}>Play again</button>
                </div>
            }
        </div>
    )
}