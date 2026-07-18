import { useEffect, useState } from 'react'
import PokemonCard from '../components/PokemonCard.jsx'
import { fetchPokemonList } from '../services/api.js'

const PAGE_SIZE = 20 // req. "By default, the number of pokemon shown must be 20"

export default function PokemonListPage() {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPokemonList({ limit: PAGE_SIZE, offset: 0 }).then((data) => {
      setPokemon(data.results)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <h1>Pokemon</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="pokemon-grid">
          {pokemon.map((p) => (
            <PokemonCard key={p.name} pokemon={p} />
          ))}
        </div>
      )}
    </div>
  )
}
