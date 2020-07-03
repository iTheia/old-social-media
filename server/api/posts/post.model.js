import mongoose from 'mongoose'

const Schema = mongoose.Schema

const postSchema = Schema({
    description:{
        type:String
    },
    media:{
        type:String
    },
    author:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    likes:[{
        type: Schema.Types.ObjectId,
        ref:'User'
    }],
    comments:[{
        type: Schema.Types.ObjectId,
        ref:'Comment'
    }]
}, {timestamps:true})

const Post =  mongoose.model('Post', postSchema)

export default Post