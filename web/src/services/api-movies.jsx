// login

//const getMoviesFromApi = () => {

// console.log('Se están pidiendo las películas de la app');
// CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC

// return fetch('http://localhost:4000')
//   .then((response) => response.json())
//   .then(() => {
//     // CAMBIA EL CONTENIDO DE ESTE THEN PARA GESTIONAR LA RESPUESTA DEL SERVIDOR Y RETORNAR AL COMPONENTE APP LO QUE NECESITA
//     return {
//       success: true,
//       movies: [
//         {
//           id: '1',
//           title: 'Gambita de dama',
//           genre: 'Drama',
//           image:
//             '//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/images/gambito-de-dama.jpg',
//         },
//         {
//           id: '2',
//           title: 'Friends',
//           genre: 'Comedia',
//           image:
//             '//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/images/friends.jpg',
//         },
//       ],
//     };
//  });
//};

// const objToExport = {
//   getMoviesFromApi: getMoviesFromApi,
// };

// export default objToExport;

const loadJson = async () => {
  try {
    const url = 'http://localhost:4000';
    const res = await fetch(url);
    if (res.ok) {
      const datos = await res.json();
      console.log(datos);
    } else {
      new Error(res.status);
    }
  } catch (err) {
    console.log(err);
  }
};
loadJson();
