import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import * as api from '../services/api.js'

const TeamsContext = createContext(null)

export function TeamsProvider({ children }) {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.fetchTeams()
      setTeams(data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const addTeam = useCallback(async (team) => {
    const saved = await api.createTeam(team)
    setTeams((prev) => [...prev, saved])
    return saved
  }, [])

  const editTeam = useCallback(async (id, team) => {
    const saved = await api.updateTeam(id, team)
    setTeams((prev) => prev.map((t) => (t._id === id ? saved : t)))
    return saved
  }, [])

  const removeTeam = useCallback(async (id) => {
    await api.deleteTeam(id)
    setTeams((prev) => prev.filter((t) => t._id !== id))
  }, [])

  const value = useMemo(
    () => ({ teams, loading, addTeam, editTeam, removeTeam, refresh }),
    [teams, loading, addTeam, editTeam, removeTeam, refresh],
  )

  return <TeamsContext.Provider value={value}>{children}</TeamsContext.Provider>
}

export function useTeams() {
  const ctx = useContext(TeamsContext)
  if (!ctx) throw new Error('useTeams must be used within TeamsProvider')
  return ctx
}
