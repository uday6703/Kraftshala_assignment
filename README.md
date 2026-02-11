# Calendar Booking Service

Backend calendar booking service using Node.js, Express, and MongoDB (Mongoose).

## Setup

1. Install dependencies:
   - `npm install`
2. Create `.env` using `.env.example`.
3. Start server:
   - `npm run dev`

## Health Check

- `GET /health`

## Users

- `POST /users`
  - Body: `{ "name": "...", "email": "..." }`
- `GET /users/:id`

## Meetings

- `POST /meetings`
- `GET /meetings`
  - Optional query params: `userId`, `startDate`, `endDate`
- `GET /meetings/:id`
- `PUT /meetings/:id`
- `DELETE /meetings/:id`

## Conflict Rule

Requests that overlap with an existing meeting for the same user return:

- Status: 400
- Body: `{ "message": "Time slot already booked" }`
