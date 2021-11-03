import express from 'express'

const route = express.Router()

route.get("/", (req,res) => {
    res.send("this is a fun fact")
})

export default route