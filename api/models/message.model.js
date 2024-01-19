import mongoose from "mongoose";
const { Schema } = mongoose;

const MessageSchema = new Schema({
  sender :{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  receiver :{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  chat : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Chat"
  }
},{
  timestamps:true
  }
);

export default mongoose.model("Message", MessageSchema)