import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import * as api from '../services/api.js'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.fetchFavorites()
      setFavorites(data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const isFavorite = useCallback(
    (name) => favorites.some((f) => f.name === name),
    [favorites],
  )

  const toggleFavorite = useCallback(
    async (pokemon) => {
      if (isFavorite(pokemon.name)) {
        await api.removeFavorite(pokemon.name)
        setFavorites((prev) => prev.filter((f) => f.name !== pokemon.name))
      } else {
        const saved = await api.addFavorite(pokemon)
        setFavorites((prev) => [...prev, saved])
      }
    },
    [isFavorite],
  )

  const value = useMemo(
    () => ({ favorites, loading, isFavorite, toggleFavorite, refresh }),
    [favorites, loading, isFavorite, toggleFavorite, refresh],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
