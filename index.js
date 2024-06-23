const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 5000;

// MySQL Connection
const db = mysql.createConnection({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12715666',
  password: 'YG8HDsZAF7', // Replace with your MySQL password
  database: 'sql12715666'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

app.post('/products', (req, res) => {
  const { name, price, description } = req.body;
  db.query(
    'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
    [name, price, description],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send('Product added successfully');
      }
    }
  );
});

app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  db.query(
    'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?',
    [name, price, description, id],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send('Product updated successfully');
      }
    }
  );
});

app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM products WHERE id = ?', id, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Product deleted successfully');
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
