const { request } = require("express");
const { check, validationResult } = require("express-validator");
const validations = {};
const jwt = require("jsonwebtoken");

validations.sanitizeRegister = [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("name cant be empty")
    .isString()
    .withMessage("Name must be string"),
  // check('name').isString().not().withMessage('name must be string'), /**Mildai milena */
  check("email").normalizeEmail().isEmail().withMessage("Invalid Email"),
  check("phone")
    .isLength({ min: 10, max: 10 })
    .withMessage("Number must be 10 characters long"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage(`Password can't be empty`),
];

validations.output = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({ success: false, message: error });
};

validations.jwtCreate = (req, res, next) => {
  try {
    console.log("here");
    const user = { email: req.body.email };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

    console.log({ accessToken });
    req.token = accessToken;
    // req.message = [{ token: "token a successfully" }];
    next();
  } catch (err) {
    // console.log(err)
    next(err);
  }
};
validations.jwtAuthenticate =async (req, res, next) => {
  try {
    const token = req.headers.authorization || req.token;
    console.log(token)
    // const token = authHeader ;
    if (token == null ) return res.status(404).send("Couldn't authenticate");

    const verified = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified;
    console.log("Token is verified" + { verified });
    if (!verified) {
      return res.status(401).send(error);
    }
    // req.message.push({ msg: "JWT Verified" });

    next();

    // return res.write("JWT Verified successfully");
  } catch (err) {
    next(err);
    // console.log(err)
  }
};

module.exports = validations;
