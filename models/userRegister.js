const mongoose=require('mongoose')
const validator=require('validator')

const userSchema=new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true,
        validate(value){
            if(value.length!=10){
                throw new Error("mobile no. is invalid");
            }
        }
        
    },
    email:{
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid");
            }
        }
    },
    salary:{
        type: Number,
        required: true,
    },
    city:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },    
    date:{
        type:Date,
        default:Date.now()
    },
})

const User=new mongoose.model('users',userSchema);

module.exports=User;