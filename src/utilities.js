import { nanoid } from 'nanoid'

var he = require('he')

function shuffleArray(array) {
    var m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--)
        t = array[m]
        array[m] = array[i]
        array[i] = t
    }
    return array 
}

export function filterQuestionArray(array) {
    array.forEach( ({question, correct_answer, incorrect_answers}, index) => {
        question = he.decode(question)
        correct_answer = he.decode(correct_answer)
        const options = []
        options.push({
            id: nanoid(),
            value: correct_answer
        })
        incorrect_answers.forEach(ele => {
            options.push({
                id: nanoid(),
                value: he.decode(ele)
            })
        })
        shuffleArray(options)

        const id = nanoid()
        array[index] = {id, question, correct_answer, options}
    })
    return array
}