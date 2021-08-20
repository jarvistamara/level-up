import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import GameOver from '../GameOver'
import multiply from '../../images/levels/multiply.jpg'


const LevelThree = (props) => {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [equal, setEqual] = useState(0);
    const [score, setScore] = useState(0);
    const [counter, setCounter] = useState(8)
    const [levelId, setLevelId] = useState(0)
    const [scoreId, setScoreId] = useState(0)
    const [finalScore, setFinalScore] = useState(0)
    const [levelDifficulty, setLevelDifficulty] = useState('')
    const [currentScore, setCurrentScore] = useState(0)
    const [toggleGameOver, setToggleGameOver] = useState(false)
    const history = useHistory()
    
    const startTimer = () => {
        const timer =
            counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }

    const submit = (e) => {
            e.preventDefault();
            const formValid = +equal >= 0;
            if (!formValid) {
            return;
            }
            if (+num1 * +num2 === +equal) {
            setScore((score) => score + 5);
            }
            generateQuestion();
            startTimer();
        };

    const generateQuestion = () => {
        setNum1(Math.ceil(Math.random() * 10));
        setNum2(Math.ceil(Math.random() * 10));
  };

  const handleScoreUpdate = (scoreId) => {
    setScoreId(props.user.scores[0].id)
    console.log('score id', scoreId) 
    setLevelId(props.user.levels[0].id)
    setCurrentScore(props.user.scores[0].points)
    setFinalScore(currentScore + score)
    if (finalScore === 135) {
        setLevelDifficulty('Expert')
    }
    if (finalScore < 135 && finalScore > 90) {
        setLevelDifficulty('Hard')
    } 
        const headerConfig = { 
            method: 'PATCH', 
            headers: { 
                'Content-Type': 'application/json', 
                'Accept': 'application/json' 
            }, 
            body: JSON.stringify({
                points: finalScore,
                level_difficulty: levelDifficulty
            })}
        
        fetch(`/levels/${levelId}/scores/${scoreId}`, headerConfig)
        .then(response => response.json())
        
        .then(data => {
            console.log('update fetch', data)
        })

        setToggleGameOver(true)
    }

    if (score === 135 || counter === 0) {
        return handleScoreUpdate()
       // setToggleGameOver(true)
   }

    return (
        <div className='game-container'>
            <div>
                <img src={multiply} alt='multiply'/>
                <h4>Time Remaining: {counter} </h4>
            </div>
        <form className='level-one-form' onSubmit={submit}>
            <div>
            <label className='equation'>{num1} x {num2}</label>
            <br/>
            <input value={equal} onChange={(e) => setEqual(e.target.value)} />
            </div>
            <button type="submit">check</button>
        </form>
        {toggleGameOver ?  <GameOver /> : <button type="button" onClick={generateQuestion}>start game</button>}
        <p>score: {score}</p>
        <button className='button-warning pure-button' onClick={props.toggle}>Back to Dashboard</button>
        </div>
    );
}
export default LevelThree