import { useState } from 'react';

export default function Manuais() {
  const [termoBusca, setTermoBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');

  // Dados de exemplo simulando o banco de dados
  const documentos = [
    { id: 1, titulo: 'NBR 5674 - Manutenção de Edificações', categoria: 'Normas ABNT', tipo: 'PDF', tamanho: '2.4 MB', data: '15/01/2026' },
    { id: 2, titulo: 'NR-10 - Segurança em Instalações Elétricas', categoria: 'Segurança', tipo: 'PDF', tamanho: '1.8 MB', data: '22/02/2026' },
    { id: 3, titulo: 'Guia de Padronização de Pranchas e CTB - AutoCAD', categoria: 'POPs', tipo: 'PDF', tamanho: '5.1 MB', data: '10/03/2026' },
    { id: 4, titulo: 'Manual Chiller Carrier 30XW', categoria: 'Equipamentos', tipo: 'PDF', tamanho: '15 MB', data: '05/11/2025' },
    { id: 5, titulo: 'Plano de Evacuação e Combate a Incêndio (PPCI)', categoria: 'Segurança', tipo: 'PDF', tamanho: '8.2 MB', data: '12/12/2025' },
    { id: 6, titulo: 'POP 001 - Vistoria Semanal de Bombas de Recalque', categoria: 'POPs', tipo: 'DOCX', tamanho: '500 KB', data: '01/03/2026' },
    { id: 7, titulo: 'Resumo: Nova Lei de Licitações e Parcerias (Admin. Pública)', categoria: 'Legislação', tipo: 'PDF', tamanho: '1.2 MB', data: '18/03/2026' },
    { id: 8, titulo: 'Mapa de Ramais e Contatos Internos do TCE-GO', categoria: 'Integração', tipo: 'XLSX', tamanho: '150 KB', data: '19/03/2026' },
  ];

  const categorias = ['Todas', 'Normas ABNT', 'POPs', 'Equipamentos', 'Segurança', 'Legislação', 'Integração'];

  // Lógica inteligente de filtro
  const documentosFiltrados = documentos.filter(doc => {
    const bateBusca = doc.titulo.toLowerCase().includes(termoBusca.toLowerCase());
    const bateCategoria = categoriaAtiva === 'Todas' || doc.categoria === categoriaAtiva;
    return bateBusca && bateCategoria;
  });

  return (
    <div className="animate-fade-in">
      
      {/* Cabeçalho da Página */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Normas e Manuais</h1>
        <p className="text-slate-500 mt-2 text-lg">Acervo digital de documentação técnica, normas regulamentadoras e procedimentos do setor.</p>
      </div>

      {/* Barra de Pesquisa e Filtros */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8 space-y-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#5c85ad] focus:bg-white transition-all text-lg"
            placeholder="Buscar por norma, equipamento, palavra-chave..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoriaAtiva(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                categoriaAtiva === cat 
                  ? 'bg-[#284666] text-white shadow-md' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Documentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documentosFiltrados.map(doc => (
          <div key={doc.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-[#5c85ad] hover:shadow-md transition-all group flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="bg-blue-50 text-[#284666] text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                  {doc.categoria}
                </span>
                <span className="text-slate-400 font-bold text-xs bg-slate-100 px-2 py-1 rounded">
                  {doc.tipo}
                </span>
              </div>
              <h3 className="font-bold text-slate-800 text-lg leading-tight mb-2 group-hover:text-[#5c85ad] transition-colors">
                {doc.titulo}
              </h3>
            </div>
            
            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
              <div className="text-xs text-slate-500 font-medium">
                {doc.tamanho} • Atualizado em {doc.data}
              </div>
              <button className="text-[#5c85ad] hover:text-[#284666] bg-slate-50 hover:bg-slate-100 p-2 rounded-lg transition-colors" title="Baixar Documento">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Estado Vazio (Nenhum resultado) */}
      {documentosFiltrados.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-bold text-slate-600">Nenhum documento encontrado</h3>
          <p className="text-slate-500 mt-2">Tente buscar por outro termo ou mude a categoria.</p>
        </div>
      )}

    </div>
  );
}