import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

// ---- Pokemon (proxied through the Node backend, which talks to PokeAPI) ----

export const fetchPokemonList = async ({ limit = 20, offset = 0, search = '', sort = '' } = {}) => {
  const { data } = await api.get('/pokemon', { params: { limit, offset, search, sort } })
  return data // { count, results: [{ name, image, url }], next, previous }
}

export const fetchPokemonDetail = async (name) => {
  const { data } = await api.get(`/pokemon/${name}`)
  return data // { name, image, types, abilities, stats, height, weight }
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

// ---- Teams ----

export const fetchTeams = async () => {
  const { data } = await api.get('/teams')
  return data
}

export const createTeam = async (team) => {
  const { data } = await api.post('/teams', team) // { name, pokemons: [] }
  return data
}

export const updateTeam = async (id, team) => {
  const { data } = await api.put(`/teams/${id}`, team)
  return data
}

export const deleteTeam = async (id) => {
  await api.delete(`/teams/${id}`)
}

export default api
