import express from 'express'
import { redisGet, redisSet } from '../database/redis'
import { notificarionsModel as mongodb } from '../database/mongodb'

const route = express.Router()

//redis keys
//top(20)_notifactions-clock_display
route.get("/", async (req,res) => {
    const notifactionsStringfied = await redisGet('top(20)_notifactions-clock_display')
    if(!notifactionsStringfied) return res.json([])
    const notifications = JSON.parse(notifactionsStringfied)
    res.json(notifications)
})

route.get("/group/:group", async (req,res) => {
    const { group } = req.params
    const inGroups = await mongodb.find({ $where: new Function(`return this.group.includes('${group}')`) })
    res.json(inGroups)
})

// route.get("/:id")

route.get("/create/:group", async (req,res) => {
    const { group } = req.params
    const { content, important } = req.query
    const [ notification ] = await mongodb.insertMany([{ group, content }])
    const notifactionsStringfied = await redisGet('top(20)_notifactions-clock_display')
    const notifications = notifactionsStringfied ? JSON.parse(notifactionsStringfied) : []
    if(notifications.length > 19) notifications.pop()
    notifications.unshift(notification)
    await redisSet('top(20)_notifactions-clock_display', JSON.stringify(notifications))
    res.send(notification)
})

route.delete("/:id", async (req,res) => {
    const { id } = req.params
    await mongodb.deleteMany({ _id : id })
    const notifactionsStringfied = await redisGet('top(20)_notifactions-clock_display')
    const notifications = notifactionsStringfied ? JSON.parse(notifactionsStringfied) : []
    let changed = false
    notifications.forEach((notification, i) => {
        if(notification._id == id) {
            notifications.splice(i, 1)
            changed = true
        }
    })
    if(changed) await redisSet('top(20)_notifactions-clock_display', JSON.stringify(notifications))
    res.send("success")
})

export default route