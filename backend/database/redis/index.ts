import redisClient from 'redis'

const redis = redisClient.createClient()

const redisGet = async (key: string): Promise<string> => {
    return new Promise((resolver, reject) => {
        redis.get(key, (err, value) => {
            if(err) return reject(err)
            if(!value) return resolver("")
            resolver(value)
        })
    })
}

const redisSet = async (key: string, value: string) => {
    redis.set(key, value)
}


export { redisGet, redisSet, redis }