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
    likes:{
        type:Number,
        default:0
    }
}, {timestamps:true})

const Post =  mongoose.model('Post', postSchema)

export default Post