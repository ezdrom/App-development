import { useFavorites } from '../context/FavoritesContext.jsx'

// Reusable atom — req. "Ability to add a pokemon as favorite".
// Usage: <FavoriteButton pokemon={{ name, image }} />
export default function FavoriteButton({ pokemon }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(pokemon.name)

  return (
    <button
      type="button"
      className="favorite-btn"
      aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(pokemon)
      }}
    >
      {active ? '★' : '☆'}
    </button>
  )
}
