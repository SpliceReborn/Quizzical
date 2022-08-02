import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'

export default function Question(props) {

    const [questionData, setQuestionData] = useState({
        selected: undefined
    })

    function handleChange(event) {
        console.log(event)
        const {value} = event.target
        setQuestionData({
            selected: value
        })
    }

    // Map array of options to list elements
    
    const optionDisplay = props.options.map((option, index) => {

        let questionNumber = props.number
        const condition = (questionData.selected === option)
    
        const correct = (option === props.answer)
        const wrong = (questionData.selected === option && questionData.selected !== props.answer)

        if (props.gameFlag === 2) {
            return (
                <div key={props.optionsId[index]} className="question-options">
                    <input disabled type="radio" id={props.optionsId[index]} name={props.question} value={option}/>
                    <label
                        htmlFor={props.optionsId[index]} 
                        className={
                            `question-options-option disabled ${correct ? "correct" : ""} ${wrong ? "wrong" : ""}`
                        }
                    >{option}</label>
                </div>
            )
        } else {
            return (
                <div key={props.optionsId[index]} className="question-options">
                    <input type="radio" onChange={(event) => {handleChange(event); props.handleChange(event, questionNumber)}} id={props.optionsId[index]} name={props.question} value={option} checked={condition}/>
                    <label htmlFor={props.optionsId[index]} className={`question-options-option ${condition ? "question-options-option-selected" : ""}`}>{option}</label>
                </div>
            )
        }
        
    })  

    return (
        <fieldset className="question">
            <legend className="question-question">{props.question}</legend>
            <div className="question-options-container">
                {optionDisplay}
            </div>
            <hr />
        </fieldset>
    )
}