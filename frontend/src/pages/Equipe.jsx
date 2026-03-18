import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Equipe() {
  const [estagiarios, setEstagiarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAdding, setIsAdding] = useState(false);
  // Agora o estado inicial já vem com a primeira engenharia selecionada por padrão
  const [novoMembro, setNovoMembro] = useState({ nome: '', area: 'Engenharia Civil' });

  const [isDeleting, setIsDeleting] = useState(false);
  const [membroParaRemover, setMembroParaRemover] = useState(null);

  useEffect(() => {
    // Atenção: Lembre-se de trocar localhost pelo seu IP caso esteja testando no celular!
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

  const salvarNovoMembro = () => {
    if (!novoMembro.nome) {
        alert("Por favor, preencha o nome do estagiário.");
        return;
    }

    axios.post('https://infrawiki-api.onrender.com/api/estagiarios', novoMembro)
      .then(response => {
        setEstagiarios([...estagiarios, response.data]);
        setIsAdding(false);
        // Reseta o formulário voltando para a opção padrão
        setNovoMembro({ nome: '', area: 'Engenharia Civil' });
      })
      .catch(error => console.error("Erro ao adicionar estagiário:", error));
  };

  const confirmarRemocao = (estagiario) => {
    setMembroParaRemover(estagiario);
    setIsDeleting(true);
  };

  const removerMembro = () => {
    axios.delete(`https://infrawiki-api.onrender.com/api/estagiarios/${membroParaRemover._id}`)
      .then(() => {
        setEstagiarios(estagiarios.filter(est => est._id !== membroParaRemover._id));
        setIsDeleting(false);
        setMembroParaRemover(null);
      })
      .catch(error => alert("Erro ao remover estagiário."));
  };

  if (loading) return <div className="p-8 text-center text-slate-500 font-bold animate-pulse">Buscando equipe...</div>;

  return (
    <div className="animate-fade-in relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Nossa Equipe</h1>
          <p className="text-slate-500">Estagiários do Setor de Manutenção Predial.</p>
        </div>
        <button onClick={() => setIsAdding(true)} className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-slate-800 transition shadow-sm z-10">
          + Novo Estagiário
        </button>
      </div>

{/* GRID DE ESTAGIÁRIOS OU MENSAGEM VAZIA */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {estagiarios.length > 0 ? (
          estagiarios.map(est => (
            <div key={est._id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center hover:shadow-lg transition flex flex-col items-center relative group">
              
              <button 
                type="button"
                onClick={() => confirmarRemocao(est)}
                className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all font-bold text-2xl z-20 cursor-pointer"
              >
                &times;
              </button>

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
          /* MENSAGEM DE EQUIPE VAZIA */
          <div className="col-span-full py-20 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-lg font-bold text-slate-700 mb-2">Nenhum perfil cadastrado</h3>
            <p className="text-slate-500 text-sm">Clique em "+ Novo Estagiário" para adicionar o primeiro membro à equipe.</p>
          </div>
        )}

      </div>

      {/* MODAL ADICIONAR ESTAGIÁRIO */}
      {isAdding && (
         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-fade-in">
                <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-slate-800">Cadastrar Perfil</h3>
                    <button onClick={() => setIsAdding(false)} className="text-slate-400 text-2xl">&times;</button>
                </div>
                <div className="p-6 space-y-4">
                    <input 
                      type="text" 
                      placeholder="Nome Completo" 
                      value={novoMembro.nome} 
                      onChange={(e) => setNovoMembro({...novoMembro, nome: e.target.value})} 
                      className="w-full p-3 border rounded-lg outline-none" 
                    />
                    
                    {/* AQUI ESTÁ A LISTA DE ÁREAS ATUALIZADA */}
                    <select 
                      value={novoMembro.area} 
                      onChange={(e) => setNovoMembro({...novoMembro, area: e.target.value})} 
                      className="w-full p-3 border rounded-lg outline-none bg-white text-slate-700"
                    >
                      <option value="Engenharia Civil">Engenharia Civil</option>
                      <option value="Engenharia da Computação">Engenharia da Computação</option>
                      <option value="Engenharia Elétrica">Engenharia Elétrica</option>
                      <option value="Engenharia Mecânica">Engenharia Mecânica</option>
                    </select>

                </div>
                <div className="p-6 border-t bg-slate-50 flex justify-end gap-3">
                    <button onClick={() => setIsAdding(false)} className="px-5 py-2 font-bold text-slate-600">Cancelar</button>
                    <button onClick={salvarNovoMembro} className="px-5 py-2 font-bold bg-slate-900 text-white rounded-lg">Cadastrar</button>
                </div>
            </div>
         </div>
      )}

      {/* MODAL EXCLUIR */}
      {isDeleting && membroParaRemover && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center animate-fade-in">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">⚠️</div>
            <h3 className="text-xl font-bold mb-2">Remover Perfil?</h3>
            <p className="text-slate-500 mb-6 text-sm">Tem certeza que deseja remover <b>{membroParaRemover.nome}</b>?</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setIsDeleting(false)} className="px-5 py-2 font-bold text-slate-600 bg-slate-100 rounded-lg cursor-pointer">Cancelar</button>
              <button onClick={removerMembro} className="px-5 py-2 font-bold bg-red-600 text-white rounded-lg shadow-sm cursor-pointer z-50">Sim, Remover</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}