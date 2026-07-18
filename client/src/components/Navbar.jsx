import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="navbar">
      <span className="navbar__brand">Pokedex</span>
      <nav className="navbar__links">
        <NavLink to="/" end>
          Pokemon
        </NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
      </nav>
    </header>
  )
}
