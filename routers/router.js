const router = require('express').Router()
const {saveUserDetails, getUserDetails, updateUserDetails} = require('../controllers/UserController')

router.post('/user', saveUserDetails)
router.get('/user/:no_plate', getUserDetails)
router.patch('/user', updateUserDetails)


module.exports = router