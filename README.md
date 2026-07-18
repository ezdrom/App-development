# Pokemon App

React (Vite) + Node/Express + MongoDB app built against [PokeAPI](https://pokeapi.co/). All PokeAPI calls happen server-side; the React client only talks to this app's own `/api/*` backend.

This boilerplate is deliberately scoped to just the first two assessment requirements — **List of Pokemon with images** and **List of favorite Pokemon** — so there's minimal surface area to read before you start coding. Search, sort, grid/list view, Pokemon detail, and teams were stripped out; see "Growing this later" below for how to add them back.

## Project structure

```
pokemon-app/
  client/   React app (Vite, functional components + hooks)
  server/   Express API (proxies PokeAPI, owns Favorites in MongoDB)
```

## Prerequisites

- Node.js 18+
- A MongoDB instance — either local (`mongod` running on `27017`) or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

## Setup

### 1. Backend

```bash
cd server
npm install
cp .env.example .env   # then edit MONGODB_URI if not using local default
npm run dev             # starts on http://localhost:5000
```

### 2. Frontend

```bash
cd client
npm install
npm run dev              # starts on http://localhost:5173
```

The Vite dev server proxies `/api/*` requests to `http://localhost:5000` (see `client/vite.config.js`), so the React app just calls relative `/api/...` paths.

### Run both

Open two terminals — one running `server` (`npm run dev`), one running `client` (`npm run dev`) — then visit `http://localhost:5173`.

## API overview

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/pokemon?limit=20&offset=0` | Paginated Pokemon list (name + image), proxied from PokeAPI |
| GET | `/api/favorites` | List favorited Pokemon |
| POST | `/api/favorites` | Add a favorite — body `{ name, image }` |
| DELETE | `/api/favorites/:name` | Remove a favorite |

## What to build

Two files have `TODO` comments marking exactly what's left:

- [ ] List of Pokemon with images — [`client/src/pages/PokemonListPage.jsx`](client/src/pages/PokemonListPage.jsx). Call `fetchPokemonList({ limit: 20, offset: 0 })` from `services/api.js` and render the results with `<PokemonCard>` in a `.pokemon-grid`.
- [ ] List of favorite Pokemon — [`client/src/pages/FavoritesPage.jsx`](client/src/pages/FavoritesPage.jsx). `useFavorites()` already gives you the loaded array; render it the same way.

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

- **Search/sort**: add query params to `GET /api/pokemon` and filter/sort server-side (PokeAPI itself doesn't support either, so you'll want to cache its full name list in-memory — same idea as `getAllPokemonNames` if you want to look at how a previous pass did it).
- **Grid/list view**: a simple client-side toggle + CSS class swap, no backend change needed.
- **Pokemon detail & abilities**: add `GET /api/pokemon/:name` proxying `pokeapi.co/api/v2/pokemon/:name`, plus a detail route/page in the client.
- **Teams**: add a `Team` Mongoose model (`{ name, pokemons: [] }`) and CRUD routes/controller under `/api/teams`, mirroring the `Favorite` model/routes already in place.

## Notable design choices

- **Backend proxies PokeAPI**: the client never calls `pokeapi.co` directly, per the assessment's "APIs integrated from the Node backend" requirement.
- **Sprites** are built directly from the Pokemon's numeric ID (`https://raw.githubusercontent.com/PokeAPI/sprites/...`) to avoid an extra detail request per list item.
- **Favorites** are persisted in MongoDB via Mongoose, fully CRUD'd already — the frontend only needs to render/call them (see `FavoritesContext`).
