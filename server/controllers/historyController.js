const { History, User } = require("../models/index");

class HistoryController {
  static async historyList(req, res, next) {
    try {
      const {userId} = req.loginInfo
      let user = await User.findOne(
        { where: {id:userId}}
      );

      let history = await History.findOne(
        { where: {UserId:user.id}}
      );

        // console.log(user, '====', history);
      // if (!histories) {
      //   throw { name: "NotFound" };
      // }

      res.status(200).json({ history });
    } catch (error) {
      next(error);
    }
  }

  static async findHistoryById(req, res, next) {
    try {
      const { id } = req.params;
      let history = await History.findByPk(id);
      if (!history) {
        throw { name: "NotFound" };
      }
      res.status(200).json({ history });
    } catch (error) {
      next(error);
    }
  }

  static async addHistory(req, res, next) {
    try {
      let { win, lose, name } = req.body;
      // const { UserId } = req.loginInfo;

      if (win) {
        win = +win;
      } else {
        win = 0;
      }

      if (lose) {
        lose = +lose;
      } else {
        lose = 0;
      }

      const user = await User.findOne({where : { username : name}});
      if (!user) {
        throw { name: "NotFound" };
      }

      const history = await History.findOne({
        include: {
          model: User,
          where: {
            id: user.id,
          },
        },
      });
      if (!history) {
        const newHistory = await History.create({
          win,
          lose,
          UserId : user.id,
        });

        res.status(201).json({ newHistory });
      } else {
        const updatedHistory = await History.increment(
          {
            win: win,
            lose: lose,
          },
          { where: { id: history.id } }
        );
        res.status(200).json(updatedHistory);
      }
    } catch (error) {
      next(error);
    }
  }

  static async resetById(req, res, next) {
    try {
      const { id } = req.params;
      const history = await History.findByPk(id);
      if (!history) {
        throw { name: "NotFound" };
      } else {
        await history.update({ win: 0, lose: 0 });
        res.status(200).json({ message: `Match history has been reset` });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
module.exports = HistoryController;
