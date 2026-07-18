import axios from 'axios'

const POKEAPI_BASE_URL = process.env.POKEAPI_BASE_URL || 'https://pokeapi.co/api/v2'
const SPRITE_BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

export const pokeApi = axios.create({ baseURL: POKEAPI_BASE_URL })

export function idFromUrl(url) {
  const match = url.match(/\/pokemon\/(\d+)\/?$/)
  return match ? Number(match[1]) : null
}

export function spriteUrl(id) {
  return `${SPRITE_BASE_URL}/${id}.png`
}

// The full name+url list is a small payload (~1300 entries) — cache it in-memory
// so search/sort don't refetch it on every request.
let cachedNameList = null
let cachedAt = 0
const CACHE_TTL_MS = 1000 * 60 * 60 // 1 hour

export async function getAllPokemonNames() {
  const isFresh = cachedNameList && Date.now() - cachedAt < CACHE_TTL_MS
  if (isFresh) return cachedNameList

  const { data } = await pokeApi.get('/pokemon', { params: { limit: 100000, offset: 0 } })
  cachedNameList = data.results // [{ name, url }]
  cachedAt = Date.now()
  return cachedNameList
}
