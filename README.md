# Task API

A small REST API for managing tasks, built with Node.js and Express.
Built for practicing API concepts: routes, CRUD, status codes, request/response contracts.

## Setup
```bash
npm install
```

## Run
```bash
npm start
```
or, to auto-restart on every save while you're developing:
```bash
npm run dev
```

The server runs at `http://localhost:3000`.

## Endpoints

| Method | Endpoint      | Description              |
|--------|---------------|---------------------------|
| GET    | /tasks        | List all tasks            |
| GET    | /tasks/:id    | Get one task by id         |
| POST   | /tasks        | Create a new task          |
| PATCH  | /tasks/:id    | Update a task's title/done |
| DELETE | /tasks/:id    | Delete a task              |

## Example requests (curl)

Create a task:
```bash
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d "{\"title\":\"Buy milk\"}"
```

List tasks:
```bash
curl http://localhost:3000/tasks
```

Mark a task done:
```bash
curl -X PATCH http://localhost:3000/tasks/1 -H "Content-Type: application/json" -d "{\"done\":true}"
```

Delete a task:
```bash
curl -X DELETE http://localhost:3000/tasks/1
```
