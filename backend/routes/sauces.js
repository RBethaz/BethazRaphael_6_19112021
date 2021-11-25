const express = require('express');

const router = express.Router();

const saucesCtrl = require('../controllers/sauces');

router.get('/', saucesCtrl.getAllSauces);
router.post('/', saucesCtrl.createProduct);
router.get('/:id', saucesCtrl.getOneProduct);
router.put('/:id', saucesCtrl.modifyProduct);
router.delete('/:id', saucesCtrl.deleteProduct);
//router.post('/:id/like', saucesCtrl.addLike);

module.exports = router; 

module.exports = router;