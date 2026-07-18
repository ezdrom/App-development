import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

// ---- Pokemon (proxied through the Node backend, which talks to PokeAPI) ----

export const fetchPokemonList = async ({ limit = 20, offset = 0 } = {}) => {
  const { data } = await api.get('/pokemon', { params: { limit, offset } })
  return data // { count, results: [{ name, image, url }], next, previous }
}

// ---- Favorites ----

export const fetchFavorites = async () => {
  const { data } = await api.get('/favorites')
  return data
}

export const addFavorite = async (pokemon) => {
  const { data } = await api.post('/favorites', pokemon) // { name, image }
  return data
}

export const removeFavorite = async (name) => {
  await api.delete(`/favorites/${name}`)
}

export default api
