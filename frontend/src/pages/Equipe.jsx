import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Equipe() {
  const [estagiarios, setEstagiarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://infrawiki-api.onrender.com/api/estagiarios')
      .then(response => {
        setEstagiarios(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar a equipe:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500 font-bold animate-pulse">Buscando equipe...</div>;

  return (
    <div className="animate-fade-in relative">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800">Nossa Equipe</h1>
        <p className="text-slate-500">Estagiários do Setor de Manutenção Predial.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {estagiarios.length > 0 ? (
          estagiarios.map(est => (
            <div key={est._id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center hover:shadow-lg transition flex flex-col items-center relative group">
              <img 
                src={est.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(est.nome)}&background=0D8ABC&color=fff&size=256`} 
                alt={est.nome} 
                className="w-24 h-24 rounded-full mb-4 shadow-sm border-4 border-slate-50 object-cover bg-slate-100" 
              />
              <h2 className="text-xl font-bold text-slate-800">{est.nome}</h2>
              <p className="text-sm font-semibold text-blue-600 mb-4">{est.area}</p>
              <div className="h-10 mb-6 flex items-center justify-center px-4">
                 <p className="text-xs text-slate-400 italic line-clamp-2">{est.bio || "Perfil em atualização."}</p>
              </div>
              <Link to={`/estagiario/${est._id}`} className="mt-auto w-full bg-slate-50 text-slate-700 font-bold py-2 rounded-lg border border-slate-200 hover:bg-blue-600 hover:text-white transition-all shadow-sm z-10">
                Acessar Portfólio
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-lg font-bold text-slate-700 mb-2">Nenhum perfil cadastrado</h3>
            <p className="text-slate-500 text-sm">Os perfis aparecerão aqui automaticamente quando novos usuários se cadastrarem.</p>
          </div>
        )}
      </div>
    </div>
  );
}