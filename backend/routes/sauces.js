const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const saucesCtrl = require('../controllers/sauces');

router.get('/', auth, saucesCtrl.getAllSauces);
router.post('/', auth, saucesCtrl.createProduct);
router.get('/:id', auth, saucesCtrl.getOneProduct);
router.put('/:id', auth, saucesCtrl.modifyProduct);
router.delete('/:id', auth, saucesCtrl.deleteProduct);
//router.post('/:id/like', auth, saucesCtrl.addLike);

module.exports = router; 

module.exports = router;