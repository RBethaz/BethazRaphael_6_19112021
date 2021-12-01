const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const saucesCtrl = require('../controllers/sauces');

router.post('/', auth, multer, saucesCtrl.createSauce);
router.post("/:id/like", auth, saucesCtrl.likeDislikeSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.get('/', auth, saucesCtrl.getAllSauces);
//router.post('/:id/like', auth, saucesCtrl.addLike);

module.exports = router; 

module.exports = router;