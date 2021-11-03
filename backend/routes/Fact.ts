import express from 'express'
import { redisGet } from '../database/redis'

const route = express.Router()

route.get("/", async (req,res) => {
    
    const fact = await redisGet('fun_fact-clock_display')
    res.send(fact)
})

export default route