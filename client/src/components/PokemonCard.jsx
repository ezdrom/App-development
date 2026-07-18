import { Link } from 'react-router-dom'
import FavoriteButton from './FavoriteButton.jsx'

// Reusable presentational atom for req. "List of Pokemon with images" + "Grid & list view".
// Usage: <PokemonCard pokemon={{ name, image }} view="grid" | "list" />
export default function PokemonCard({ pokemon, view = 'grid' }) {
  return (
    <Link to={`/pokemon/${pokemon.name}`} className="pokemon-card" data-view={view}>
      <FavoriteButton pokemon={pokemon} />
      <img src={pokemon.image} alt={pokemon.name} loading="lazy" />
      <p>{pokemon.name}</p>
    </Link>
  )
}
