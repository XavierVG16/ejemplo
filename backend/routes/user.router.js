const {Router}= require('express');
const router = Router();
const user = require('../controllers/user.controller');
router.post('/up', user.signup);
router.post('/in', user.signin)
module.exports = router;