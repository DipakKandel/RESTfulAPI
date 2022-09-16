const { text } = require('body-parser')
let mongoose = require('mongoose')
dataBase = 'mongodb+srv://dipak:testdipak@cluster0.wuu4zvp.mongodb.net/?retryWrites=true&w=majority'


mongoose.connect(dataBase)
.then(()=>{
    console.log('connection successful')
}).catch((err)=>console.log(err))

let postSchema = new mongoose.Schema({
    author_Name:{
        type:String,
        required:true
    },
    title:{
        type: String,
        required:true,
    },
    content:{  
        type: String,
        required : true,
    }
})

module.exports = mongoose.model('post', postSchema)
