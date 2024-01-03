const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");
const userSchema = new Schema({

    email:{
        type: String,
        required: true,
        unique :true
    },
     password:{
        type  :String ,
        required: true
    }


})

userSchema.statics.signup = async function(email, password) {

   if(!email || !password){
    throw Error("all feild must filled")
   }
   if(!validator.isEmail(email)){
    throw Error("email is not valid")
   }



    const exist = await this.findOne({ email });
    if (exist) {
      throw new Error("email exists");
    }
  
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
  
    const user = await this.create({ email, password: hash });
  
    return user;
  };
  

  userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error("all feild must filled")
       }

       
    const user = await this.findOne({ email });
    if (!user) {
      throw new Error("email incrrect");
    }

    const match =await bcrypt.compare(password,user.password)
    if(!match){
        throw Error("Incorrect password")
    }
    return user
  }




module.exports = mongoose.model("User",userSchema)