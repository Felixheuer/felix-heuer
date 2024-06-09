const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database('./database.db'); // Datei-basierte DB

app.use(cors());
app.use(bodyParser.json());

// SQLite Datenbank initialisieren
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, message TEXT)");
});

// API Endpunkt zum Hinzufügen eines Benutzers
app.post('/api/users', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Received request:', { name, email, message }); // Logging hinzugefügt
  const stmt = db.prepare("INSERT INTO users (name, email, message) VALUES (?, ?, ?)");
  stmt.run(name, email, message, function(err) {
    if (err) {
      console.error(err.message); // Logging des Fehlers
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
  stmt.finalize();
});

// API Endpunkt zum Abrufen aller Benutzer
app.get('/api/users', (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      console.error(err.message); // Logging des Fehlers
      return res.status(500).json({ error: err.message });
    }
    res.json({ users: rows });
  });
});

const PORT = 9999;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
