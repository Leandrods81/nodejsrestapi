const mongoose = require('mongoose');

const produtosSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    nome: String,
    quantidade: Number,
    preco: Number
});

module.exports = mongoose.model('Produto', produtosSchema);