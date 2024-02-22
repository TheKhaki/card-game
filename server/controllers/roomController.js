const { Room } = require('../models/index')

class RoomController {
   static async createRoom(req, res, next) {
      try {
         const {name} = req.body
         let room = await Room.create({
            name
         })
         res.status(201).json({room})
      } catch (error) {
         next(error)
      }
   }

   static async leaveRoom(req, res, next) {
      try {
         const { name } = req.body
         if(!name) throw { name : "ReqNameRoom"}

         await Room.destroy({where : { name}})
         res.status(200).json({ msg : "leave success"})
      } catch (error) {
         next(error)
      }
   }
   
}

module.exports = RoomController