import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminPanel() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = () => {
    axios.get('https://infrawiki-api.onrender.com/api/estagiarios')
      .then(res => { setUsuarios(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  const deletarUsuario = (id, nome) => {
    if (window.confirm(`Atenção: Ação irreversível.\n\nTem certeza de que deseja excluir permanentemente o usuário ${nome}? Esta operação removerá as credenciais de acesso e todos os registros vinculados a este colaborador no sistema.`)) {
      axios.delete(`https://infrawiki-api.onrender.com/api/estagiarios/${id}`)
        .then(() => {
          alert('Credenciais e registros removidos com sucesso.');
          carregarUsuarios();
        })
        .catch(() => alert('Erro na comunicação com o servidor ao excluir usuário.'));
    }
  };

  if (loading) return <div className="p-8 text-center animate-pulse font-bold text-slate-500">Carregando painel de administração...</div>;

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
            🔒 Painel de Administração
          </h1>
          <p className="text-slate-500 font-medium mt-1">Gerenciamento de credenciais e permissões do sistema.</p>
        </div>
        <div className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm">
          Perfil Administrador
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <h2 className="font-bold text-slate-800 text-lg">Colaboradores Cadastrados ({usuarios.length})</h2>
        </div>
        
        <div className="divide-y divide-slate-100">
          {usuarios.map(user => (
            <div key={user._id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <img src={user.foto} alt="Avatar" className="w-12 h-12 rounded-full border border-slate-200 object-cover" />
                <div>
                  <h3 className="font-bold text-slate-800">{user.nome}</h3>
                  <p className="text-xs text-slate-500 font-medium">{user.area} • {user.projetos?.length || 0} registros</p>
                </div>
              </div>
              <button 
                onClick={() => deletarUsuario(user._id, user.nome)}
                className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-600 hover:text-white transition-all shadow-sm"
              >
                Remover Acesso
              </button>
            </div>
          ))}
          {usuarios.length === 0 && <div className="p-8 text-center text-slate-500 font-bold">Nenhum registro encontrado no banco de dados.</div>}
        </div>
      </div>
    </div>
  );
}