const { Op } = require('sequelize');
const mysql = require('../models/movies')
const redis = require('../models/redis')
const { omdbapi } = require('../middlewares/omdbapi')

class Services {
  async getMovies(search = {}) {
    const { Movies } = await mysql.create()

    console.log('search', search)

    const movie = await redis.get(`${search}`)

    console.log('found in redis')

    if (movie) return JSON.parse(movie)

    const dbMovies = await Movies.findAll({ where: { Title: { [Op.like]: search } } })

    if (dbMovies.length > 0) {
      console.log('found in db')
      let listMovies = []

      for (let i = 0; i < dbMovies.length; i++) {
        const dbmovie = dbMovies[i];

        await redis.set(`${dbmovie.dataValues.Title}`, `${dbmovie.dataValues}`, 3600)

        listMovies.push(dbmovie.dataValues)
      }
      return listMovies
    } else {
      try {
        const moviesOfOmdb = await omdbapi(search)
  
        if (Array.isArray(moviesOfOmdb)) {
  
          console.log ('Found in omdb')
  
        const savedMovies = await this.saveMovie(moviesOfOmdb);
  
        return savedMovies
        }
      } catch(err) {
        console.log('err', err)
        throw { message: err, status: 404 }
      }
    }
  }

  async listLikedMovies() {
    const { Movies } = await mysql.create()

    const favorites = await Movies.findAll({ where: { liked: true } })

    const favReturn = favorites.length > 0 ? favorites : { message: 'Não há filmes na lista de favoritos!' }

    return favReturn
  }

  async likeOrDeslike(id) {
    const { Movies } = await mysql.create()

    const item = await Movies.findOne({ where: { id } })

    if (item) {
      if (item.liked) {
        return item.update({ liked: false })
      }
      return item.update({ liked: true })
    }
  }

  async saveMovie(payload) {
    const { Movies } = await mysql.create()

    let savedMovies = []

    for (let i = 0; i < payload.length; i++) {
      const movie = payload[i];
      
      const savedMovie = await Movies.create({ ...movie })
  
      await redis.set(`${movie.Title}`, JSON.stringify(savedMovie), 3600)
  
      savedMovies.push(savedMovie)
    }

    return savedMovies
  }
}

module.exports = Services