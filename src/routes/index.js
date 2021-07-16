const express = require('express')
const movies = require('./moviesRoute')

module.exports = app => {
  app.use(
    express.json(),
    movies
  )
}
