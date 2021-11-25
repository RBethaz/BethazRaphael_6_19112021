const express = require('express');

const router = express.Router();

const Product = require('../models/Product');

router.post('/', (req, res, next) => {
    delete req.body._id;
    const product = new Product({
      ...req.body
    });
    product.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  });

router.put('/:id', (req, res, next) => {
Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

router.delete('/:id', (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });

router.get('/:id', (req, res, next) => {
Product.findOne({ _id: req.params.id })
    .then(product => res.status(200).json(product))
    .catch(error => res.status(404).json({ error }));
});

router.use('/', (req, res, next) => {
Product.find()
    .then(products => res.status(200).json(products))
    .catch(error => res.status(400).json({ error }));
});


module.exports = router;