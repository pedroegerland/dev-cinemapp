const { moviesServices } = require('../services')

class MoviesController {
  async getMovies(req, res) {
    try {
      const movie = await moviesServices.getMovies(req.query.s)
      return res.status(200).json(movie)
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message })
    }
  }

  async listLikedMovies(req, res) {  
    try {
      const likedMovies = await moviesServices.listLikedMovies()
      return res.status(200).json(likedMovies)  
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  async likeOrDeslike(req, res) {  
    try {
      const item = await moviesServices.likeOrDeslike(req.params.id)

     const action = item.liked ? 
     'O Filme foi adicionado aos Favoritos' : 
     'O Filme foi removido dos Favoritos'

      return res.status(200).json({ mensagem: action })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = new MoviesController