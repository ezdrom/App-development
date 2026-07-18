import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
// import { fetchPokemonDetail } from '../services/api.js'

export default function PokemonDetailPage() {
  const { name } = useParams()
  const [detail, setDetail] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO (req. "Viewable Pokemon details & ability"):
    // fetchPokemonDetail(name).then((data) => { setDetail(data); setLoading(false) })
    // Backend GET /api/pokemon/:name already proxies PokeAPI and returns
    // { name, image, types, abilities, stats, height, weight }.
    setLoading(false)
  }, [name])

  return (
    <div>
      <Link to="/">&larr; Back to list</Link>
      <h1>{name}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : detail ? (
        <div>{/* TODO: render image, types, abilities, stats */}</div>
      ) : (
        <div className="empty-state">Wire up the fetch in PokemonDetailPage.jsx.</div>
      )}
    </div>
  )
}
