const express = require('express');
const router = express.Router();
const Produto = require('../models/produtos');
const mongoose = require('mongoose');

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: 'GET Request para /produtos'
    });
});

router.post('/', (req, res, next)=>{

    const produto = new Produto({
        _id: new mongoose.Types.ObjectId(),
        nome: req.body.nome,
        quantidade: req.body.quantidade,
        preco: req.body.preco
    });
    produto.save()
    .then(result => {
        res.status(201).json({
            message: 'POST Request para /produtos',
            produtoCriado: produto   
        });
    })
    .catch(err =>{
        res.status(500).json({
            error: err

        });
    });
    
});

//manipulando um unico produto //
router.get('/:produtoId', (req, res, next)=>{
    const id = req.params.produtoId;
    Produto.findById(id)
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error:err});
    })
    
});

//Deletando um unico produto //
router.delete('/:produtoId', (req, res, next)=>{
    const id = req.params.produtoId;
    Produto.findByIdAndDelete(id)
    .exec()
    .then(doc => {
        res.status(200).json({ message: "Product successfully deleted"});
    })
    .catch(err => {
        res.status(500).json({error:err});
    })
    
});

//Atualizando um unico produto //
router.put('/:produtoId', (req, res, next)=>{
    const id = req.params.produtoId;
    Produto.findByIdAndUpdate(id, req.body)
    .exec()
    .then(doc => {
        res.status(200).json({ message: "Product updated successfully"});
    })
    .catch(err => {
        res.status(500).json({error:err});
    })
    
});

module.exports = router;