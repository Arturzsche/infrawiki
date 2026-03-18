// backend/seed.js
const mongoose = require('mongoose');
const { Procedimento } = require('./models'); // Puxa a estrutura do banco que criamos

// ⚠️ COLE AQUI O MESMO LINK QUE ESTÁ NO SEU SERVER.JS:
mongoose.connect('mongodb://admin:wiki12345@ac-kqitcbe-shard-00-00.rjphkuy.mongodb.net:27017,ac-kqitcbe-shard-00-01.rjphkuy.mongodb.net:27017,ac-kqitcbe-shard-00-02.rjphkuy.mongodb.net:27017/?ssl=true&replicaSet=atlas-7nguvd-shard-0&authSource=admin&appName=Cluster-Wiki-Manutencao')
  .then(() => console.log('Conectado ao MongoDB para inserir dados...'))
  .catch(err => console.error('Erro de conexão no seed:', err));

const seedProcedimentos = async () => {
  try {
    // 1. Limpa os procedimentos antigos para não duplicar dados caso você rode o script duas vezes
    await Procedimento.deleteMany({});
    
    // 2. Cria os novos dados de exemplo
    await Procedimento.create([
      {
        titulo: 'Reinício de Quadro Elétrico Desarmado',
        categoria: 'Elétrica',
        descricao: 'Passo a passo seguro para religar disjuntores que desarmaram.',
        quando_usar: 'Queda parcial de energia em blocos ou salas.',
        ferramentas: ['Luvas isolantes', 'Lanterna', 'Chave de fenda isolada'],
        passos: [
          'Isole a área e garanta que não há água no chão.',
          'Coloque os EPIs (Luvas).',
          'Abra o quadro e identifique o disjuntor na posição intermediária ou desligada.',
          'Mova a chave para "OFF" (baixo) completamente e depois para "ON" (cima).'
        ],
        cuidados: ['Nunca religue se houver cheiro de queimado.', 'Certifique-se de usar botas com solado de borracha.'],
        problemas_comuns: ['Disjuntor desarma imediatamente após religar (indica curto-circuito, chamar especialista).']
      },
      {
        titulo: 'Troca de Válvula de Descarga (Hydra)',
        categoria: 'Hidráulica',
        descricao: 'Substituição do reparo interno da válvula de parede.',
        quando_usar: 'Vazamento contínuo no vaso sanitário.',
        ferramentas: ['Chave de fenda', 'Chave grifo', 'Kit reparo Hydra'],
        passos: [
          'Feche o registro de água principal do banheiro.',
          'Remova a tampa da válvula com a chave de fenda.',
          'Solte a porca principal com a chave grifo.',
          'Substitua o anel de vedação e a mola.',
          'Remonte e abra o registro para testar.'
        ],
        cuidados: ['Cuidado para não espanar a rosca de latão.'],
        problemas_comuns: ['Vazamento continua (necessário trocar a sede da válvula).']
      }
    ]);

    console.log('🌱 Dados inseridos com sucesso na Nuvem!');
    process.exit(); // Desliga o script sozinho após terminar
    
  } catch (erro) {
    console.error('❌ Erro ao inserir dados:', erro);
    process.exit(1);
  }
};

// Executa a função
seedProcedimentos();