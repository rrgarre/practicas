import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/notes'
// const baseUrl = 'http://api.garredev.online:3001/api/notes'


const getAll = () => {
  return axios.get(baseUrl).then(respuesta => respuesta.data)
}

const create = nuevaNota => {
  return axios.post(baseUrl, nuevaNota).then(respuesta => respuesta.data)
}

const update = (id, nuevaNota) => {
  console.log('Desde el servicio de notas')
  console.log('ID: ', id)
  console.log('nuevaNota: ', nuevaNota)
  
  return axios.put(`${baseUrl}/${id}`, nuevaNota).then(respuesta => respuesta.data)
}

// export default {
//   getAll : getAll,
//   create : create, 
//   update : update
// }
// Al ser mismos nombres las claves y las variables, podemos compactar
// export default {
//   getAll,
//   create, 
//   update
// }
// Y asu vez
export default {getAll, create, update}
// Esto es una propiedad del nuevo JS para crear objetos a partir de variables