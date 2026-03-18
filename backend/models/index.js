const mongoose = require('mongoose');

const EstagiarioSchema = new mongoose.Schema({
  nome: String,
  area: String,
  foto: String,
  bio: String,
  projetos: [{
    id: String,
    tipo: String,
    titulo: String,
    data: String,
    desc: String,
    arquivo: String,
    nomeArquivo: String,
    status: {
      type: String,
      default: 'Em andamento'
    },
    orientacoesProjeto: String
  }]
});

const Estagiario = mongoose.model('Estagiario', EstagiarioSchema);

module.exports = { Estagiario };