const {check,validationResult} = require('express-validator')
const validations = {};



validations.sanitizeRegister = [
    
    check('name').trim().not().isEmpty().withMessage('name cant be empty').not().isString().withMessage('Name must be string'),
    // check('name').isString().not().withMessage('name must be string'), /**Mildai milena */
    check('email').normalizeEmail().isEmail().withMessage('Invalid Email'),
    check('phone').isLength({ min: 10, max:10 }).withMessage('Number must be 10 characters long'),
    check('password').trim().not().isEmpty().withMessage(`Password can't be empty`)
];

validations.output = (req,res, next)=>{
    const result = validationResult(req).array();
    if(!result.length) return next();

    const error = result[0].msg;
    res.json({success:false,message:error})
};





module.exports = validations;


// validations.sanitizeRegister = (req,res,next)=>{
//     const sanitizeArray = [
//         {
//             field:'name',
//             sanitize: {
//                 trim:true,
//             },
//         },
//         {
//             field:'email',
//             sanitize:{
//                 trim:true,
//             }
//         }
//     ]

// }

// validations.validateRegisterInput = (req,res,next)=>{
//     const data = req.body;
//     const validateArray = [
//         {
//             field:'name',
//             validate:[
//                 {
//                     condition:'IsEmpty',
//                     msg:'cant be empty',
//                 }
//             ]
//         },
//         {
//             field:'email',
//             validate:[
//                 {
//                     condition:'IsEmpty',
//                     msg:'cant be empty'
//                 }
//             ]
//         }
//     ];


// }

