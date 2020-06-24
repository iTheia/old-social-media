import Post from './post.model'
import mongoose from 'mongoose'

const controller = {
    async getAll(req, res){
        const posts = await Post.find().populate('author','name')
        res.status(200).send(posts)
    },
    async create(req, res){
        const user_id = mongoose.Types.ObjectId(req._id)
        const post = new Post({
            description:req.body.description,
            media:req.body.media,
            likes:0,
            author:user_id
        })
        await post.save()
        res.send(post)
    },

}

export default controller