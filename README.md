# Pokemon App

React (Vite) + Node/Express + MongoDB app built against [PokeAPI](https://pokeapi.co/). All PokeAPI calls happen server-side; the React client only talks to this app's own `/api/*` backend.

## Project structure

```
pokemon-app/
  client/   React app (Vite, functional components + hooks)
  server/   Express API (proxies PokeAPI, owns Favorites & Teams in MongoDB)
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

`.env` values:

| Var | Default | Notes |
|---|---|---|
| `PORT` | `5000` | API port |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/pokemon-app` | point at Atlas if not running Mongo locally |
| `POKEAPI_BASE_URL` | `https://pokeapi.co/api/v2` | |
| `CLIENT_ORIGIN` | `http://localhost:5173` | for CORS |

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
| GET | `/api/pokemon?limit=20&offset=0&search=&sort=asc\|desc` | Paginated Pokemon list (name + image), proxied from PokeAPI |
| GET | `/api/pokemon/:name` | Pokemon detail: image, types, abilities, stats |
| GET | `/api/favorites` | List favorited Pokemon |
| POST | `/api/favorites` | Add a favorite — body `{ name, image }` |
| DELETE | `/api/favorites/:name` | Remove a favorite |
| GET | `/api/teams` | List teams |
| POST | `/api/teams` | Create a team — body `{ name, pokemons: [] }` |
| PUT | `/api/teams/:id` | Update a team |
| DELETE | `/api/teams/:id` | Delete a team |

## Requirements checklist

Wired up (context, API service, routing, DB, reusable UI atoms) but **not yet implemented** — each page has a `TODO` comment marking exactly what to fill in:

- [ ] List of Pokemon with images — [`PokemonListPage.jsx`](client/src/pages/PokemonListPage.jsx)
- [ ] List of favorite Pokemon — [`FavoritesPage.jsx`](client/src/pages/FavoritesPage.jsx)
- [ ] Searchable Pokemon — `SearchBar` is wired into `PokemonListPage`, backend already supports `?search=`
- [ ] Viewable Pokemon details & ability — [`PokemonDetailPage.jsx`](client/src/pages/PokemonDetailPage.jsx)
- [ ] Sortable ascending/descending — `SortControl` is wired into `PokemonListPage`, backend already supports `?sort=`
- [ ] Grid & list view — `ViewToggle` is wired into `PokemonListPage`
- [x] Default page size of 20 — `PAGE_SIZE` constant in `PokemonListPage.jsx`
- [ ] Add Pokemon as favorite — `FavoriteButton` component is fully wired (context + backend), drop it into `PokemonCard`
- [ ] Multiple Pokemon teams — [`TeamsPage.jsx`](client/src/pages/TeamsPage.jsx)

## Git flow

This repo follows git flow:

- `main` — always deployable
- `develop` — integration branch, start here
- `feature/<name>` — branch off `develop` for each requirement (e.g. `feature/pokemon-list`, `feature/favorites`), PR back into `develop`
- `release/<version>` / `hotfix/<name>` — as needed

```bash
git checkout develop
git checkout -b feature/pokemon-list
# ... implement, commit ...
git checkout develop
git merge --no-ff feature/pokemon-list
```

## Notable design choices

- **Backend proxies PokeAPI**: the client never calls `pokeapi.co` directly, per the assessment's "APIs integrated from the Node backend" requirement.
- **Search/sort** on `/api/pokemon` operate over PokeAPI's full name list (cached in-memory for an hour) since PokeAPI itself doesn't support search or alphabetical sort — see `server/src/utils/pokeApiClient.js`.
- **Sprites** are built directly from the Pokemon's numeric ID (`https://raw.githubusercontent.com/PokeAPI/sprites/...`) to avoid an extra detail request per list item.
- **Favorites & teams** are persisted in MongoDB via Mongoose, fully CRUD'd already — the frontend only needs to render/call them (see `FavoritesContext` / `TeamsContext`).
