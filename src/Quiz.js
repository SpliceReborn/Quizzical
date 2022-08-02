import React, { useState } from 'react';
import "./style.css"
import Question from './Question'
import { nanoid } from 'nanoid'

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

    function checkAnswers() {
        let count = 0
        correct_answers.forEach((ele, index) => {
            if (selectedOptions[`question${index+1}`] === ele) {
                count++
            }
        })
        console.log(count)
        props.setGameFlag()
    }    

    function handleChange(event, questionNumber) {
        const {value} = event.target
        console.log(event.target, questionNumber)
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
                optionsId={[nanoid(), nanoid(), nanoid(), nanoid()]}
                answer={correct_answer}
                handleChange={handleChange}
                gameFlag={props.gameFlag}
            />
        )
    })

    return (
        <div className="question-page">
            {questions}
            <button className="button" onClick={checkAnswers}>Check answers</button>
        </div>
    )
}