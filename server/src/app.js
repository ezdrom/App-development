import express from 'express'
import cors from 'cors'
import pokemonRoutes from './routes/pokemonRoutes.js'
import favoritesRoutes from './routes/favoritesRoutes.js'
import teamsRoutes from './routes/teamsRoutes.js'

const app = express()

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json())

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))
app.use('/api/pokemon', pokemonRoutes)
app.use('/api/favorites', favoritesRoutes)
app.use('/api/teams', teamsRoutes)

app.use((req, res) => res.status(404).json({ message: 'Not found' }))

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.response?.status || 500).json({ message: err.message || 'Server error' })
})

export default app
