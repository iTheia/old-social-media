import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../../config'

const schema = {
    email:{
        type:String,
        required:[true, 'email can not be empety']
    },
    password:{
        type:String,
        required:[true, 'password can not be empety']
    },
    notifications:{
        type:Array
    },
    post:{
        type:Array
    },
    name:{
        type:String,
        required:[true, 'name can not be empty']
    }
}

const userSchema = new mongoose.Schema(schema, {timestamps:true})

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } else {
        next()
    }
})


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id:this.id}, config.secret.token)
    return token
}


const User =  mongoose.model('User', userSchema)

export default User