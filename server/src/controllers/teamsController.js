import Team from '../models/Team.js'

export async function getTeams(req, res, next) {
  try {
    const teams = await Team.find().sort({ createdAt: 1 })
    res.json(teams)
  } catch (err) {
    next(err)
  }
}

export async function createTeam(req, res, next) {
  try {
    const { name, pokemons = [] } = req.body
    if (!name) return res.status(400).json({ message: 'name is required' })

    const team = await Team.create({ name, pokemons })
    res.status(201).json(team)
  } catch (err) {
    next(err)
  }
}

export async function updateTeam(req, res, next) {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!team) return res.status(404).json({ message: 'Team not found' })
    res.json(team)
  } catch (err) {
    next(err)
  }
}

export async function deleteTeam(req, res, next) {
  try {
    await Team.findByIdAndDelete(req.params.id)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
