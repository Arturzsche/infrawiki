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
    if (window.confirm(`ATENÇÃO DEUS!\n\nTem certeza que deseja APAGAR COMPLETAMENTE o usuário ${nome}? Isso excluirá a conta de login e todos os projetos dele do sistema.`)) {
      axios.delete(`https://infrawiki-api.onrender.com/api/estagiarios/${id}`)
        .then(() => {
          alert('Usuário obliterado com sucesso.');
          carregarUsuarios();
        })
        .catch(() => alert('Erro ao excluir usuário.'));
    }
  };

  if (loading) return <div className="p-8 text-center animate-pulse font-bold text-slate-500">Acessando mainframe...</div>;

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-red-600 flex items-center gap-3">
            🛡️ Painel de Controle Admin
          </h1>
          <p className="text-slate-500 font-medium mt-1">Gerenciamento global de usuários e sistema.</p>
        </div>
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-black text-sm">
          Acesso Nível Deus
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <h2 className="font-bold text-slate-800 text-lg">Usuários Cadastrados ({usuarios.length})</h2>
        </div>
        
        <div className="divide-y divide-slate-100">
          {usuarios.map(user => (
            <div key={user._id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <img src={user.foto} alt="Avatar" className="w-12 h-12 rounded-full border border-slate-200 object-cover" />
                <div>
                  <h3 className="font-bold text-slate-800">{user.nome}</h3>
                  <p className="text-xs text-slate-500 font-medium">{user.area} • {user.projetos?.length || 0} trabalhos</p>
                </div>
              </div>
              <button 
                onClick={() => deletarUsuario(user._id, user.nome)}
                className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-600 hover:text-white transition-all shadow-sm"
              >
                Excluir Conta
              </button>
            </div>
          ))}
          {usuarios.length === 0 && <div className="p-8 text-center text-slate-500 font-bold">Nenhum usuário encontrado.</div>}
        </div>
      </div>
    </div>
  );
}