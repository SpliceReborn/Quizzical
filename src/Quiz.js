import React, { useState } from 'react';
import "./style.css"
import Question from './Question'

export default function Quiz(props) {

    const [selectedOptions, setSelectedOptions] = useState({
        question1: "",
        question2: "",
        question3: "",
        question4: "",
        question5: "",
    })

    const correct_answers = []
    props.questionArray.forEach(question => {
        correct_answers.push(question.correct_answer)  
    })

    const [score, setScore] = useState(0)

    function checkOrRestart() {
        if (props.gameOngoing) {
            correct_answers.forEach((ele, index) => {
                if (selectedOptions[`question${index+1}`] === ele) {
                    setScore(prevScore => prevScore + 1)
                }
            })
        } else {
            setScore(0)
        }

        props.checkOrRestart()
    }    

    function handleChange(event, questionNumber) {
        const {value} = event.target
        setSelectedOptions(prevSelectedOptions => ({
            ...prevSelectedOptions,
            [questionNumber]: value
        }))
    }

    const questions = props.questionArray.map(({id, question, correct_answer, options}, index) => { 
        return (
            <Question 
                key={id} 
                number={`question${index+1}`} 
                question={question} 
                options={options}
                answer={correct_answer}
                handleChange={handleChange}
                gameOngoing={props.gameOngoing}
            />
        )
    })

    return (
        <div className="question-page">
            {questions}
            {props.gameOngoing ? 
                <button className="button" onClick={checkOrRestart}>Check answers</button> : 
                <div className="scoreContainer">
                    <p>You scored {score}/5 correct answers</p>
                    <button className="button" onClick={checkOrRestart}>Play again</button>
                </div>
            }
        </div>
    )
}