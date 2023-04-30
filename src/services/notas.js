import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/notes'
// const baseUrl = 'http://api.garredev.online:3001/api/notes'
let token

const setNewToken = (newToken) => {
  token = 'Bearer ' + newToken
}


const getAll = () => {
  return axios.get(baseUrl).then(respuesta => respuesta.data)
}

const create = async (nuevaNota) => {
  const config = {
    headers: {
      Authorization: token 
    }
  }
  // return axios.post(baseUrl, nuevaNota, config).then(respuesta => respuesta.data)
  const response = await axios.post(baseUrl, nuevaNota, config)
  return response.data
}

const update = (id, nuevaNota) => {
  console.log('Desde el servicio de notas')
  console.log('ID: ', id)
  console.log('nuevaNota: ', nuevaNota)
  
  return axios.put(`${baseUrl}/${id}`, nuevaNota).then(respuesta => respuesta.data)
}

export default {setNewToken, getAll, create, update}
// Esto es una propiedad del nuevo JS para crear objetos a partir de variables