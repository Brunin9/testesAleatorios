const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'Bruno',
  password: process.env.DB_PASSWORD || 'Bruno123',
  database: process.env.DB_NAME || 'registro_db',
});

// Função para aguardar a conexão com o banco de dados
async function waitForDatabase() {
  let connected = false;
  while (!connected) {
    try {
      const conn = await pool.getConnection();
      console.log('Conectado ao banco de dados!');
      conn.release();
      connected = true;
    } catch (error) {
      console.error('Aguardando conexão com o banco de dados...', error);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Espera 2 segundos antes de tentar novamente
    }
  }
}

(async () => {
  await waitForDatabase();
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
  const { titulo, horario } = req.body;
  if (!titulo || !horario) {
    return res.status(400).json({ error: 'Título e horário são obrigatórios' });
  }
  await pool.query('INSERT INTO registros (titulo, horario) VALUES (?, ?)', [titulo, horario]);
  res.json({ status: 'ok' });
});

app.get('/registros', async (req, res) => {
  const [dados] = await pool.query('SELECT * FROM registros ORDER BY id DESC');
  res.json(dados);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));
