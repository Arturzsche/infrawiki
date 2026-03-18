const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
app.use(cors());

// O SEGREDO ESTÁ AQUI: Aumentamos o limite para 50 MegaBytes!
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Substitua esta string pela sua URL real do MongoDB Atlas!!!
mongoose.connect('mongodb://admin:wiki12345@ac-kqitcbe-shard-00-00.rjphkuy.mongodb.net:27017,ac-kqitcbe-shard-00-01.rjphkuy.mongodb.net:27017,ac-kqitcbe-shard-00-02.rjphkuy.mongodb.net:27017/?ssl=true&replicaSet=atlas-7nguvd-shard-0&authSource=admin&appName=Cluster-Wiki-Manutencao')
  .then(() => console.log('✅ Conectado ao MongoDB na Nuvem!'))
  .catch(err => console.error('Erro no MongoDB:', err));

app.use('/api', apiRoutes);

app.listen(5000, () => console.log('🚀 Servidor rodando na porta 5000'));