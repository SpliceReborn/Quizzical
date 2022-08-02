import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'

export default function Question(props) {

    const [questionData, setQuestionData] = useState({
        selected: undefined
    })

    function handleChange(event) {
        const {value} = event.target
        setQuestionData({
            selected: value
        })
    }

    useEffect(() => {
        console.log(questionData)
    }, [questionData])

    // Map array of options to list elements
    const optionDisplay = props.options.map(option => {

        let id = nanoid() 
        const condition = (questionData.selected === option)

        return (
            <div key={id} className="question-options">
                <input type="radio" onChange={handleChange} id={option} name={props.question} value={option} checked={condition}/>
                <label htmlFor={option} className={`question-options-option ${condition ? "question-options-option-selected" : ""}`}>{option}</label>
            </div>
        )
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