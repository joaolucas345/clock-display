import express from 'express'
import { redisGet } from '../database/redis'

const route = express.Router()

route.get("/",async (req,res) => {
    const tempStrinfied = await redisGet('weather-clock_display')
    const temp = JSON.parse(tempStrinfied)
    res.send(temp)
})

export default route