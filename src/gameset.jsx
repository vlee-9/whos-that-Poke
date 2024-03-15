import { useState } from 'react'
import { pokeG1 } from './Gen1Data'
import './css/gameset.css'

export default function GameSet() {

    const [settings, setSettings] = useState({
        active: false,
        pokeArr: [],
        hiddenPoke: {},
        answer: false
    })
    
    const {active, hiddenPoke, pokeArr, answer } = settings

    function loadPokemon() {

        let chosenPoke = []
        const dataL = pokeG1.length // consider choice of generation later

        for (let i = 0; i < 4; i++) {
            let x = pokeG1[Math.floor(Math.random() * dataL)]
            chosenPoke.push(x)
        }


        let x = chosenPoke[Math.floor(Math.random() * 4)]
        fetch(`${x.url}`)
        .then(res => res.json())
        .then(data => {
            setSettings(prev => {
                return { ...prev, active: true, pokeArr: chosenPoke, hiddenPoke: data, answer: false }
            })
        })

    }

    function checkAnswer(name){
        switch (name){
            case hiddenPoke.name:
                setSettings(prev => {
                    return {...prev, answer: true}
                })
            break;
        }
    }

    return (
        <div className='gameset'>
            {active && <img className={answer ? '':'hiddenPoke'} src={hiddenPoke.sprites.front_default} alt="" />}
            {answer ? <h1>Thats Right!</h1>:<h1>Whos That Pokémon?</h1>}
            <br/>
            {!active && <button onClick={loadPokemon}>Start!</button>}
            {active && <button onClick={()=>checkAnswer(pokeArr[0].name)}>{pokeArr[0].name}</button>}
            {active && <button onClick={()=>checkAnswer(pokeArr[1].name)}>{pokeArr[1].name}</button>}
            {active && <button onClick={()=>checkAnswer(pokeArr[2].name)}>{pokeArr[2].name}</button>}
            {active && <button onClick={()=>checkAnswer(pokeArr[3].name)}>{pokeArr[3].name}</button>}
            <br/>
            {answer && <button onClick={loadPokemon}>Next</button>}
        </div>
    )
}