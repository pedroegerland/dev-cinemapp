const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/config.json')

class Mysql {
  async init() {
    return new Sequelize(process.env.DB_MYSQL_SCHEMA || 'mysql',
      process.env.DB_MYSQL_USER || db.USER,
      process.env.DB_MYSQL_PASSWORD || db.PASSWORD,
      {
        host: process.env.DB_MYSQL_HOST || db.HOST,
        port: process.env.DB_MYSQL_PORT || db.PORT,
        dialect: db.dialect,
        dialectOptions: {
          ssl: process.env.DB_MYSQL_SSL == 'true'
        }
      }
    )
  }

  async create() {
    const sql = await this.init()
    const Movies = sql.define('movies', {
      Title: DataTypes.STRING,
      Year: DataTypes.STRING,
      imdbID: DataTypes.STRING,
      Type: DataTypes.STRING,
      Poster: DataTypes.STRING,
      liked: DataTypes.BOOLEAN
    })
    return { sql, Movies }
  }
}

module.exports = new Mysql