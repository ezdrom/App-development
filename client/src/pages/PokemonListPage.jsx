import { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar.jsx'
import SortControl from '../components/SortControl.jsx'
import ViewToggle from '../components/ViewToggle.jsx'
// import PokemonCard from '../components/PokemonCard.jsx'
// import { useDebounce } from '../hooks/useDebounce.js'
// import { fetchPokemonList } from '../services/api.js'

const PAGE_SIZE = 20 // req. "By default, the number of pokemon shown must be 20"

export default function PokemonListPage() {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('asc')
  const [view, setView] = useState('grid')
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)

  // const debouncedSearch = useDebounce(search)

  useEffect(() => {
    // TODO (req. "List of Pokemon with images"):
    // 1. Call fetchPokemonList({ limit: PAGE_SIZE, offset, search: debouncedSearch, sort })
    //    — the backend at GET /api/pokemon already proxies PokeAPI and returns
    //    { count, results: [{ name, image, url }], next, previous }.
    // 2. setPokemon(data.results); setLoading(false)
    // 3. Add pagination (offset state + next/previous controls) if you want more than 20.
    setLoading(false)
  }, [search, sort])

  return (
    <div>
      <h1>Pokemon</h1>
      <div className="toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <SortControl value={sort} onChange={setSort} />
        <ViewToggle value={view} onChange={setView} />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : pokemon.length === 0 ? (
        <div className="empty-state">
          {/* TODO: render results in a grid or list (respect `view`), e.g.: */}
          {/* <div className={view === 'grid' ? 'pokemon-grid' : 'pokemon-list'}>
                {pokemon.map((p) => <PokemonCard key={p.name} pokemon={p} view={view} />)}
              </div> */}
          No Pokemon loaded yet — wire up the fetch in PokemonListPage.jsx.
        </div>
      ) : null}
    </div>
  )
}
