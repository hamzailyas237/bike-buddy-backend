const router = require('express').Router()
const {saveUserDetails, getUserDetails} = require('../controllers/UserController')

router.post('/user', saveUserDetails)
router.get('/user/:no_plate', getUserDetails)


module.exports = router