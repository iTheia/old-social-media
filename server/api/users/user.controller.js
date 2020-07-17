import User from './user.model'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const controller = {
    async getDshboard(req, res){
        const id = mongoose.Types.ObjectId(req._id)
        const user = await User.findById(id).select('name avatar')
        res.send(user)
    },
    async getSingle(req, res){
        const id = req.params.id
        const user = await User.findById(id, { notifications: 0, password:0}).populate('post')
        res.status(200).send(user)
    },
    async getAll(req, res){
        const users = await User.find({},{ notifications: 0, password:0})
        res.status(200).send(users)
    },
    async update(req, res){
        const id = req.params.id
        if(req._id !== id){
            return res.status(400).send('you have not permission')
        }
        const user = await User.findByIdAndUpdate(id, req.body, {new:true})
        res.status(200).send(user)
    },
    async getFollows(req, res){
        const user_id = mongoose.Types.ObjectId(req._id)
        const follows = await User.findById(user_id,{follows:1, _id:0}).populate('follows',{
            name:1,
            avatar:1
        })
        res.send(follows.follows)
    },
    async create(req, res){
        const { email , userName, name, password } = req.body
        const emailExist = await User.findOne({email})
        if(emailExist){
            return res.status(400).send('email alredy exists')
        }
        const userNameExist = await User.findOne({userName})
        if(userNameExist){
            return res.status(400).send('user name alredy exists')
        }
        const user = new User({
            email,
            userName,
            name,
            password,
            avatar:'user.svg'
        })
        await user.save()
        const token = user.generateAuthToken()
        res.header('x-access-token',token).status(200).send(token)
    },
    async delete(req, res){
        const id = req.params.id
        if(req._id !== id){
            return res.status(400).send('you have not permission')
        }
        const user = await User.deleteOne({_id:id})
        res.status(200).send(user)
    },
    async signIn(req, res){
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(404).send('Invalid password or email')
        }
        const password = await bcrypt.compare(req.body.password, user.password)
        if(!password){
            return res.status(404).send('Invalid password or email')
        }
        const token = user.generateAuthToken()
        res.header('x-access-token',token).status(200).send(token)
    },
    async unfollow(req, res){
        const id = mongoose.Types.ObjectId(req.params.id)
        const follower_id = mongoose.Types.ObjectId(req._id)
        const user = await User.findByIdAndUpdate(id,{$pull:{followers:follower_id}},{new:true}).select('followers userName')
        await User.findByIdAndUpdate(follower_id,{$pull:{follows:id}})
        res.send(user)
    },
    async follow(req, res){
        const id = mongoose.Types.ObjectId(req.params.id)
        const follower_id = mongoose.Types.ObjectId(req._id)
        const user = await User.findByIdAndUpdate(id,{$push:{followers:follower_id}},{new:true}).select('followers userName')
        await User.findByIdAndUpdate(follower_id,{$push:{follows:id}})
        res.send(user)
    }
}

export default controller