const express = require('express');
const router = express.Router();
const { Estagiario } = require('../models');

router.get('/estagiarios', async (req, res) => {
  try {
    const estagiarios = await Estagiario.find();
    res.json(estagiarios);
  } catch (err) { 
    res.status(500).json({ error: 'Erro ao buscar dados' }); 
  }
});

router.post('/estagiarios', async (req, res) => {
  try {
    const novo = new Estagiario({
      nome: req.body.nome, 
      area: req.body.area,
      foto: `https://ui-avatars.com/api/?name=${encodeURIComponent(req.body.nome)}&background=10B981&color=fff&size=256`,
      bio: "", 
      projetos: []
    });
    await novo.save();
    res.json(novo);
  } catch (err) { 
    res.status(500).json({ error: 'Erro ao criar perfil' }); 
  }
});

router.get('/estagiarios/:id', async (req, res) => {
  try {
    const est = await Estagiario.findById(req.params.id);
    res.json(est);
  } catch (err) { 
    res.status(404).json({ error: 'Não encontrado' }); 
  }
});

router.put('/estagiarios/:id', async (req, res) => {
  try {
    const { nome, area, bio, foto } = req.body;
    const atualizacao = { nome, area, bio };
    if (foto) atualizacao.foto = foto;
    const est = await Estagiario.findByIdAndUpdate(req.params.id, atualizacao, { new: true });
    res.json(est);
  } catch (err) { 
    res.status(500).json({ error: 'Erro ao editar' }); 
  }
});

router.delete('/estagiarios/:id', async (req, res) => {
  try {
    await Estagiario.findByIdAndDelete(req.params.id);
    res.json({ message: 'Removido' });
  } catch (err) { 
    res.status(500).json({ error: 'Erro ao excluir' }); 
  }
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
  } catch (err) { 
    res.status(500).json({ error: 'Erro ao adicionar trabalho' }); 
  }
});

router.put('/estagiarios/:id/projetos/:projetoId', async (req, res) => {
  try {
    const est = await Estagiario.findById(req.params.id);
    const idx = est.projetos.findIndex(p => p.id === req.params.projetoId);
    
    if (idx !== -1) {
      est.projetos[idx].tipo = req.body.tipo !== undefined ? req.body.tipo : est.projetos[idx].tipo;
      est.projetos[idx].titulo = req.body.titulo !== undefined ? req.body.titulo : est.projetos[idx].titulo;
      est.projetos[idx].data = req.body.data !== undefined ? req.body.data : est.projetos[idx].data;
      est.projetos[idx].desc = req.body.desc !== undefined ? req.body.desc : est.projetos[idx].desc;
      est.projetos[idx].arquivo = req.body.arquivo !== undefined ? req.body.arquivo : est.projetos[idx].arquivo;
      est.projetos[idx].nomeArquivo = req.body.nomeArquivo !== undefined ? req.body.nomeArquivo : est.projetos[idx].nomeArquivo;
      est.projetos[idx].status = req.body.status !== undefined ? req.body.status : est.projetos[idx].status;
      est.projetos[idx].orientacoesProjeto = req.body.orientacoesProjeto !== undefined ? req.body.orientacoesProjeto : est.projetos[idx].orientacoesProjeto;
      
      est.markModified('projetos');
      await est.save();
    }
    res.json(est);
  } catch (err) { 
    res.status(500).json({ error: 'Erro ao editar trabalho' }); 
  }
});

router.delete('/estagiarios/:id/projetos/:projetoId', async (req, res) => {
  try {
    const est = await Estagiario.findById(req.params.id);
    est.projetos = est.projetos.filter(p => p.id !== req.params.projetoId);
    await est.save();
    res.json(est);
  } catch (err) { 
    res.status(500).json({ error: 'Erro ao excluir trabalho' }); 
  }
});

module.exports = router;