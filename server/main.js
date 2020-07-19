import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import cors from 'cors'
import path from 'path'
import router from './router'
import connection from './database'
import config from './config'
import socketio from 'socket.io'
import { addUser, removeUser, getUser, userInRoom } from './util/userSockets'

const app = express()
const server = http.createServer(app)
const io = socketio(server)

connection()

app.use(express.static(path.join(__dirname, '../client/build')))
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(cors())

app.use('/api/v1/', router)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'), (err) =>{
        if (err) {
            res.status(500).send(err)
        }
    })
})

io.on('connection', socket =>{
    socket.on('join', ({room}, callback) =>{
        const user = addUser({id:socket.id, room})
        socket.join(user.room)
    })
    socket.on('sendMessage', (message, callback) =>{
        const user = getUser(socket.id)
        console.log( message)
        io.to(user.room).emit('message', message)
        callback()
    })
    socket.on('discconect', ()=>{
        removeUser(socket.id)
    })
})

server.listen(config.port)