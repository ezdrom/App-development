# Pokemon App

React (Vite) + Node/Express + MongoDB app built against [PokeAPI](https://pokeapi.co/). All PokeAPI calls happen server-side; the React client only talks to this app's own `/api/*` backend.

This boilerplate is deliberately scoped to just the first two assessment requirements — **List of Pokemon with images** (done) and **List of favorite Pokemon** (TODO) — so there's minimal surface area to read. Search, sort, grid/list view, Pokemon detail, and teams were stripped out; see "Growing this later" below for how to add them back.

## Project structure

```
pokemon-app/
  client/   React app (Vite, functional components + hooks)
  server/   Express API (proxies PokeAPI, owns Favorites in MongoDB)
```

## Quick start on a fresh machine

```bash
git clone https://github.com/ezdrom/App-development.git
cd App-development
git checkout develop   # main only has the initial scaffold commit

# terminal 1
cd server
npm install
cp .env.example .env
npm run dev             # http://localhost:5000

# terminal 2 (new terminal, from repo root)
cd client
npm install
npm run dev              # http://localhost:5173
```

Open `http://localhost:5173` — the Pokemon list (20, with images) works immediately, **no MongoDB required**. The server starts fine without a database; it just logs a warning and `/api/favorites` won't work until you point it at a real MongoDB (see below).

### Prerequisites

- Node.js 18+ and npm
- MongoDB is **optional** unless you need the Favorites feature — either a local `mongod` on port `27017`, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster URI dropped into `server/.env` as `MONGODB_URI`

The Vite dev server proxies `/api/*` requests to `http://localhost:5000` (see `client/vite.config.js`), so the React app just calls relative `/api/...` paths — no CORS/URL config needed on a new machine.

## API overview

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/pokemon?limit=20&offset=0` | Paginated Pokemon list (name + image), proxied from PokeAPI |
| GET | `/api/favorites` | List favorited Pokemon (needs MongoDB) |
| POST | `/api/favorites` | Add a favorite — body `{ name, image }` (needs MongoDB) |
| DELETE | `/api/favorites/:name` | Remove a favorite (needs MongoDB) |

## What to build

- [x] List of Pokemon with images — [`client/src/pages/PokemonListPage.jsx`](client/src/pages/PokemonListPage.jsx)
- [ ] List of favorite Pokemon — [`client/src/pages/FavoritesPage.jsx`](client/src/pages/FavoritesPage.jsx). `useFavorites()` already gives you the loaded array; render it the same way `PokemonListPage` does.

Already fully working, no need to touch: `FavoriteButton`, `PokemonCard`, `FavoritesContext`, and the whole backend (Pokemon proxy + Favorites CRUD in MongoDB).

## Git flow

- `main` — always deployable
- `develop` — integration branch, start here
- `feature/<name>` — branch off `develop` per requirement (e.g. `feature/pokemon-list`, `feature/favorites`), PR back into `develop`

```bash
git checkout develop
git checkout -b feature/pokemon-list
# ... implement, commit ...
git checkout develop
git merge --no-ff feature/pokemon-list
```

## Growing this later

The rest of the assessment (searchable, sortable, grid/list view, Pokemon detail & abilities, multiple teams) was removed to keep this boilerplate minimal. When you're ready to add them back:

- **Search/sort**: add query params to `GET /api/pokemon` and filter/sort server-side (PokeAPI itself doesn't support either, so you'll want to cache its full name list in-memory).
- **Grid/list view**: a simple client-side toggle + CSS class swap, no backend change needed.
- **Pokemon detail & abilities**: add `GET /api/pokemon/:name` proxying `pokeapi.co/api/v2/pokemon/:name`, plus a detail route/page in the client.
- **Teams**: add a `Team` Mongoose model (`{ name, pokemons: [] }`) and CRUD routes/controller under `/api/teams`, mirroring the `Favorite` model/routes already in place.

## Notable design choices

- **Backend proxies PokeAPI**: the client never calls `pokeapi.co` directly, per the assessment's "APIs integrated from the Node backend" requirement.
- **Sprites** are built directly from the Pokemon's numeric ID (`https://raw.githubusercontent.com/PokeAPI/sprites/...`) to avoid an extra detail request per list item.
- **Server boots without MongoDB**: `connectDB()` failures are logged, not fatal, so the Mongo-free Pokemon list still works out of the box. Only `/api/favorites` actually needs the database.
- **Favorites** are persisted in MongoDB via Mongoose, fully CRUD'd already — the frontend only needs to render/call them (see `FavoritesContext`).
