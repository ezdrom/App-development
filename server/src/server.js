import 'dotenv/config'
import app from './app.js'
import { connectDB } from './config/db.js'

const PORT = process.env.PORT || 5000

async function start() {
  try {
    await connectDB()
  } catch (err) {
    // Don't block boot on Mongo: the Pokemon list endpoint doesn't need a
    // database, only /api/favorites does. Fix MONGODB_URI in .env once you
    // need favorites to work.
    console.error('MongoDB connection failed, starting without it:', err.message)
  }
  app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`))
}

start()
