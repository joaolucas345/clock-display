import mongoose from 'mongoose'

const mongo = new mongoose.Mongoose()

const initMongo = async () => {
    await mongo.connect('mongodb://localhost/clock_display')
}

const model = mongo.model("alarms", new mongo.Schema({
    name: String,
    time: String
}))

initMongo()

export { model }