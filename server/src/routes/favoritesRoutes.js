import { Router } from 'express'
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favoritesController.js'

const router = Router()

router.get('/', getFavorites)
router.post('/', addFavorite)
router.delete('/:name', removeFavorite)

export default router
