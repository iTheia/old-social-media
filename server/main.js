import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import cors from 'cors'
import path from 'path'
import router from './router'
import connection from './database'
import config from './config'

const app = express()
const server = http.createServer()

connection()


app.use(express.static(path.join(__dirname, '../client/build')))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(cors())

app.use('/api/v1/', router)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})


server.listen(config.port)