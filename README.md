# Room Booking Dashboard

A React-based room booking dashboard with role-based access, room browsing, booking creation, and booking management using a local `json-server` backend.

## Tech Stack
- React (Create React App)
- React Router
- Axios
- Tailwind CSS
- Material UI
- json-server (mock backend)

## Features
- Public home page with resort-style landing UI
- Login with role-based demo users (`admin`, `user`)
- Protected routes for authenticated users
- Room listing dashboard
- Room details and booking form
- My Bookings page:
  - `user`: sees and cancels own bookings
  - `admin`: sees all bookings, can mark complete or remove
- Auth persistence via `localStorage`

## Demo Credentials
- User: `user` / `user123`
- Admin: `admin` / `admin123`

## Getting Started
### 1. Install dependencies
```bash
npm install
```

### 2. Run mock backend
```bash
npm run server
```
Runs `json-server` at `http://localhost:5000` using `db.json`.

### 3. Run frontend
```bash
npm start
```
Runs app at `http://localhost:3000`.

## Available Scripts
- `npm start` - start React dev server
- `npm run server` - start json-server backend on port 5000
- `npm run build` - create production build
- `npm test` - run tests

## Project Structure
```text
room-booking-dashboard/
|-- public/
|   |-- favicon.ico
|   |-- index.html
|   |-- logo192.png
|   |-- logo512.png
|   |-- manifest.json
|   `-- robots.txt
|-- src/
|   |-- assets/
|   |   |-- resort-1 (1).jpg
|   |   |-- resort-1 (2).jpg
|   |   |-- resort-1 (3).jpg
|   |   |-- resort-1 (4).jpg
|   |   |-- resort-1 (5).jpg
|   |   `-- resort-1 (6).jpg
|   |-- components/
|   |   |-- layout/
|   |   |   |-- Navbar.jsx
|   |   |   `-- Sidebar.jsx
|   |   `-- ui/
|   |       |-- DateSelector.jsx
|   |       |-- Loader.jsx
|   |       `-- RoomCard.jsx
|   |-- context/
|   |   `-- AuthContext.jsx
|   |-- pages/
|   |   |-- Dashboard.jsx
|   |   |-- home.jsx
|   |   |-- Login.jsx
|   |   |-- MyBookings.jsx
|   |   `-- RoomDetails.jsx
|   |-- routes/
|   |   `-- ProtectedRoute.jsx
|   |-- services/
|   |   `-- api.js
|   |-- App.css
|   |-- App.js
|   |-- App.test.js
|   |-- index.css
|   |-- index.js
|   |-- logo.svg
|   |-- reportWebVitals.js
|   `-- setupTests.js
|-- build/                # Production output (generated)
|-- db.json               # Mock rooms + bookings data
|-- package.json
|-- package-lock.json
|-- postcss.config.js
|-- tailwind.config.js
`-- .gitignore
```

## API Endpoints (json-server)
Base URL: `http://localhost:5000`

- `GET /rooms`
- `GET /rooms/:id`
- `GET /bookings`
- `POST /bookings`
- `PATCH /bookings/:id`
- `DELETE /bookings/:id`

## Notes
- Start `npm run server` before using booking-related features.
- Auth is client-side and intended for demo/development purposes.
