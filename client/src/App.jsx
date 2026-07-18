import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import PokemonListPage from './pages/PokemonListPage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'
import PokemonDetailPage from './pages/PokemonDetailPage.jsx'
import TeamsPage from './pages/TeamsPage.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import { TeamsProvider } from './context/TeamsContext.jsx'

export default function App() {
  return (
    <FavoritesProvider>
      <TeamsProvider>
        <Navbar />
        <main className="page-container">
          <Routes>
            <Route path="/" element={<PokemonListPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
            <Route path="/teams" element={<TeamsPage />} />
          </Routes>
        </main>
      </TeamsProvider>
    </FavoritesProvider>
  )
}
