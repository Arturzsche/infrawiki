import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Perfil() {
  const { id } = useParams();
  const [perfil, setPerfil] = useState(null);
  const meuPerfilId = localStorage.getItem('perfilId');
  const isOwner = meuPerfilId === id;

  const [isAddingWork, setIsAddingWork] = useState(false);
  const [isViewingWork, setIsViewingWork] = useState(false);
  const [workToView, setWorkToView] = useState(null);
  const [isEditingWork, setIsEditingWork] = useState(false);
  const [editWorkData, setEditWorkData] = useState({});
  const [isDeletingWork, setIsDeletingWork] = useState(false);
  const [workToDelete, setWorkToDelete] = useState(null);

  const [newWork, setNewWork] = useState({ 
    tipo: 'Relatório', titulo: '', data: new Date().toLocaleDateString('pt-BR'), desc: '', arquivo: '', nomeArquivo: '', status: 'Em andamento', orientacoesProjeto: ''
  });

  useEffect(() => {
    carregarPerfil();
  }, [id]);

  const carregarPerfil = () => {
    axios.get(`https://infrawiki-api.onrender.com/api/estagiarios/${id}`)
      .then(res => setPerfil(res.data))
      .catch(err => console.error(err));
  };

  const processarArquivo = (e, stateUpdater, currentState) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => stateUpdater({ ...currentState, arquivo: reader.result, nomeArquivo: file.name });
      reader.readAsDataURL(file);
    }
  };

  const salvarTrabalho = () => {
    if(!newWork.titulo) return alert("Preencha o título!");
    axios.post(`https://infrawiki-api.onrender.com/api/estagiarios/${id}/projetos`, newWork)
      .then(res => { 
        setPerfil(res.data); 
        setIsAddingWork(false); 
        setNewWork({ tipo: 'Relatório', titulo: '', data: new Date().toLocaleDateString('pt-BR'), desc: '', arquivo: '', nomeArquivo: '', status: 'Em andamento', orientacoesProjeto: '' });
      }).catch(() => alert("Erro ao salvar trabalho."));
  };

  const salvarEdicaoTrabalho = () => {
    if(!editWorkData.titulo) return alert("Preencha o título!");
    axios.put(`https://infrawiki-api.onrender.com/api/estagiarios/${id}/projetos/${editWorkData.id}`, editWorkData)
      .then(res => { setPerfil(res.data); setIsEditingWork(false); })
      .catch(() => alert("Erro ao editar trabalho."));
  };

  const confirmarExclusaoTrabalho = () => {
    axios.delete(`https://infrawiki-api.onrender.com/api/estagiarios/${id}/projetos/${workToDelete.id}`)
      .then(res => { setPerfil(res.data); setIsDeletingWork(false); setWorkToDelete(null); });
  };

  if (!perfil) return <div className="p-10 text-center text-slate-500 font-bold animate-pulse">Carregando dados...</div>;

  return (
    <div className="animate-fade-in pb-20 relative">
      <Link to="/equipe" className="text-blue-500 hover:text-blue-700 text-sm mb-6 inline-block">← Voltar para a Equipe</Link>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm mb-10 overflow-hidden">
        <div 
          className="w-full h-48 bg-blue-600 bg-cover bg-center"
          style={perfil.capa ? { backgroundImage: `url(${perfil.capa})` } : {}}
        ></div>
        <div className="px-8 pb-8 flex flex-col md:flex-row items-center md:items-start gap-6 relative -mt-16">
          <div className="flex flex-col items-center z-10">
            <img src={perfil.foto} className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md bg-white" alt="Avatar" />
          </div>
          <div className="flex-1 text-center md:text-left mt-2 md:mt-16">
            <h1 className="text-3xl font-black text-slate-800">{perfil.nome}</h1>
            <p className="text-blue-600 font-bold mb-3">{perfil.area}</p>
            <p className="text-slate-500 text-sm max-w-xl italic whitespace-pre-wrap">{perfil.bio || "Sem biografia."}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">📂 Acervo de Trabalhos</h2>
        {isOwner && (
          <button onClick={() => setIsAddingWork(true)} className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 shadow-sm transition">
            + Novo Trabalho
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {perfil.projetos?.map(proj => (
          <div key={proj.id} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition group flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${proj.tipo === 'Relatório' ? 'bg-emerald-100 text-emerald-700' : proj.tipo === 'Ideia' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                {proj.tipo}
              </span>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${proj.status === 'Finalizado' ? 'bg-green-500' : proj.status === 'Paralisado' ? 'bg-red-500' : 'bg-orange-500'}`} title={proj.status || 'Em andamento'}></span>
                <span className="text-xs text-slate-400 font-medium">{proj.data}</span>
              </div>
            </div>
            <h3 className="font-bold text-slate-800 text-lg mb-2">{proj.titulo}</h3>
            <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-1 whitespace-pre-wrap">{proj.desc}</p>
            
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <button onClick={() => { setWorkToView(proj); setIsViewingWork(true); }} className="text-sm font-bold text-blue-600 flex items-center gap-1 hover:text-blue-800">
                👁️ Detalhes
              </button>
              {isOwner && (
                <div className="flex gap-3">
                  <button onClick={() => { setEditWorkData(proj); setIsEditingWork(true); }} className="text-slate-400 hover:text-orange-500" title="Editar">✏️</button>
                  <button onClick={() => { setWorkToDelete(proj); setIsDeletingWork(true); }} className="text-slate-400 hover:text-red-500" title="Excluir">🗑️</button>
                </div>
              )}
            </div>
          </div>
        ))}
        {(!perfil.projetos || perfil.projetos.length === 0) && (
          <div className="col-span-full py-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
            Nenhum trabalho registrado.
          </div>
        )}
      </div>

      {isAddingWork && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-fade-in overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 text-xl">Novo Trabalho</h3>
              <button onClick={() => setIsAddingWork(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select className="w-full border border-slate-300 p-3 rounded-lg outline-none bg-white" value={newWork.tipo} onChange={e => setNewWork({...newWork, tipo: e.target.value})}>
                  <option>Relatório</option><option>Projeto</option><option>Ideia</option>
                </select>
                <select className="w-full border border-slate-300 p-3 rounded-lg outline-none bg-white" value={newWork.status} onChange={e => setNewWork({...newWork, status: e.target.value})}>
                  <option value="Em andamento">Em andamento</option>
                  <option value="Finalizado">Finalizado</option>
                  <option value="Paralisado">Paralisado</option>
                </select>
                <input type="text" className="w-full border border-slate-300 p-3 rounded-lg outline-none" value={newWork.data} onChange={e => setNewWork({...newWork, data: e.target.value})} />
              </div>
              <input placeholder="Título do Trabalho" className="w-full border border-slate-300 p-3 rounded-lg outline-none" value={newWork.titulo} onChange={e => setNewWork({...newWork, titulo: e.target.value})} />
              <textarea placeholder="Descrição..." rows="3" className="w-full border border-slate-300 p-3 rounded-lg outline-none" value={newWork.desc} onChange={e => setNewWork({...newWork, desc: e.target.value})} />
              {newWork.status === 'Paralisado' && (
                <div className="animate-fade-in mt-4">
                  <label className="block text-sm font-bold text-red-500 mb-1">Orientações de projeto (Motivo da paralisação)</label>
                  <textarea rows="2" className="w-full border border-red-300 text-red-800 placeholder-red-300 bg-red-50 p-3 rounded-lg outline-none" value={newWork.orientacoesProjeto} onChange={e => setNewWork({...newWork, orientacoesProjeto: e.target.value})} />
                </div>
              )}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Anexar Arquivo (Opcional)</label>
                <input type="file" onChange={(e) => processarArquivo(e, setNewWork, newWork)} className="w-full p-2 border border-slate-300 rounded-lg text-sm bg-slate-50" />
              </div>
            </div>
            <div className="p-6 bg-white flex justify-end gap-3 border-t border-slate-100">
              <button onClick={() => setIsAddingWork(false)} className="px-6 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition">Cancelar</button>
              <button onClick={salvarTrabalho} className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-sm hover:bg-blue-700 transition">Adicionar</button>
            </div>
          </div>
        </div>
      )}

      {isEditingWork && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-fade-in overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 text-xl">Editar Trabalho</h3>
              <button onClick={() => setIsEditingWork(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select className="w-full border border-slate-300 p-3 rounded-lg outline-none bg-white" value={editWorkData.tipo} onChange={e => setEditWorkData({...editWorkData, tipo: e.target.value})}>
                  <option>Relatório</option><option>Projeto</option><option>Ideia</option>
                </select>
                <select className="w-full border border-slate-300 p-3 rounded-lg outline-none bg-white" value={editWorkData.status} onChange={e => setEditWorkData({...editWorkData, status: e.target.value})}>
                  <option value="Em andamento">Em andamento</option>
                  <option value="Finalizado">Finalizado</option>
                  <option value="Paralisado">Paralisado</option>
                </select>
                <input type="text" className="w-full border border-slate-300 p-3 rounded-lg outline-none" value={editWorkData.data} onChange={e => setEditWorkData({...editWorkData, data: e.target.value})} />
              </div>
              <input className="w-full border border-slate-300 p-3 rounded-lg outline-none" value={editWorkData.titulo} onChange={e => setEditWorkData({...editWorkData, titulo: e.target.value})} />
              <textarea rows="3" className="w-full border border-slate-300 p-3 rounded-lg outline-none" value={editWorkData.desc} onChange={e => setEditWorkData({...editWorkData, desc: e.target.value})} />
              {editWorkData.status === 'Paralisado' && (
                <div className="animate-fade-in mt-4">
                  <label className="block text-sm font-bold text-red-500 mb-1">Orientações de projeto</label>
                  <textarea rows="2" className="w-full border border-red-300 text-red-800 placeholder-red-300 bg-red-50 p-3 rounded-lg outline-none" value={editWorkData.orientacoesProjeto || ''} onChange={e => setEditWorkData({...editWorkData, orientacoesProjeto: e.target.value})} />
                </div>
              )}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Substituir Arquivo (Opcional)</label>
                <input type="file" onChange={(e) => processarArquivo(e, setEditWorkData, editWorkData)} className="w-full p-2 border border-slate-300 rounded-lg text-sm bg-slate-50" />
                {editWorkData.nomeArquivo && <p className="text-xs text-slate-500 mt-1">Anexo atual: {editWorkData.nomeArquivo}</p>}
              </div>
            </div>
            <div className="p-6 bg-white flex justify-end gap-3 border-t border-slate-100">
              <button onClick={() => setIsEditingWork(false)} className="px-6 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition">Cancelar</button>
              <button onClick={salvarEdicaoTrabalho} className="px-6 py-2 bg-orange-500 text-white font-bold rounded-lg shadow-sm hover:bg-orange-600 transition">Atualizar</button>
            </div>
          </div>
        </div>
      )}

      {isViewingWork && workToView && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl animate-fade-in overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-start">
              <div>
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-slate-100 text-slate-600 mr-2">{workToView.tipo}</span>
                <span className="text-xs text-slate-400 font-medium">{workToView.data}</span>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`w-2 h-2 rounded-full ${workToView.status === 'Finalizado' ? 'bg-green-500' : workToView.status === 'Paralisado' ? 'bg-red-500' : 'bg-orange-500'}`}></span>
                  <span className="text-xs font-bold text-slate-500">{workToView.status || 'Em andamento'}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mt-3">{workToView.titulo}</h3>
              </div>
              <button onClick={() => setIsViewingWork(false)} className="text-slate-400 hover:text-slate-600 text-3xl">&times;</button>
            </div>
            <div className="p-6 max-h-96 overflow-y-auto">
              <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{workToView.desc || "Nenhuma descrição."}</p>
              {workToView.status === 'Paralisado' && workToView.orientacoesProjeto && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <h4 className="text-xs font-bold text-red-600 uppercase mb-2">Orientações do Projeto</h4>
                  <p className="text-sm text-red-800 whitespace-pre-wrap">{workToView.orientacoesProjeto}</p>
                </div>
              )}
            </div>
            <div className="p-6 bg-slate-50 flex justify-between items-center border-t border-slate-100">
              {workToView.arquivo ? (
                <a href={workToView.arquivo} download={workToView.nomeArquivo || "anexo"} className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 bg-blue-100 px-4 py-2 rounded-lg transition">
                  📎 Baixar {workToView.nomeArquivo || "Anexo"}
                </a>
              ) : <span className="text-sm text-slate-400 italic">Nenhum anexo disponível.</span>}
              <button onClick={() => setIsViewingWork(false)} className="px-6 py-2 font-bold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition">Fechar</button>
            </div>
          </div>
        </div>
      )}

      {isDeletingWork && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-2xl text-center max-w-sm shadow-2xl animate-fade-in">
            <div className="text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Excluir trabalho?</h3>
            <p className="text-slate-500 text-sm mb-8">Esta ação removerá permanentemente o trabalho.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setIsDeletingWork(false)} className="px-6 py-2 font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition">Cancelar</button>
              <button onClick={confirmarExclusaoTrabalho} className="px-6 py-2 font-bold text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-sm transition">Excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}