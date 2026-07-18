import { Router } from 'express'
import { listPokemon } from '../controllers/pokemonController.js'

const router = Router()

router.get('/', listPokemon)

export default router
