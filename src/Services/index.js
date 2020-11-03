import axios from 'axios'

import { Alert } from 'react-native'

import { getUser, navigate, deleteUser } from '../pages/utils'



const api = axios.create({
  baseURL: 'http://www.ipet.kinghost.net',
 // baseURL: 'https://localhost:44387',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },

})

api.interceptors.response.use(
  response => {
    
    //console.log(response)
    // Do something with response data

    return response
  },
  error => {

    //console.log(error);

    if (
      error.request._hasError === true &&
      error.request._response.includes('connect'),
      console.log("erro de request",error.request)
    ) {
      Alert.alert(
        'Aviso',
        'Não foi possível conectar aos nossos servidores, sem conexão a internet',
        [ { text: 'OK' } ],
        { cancelable: false },
      )
    }

    if (error.response.status === 401) {
      const requestConfig = error.config

      // O token JWT expirou

      deleteUser().then(() => {
        navigate('AuthLoading', {})
      })

      return axios(requestConfig)
    }

    return Promise.reject(error)
  },
)

api.interceptors.request.use(
  config => {
    return getUser()
      .then(user => {
        user = JSON.parse(user)
        if (user && user.token)
          config.headers.Authorization = `Bearer ${user.token}`
          //console.log("error",config)
        return Promise.resolve(config)
      })
      .catch(error => {
        console.log("errou",error)
        return Promise.resolve(config)
      })
  },
  error => {
    return Promise.reject(error)
  },
)

export default api