import { useFavorites } from '../context/FavoritesContext.jsx'
// import PokemonCard from '../components/PokemonCard.jsx'

export default function FavoritesPage() {
  const { favorites, loading } = useFavorites()

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1>Favorite Pokemon</h1>
      {favorites.length === 0 ? (
        <div className="empty-state">
          No favorites yet. Add some from the Pokemon list.
        </div>
      ) : (
        // TODO (req. "List of favorite Pokemon"): render `favorites` as a grid, e.g.:
        // <div className="pokemon-grid">
        //   {favorites.map((p) => <PokemonCard key={p.name} pokemon={p} />)}
        // </div>
        <div className="empty-state">
          {favorites.length} favorite(s) loaded — render them in FavoritesPage.jsx.
        </div>
      )}
    </div>
  )
}
