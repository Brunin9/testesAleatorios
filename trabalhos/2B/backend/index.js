const express = require('express'); //importa o express q é um framework pra criar o server web em node
const mysql = require('mysql2/promise'); //importa a biblioteca do node 'Mysql2' com suporte a promise pra poder usar o await (promise usa quando alguma coisa demora tipo acessar o bd e ajuda a escrever um codigo passo a passo de um jeito q fica melhor pra ler)
const cors = require('cors'); //é oq deixa o frontend e o backend se acessarem 

const app = express();
app.use(cors()); //deixa o frontend acessar o backend
app.use(express.json()); //isso deixa receber dado em json tipo o titulo

//em vez de ficar abrindo e fechando conexoes mantem algumas conexcoes prontas pra usar ja 
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',  //diz onde ta o bd se existir DB_HOST no .env usa ela senao usa 'db' q é o nome do servico no compose
  user: process.env.DB_USER || 'Bruno', // usuário do bd
  password: process.env.DB_PASSWORD || 'Bruno123', //senha do bd
  database: process.env.DB_NAME || 'registro_db'//é o nome do bd que vai conectar
});

//função pra esperar ate o bd ficar pronto(teve q ser criada pq dava erro pq o backend tentava conectar com o bd antes dele ficar pronto)
async function waitForDatabase() {
  let connected = false; //começa dizendo q n ta conectado
  while (!connected) { //enquanto n conectar tenta dnv
    try {
      const conn = await pool.getConnection(); //tenta pegar uma conexao com o bd
      console.log('Conectado ao banco de dados');//se consegui mostra no terminal q conectou
      conn.release();//libera a conexao pra n travar ela nessa funcao 
      connected = true; //diz q ta conectado pra parar o loop
    } catch (error) {
      //se ainda n tiver conectado fala no terminal (ajuda a testar se o banco ainda ta iniciando)
      console.error('Aguardando conexão com o banco de dados', error);
      await new Promise(resolve => setTimeout(resolve, 2000)); //espera 2 segundos antes de testar dnv, dai n fica jogando um monte de erro de conexao no terminal repetido
    }
  }
}

(async () => {
  await waitForDatabase(); //usa a funcao de cima pra esperar conectar com o bd
  const conn = await pool.getConnection(); //pega uma conexao com o banco pra poder criar a tabela
  //cria a tabela se ainda n existir query usa pra mandar pro bd executar alguma coisa
  await conn.query(` 
    CREATE TABLE IF NOT EXISTS registros (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(100) NOT NULL,
      horario DATETIME NOT NULL
    )
  `);
  conn.release(); //libera a conexao
})();

//rota pra criar um registra
app.post('/registrar', async (req, res) => {
  //pega o titulo e o horario q foi enviado no corpo da requisicao
  const { titulo, horario } = req.body;
  //se faltar titulo ou horario da erro
  if (!titulo || !horario) { 
    return res.status(400).json({ error: 'Título e horário são obrigatórios' });
  }
  //coloca os dados na tabela "registros" no bd/ query usa pra mandar o comando pro bd
  await pool.query('INSERT INTO registros (titulo, horario) VALUES (?, ?)', [titulo, horario]);
  res.json({ status: 'ok' }); //diz q deu certo
});

//rota pra listar os registros q foram salvos no bd
app.get('/registros', async (req, res) => {
  //busca os registros do mais novo para o mais antigo
  const [dados] = await pool.query('SELECT * FROM registros ORDER BY id DESC');
  //envia os registros no formato json
  res.json(dados);
});
//porta onde o server vai rodar
const PORT = 3000;
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`)); //inicia o server e avisa no terminal onde ta rodando
