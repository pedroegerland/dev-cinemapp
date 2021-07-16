const redis = require('redis')

class Redis {
  constructor() {
    this.init()
  }

  init() {
    this.client = redis.createClient()

    this.client.on('connect', () => {
      console.log({ event: 'RedisClient.init.connect', message:'event connected' })
    })

    this.client.on('reconnecting', () => {
      console.log({ event: 'RedisClient.init.reconnecting', message:'event reconnect to the Redis server'})
    })

    this.client.on('error', (err) => {
      console.log({ event: 'RedisClient.init.error', message: `event error: ${err}` })
    })

    this.client.on('ready', () => {
      console.log({ event: 'RedisClient.init.ready', message: 'event ready, connection is established' })
    })

    this.client.on('end', () => {
      console.log({ event: 'RedisClient.init.end', message: 'event connection close' })
    })
  }

  set(key, value, expire) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', expire, (err, res) => {
        if (err) return reject(err)
        console.log({ event: 'RedisClient.set', message: `Created Key: ${key}` })
        return resolve(res === 'OK')
      })
    })
  }

  get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, res) => {
        if (err) return reject(err)
        return resolve(res)
      })
    })
  }

  del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, res) => {
        if (err) return reject(err)
        console.log({ event: 'RedisClient.del', message: `Deleted Key: ${key}` })
        return resolve(res)
      })
    })
  }

}

module.exports = new Redis