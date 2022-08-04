import React, { useState } from 'react';

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

    // Map array of options to list elements
    
    const optionDisplay = props.options.map(option => {

        let questionNumber = props.number
        const condition = (questionData.selected === option.value)
    
        const correct = (option.value === props.answer)
        const wrong = (questionData.selected === option.value && questionData.selected !== props.answer)

        return (
            <div key={option.id} className="question-options">
                <input 
                    type="radio" 
                    disabled={!props.gameOngoing}
                    onChange={(event) => {handleChange(event); props.handleChange(event, questionNumber)}} 
                    id={option.id} 
                    name={props.question} 
                    value={option.value} 
                    checked={condition}
                />
                <label 
                    htmlFor={option.id} 
                    className={props.gameOngoing ? 
                        `question-options-option ${condition ? "question-options-option-selected" : ""}` :
                        `question-options-option disabled ${correct ? "correct" : ""} ${wrong ? "wrong" : ""} `
                    }
                >{option.value}</label>
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