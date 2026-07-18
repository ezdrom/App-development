import { useTeams } from '../context/TeamsContext.jsx'

export default function TeamsPage() {
  const { teams, loading, addTeam, editTeam, removeTeam } = useTeams()

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1>My Teams</h1>
      {/*
        TODO (req. "User should be able to create multiple pokemon teams"):
        - A form to create a team: addTeam({ name: 'Team 1', pokemons: [] })
        - A way to add/remove pokemon to a given team: editTeam(id, { ...team, pokemons: [...] })
        - A delete button per team: removeTeam(id)
        - Backend CRUD is already live at /api/teams (GET/POST/PUT/:id/DELETE/:id).
      */}
      {teams.length === 0 ? (
        <div className="empty-state">No teams yet. Create one to get started.</div>
      ) : (
        <ul>
          {teams.map((team) => (
            <li key={team._id}>{team.name} — {team.pokemons?.length ?? 0} pokemon</li>
          ))}
        </ul>
      )}
    </div>
  )
}
