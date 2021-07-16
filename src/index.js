const express = require('express')
const mysql = require('./models/movies')
const routes = require('./routes')

const app = express()
const port = 3000

routes(app)

async function testConnection() {
    try {
      const { sql } = await mysql.create()
  
      await sql.authenticate()
      console.log('Connection has been established successfully with Mysql.')
  
      sql.sync()
    } catch (err) {
      console.log(`Unable to connect to the Mysql: `, err)
    }
  
    app.listen(port, () => console.log(`servidor está rodando na porta ${port}`))
  }
  
  testConnection()

module.exports = app