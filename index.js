const express = require('express');
    const sqlite3 = require('sqlite3').verbose();
    const path = require('path');
    const app = express();
    const port = 3000;

    // Initialize SQLite database
    let db = new sqlite3.Database(':memory:', (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the in-memory SQLite database.');
    });

    // Create table
    db.serialize(() => {
      db.run("CREATE TABLE tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT)");
    });

    // Middleware for parsing JSON bodies
    app.use(express.json());

    // Serve static files from the public directory
    app.use(express.static(path.join(__dirname, 'public')));

    // Get all tasks
    app.get('/tasks', (req, res) => {
      db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) {
          throw err;
        }
        res.json(rows);
      });
    });

    // Add a new task
    app.post('/tasks', (req, res) => {
      const { task } = req.body;
      db.run("INSERT INTO tasks (task) VALUES (?)", [task], function(err) {
        if (err) {
          return console.log(err.message);
        }
        res.json({ id: this.lastID });
      });
    });

    // Delete a task
    app.delete('/tasks/:id', (req, res) => {
      const { id } = req.params;
      db.run("DELETE FROM tasks WHERE id = ?", [id], function(err) {
        if (err) {
          return console.log(err.message);
        }
        res.json({ message: 'Task deleted' });
      });
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
