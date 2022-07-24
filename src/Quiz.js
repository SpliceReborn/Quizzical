import React from 'react';
import "./style.css"
import Question from './Question'

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

        return (
            <Question question={question.question} options={options} />
        )
    })

    return (
        <div className="question-page">
            {questions}
            <button className="button">Check answers</button>
        </div>
    )
}