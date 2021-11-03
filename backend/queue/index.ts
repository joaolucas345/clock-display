import { TimeMatchQueue } from "./jobs/TimeMatch";
import { GetFunFactQueue } from "./jobs/GetFunFact";
import { GetWeatherQueue } from "./jobs/GetWeather";

const initTimeMatchQueue = async () => {
    const jobs = await TimeMatchQueue.getJobCounts()
    if(jobs.delayed > 0) return
    await TimeMatchQueue.add({})
}

const initGetFunFactQueue = async () => {
    const jobs = await GetFunFactQueue.getJobCounts()
    if(jobs.delayed > 0) return
    await GetFunFactQueue.add({})
}

const initGetWeatherQueue = async () => {
    const jobs = await GetWeatherQueue.getJobCounts()
    if(jobs.delayed > 0) return
    await GetWeatherQueue.add({})
}



initTimeMatchQueue()
initGetFunFactQueue()
initGetWeatherQueue()