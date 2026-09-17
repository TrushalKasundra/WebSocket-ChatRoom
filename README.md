# WebSocket ChatRoom

A real-time chat application built with React (frontend) and Node.js + Socket.IO (backend).

## Project Structure

```
WebSocket-ChatRoom/
├── frontend/       # React app (Create React App)
├── backend/        # Express + Socket.IO server
└── README.md
```

## Features

- Real-time messaging via WebSockets (Socket.IO)
- Room-based chat — users join specific rooms
- Join request / approval flow for private rooms
- Instant message delivery using `socket.io-client`

## Tech Stack

| Layer    | Tech                          |
|----------|-------------------------------|
| Frontend | React 18, React Router, Socket.IO Client |
| Backend  | Node.js, Express, Socket.IO   |

## Getting Started

### Prerequisites

- Node.js >= 16
- npm

### Backend

```bash
cd backend
npm install
npm start
```

Server runs on **http://localhost:8080**

### Frontend

```bash
cd frontend
npm install
npm start
```

App runs on **http://localhost:3000** (or whichever port CRA assigns)

> Make sure the frontend `.env` points to the correct backend URL before starting.

## Environment Variables

### `backend/.env`

```
# Add your backend config here (e.g., PORT, allowed origins)
```

### `frontend/.env`

```
# Add your frontend config here (e.g., REACT_APP_SOCKET_URL)
```

> `.env` files are excluded from version control via `.gitignore`.

## Scripts

### Backend

| Command     | Description              |
|-------------|--------------------------|
| `npm start` | Start the server         |

### Frontend

| Command       | Description                    |
|---------------|--------------------------------|
| `npm start`   | Start dev server               |
| `npm run build` | Build for production         |
| `npm test`    | Run tests                      |
