const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const saucesCtrl = require('../controllers/sauces');

router.post('/', auth, multer, saucesCtrl.createProduct);
router.put('/:id', auth, multer, saucesCtrl.modifyProduct);
router.delete('/:id', auth, saucesCtrl.deleteProduct);
router.get('/:id', auth, saucesCtrl.getOneProduct);
router.get('/', auth, saucesCtrl.getAllSauces);
//router.post('/:id/like', auth, saucesCtrl.addLike);

module.exports = router; 

module.exports = router;