const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    phone:{
        type:Number,
    //   trim:true
        // required:true
    },
    email :{
        type:String,
        required:true
        },
        password :{
            type:String,
            required:true,
           unique:true
        }
        
});

const User=mongoose.model('User',userSchema);

module.exports=User;