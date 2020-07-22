import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";

const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, "email can not be empety"],
    },
    password: {
      type: String,
      required: [true, "password can not be empety"],
    },
    notifications: {
      type: Array,
    },
    post: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    name: {
      type: String,
      required: [true, "name can not be empty"],
    },
    userName: {
      type: String,
      required: [true, "name can not be empty"],
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    follows: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    description: {
      type: String,
    },
    avatar: {
      type: String,
      default: "user.svg",
    },
    rooms: [
      {
        ref: "Room",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } else {
    next();
  }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this.id }, config.secret.token);
  return token;
};

const User = mongoose.model("User", userSchema);

export default User;
