import { useState } from 'react'

export default function GameSet() {

    const [pokeList, setPokeList] = useState({
        active: false,
        pokeArr: [],
        hiddenPoke: {}
    })

    console.log(pokeList.hiddenPoke)

    function loadPokemon() {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=150&offset=0`)
            .then(res => res.json())
            .then(data => {

                let chosenPoke = []
                const results = data['results']
                const dataL = results.length

                for (let i = 0; i < 4; i++) {
                    let x = results[Math.floor(Math.random() * dataL)]
                    chosenPoke.push(x)
                }


                let x = chosenPoke[Math.floor(Math.random() * 4)]
                fetch(`${x.url}`)
                    .then(res => res.json())
                    .then(data => {
                        setPokeList(prev => {
                            return { ...prev, active: true, pokeArr: chosenPoke, hiddenPoke: data }
                        })
                    })

            })
    }

    const {hiddenPoke, pokeArr} = pokeList

    return (
        <div className='gameset'>
            {pokeList.active && <img src={hiddenPoke.sprites.front_default} alt="" />}
            <h1>Whos That Pokémon?</h1>
            {!pokeList.active && <button onClick={loadPokemon}>Start!</button>}
            {pokeList.pokeArr[0] && <button>{pokeArr[0].name}</button>}
            {pokeList.pokeArr[1] && <button>{pokeArr[1].name}</button>}
            {pokeList.pokeArr[2] && <button>{pokeArr[2].name}</button>}
            {pokeList.pokeArr[3] && <button>{pokeArr[3].name}</button>}
        </div>
    )
}