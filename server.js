/**
 * A small REST API for managing tasks, built with Express.
 *
 * Run it with:
 *   npm install
 *   npm start        (or: npm run dev   -- auto-restarts on save)
 *
 * Then test it with curl, Postman, or your browser:
 *   http://localhost:3000/tasks
 */

const express = require("express");

const app = express();
const PORT = 3000;

// Lets Express understand JSON request bodies (req.body).
app.use(express.json());

// In-memory storage. Resets every time the server restarts.
// A real app would use a database here instead.
let tasks = [
  { id: 1, title: "Learn Express", done: false },
  { id: 2, title: "Build a REST API", done: false },
];
let nextId = 3;

// ---------- Routes (this is your API contract, in code) ----------

// READ — list all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// READ — get a single task by id
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json(task);
});

// CREATE — add a new task
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "title is required and must be a string" });
  }

  const task = { id: nextId++, title, done: false };
  tasks.push(task);
  res.status(201).json(task);
});

// UPDATE — mark a task done/undone, or change its title
app.patch("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title, done } = req.body;
  if (title !== undefined) task.title = title;
  if (done !== undefined) task.done = done;

  res.json(task);
});

// DELETE — remove a task
app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const removed = tasks.splice(index, 1)[0];
  res.json({ message: "Task deleted", task: removed });
});

app.listen(PORT, () => {
  console.log(`Task API running at http://localhost:${PORT}`);
});