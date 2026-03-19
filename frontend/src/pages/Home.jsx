import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="animate-fade-in space-y-8 pb-10">
      
      <div className="bg-white p-10 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-shrink-0 text-blue-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-32 h-32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1v1H9V7zm5 0h1v1h-1V7zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1z" />
          </svg>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-4 tracking-tight uppercase">Seja Bem-vindo à InfraWiki</h1>
          <p className="text-slate-600 leading-relaxed text-lg text-justify">
            A InfraWiki é a base de conhecimento e portfólio centralizada do Setor de Manutenção Predial. 
            Esta plataforma foi desenvolvida para documentar projetos, registrar soluções de engenharia, 
            padronizar rotinas técnicas e consolidar o histórico de atividades da equipe, facilitando a consulta 
            e a gestão da infraestrutura institucional.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <Link to="/equipe" className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-slate-50 text-blue-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-50 group-hover:scale-105 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-3">Equipe e Portfólio</h2>
          <p className="text-sm text-slate-500">Acesso aos projetos, relatórios e documentações individuais dos colaboradores do setor.</p>
        </Link>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group flex flex-col items-center text-center cursor-pointer">
          <div className="w-20 h-20 bg-slate-50 text-slate-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-50 group-hover:scale-105 group-hover:text-blue-700 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-3">Normas e Manuais</h2>
          <p className="text-sm text-slate-500">Acervo digital de documentação técnica, normas regulamentadoras e manuais de procedimentos.</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group flex flex-col items-center text-center cursor-pointer">
          <div className="w-20 h-20 bg-slate-50 text-slate-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-50 group-hover:scale-105 group-hover:text-blue-700 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-3">Painel HelpDesk</h2>
          <p className="text-sm text-slate-500">Módulo de gestão, acompanhamento e triagem de solicitações e chamados de manutenção.</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group flex flex-col items-center text-center cursor-pointer">
          <div className="w-20 h-20 bg-slate-50 text-slate-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-50 group-hover:scale-105 group-hover:text-blue-700 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-3">Painel de Controle</h2>
          <p className="text-sm text-slate-500">Indicadores de desempenho, estatísticas do setor e visualização consolidada de dados operacionais.</p>
        </div>

      </div>
    </div>
  );
}