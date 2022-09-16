const customerModel = require("./customer.model");
const bcrypt = require("bcrypt");

const customerController = {};

customerController.postCustomer = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).send("request body is missing");
    }
    const { name, phone, email, password } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        let model = new customerModel({ name, phone, email, password: hash });
        const doc = await model.save();
        res.status(201).send(doc);
      });
    });
  } catch (err) {
    next(err);
  }
};

customerController.getCustomer = function (req, res) {
  console.log(req.query.email);
  if (!req.query.email) {
    return res.status(400).send("missing url parameter: email");
  }
  customerModel
    .findOne({
      email: req.query.email,
    })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

customerController.putCustomer = function (req, res) {
  if (!req.query.email) {
    return res.status(400).send("missing url parameter: email");
  }
  customerModel
    .findOneAndUpdate(
      {
        email: req.query.email,
      },
      req.body,
      {
        new: true,
      }
    )
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

customerController.deleteCustomer = function (req, res) {
  if (!req.query.email) {
    return res.status(400).send("missing url parameter: email");
  }
  customerModel
    .findOneAndRemove({
      email: req.query.email,
    })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

customerController.loginCustomer = async function (req, res) {
  try{
    if (!req.body.email) {
      return res.status(400).send("missing url parameter: email");
    }
    if (!req.body.password) {
      return res.status(400).send("missing url parameter: password");
    }
  
     
    const user = await customerModel.findOne({ email:req.body.email });
    console.log(user)
    // if (!user) {
    //   console.log("user not found")
    //   return res.send("User not found");
    // }
  if(user){
       const enteredPass = req.body.password;
      //  return res.send(enteredPass)
      const apassword = user.password;
      // console.log(apassword)
      // if(enteredPass && apassword){
        bcrypt.compare(enteredPass,apassword).then((result,err)=>{
          if (result) {
            return res.send("Logged In Successfully");
            }
            else{
                    return res.send("incorrect Password");
            }
        });
        
      }
    
    else{
      return res.send("user not found");
    }
  }
  catch(err){
    console.log(err);
  }
  }

 
  
module.exports = customerController;
