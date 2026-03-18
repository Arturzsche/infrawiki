import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Procedimentos() {
  const [procedimentos, setProcedimentos] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    // É aqui que o Front-end pede os dados para o Back-end!
    axios.get('http://localhost:5000/api/procedimentos')
      .then(response => setProcedimentos(response.data))
      .catch(error => console.error("Erro ao buscar:", error));
  }, []);

  const filtrados = procedimentos.filter(p => 
    p.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    p.categoria.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Procedimentos Técnicos</h1>
      
      <input 
        type="text" 
        placeholder="Buscar por nome ou categoria..." 
        className="w-full md:w-96 mb-8 p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtrados.map(proc => (
          <div key={proc._id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 py-1 px-3 rounded-full">
              {proc.categoria}
            </span>
            <h2 className="text-xl font-bold text-slate-800 mt-4 mb-2">{proc.titulo}</h2>
            <p className="text-slate-600 mb-4 line-clamp-2">{proc.descricao}</p>
            <div className="text-sm text-slate-500 font-medium">Ferramentas: {proc.ferramentas.join(', ')}</div>
          </div>
        ))}
      </div>
    </div>
  );
}