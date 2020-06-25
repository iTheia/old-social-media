import mongoose from 'mongoose'
import Post from './post.model'
import { userModel } from '../users'

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
        await userModel.findByIdAndUpdate(user_id,{$push:{post:post._id}},{new:true})
        res.send(post)
    },
    async update(req, res){
        const user_id = mongoose.Types.ObjectId(req._id)
        const post_id = mongoose.Types.ObjectId(req.params.id)
        const post = await Post.findOneAndUpdate({_id:post_id, 'author':user_id},req.body,{new:true})
        res.send(post)
    },
    async delete(req, res){
        const user_id = mongoose.Types.ObjectId(req._id)
        const post_id = mongoose.Types.ObjectId(req.params.id)
        const post = await Post.findOneAndDelete({_id:post_id, 'author':user_id},{rawResult:true})
        await userModel.findByIdAndUpdate(user_id, {$pull:{post:post_id}})
        res.status(200).send(post)
    },
    async getSingle(req, res){
        const post_id = mongoose.Types.ObjectId(req.params.id)
        const post = await Post.findById(post_id)
        res.status(200).send(post)
    }
}

export default controller