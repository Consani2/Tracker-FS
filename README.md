# Movie & TV Series Tracker

A React single-page application to search, explore and track movies and TV series using The Movie Database (TMDB) API.

> Status: In development

---

## Table of Contents

- Installation
- Usage
- Architecture
- Application Flow
- Technologies
- External APIs
- Environment variables
- Contributing

---

## Installation

Prerequisites:
- Node.js (>= 16)
- npm or yarn

Steps:
1. Clone the repository:
   git clone https://github.com/Consani2/Tracker-FS.git
2. Change to project folder:
   cd "Tracker Filmes e Series/Tracker Filmes e Series"
3. Install dependencies:
   npm install
   or
   yarn
4. Create a .env file at the project root with your TMDB API key (see Environment variables below).
5. Start the development server:
   npm run dev
   or
   yarn dev

To build for production:
   npm run build
   or
   yarn build

---

## Usage / Manual

- Open the app in your browser (usually http://localhost:5173).
- Use the search input to find movies or TV series.
- Click an item to view details (synopsis, release date, genres, ratings).
- For TV shows, navigate seasons and episodes from the show details page.
- Use browser navigation or the app menu to move between pages.

---

## Architecture

This is a front-end React application structured as a single-page app (SPA):

- src/
  - components/   -> Reusable UI components (lists, cards, search bar)
  - pages/        -> Route-level pages (Home, SearchResults, Details)
  - services/     -> API client (Axios wrappers for TMDB endpoints)
  - hooks/        -> Custom React hooks
  - assets/       -> Images and static assets
  - styles/       -> Global and component styles
  - App.jsx       -> Router and top-level layout

No backend server is required: the app talks directly to TMDB's REST API.

---

## Application Flow

1. User opens the app and lands on the Home page.
2. User types a query in the search box.
3. The app calls TMDB search endpoints via the API client.
4. Results are displayed as a list/grid of cards.
5. User clicks an item to navigate to the Details page (client-side route).
6. Details page loads more data (movie or TV details, credits, seasons).
7. For TV shows, user can select a season to load episodes.
8. User navigates back or performs another search.

State is held in component state and/or context; data fetching is handled by services using Axios.

---

## Technologies

- React (with hooks)
- Vite (build tool)
- JavaScript (ES2020+)
- Axios (HTTP client)
- React Router (routing)
- HTML5 & CSS3

---

## External APIs

This app uses The Movie Database (TMDB) API:
- Search endpoints: /search/movie and /search/tv
- Details endpoints: /movie/{movie_id} and /tv/{tv_id}
- Additional: /movie/{id}/credits, /tv/{id}/season/{season_number}

TMDB docs: https://developers.themoviedb.org/3

---

## Environment variables

Using Vite, expose the TMDB key as:

VITE_TMDB_API_KEY=your_tmdb_api_key_here

Example .env:

VITE_TMDB_API_KEY=abcd1234efgh5678

Ensure .env is excluded from version control (add to .gitignore).

---

## Contributing

Contributions are welcome. Please open issues or pull requests with clear descriptions of changes.

---

## License

Add your project license here.

