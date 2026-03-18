import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-slate-900 min-h-screen flex flex-col shadow-xl">
      <div className="p-6 flex flex-col items-center border-b border-slate-800 mb-6">
        <Link to="/" className="group flex flex-col items-center transition-transform hover:scale-105">
          <img 
            src="/logo-infrawiki.png" 
            alt="Logo InfraWiki" 
            className="w-32 h-auto drop-shadow-md mb-2 group-hover:drop-shadow-lg transition-all" 
          />
          <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase group-hover:text-slate-300 transition-colors text-center">
            Wiki - Manutenção Predial
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <Link 
          to="/" 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${location.pathname === '/' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
        >
          📊 Visão Geral
        </Link>

        <div className="pt-6 pb-2 px-4">
          <p className="text-xs font-black text-slate-500 tracking-widest uppercase">Colaboradores</p>
        </div>

        <Link 
          to="/equipe" 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${location.pathname.includes('/equipe') || location.pathname.includes('/estagiario') ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
        >
          👥 Estagiários
        </Link>
      </nav>
    </aside>
  );
}