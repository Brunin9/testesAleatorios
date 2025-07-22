const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Bruno123',
  database: process.env.DB_NAME || 'registro_db',
});

(async () => {
  const conn = await pool.getConnection();
  await conn.query(`
    CREATE TABLE IF NOT EXISTS registros (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(255) NOT NULL,
      horario DATETIME NOT NULL
    )
  `);
  conn.release();
})();

app.post('/registrar', async (req, res) => {
  const { titulo } = req.body;
  if (!titulo) return res.status(400).json({ error: 'Título é obrigatório' });

  const horario = new Date();
  await pool.query('INSERT INTO registros (titulo, horario) VALUES (?, ?)', [titulo, horario]);
  res.json({ status: 'ok' });
});

app.get('/registros', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM registros ORDER BY id DESC');
  res.json(rows);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));
