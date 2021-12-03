const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const saucesCtrl = require('../controllers/sauces');
const multerConfig = require('../middleware/multer-config');

router.post('/', auth, multerConfig, saucesCtrl.createSauce);
router.post("/:id/like", auth, saucesCtrl.likeDislikeSauce);
router.put('/:id', auth, multerConfig, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.get('/', auth, saucesCtrl.getAllSauces);
//router.post('/:id/like', auth, saucesCtrl.addLike);

module.exports = router; 

module.exports = router;