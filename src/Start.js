import React from 'react';

export default function Start(props) {
    return (
        <article className="start-page">
            <h1 className="start-page-title">Quizzical</h1>
            <p className="start-page-description">A solo project (no guidance) from the Scrimba React's course! I have added a few additional tweaks to the functionality!</p>
            <button className="start-page-button" onClick={props.startGame}>Start quiz</button>
        </article>
    )
}