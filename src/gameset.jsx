import { useState } from 'react'
import { pokeG1 } from './Gen1Data'

export default function GameSet() {

    const [settings, setSettings] = useState({
        active: false,
        pokeArr: [],
        hiddenPoke: {}
    })
    
    const { hiddenPoke, pokeArr } = settings

    function loadPokemon() {

        let chosenPoke = []
        const dataL = pokeG1.length

        for (let i = 0; i < 4; i++) {
            let x = pokeG1[Math.floor(Math.random() * dataL)]
            chosenPoke.push(x)
        }


        let x = chosenPoke[Math.floor(Math.random() * 4)]
        fetch(`${x.url}`)
        .then(res => res.json())
        .then(data => {
            setSettings(prev => {
                return { ...prev, active: true, pokeArr: chosenPoke, hiddenPoke: data }
            })
        })

    }

    function checkAnswer(name){
        name === hiddenPoke.name ? loadPokemon() : console.log('nope')
    }

    return (
        <div className='gameset'>
            {settings.active && <img src={hiddenPoke.sprites.front_default} alt="" />}
            <h1>Whos That Pokémon?</h1>
            {!settings.active && <button onClick={loadPokemon}>Start!</button>}
            {settings.pokeArr[0] && <button onClick={()=>checkAnswer(pokeArr[0].name)}>{pokeArr[0].name}</button>}
            {settings.pokeArr[1] && <button onClick={()=>checkAnswer(pokeArr[1].name)}>{pokeArr[1].name}</button>}
            {settings.pokeArr[2] && <button onClick={()=>checkAnswer(pokeArr[2].name)}>{pokeArr[2].name}</button>}
            {settings.pokeArr[3] && <button onClick={()=>checkAnswer(pokeArr[3].name)}>{pokeArr[3].name}</button>}
        </div>
    )
}