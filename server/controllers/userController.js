const { User } = require("../models/index");
const { validate } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

class userController {
  static async register(req, res, next) {
    try {
      const { username, password } = req.body;

      const newUser = await User.create({
        username,
        password,
      });

      res.status(201).json({ newUser });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username) {
        throw { name: "ReqUsername" };
      }

      if (!password) {
        throw { name: "ReqPass" };
      }

      let user = await User.findOne({ where: { username } });
      if (!user) {
        throw { name: "UserNotFound" };
      } else {
        const validPassword = validate(password, user.password);
        if (!validPassword) {
          throw { name: "InvalidLogin" };
        } else {
          const payload = {
            id: user.id,
            username: user.username,
          };
          const access_token = createToken(payload);
          res.status(200).json({ access_token });
        }
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = userController;
