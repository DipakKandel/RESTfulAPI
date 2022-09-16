let customerModel = require('../modules/customer/customer.model')
let express = require('express');
const { off } = require('../modules/customer/customer.model');
let router = express.Router();
const customerController = require('../modules/customer/customerController')
const validateRegisterInput = require('../modules/customer/customerValidations')

//create new customer
//POST localhost:3000/customer
// validateRegisterInput.sanitizeRegister,
router.post('/customer/login', customerController.loginCustomer )
router.post('/customer',validateRegisterInput.sanitizeRegister,validateRegisterInput.output,customerController.postCustomer)

router.get('/customer',customerController.getCustomer )

//UPDATE REQUEST
router.put('/customer',customerController.putCustomer)

//DELETE
router.delete('/customer', customerController.deleteCustomer)

//Queries 
router.get('/queries', async (req,res)=>{
    query = {name:'dipk kandel'}
    let a=await customerModel.updateOne(query,{name:"Dipak Kandel"})
        res.json(a)
   
})

module.exports = router