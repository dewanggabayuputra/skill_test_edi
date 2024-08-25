const router = require('express').Router();
const biodataController = require('../controllers').biodata;
const { jwtAuth } = require("../middleware");
const verifyUser = require('../configs/verify');

router.get('/', [verifyUser.isAdmin], biodataController.index);
router.post('/getAll', jwtAuth.verifyToken, biodataController.getAll);
router.get('/create', jwtAuth.verifyToken, biodataController.create);
router.post('/store', jwtAuth.verifyToken, biodataController.store);
router.get('/view/(:id)', jwtAuth.verifyToken, biodataController.view);
router.get('/edit/(:id)', jwtAuth.verifyToken, biodataController.edit);
router.post('/update/(:id)', jwtAuth.verifyToken, biodataController.update);

router.delete('/delete/(:id)', [verifyUser.isAdmin], biodataController.delete);


module.exports = router;