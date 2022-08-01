import React from 'react';
import "./style.css"
import Question from './Question'
import { nanoid } from 'nanoid'

var he = require('he')

export default function Quiz(props) {

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

    const questions = props.questionArray.map(question => {

        // Put correct and incorrect answers into an array, then shuffle
        const options = [...question.incorrect_answers]
        options.push(question.correct_answer)
        shuffle(options)
        
        // Generate id for question component
        let id = nanoid() 

        return (
            <Question 
                key={id} 
                id={id} 
                question={he.decode(question.question)} 
                options={options}
                answer={question.correct_answer}    
            />
        )
    })

    return (
        <div className="question-page">
            {questions}
            <button className="button">Check answers</button>
        </div>
    )
}