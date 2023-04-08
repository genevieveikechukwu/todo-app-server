const dotenv = require('dotenv')

dotenv.config({path: './config.env'})
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()



var corOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}


// middleware
app.use(cors(corOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

const todoRouter = require('./routes/todoRoutes')
const userRouter = require('./routes/userRoutes')
app.use('/api/todo', todoRouter)
app.use('/api/todo', userRouter)
// testing API

app.get('/', (req, res) => {
    res.json({message : "TODO API"})
})



//port

const PORT = process.env.PORT || 3001

//server
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})