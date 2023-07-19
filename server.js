const { config } = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const tasksRoutes = require('./routes/tasks')

const app = express()

require('dotenv', config())

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/tasks', tasksRoutes)

mongoose.connect(process.env.MONG_URI)
    .then(() => { 
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT);
        })
     })
    .catch((error) => {
        console.log(error);
    })

