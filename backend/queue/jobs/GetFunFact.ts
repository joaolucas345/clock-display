import Bull from 'bull'
import { RunBot as GetFunFactBot } from '../../Bots/GetFunFactBot'
import { funFactModel as mongodb } from '../../database/mongodb'
import { redisSet } from '../../database/redis'

const GetFunFactQueue = new Bull("GetFunFactQueue")

const delay = 1000 * 60 * 60 * 24

const exit = () => {
    GetFunFactQueue.clean(0)
    GetFunFactQueue.add({}, { delay })
}

GetFunFactQueue.process(async ({ data }) => {
    const text = await GetFunFactBot()
    await mongodb.updateOne({ id:1 }, {
        id: 1,
        text: text
    }, { upsert: true })
    await redisSet("fun_fact-clock_display", text)
    exit()
})

export { GetFunFactQueue }