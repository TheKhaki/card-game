const HistoryController = require('../controllers/historyController')
const UserController = require('../controllers/userController')
const {authentication} = require('../middlewares/auth')

const router = require('express').Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)
router.post('/history', HistoryController.addHistory)
router.get('/history', HistoryController.historyList)


module.exports = router