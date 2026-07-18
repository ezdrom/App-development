import { useEffect, useState } from 'react'
// import PokemonCard from '../components/PokemonCard.jsx'
// import { fetchPokemonList } from '../services/api.js'

const PAGE_SIZE = 20 // req. "By default, the number of pokemon shown must be 20"

export default function PokemonListPage() {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO (req. "List of Pokemon with images"):
    // 1. Call fetchPokemonList({ limit: PAGE_SIZE, offset: 0 })
    //    — the backend at GET /api/pokemon already proxies PokeAPI and returns
    //    { count, results: [{ name, image, url }], next, previous }.
    // 2. setPokemon(data.results); setLoading(false)
    setLoading(false)
  }, [])

  return (
    <div>
      <h1>Pokemon</h1>

      {loading ? (
        <p>Loading...</p>
      ) : pokemon.length === 0 ? (
        <div className="empty-state">
          {/* TODO: render results in a grid, e.g.: */}
          {/* <div className="pokemon-grid">
                {pokemon.map((p) => <PokemonCard key={p.name} pokemon={p} />)}
              </div> */}
          No Pokemon loaded yet — wire up the fetch in PokemonListPage.jsx.
        </div>
      ) : null}
    </div>
  )
}
