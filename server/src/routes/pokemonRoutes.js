import { Router } from 'express'
import { listPokemon, getPokemonDetail } from '../controllers/pokemonController.js'

const router = Router()

router.get('/', listPokemon)
router.get('/:name', getPokemonDetail)

export default router
