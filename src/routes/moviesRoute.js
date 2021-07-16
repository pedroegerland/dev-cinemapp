const { Router } = require('express')
const moviesController = require('../controllers/MoviesController')

const router = Router()

router
  .get('/movies', moviesController.getMovies)  
  .get('/movies/liked', moviesController.listLikedMovies)    
  .get('/movies/liked/:id', moviesController.likeOrDeslike)

module.exports = router