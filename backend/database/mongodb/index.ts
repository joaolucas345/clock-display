import mongoose from 'mongoose'

const mongo = new mongoose.Mongoose()

const initMongo = async () => {
    await mongo.connect('mongodb://localhost/clock_display')
}

const model = mongo.model("alarms", new mongo.Schema({
    name: String,
    time: String
}))

const funFactModel = mongo.model("fun_fact", new mongo.Schema({
    id: String,
    text: String
}))

const notificarionsModel = mongo.model("notifications", new mongo.Schema({
    content: String,
    group: String,
    time: Number
}))

initMongo()

export { model, funFactModel, notificarionsModel }