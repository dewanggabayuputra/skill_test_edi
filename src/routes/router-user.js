const router = require('express').Router();
const userController = require('../controllers').user;
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isAdmin, userController.index);
router.get('/edit/(:id)', verifyUser.isAdmin, userController.edit);
// router.get('/update/(:id)', verifyUser.isLogin, userController.update);
router.get('/delete/(:id)', verifyUser.isAdmin, userController.delete);


module.exports = router;