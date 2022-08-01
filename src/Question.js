import React from 'react';

export default function Question(props) {

    // Map array of options to list elements
    const optionDisplay = props.options.map(option => {
        return (
            <div className="question-options">
                <input type="radio" onChange={(event) => props.handleChange(event)} id={option} name={props.question} value={option} />
                <label htmlFor={option} className="question-options-option">{option}</label>
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