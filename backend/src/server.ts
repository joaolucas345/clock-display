import express from 'express'

const init = () => {
    console.log(`server listening on port ${PORT}`)
}

const app = express()

app.use(express.json())

import ClockRouter from '../routes/Clock'
import FactRouter from '../routes/Fact'
import WeatherRouter from '../routes/Weather'
import NotificationsWeather from '../routes/Notification'

app.use("/clock", ClockRouter)
app.use("/fact", FactRouter)
app.use("/weather", WeatherRouter)
app.use('/notifications', NotificationsWeather)


const PORT = 3001

app.listen(PORT, () => init())

