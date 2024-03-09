import { useState } from 'react'
import './css/App.css'

function App() {

  const [pokestats, setpokestats] = useState({
    pokeName: '???',
    pokeType1: '???',
    pokeType2: '???',
    pokeHP: '???',
    pokeAtk: '???',
    pokeDef: '???',
    pokeSAk: '???',
    pokeSDf: '???',
    pokeSd: '???',
    pokeImg: '???'
  })

  const {pokeName,pokeType1,pokeType2,pokeHP,pokeAtk,pokeDef,pokeSAk,pokeSDf,pokeSd,pokeImg} = pokestats

  const getRandomPoke = () => {
    let num = Math.floor(Math.random() * 500)
    fetch(`https://pokeapi.co/api/v2/pokemon/${num}/`)
      .then(res => res.json())
      .then(data => {

        let newPoke = {}

        newPoke.pokeName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        newPoke.pokeType1 = data.types[0].type.name
        newPoke.pokeType2 = data.types[1] ? data.types[1].type.name: '';
        newPoke.pokeHP = data.stats[0].base_stat
        newPoke.pokeAtk = data.stats[1].base_stat
        newPoke.pokeDef = data.stats[2].base_stat
        newPoke.pokeSAk = data.stats[3].base_stat
        newPoke.pokeSDf = data.stats[4].base_stat
        newPoke.pokeSd = data.stats[5].base_stat
        newPoke.pokeImg = data.sprites.front_default

        setpokestats(newPoke)
      })
  }

  return (
    <>
      <div>
        <img src={pokeImg} alt="" />
        <p>{pokeName}</p>
        <p className="types">{pokeType1}{pokeType2 && ` / ${pokeType2}`}</p>
        <div className="poke-stats">
          <p className="stat">HP: {pokeHP}</p>
          <p className="stat">Atk: {pokeAtk}</p>
          <p className="stat">Def: {pokeDef}</p>
          <p className="stat">Sp.Ak: {pokeSAk}</p>
          <p className="stat">Sp.Df:  {pokeSDf}</p>
          <p className="stat">Spd:  {pokeSd}</p>
        </div>
      </div>
      < button className="button-rand" onClick={getRandomPoke}>Random</button>
      <a href='./gamepage.html'><button>Game</button></a>
    </>
  )
}

export default App
