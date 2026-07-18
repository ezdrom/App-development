import { pokeApi, idFromUrl, spriteUrl } from '../utils/pokeApiClient.js'

// GET /api/pokemon?limit=20&offset=0
export async function listPokemon(req, res, next) {
  try {
    const limit = Math.max(1, Number(req.query.limit) || 20)
    const offset = Math.max(0, Number(req.query.offset) || 0)

    const { data } = await pokeApi.get('/pokemon', { params: { limit, offset } })

    res.json({
      count: data.count,
      results: data.results.map((p) => ({ name: p.name, image: spriteUrl(idFromUrl(p.url)) })),
      next: offset + limit < data.count,
      previous: offset > 0,
    })
  } catch (err) {
    next(err)
  }
}
