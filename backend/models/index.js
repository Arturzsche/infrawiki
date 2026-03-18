const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true }
});

const EstagiarioSchema = new mongoose.Schema({
  usuarioId: String,
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

const Usuario = mongoose.model('Usuario', UsuarioSchema);
const Estagiario = mongoose.model('Estagiario', EstagiarioSchema);

module.exports = { Usuario, Estagiario };