import { pokeApi, getAllPokemonNames, idFromUrl, spriteUrl } from '../utils/pokeApiClient.js'

// GET /api/pokemon?limit=20&offset=0&search=&sort=asc|desc
export async function listPokemon(req, res, next) {
  try {
    const limit = Math.max(1, Number(req.query.limit) || 20)
    const offset = Math.max(0, Number(req.query.offset) || 0)
    const search = (req.query.search || '').trim().toLowerCase()
    const sort = req.query.sort === 'desc' ? 'desc' : req.query.sort === 'asc' ? 'asc' : null

    let entries

    if (search || sort) {
      // Search/sort span the whole dataset, so we work off the cached full name list.
      entries = await getAllPokemonNames()
      if (search) entries = entries.filter((p) => p.name.includes(search))
      if (sort) {
        entries = [...entries].sort((a, b) =>
          sort === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
        )
      }
    } else {
      // Common case: no filtering, let PokeAPI paginate directly.
      const { data } = await pokeApi.get('/pokemon', { params: { limit, offset } })
      entries = data.results
      const total = data.count
      return res.json({
        count: total,
        results: entries.map((p) => toSummary(p)),
        next: offset + limit < total,
        previous: offset > 0,
      })
    }

    const total = entries.length
    const page = entries.slice(offset, offset + limit)

    res.json({
      count: total,
      results: page.map((p) => toSummary(p)),
      next: offset + limit < total,
      previous: offset > 0,
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/pokemon/:name
export async function getPokemonDetail(req, res, next) {
  try {
    const { data } = await pokeApi.get(`/pokemon/${req.params.name.toLowerCase()}`)

    res.json({
      name: data.name,
      image:
        data.sprites?.other?.['official-artwork']?.front_default || data.sprites?.front_default,
      types: data.types.map((t) => t.type.name),
      abilities: data.abilities.map((a) => ({
        name: a.ability.name,
        isHidden: a.is_hidden,
      })),
      stats: data.stats.map((s) => ({ name: s.stat.name, base: s.base_stat })),
      height: data.height,
      weight: data.weight,
    })
  } catch (err) {
    if (err.response?.status === 404) {
      return res.status(404).json({ message: `Pokemon "${req.params.name}" not found` })
    }
    next(err)
  }
}

function toSummary(entry) {
  const id = idFromUrl(entry.url)
  return { name: entry.name, image: spriteUrl(id), url: entry.url }
}
