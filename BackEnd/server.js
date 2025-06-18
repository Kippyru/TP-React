const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',          // ⚠️ Cambiar según tu configuración
  password: '',          // ⚠️ Cambiar según tu configuración
  database: 'RODODB'     // Tu base de datos
});

// Obtener todas las localidades
app.get('/localidades', (req, res) => {
  db.query('SELECT * FROM localidad', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Actualizar una localidad por ID
app.put('/localidades/:id', (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  db.query(
    'UPDATE localidad SET nombre = ? WHERE id = ?',
    [nombre, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

app.listen(3001, () => {
  console.log('Servidor escuchando en http://localhost:3001');
});
