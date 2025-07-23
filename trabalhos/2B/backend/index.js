const express = require('express');
const mysql = require('mysql2/promise'); // Usando mysql2 com promises
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para parsear JSON no body

// Configuração do pool de conexões
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'senha',
  database: process.env.DB_NAME || 'registros',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Rota de registro
app.post('/registrar', async (req, res) => {
  try {
    const { titulo, horario } = req.body;
    
    // Validação dos campos
    if (!titulo || !horario) {
      return res.status(400).json({ 
        success: false,
        error: 'Título e horário são obrigatórios' 
      });
    }

    // Inserção no banco
    const [result] = await pool.query(
      'INSERT INTO registros (titulo, horario) VALUES (?, ?)',
      [titulo, new Date(horario)] // Convertendo para Date se necessário
    );

    // Resposta de sucesso
    res.json({ 
      success: true,
      id: result.insertId,
      message: 'Registro criado com sucesso'
    });

  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno no servidor'
    });
  }
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
