import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const messageSchema = Schema({
    content:String,
    author:{
        ref:'User',
        type:ObjectId
    },
    room:{
        ref:'Room',
        type:ObjectId
    }
}, { timestamps: true})

const roomSchema = Schema({
    messages:[{
        ref:'Message',
        type:ObjectId
    }],
    users:[{
        ref:'User',
        type:ObjectId
    }]
}, { timestamps: true})

const Room =  mongoose.model('Room', roomSchema)

export const Message = mongoose.model('Message', messageSchema)

export default Room