import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import PokemonListPage from './pages/PokemonListPage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'

export default function App() {
  return (
    <FavoritesProvider>
      <Navbar />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<PokemonListPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
    </FavoritesProvider>
  )
}
