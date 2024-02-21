const { User } = require("../models/index");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class UserController {
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
      // next(error);
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
        const validPassword = comparePassword(password, user.password);
        if (!validPassword) {
          throw { name: "InvalidLogin" };
        } else {
          const payload = {
            id: user.id,
            username: user.username,
          };
          const access_token = signToken(payload);
          res.status(200).json({ access_token });
        }
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
