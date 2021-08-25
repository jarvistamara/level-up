import { useHistory, Link } from "react-router-dom"
import React, { useState, useEffect } from 'react'
import add from '../../images/levels/add.jpg'
import GameOver from '../GameOver'

const LevelOne = (props) => {

    const [num1, setNum1] = useState(0)
    const [num2, setNum2] = useState(0)
    const [sum, setSum] = useState(0)
    const [score, setScore] = useState(0)
    const [counter, setCounter] = useState(8)
    const [levelId, setLevelId] = useState(0)
    const [scoreId, setScoreId] = useState(0)
    const [finalScore, setFinalScore] = useState(0)
    const [levelDifficulty, setLevelDifficulty] = useState('')
    const [currentScore, setCurrentScore] = useState(0)
    const [toggleGameOver, setToggleGameOver] = useState(false)
    const history = useHistory()
    let updatedScore = 0


    useEffect(() => {
        setScoreId(props.user.scores[0].id)
        setLevelId(props.user.levels[0].id)
        setCurrentScore(props.user.scores[0].points)
    })

    const startTimer = () => {
        const timer =
            counter > 0 && setTimeout(() => setCounter(counter - 1), 2000)
        return () => clearInterval(timer);
    }

    const submit = (e) => {
        e.preventDefault();
        const formValid = +sum >= 0;
        if (!formValid) {
        return;
        }
        if (+num1 + +num2 === +sum) {
        setScore((score) => score + 5);
        }
        console.log('score check', score)
        generateQuestion()
        startTimer();
        if (counter === 0) {
            updatedScore = currentScore + score
             handleScoreUpdate()
        }
    }

  // GENERATE QUESTIONS
  const generateQuestion = () => {
    setNum1(Math.ceil(Math.random() * 10));
    setNum2(Math.ceil(Math.random() * 10));
  };

  // UPDATE SCORES
    const handleScoreUpdate = () => {
       
       const headerConfig = { 
            method: 'PATCH', 
            headers: { 
                'Content-Type': 'application/json', 
                'Accept': 'application/json' 
            }, 
            body: JSON.stringify({
                points: updatedScore,
                level_difficulty: levelDifficulty
            })}
         
        fetch(`/levels/${levelId}/scores/${scoreId}`, headerConfig)
        .then(response => response.json())
        
        .then(data => {
            console.log('update fetch', data)
        })

        setToggleGameOver(true)
    }
   
    
    return (  
        <div className='game-container'>
            
            <div>
                <img src={add} alt='add'/>
                <h4>Time Remaining: {counter} </h4>
            </div>
            <form className='level-one-form' onSubmit={submit}>
                <div>
                <label className='equation'>{num1} + {num2}</label>
                <br/>
                <input value={sum} onChange={(e) => setSum(e.target.value)} />
                </div>
                <button type="submit">check</button>
            </form>
            {toggleGameOver ?  <GameOver finalScore={updatedScore}/> : <button type="button" onClick={generateQuestion}>start game</button>}
           
            <p>score: {score}</p>
            
        </div>
    );
    
}
export default LevelOne