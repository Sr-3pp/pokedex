const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();


app.get('/', async (req, res) => {
  const url = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
  
  const response = await fetch(url)
  const {pokemon: data} = await response.json()

  const deletes = [
    'avg_spawns',
    'spawn_time',
    'spawn_chance',
    'egg',
    'multipliers',
    'candy',
    'candy_count'
  ]


  return res.send(data.map(p => {
    deletes.forEach(d => {
      if (d in p) {
        delete p[d]
      }
    })
    return p
  }))
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});