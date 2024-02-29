const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

// create and config app
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();
app.set('view engine', 'ejs');

const getConnection = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    database: 'netflix',
    user: 'root',
    password: 'root',
  });
  await connection.connect();

  console.log(
    `Conexión establecida con la base de datos (identificador0${connection.threadId})`
  );
  return connection;
};

// init express aplication
const appPort = 4000;
app.listen(appPort, () => {
  console.log(`app listening at http://localhost:${appPort}`);
});

app.get('/movies', async (req, res) => {
  const { g, s } = req.query;
  console.log('Pidiendo a la base de datos información de las movies.');
  const connection = await getConnection();
  let listMovies = [];
  if (g === '') {
    const selectMovie = `SELECT * FROM movies ORDER BY title ${s}`;
    const [resultsMovies] = await connection.query(selectMovie);
    listMovies = resultsMovies;
  } else {
    const selectMovie = `SELECT * FROM movies WHERE genre =? order by title ${s}`;
    const [resultsMovies] = await connection.query(selectMovie, [g]);
    listMovies = resultsMovies;
  }
  // console.log(listMovies);
  connection.end();
  res.json({
    success: true,
    movies: listMovies,
  });
});

app.get('/movies/:idMovies', async (req, res) => {
  const idMovies = req.params.idMovies;

  const connection = await getConnection();
  console.log(req.params.idMovies);
  const select = `SELECT * FROM movies WHERE idMovies = ${idMovies}`;
  const [foundMovie] = await connection.query(select);

  connection.end();
  res.render('movie', foundMovie[0]);

  // res.json({
  //   success: true,
  //   movies: foundMovie,
  // });
});

const staticappPathWeb = './web'; // En esta carpeta ponemos los ficheros estáticos
app.use(express.static(staticappPathWeb));
