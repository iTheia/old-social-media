import mongoose from 'mongoose'

const schema = {
    
}

const postSchema = new mongoose.Schema(schema, {timestamps:true})

const Post =  mongoose.model('Post', postSchema)

export default Post