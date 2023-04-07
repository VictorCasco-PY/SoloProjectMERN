const UserController = require("../controllers/user.controller");
const { authenticate, admin } = require("../config/jwt.config");

module.exports = function (app) {
  app.post("/api/register", UserController.register);
  app.post("/api/login", UserController.login);
  app.get("/api/logout", UserController.logout);
  app.get("/dashboard", authenticate, UserController.get_all);
  app.get("/dashboard", admin, UserController.get_all);
  app.get("/api/admin", admin, (req, res) => {
    res.status(200).json({});
  });
};
