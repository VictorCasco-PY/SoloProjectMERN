const jwt = require("jsonwebtoken");
const secret_key = "Esta es mi llave secreta";

module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, secret_key, (err, payload) => {
    console.log("COOKIE: ", payload);
    if (err) {
      res.status(401).json({ verified: false });
    } else {
      next();
    }
  });
};

module.exports.admin = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, secret_key, (err, payload) => {
    if (err) {
      res.status(401).json({ verified: false });
    } else if (payload._id !== "640e875fcfd16814d3bba230") {
      res.status(401).json({ verified: false });
    } else {
      next();
    }
  });
};
