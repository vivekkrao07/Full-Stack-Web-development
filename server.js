const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());

// Connect to SQLite DB
const db = new sqlite3.Database("recipes.db", (err) => {
  if (err) console.error(err.message);
  else console.log("Connected to recipes.db");
});

// Save search
app.post("/save-search", (req, res) => {
  const { ingredients } = req.body;
  const date_time = new Date().toLocaleString();
  db.run(
    "INSERT INTO searches (ingredients, date_time) VALUES (?, ?)",
    [ingredients, date_time],
    function (err) {
      if (err) res.status(500).send(err.message);
      else res.send({ id: this.lastID });
    }
  );
});

// Save favorite
app.post("/save-favorite", (req, res) => {
  const { title, image_url } = req.body;
  const date_time = new Date().toLocaleString();
  db.run(
    "INSERT INTO favorites (title, image_url, date_time) VALUES (?, ?, ?)",
    [title, image_url, date_time],
    function (err) {
      if (err) res.status(500).send(err.message);
      else res.send({ id: this.lastID });
    }
  );
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
