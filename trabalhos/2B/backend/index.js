const express = require('express'); //framework web do node.js
const mysql = require('mysql2/promise'); //biblioteca pra usa o Mysql
const cors = require('cors'); //libera acesso de outros dominios como o frontend

const app = express();
app.use(cors()); //isso deixa o frontend acessar o backend
app.use(express.json()); //isso deixa receber dado em json tipo o titulo

//em vez de ficar abrindo e fechando conexoes mantem algumas conexcoes prontas pra usar ja 
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db', //diz onde ta o bd de existir DB_HOST no .env usa ela senao usa 'db' q é o nome do servico no compose
  user: process.env.DB_USER || 'Bruno', //usa do env ou root como padrao
  password: process.env.DB_PASSWORD || 'Bruno123', //msm coisa 
  database: process.env.DB_NAME || 'registro_db', //é o banco que se conecta e como padrao é o 'registro_db'
});

//garante q existe a tabela 
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

//rota pra um novo registro com horario atual
app.post('/registrar', async (req, res) => { // req é a requisicao oq chega do servidor e a res é a resposta o que vai ser enviado de volta
  const { titulo } = req.body;
  if (!titulo) return res.status(400).json({ error: 'título é obrigatório' });

  const horario = new Date(); //pega o horario atual
  await pool.query('INSERT INTO registros (titulo, horario) VALUES (?, ?)', [titulo, horario]); //comando pra add na tabela do bd
  res.json({ status: 'ok' });
});

//rota para listar todos os registros já salvos
app.get('/registros', async (req, res) => {
  const [dados] = await pool.query('SELECT * FROM registros ORDER BY id DESC'); //comando pra listar as coisas do bd
  res.json(dados); //dados contem os registros buscados no bd ent ele pega esses dados e manda como resposta
});

const PORT = 3000; //porta q o backend recebe as req
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`)); //server comeca a escutar oq vem da port e fica esperando as req (a segunda parte é so pra testar se ta funcionando dai imprime aquilo no terminal)