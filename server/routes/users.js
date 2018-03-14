var express = require('express');
var router = express.Router();
const User = require('../controllers/users')
const Auth = require('../middleware/auth')

/* GET users listing. */
router.get('/signin',User.signIn)
router.get('/signup',User.signUp)
router.get('/',User.viewAll)
router.post('/',User.createAdmin)
router.put('/:id',User.update)
router.delete('/:id',Auth.admin,User.delete)

module.exports = router;
