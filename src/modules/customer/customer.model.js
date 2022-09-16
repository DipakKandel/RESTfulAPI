let mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/RESTAPI')

DB = 'mongodb+srv://dipak:testdipak@cluster0.wuu4zvp.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(DB)
.then(()=>{
    console.log('connection successful')
}).catch((err)=>console.log(err))

let customerSchema = new mongoose.Schema({
    name:{type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
    },
    email:{  
        type: String,
        required : true,
        unique : true
    },
    password:{
        type:String,
        required: true
    }
})

module.exports = mongoose.model('Customer', customerSchema)