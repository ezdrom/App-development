import mongoose from 'mongoose'

const teamPokemonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
  },
  { _id: false },
)

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    pokemons: { type: [teamPokemonSchema], default: [] },
  },
  { timestamps: true },
)

export default mongoose.model('Team', teamSchema)
