import express from 'express'
const app = express()
const port = 7000
import cors from "cors"
import mongoose, { Schema } from 'mongoose';

app.use(express.json())
app.use(cors())

const ServicesPost = new Schema({
    name: String,
    description: String,
    icon: String
});

const ServiceModel = mongoose.model('ServiceName', ServicesPost);

app.get('/', async (req, res) => {
    try {
        const service = await ServiceModel.find({})
        res.send(service)
    } catch (error) {
        res.send(error.message)
    }
})


app.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const service = await ServiceModel.findById(id)
        res.send(service)
    } catch (error) {
        res.send(error.message)
    }
})

app.post('/', async (req, res) => {
    try {
        const { name, description, icon } = req.body
        const newService = new ServiceModel({ name, description, icon })
        await newService.save()
        res.send('Post yaradildi')
    } catch (error) {
        res.send(error.message)
    }
})

app.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, description, icon } = req.body
        const services = await ServiceModel.findByIdAndUpdate(id, { name, description, icon })
        res.send(services)
    } catch (error) {
        res.send(error.message)
    }
})

app.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const service = await ServiceModel.findByIdAndDelete(id)
        res.send(service)
    } catch (error) {
        res.send(error.message)
    }
})

mongoose.connect('mongodb+srv://arzu:arzu@cluster0.9p2kmwb.mongodb.net/')
    .then(() => console.log('Connected!'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})