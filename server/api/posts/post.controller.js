import mongoose from 'mongoose'
import Post from './post.model'
import { userModel } from '../users'

const controller = {
    async explore(req, res){
        const { page } = req.headers
        let quantity = 15
        let start = page * quantity
        const response = await Post.find().sort({createdAt:1,likes:1}).select('media likes comments').limit(quantity).skip(start)
        res.send(response)
    },
    async getAll(req, res){
        const { page } = req.headers
        let quantity = 3
        let start = page * quantity
        const posts = await Post.find().populate('author', 'name avatar').populate({
            path:'comments',
            populate:{
                path:'author',
                select:'userName'
            },
            select:'content'
        }).slice('comments',-2).sort({createdAt:-1}).limit(quantity).skip(start)
        
        res.status(200).send(posts)
    },
    async create(req, res){
        const user_id = mongoose.Types.ObjectId(req._id)
        const post = new Post({
            description:req.body.description,
            media:req.file.filename,
            likes:[],
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
        const post = await Post.findById(post_id).select('-comments').populate('author', 'name avatar')
        const relatedPost = await userModel.findById(post.author._id).populate({
            path:'post',
            select:'media likes comments',
            limit:6
        }).select('userName')
        res.status(200).send({post,relatedPost:relatedPost.post})
    },
    async like(req, res){
        const user_id = mongoose.Types.ObjectId(req._id)
        const post_id = mongoose.Types.ObjectId(req.params.id)
        const post = await Post.findById(post_id)
        const index = post.likes.findIndex(user => user.equals(user_id))
        if(index >= 0){
            await Post.findByIdAndUpdate(post_id, {$pull:{likes:user_id}})
            return res.status(200).send("dislike")
        }
        await Post.findByIdAndUpdate(post_id, {$push:{likes:user_id}})
        res.status(200).send("like")
    } 
}

export default controller