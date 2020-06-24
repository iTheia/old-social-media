import mongoose from 'mongoose'

const schema = {
    
}

const userSchema = new mongoose.Schema(schema, {timestamps:true})

const User =  mongoose.model('User', userSchema)

export default User