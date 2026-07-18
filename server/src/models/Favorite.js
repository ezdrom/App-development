import mongoose from 'mongoose'

const favoriteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String },
  },
  { timestamps: true },
)

export default mongoose.model('Favorite', favoriteSchema)
