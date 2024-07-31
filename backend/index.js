const express = require('express')
const app = express()
const {Server} = require('socket.io')
const http = require('http')
const database = require('./server/config/promanger(db)')
const seed = require('./server/config/seed')
const cors = require('cors')
const userRoute = require('./server/routes/userRoutes')
const adminRout = require('./server/routes/adminRoutes')
const employeeRout = require('./server/routes/employeeRoutes')

const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST']
    }
})

const corsOption = {
    origin: "http://localhost:3000"
}
app.use(cors(corsOption))

app.use(express.static('./server/public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Welcome")
})
app.use('/user', userRoute)
app.use('/admin', adminRout)
app.use('/employee', employeeRout)

app.listen(5000, (err) => {
    if (err) {
        console.log("Error Occured", err)
    }
    else {
        console.log("Server is running")
    }
})