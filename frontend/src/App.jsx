import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Equipe from './pages/Equipe';
import Perfil from './pages/Perfil';
import Login from './pages/Login';

const RotaProtegida = ({ children }) => {
  const auth = localStorage.getItem('token');
  return auth ? children : <Navigate to="/login" />;
};

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const fazerLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-xl">
        <div className="p-6 flex flex-col items-center border-b border-slate-800 mb-2">
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
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <Link to="/" className="flex items-center p-3 rounded-lg hover:bg-slate-800 hover:text-blue-400 transition-all font-medium">
            📊 Visão Geral
          </Link>
          <div className="pt-4 pb-2 px-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
            Colaboradores
          </div>
          <Link to="/equipe" className="flex items-center p-3 rounded-lg hover:bg-slate-800 hover:text-blue-400 transition-all font-medium">
            👥 Estagiários
          </Link>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="bg-white h-16 border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
          <span className="font-semibold text-slate-700">Setor de Manutenção Predial</span>

          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center hover:ring-4 ring-blue-100 transition-all"
            >
              AE
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden z-50 animate-fade-in text-white">
                <div className="p-6 flex flex-col items-center border-b border-slate-700 bg-slate-900">
                  <div className="w-20 h-20 rounded-full bg-blue-600 text-white text-3xl font-bold flex items-center justify-center mb-4 shadow-inner">
                    AE
                  </div>
                  <h3 className="font-bold text-lg">Artur Eduardo</h3>
                  <p className="text-slate-400 text-sm">arturedu22@gmail.com</p>
                </div>
                <div className="p-2 flex flex-col bg-slate-800">
                  <button className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white rounded-xl transition-colors">
                    ⚙️ Configurações da Conta
                  </button>
                  <button className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white rounded-xl transition-colors">
                    🔑 Gerenciar Senhas
                  </button>
                  <button className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white rounded-xl transition-colors">
                    👤 Perfil do Colaborador
                  </button>
                  <div className="h-px bg-slate-700 my-2"></div>
                  <button 
                    onClick={fazerLogout}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-400 hover:bg-slate-700 hover:text-red-300 rounded-xl transition-colors"
                  >
                    🚪 Finalizar Sessão
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<RotaProtegida><DashboardLayout><Home /></DashboardLayout></RotaProtegida>} />
        <Route path="/equipe" element={<RotaProtegida><DashboardLayout><Equipe /></DashboardLayout></RotaProtegida>} />
        <Route path="/estagiario/:id" element={<RotaProtegida><DashboardLayout><Perfil /></DashboardLayout></RotaProtegida>} />
      </Routes>
    </Router>
  );
}

export default App;