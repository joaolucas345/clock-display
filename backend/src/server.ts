import express from 'express'

const init = () => {
    console.log(`server listening on port ${PORT}`)
}

const app = express()

app.use(express.json())

import ClockRouter from '../routes/Clock'

app.use("/clock", ClockRouter)


const PORT = 3001

app.listen(PORT, () => init())

