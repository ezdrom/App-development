import Favorite from '../models/Favorite.js'

export async function getFavorites(req, res, next) {
  try {
    const favorites = await Favorite.find().sort({ createdAt: 1 })
    res.json(favorites)
  } catch (err) {
    next(err)
  }
}

export async function addFavorite(req, res, next) {
  try {
    const { name, image } = req.body
    if (!name) return res.status(400).json({ message: 'name is required' })

    const favorite = await Favorite.findOneAndUpdate(
      { name },
      { name, image },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    )
    res.status(201).json(favorite)
  } catch (err) {
    next(err)
  }
}

export async function removeFavorite(req, res, next) {
  try {
    await Favorite.deleteOne({ name: req.params.name })
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
