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
