const axios = require('axios')
const { get } = require('../models/redis')

module.exports = {
  omdbapi: async (search) => {
    return new Promise(async (resolve, reject) => {

      const config = {
        method: 'get',
        url: `http://www.omdbapi.com/?apikey=925eba28&s=${search}`,
      }
  

      const response = await axios(config)
      const result = response.data.Search

      if (result) return resolve(result)
      return reject('Não foi encontrado nenhum filme com o nome informado!')
    })
  }
}
