const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());


async function getConnection() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    database: 'netflix',
    user: 'root',
    password: 'Localhost',
  });
  await connection.connect();

  console.log(
    `Conexión establecida con la base de datos (identificador0${connection.threadId})`
  );
  return connection;
}

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

server.get('/movies', async (req, res) => {
  console.log('Pidiendo a la base de datos información de las movies.');
  let sql = 'SELECT * FROM netflix.movies';
  console.log(sql);
  const connection = await getConnection();
  const [results] = await connection.query(sql);
  console.log(results);
  connection.end();
  res.json({
    success: true,
    movies: results,
  }); 

});
const staticServerPathWeb = './web'; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathWeb));