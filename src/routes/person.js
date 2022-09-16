let express =  require('express');
// let app = express();
let router = express.Router();
let personController = require('../modules/person/personController')



router.get('/error',(req,res) =>{
    throw new Error('forced error')
})

//params property on the request object
//localhost:3000/person/dipak
router.get('/person/:name',personController.getPersonName)




//QueryString => query protperty on the request object
//localhost:3000/person?name=dipak&age=22
router.get('/person',personController.getPerson)

module.exports = router