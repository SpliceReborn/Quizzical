import React, {useState} from 'react';
import './style.css'
import Start from './Start'
import Quiz from './Quiz'

export default function App() {

    const [gameStarted, setGameStarted] = useState(false)
    const [initialLoad, setInitialLoad] = useState(false)

    function startGame() {
        setGameStarted(true)
        setInitialLoad(true)
        setTimeout(() => {setInitialLoad(false)}, 900)
    }

    return gameStarted ? 
            <main className="container">
                <Quiz 
                    initialLoad={initialLoad}
                />
            </main> : 
            <main className="container">
                <Start startGame={startGame}/>
            </main>

}
