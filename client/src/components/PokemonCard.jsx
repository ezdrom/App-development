import FavoriteButton from './FavoriteButton.jsx'

// Reusable presentational atom for req. "List of Pokemon with images".
// Usage: <PokemonCard pokemon={{ name, image }} />
export default function PokemonCard({ pokemon }) {
  return (
    <div className="pokemon-card">
      <FavoriteButton pokemon={pokemon} />
      <img src={pokemon.image} alt={pokemon.name} loading="lazy" />
      <p>{pokemon.name}</p>
    </div>
  )
}
