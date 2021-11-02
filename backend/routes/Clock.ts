import express from 'express'
import { model as mongodb } from '../database/mongodb'
import { redisGet, redisSet } from '../database/redis'

const route = express.Router()

route.get("/", async (req,res) => {
    const alarmsStringfied = await redisGet("alarms-clock_display")
    const alarms = JSON.parse(alarmsStringfied)
    res.json(Array.isArray(alarms) ? alarms : alarms ? [alarms] : [])
})

route.get("/:id", async (req,res) => {
    const { id } = req.params
    const alarmStringfied = await redisGet(`${id}-alarms-clock_display`)
    const alarm = JSON.parse(alarmStringfied)
    res.json(Array.isArray(alarm) ? alarm : alarm ? [alarm] : [])
})

// route.post("/:id", (req,res) => {      
//     const { id } = req.params
//     mongodb.findOneAndUpdate({ id }, {  }) 
// })

route.put("/", async (req,res) => {
    const { time, name } = req.body
    const alarm = await mongodb.insertMany([{ time, name }])
    const currentRedisValueStringfied = await redisGet("alarms-clock_display")
    const currentRedisValue = currentRedisValueStringfied ? JSON.parse(currentRedisValueStringfied) : []
    currentRedisValue.push(alarm[0])
    await redisSet("alarms-clock_display", JSON.stringify(currentRedisValue))
    await redisSet(`${alarm[0]["_id"]}-alarms-clock_display`, JSON.stringify(alarm[0]))
    res.send(alarm[0])
})

route.delete("/:id", async (req,res) => {
    const { id } = req.params
    const deleteResponse = await mongodb.deleteMany({ _id: id })
    const arr: any[] = []
    const currentRedisValueStringfied = await redisGet("alarms-clock_display")
    const currentRedisValue = currentRedisValueStringfied ? JSON.parse(currentRedisValueStringfied) : []
    currentRedisValue.forEach((value: any) => {
        if(value._id != id) arr.push(value)
    })
    await redisSet("alarms-clock_display", JSON.stringify(arr))
    await redisSet(`${id}-alarms-clock_display`, "")
    res.send(deleteResponse)
})

export default route