import React, { useState } from 'react';
var he = require('he')

export default function Question(props) {

    const [questionData, setQuestionData] = useState(
        {
            questionOne: "",
            questionTwo: "",
            questionThree: "",
            questionFour: "",
            questionFive: "",
        }
    )

    function handleChange(event) {
        const {name, value} = event.target
        setQuestionData(prevQuestionData => {
            return {
                ...prevQuestionData,
                [name]: value
            }
        })
    }

    // Map array of options to list elements
    const optionDisplay = props.options.map(option => {
        return (
            <div className="question-options">
                <input type="radio" onChange={handleChange} id={option} name={props.question} value={option} />
                <label htmlFor={option} className="question-options-option">{he.decode(option)}</label>
            </div>
        )
    })

    return (
        <fieldset className="question">
            <legend className="question-question">{he.decode(props.question)}</legend>
            <div className="question-options-container">
                {optionDisplay}
            </div>
            <hr />
        </fieldset>
    )
}