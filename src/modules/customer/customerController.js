const customerModel = require("./customer.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const customerController = {};

customerController.postCustomer = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).send("request body is missing");
    }
    const { name, phone, email, password } = req.body;
    const user = await customerModel.findOne({ email: req.body.email });
    if (user) {
      return res.send("The email address is already used");
    }
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
  console.log(req.body.email);
  if (!req.body.email) {
    return res.status(400).send("missing body parameter: email");
  }
  customerModel
    .findOne({
      email: req.body.email,
    })
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      next(err);
      res.status(500).send(err);
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
  // const username = req.body.email;
  // const user = {name:username}

  // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  // req.message[{msg1:"Access token created"}]

  try {
    if (!req.body.email) {
      return res.status(400).send("missing url parameter: email");
    }
    if (!req.body.password) {
      return res.status(400).send("missing url parameter: password");
    }

    const user = await customerModel.findOne({ email: req.body.email });
    // console.log(user);

    if (user) {
      const enteredPass = req.body.password;

      const apassword = user.password;

      bcrypt.compare(enteredPass, apassword).then((result, err) => {
        if (result) {
          // req.message.push({ msg: "Logged in Successfully" });
          return res.send({msg:req.message,token:req.token});
        } else {
          return res.send("incorrect Password");
        }
      });
    } else {
      return res.send("user not found");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = customerController;
