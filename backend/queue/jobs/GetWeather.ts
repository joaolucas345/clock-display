import Bull from 'bull'
import axios from 'axios'
import { redisSet } from '../../database/redis'

const GetWeatherQueue = new Bull("GetWeatherQueue")

const exit = () => {
    GetWeatherQueue.clean(0)
    GetWeatherQueue.add({}, { delay: 10000 })
}

const API_URL = 'https://goweather.herokuapp.com/weather/orlando'

GetWeatherQueue.process(async ({ data }) => {
    const temp = {
        temperature: '+22 °C',
        wind: '9 km/h',
        description: 'Clear',
        forecast: [
          { day: '1', temperature: '+30 °C', wind: '4 km/h' },
          { day: '2', temperature: '+26 °C', wind: '20 km/h' },
          { day: '3', temperature: '27 °C', wind: '13 km/h' }
        ]
      }//await axios(API_URL).then(r => r.data)
    await redisSet("weather-clock_display", JSON.stringify(temp))
    exit()
})

export { GetWeatherQueue }