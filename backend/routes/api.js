const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Estagiario, Usuario } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'chave_super_secreta_infrawiki';

router.post('/auth/registro', async (req, res) => {
  try {
    const { usuario, email, senha } = req.body;
    
    const usuarioExistente = await Usuario.findOne({ $or: [{ email }, { usuario }] });
    if (usuarioExistente) return res.status(400).json({ error: 'Email ou Usuário já cadastrado' });

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);
    
    const role = usuario === 'admin' ? 'admin' : 'user';

    const novoUsuario = new Usuario({ usuario, email, senha: senhaHash, role });
    await novoUsuario.save();

    const nomeFormatado = usuario.charAt(0).toUpperCase() + usuario.slice(1);

    const novoEstagiario = new Estagiario({
      usuarioId: novoUsuario._id.toString(),
      nome: nomeFormatado,
      area: 'Engenharia Civil',
      foto: `https://ui-avatars.com/api/?name=${encodeURIComponent(nomeFormatado)}&background=10B981&color=fff&size=256`,
      bio: "",
      projetos: []
    });
    await novoEstagiario.save();

    res.json({ message: 'Usuário criado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
});

router.post('/auth/login', async (req, res) => {
  try {
    const { usuario, senha } = req.body;
    const userDb = await Usuario.findOne({ usuario });
    if (!userDb) return res.status(400).json({ error: 'Credenciais inválidas' });

    const senhaValida = await bcrypt.compare(senha, userDb.senha);
    if (!senhaValida) return res.status(400).json({ error: 'Credenciais inválidas' });

    const token = jwt.sign({ id: userDb._id, role: userDb.role }, JWT_SECRET, { expiresIn: '1d' });
    
    const perfil = await Estagiario.findOne({ usuarioId: userDb._id.toString() });
    const perfilId = perfil ? perfil._id : null;

    res.json({ token, usuario: { id: userDb._id, usuario: userDb.usuario, email: userDb.email, perfilId, role: userDb.role } });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

router.get('/estagiarios', async (req, res) => {
  try {
    const estagiarios = await Estagiario.find();
    res.json(estagiarios);
  } catch (err) { res.status(500).json({ error: 'Erro ao buscar dados' }); }
});

router.get('/estagiarios/:id', async (req, res) => {
  try {
    const est = await Estagiario.findById(req.params.id);
    res.json(est);
  } catch (err) { res.status(404).json({ error: 'Não encontrado' }); }
});

router.put('/estagiarios/:id', async (req, res) => {
  try {
    const { nome, area, bio, foto, capa } = req.body;
    const atualizacao = { nome, area, bio };
    if (foto) atualizacao.foto = foto;
    if (capa) atualizacao.capa = capa;
    const est = await Estagiario.findByIdAndUpdate(req.params.id, atualizacao, { new: true });
    res.json(est);
  } catch (err) { res.status(500).json({ error: 'Erro ao editar' }); }
});

router.delete('/estagiarios/:id', async (req, res) => {
  try {
    const est = await Estagiario.findById(req.params.id);
    if (est && est.usuarioId) {
      await Usuario.findByIdAndDelete(est.usuarioId);
    }
    await Estagiario.findByIdAndDelete(req.params.id);
    res.json({ message: 'Removido completamente' });
  } catch (err) { res.status(500).json({ error: 'Erro ao excluir' }); }
});

router.post('/estagiarios/:id/projetos', async (req, res) => {
  try {
    const novoTrabalho = {
      id: Date.now().toString(),
      tipo: req.body.tipo,
      titulo: req.body.titulo,
      data: req.body.data,
      desc: req.body.desc,
      arquivo: req.body.arquivo,
      nomeArquivo: req.body.nomeArquivo,
      status: req.body.status || 'Em andamento',
      orientacoesProjeto: req.body.orientacoesProjeto || ''
    };
    const est = await Estagiario.findById(req.params.id);
    est.projetos.push(novoTrabalho);
    await est.save();
    res.json(est);
  } catch (err) { res.status(500).json({ error: 'Erro ao adicionar trabalho' }); }
});

router.put('/estagiarios/:id/projetos/:projetoId', async (req, res) => {
  try {
    const est = await Estagiario.findById(req.params.id);
    const idx = est.projetos.findIndex(p => p.id === req.params.projetoId);
    if (idx !== -1) {
      est.projetos[idx] = { ...est.projetos[idx], ...req.body };
      est.markModified('projetos');
      await est.save();
    }
    res.json(est);
  } catch (err) { res.status(500).json({ error: 'Erro ao editar trabalho' }); }
});

router.delete('/estagiarios/:id/projetos/:projetoId', async (req, res) => {
  try {
    const est = await Estagiario.findById(req.params.id);
    est.projetos = est.projetos.filter(p => p.id !== req.params.projetoId);
    await est.save();
    res.json(est);
  } catch (err) { res.status(500).json({ error: 'Erro ao excluir trabalho' }); }
});

module.exports = router;