import Bull from 'bull'
import { redis, redisGet, redisSet } from '../../database/redis'
import { AlertAlarmDeletedQueue } from './AlertAlarmDeleted'

const TimeMatchQueue = new Bull("TimeMatchQueue")

const exit = () => {
    TimeMatchQueue.clean(0)
    TimeMatchQueue.add({}, { delay: 10000 })
}

TimeMatchQueue.process(async ({ data }) => {
    try {
        // const {  } = data
        const alarmsStringfied = await redisGet("alarms-clock_display")
        if(!alarmsStringfied) return exit()
        const alarms = JSON.parse(alarmsStringfied)
        const deleteArr: any[] = []
        alarms.forEach((alarm: any, i: number) => {
            if(Number(alarm.time) < Date.now()) deleteArr.push({ alarm, i })
        })

        deleteArr.forEach(alarm => {
            alarms.splice(alarm.i, 1)
            AlertAlarmDeletedQueue.add({ alarm:alarm.alarm })
        })

        if(deleteArr.length) await redisSet("alarms-clock_display", JSON.stringify(alarms))
        return exit()
    } catch (err) {
        exit()
    }
})

export { TimeMatchQueue }