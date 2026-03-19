import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import Equipe from './pages/Equipe';
import Perfil from './pages/Perfil';
import Login from './pages/Login';
import MeuPerfil from './pages/MeuPerfil';
import AdminPanel from './pages/AdminPanel';

const RotaProtegida = ({ children }) => {
  const auth = localStorage.getItem('token');
  return auth ? children : <Navigate to="/login" />;
};

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [emailUsuario, setEmailUsuario] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [fotoUsuario, setFotoUsuario] = useState('');
  const [iniciais, setIniciais] = useState('');
  const [dataAtual, setDataAtual] = useState('');
  const dropdownRef = useRef(null);
  
  const userRole = localStorage.getItem('role');

  useEffect(() => {
    const formatarData = () => {
      const data = new Date();
      const dias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
      const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
      return `${dias[data.getDay()]}, ${data.getDate()} de ${meses[data.getMonth()]} de ${data.getFullYear()}`;
    };
    setDataAtual(formatarData());

    const emailSalvo = localStorage.getItem('usuarioEmail') || '';
    const userLogado = localStorage.getItem('usuarioLogado') || 'Usuário';
    const perfilId = localStorage.getItem('perfilId');
    
    setEmailUsuario(emailSalvo);

    if (perfilId && perfilId !== 'null' && perfilId !== 'undefined') {
      axios.get(`https://infrawiki-api.onrender.com/api/estagiarios/${perfilId}`)
        .then(res => {
          setNomeUsuario(res.data.nome);
          setFotoUsuario(res.data.foto);
          setIniciais(res.data.nome.substring(0, 2).toUpperCase());
        })
        .catch(() => {
          setNomeUsuario(userLogado);
          setIniciais(userLogado.substring(0, 2).toUpperCase());
        });
    } else {
      setNomeUsuario(userLogado);
      setIniciais(userLogado.substring(0, 2).toUpperCase());
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const fazerLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-screen bg-slate-100 text-slate-900 font-sans overflow-hidden">
      
      <header className="bg-gradient-to-r from-[#172554] via-[#111827] to-[#111827] h-20 flex items-center justify-between px-8 border-b border-slate-800 flex-shrink-0 z-20 relative shadow-xl">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/logo-infrawiki.png" 
              alt="Logo InfraWiki" 
              className="h-12 w-auto object-contain bg-white px-3 py-1.5 rounded-xl shadow-inner border border-slate-300" 
            />
            <span className="text-xl font-black text-white tracking-tight ml-2">Infra<span className="text-slate-500">Wiki</span></span>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right hidden md:block">
            <p className="text-base font-bold text-white capitalize">{nomeUsuario}</p>
            <p className="text-sm text-slate-400 font-medium">{userRole === 'admin' ? 'Administrador do Sistema' : 'Colaborador Técnico'}</p>
          </div>
          
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-11 h-11 rounded-full text-white font-bold flex items-center justify-center hover:ring-4 transition-all uppercase overflow-hidden bg-blue-600 ring-slate-800 shadow-lg border-2 border-slate-700"
            >
              {fotoUsuario ? <img src={fotoUsuario} alt="Avatar do Usuário" className="w-full h-full object-cover" /> : iniciais}
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-fade-in text-slate-800">
                <div className="p-5 flex flex-col items-center border-b border-slate-100 bg-slate-50">
                  <div className="w-16 h-16 rounded-full text-white text-2xl font-bold flex items-center justify-center mb-3 uppercase overflow-hidden bg-blue-600 shadow-inner">
                    {fotoUsuario ? <img src={fotoUsuario} alt="Avatar" className="w-full h-full object-cover" /> : iniciais}
                  </div>
                  <h3 className="font-bold text-base capitalize flex items-center gap-2 text-slate-800">
                    {nomeUsuario} {userRole === 'admin' && <span className="text-[10px] bg-slate-800 text-white px-2 py-0.5 rounded tracking-wide uppercase">Admin</span>}
                  </h3>
                  <p className="text-slate-500 text-sm mt-1">{emailUsuario}</p>
                </div>
                <div className="p-2 flex flex-col bg-white space-y-1">
                  <Link to="/meu-perfil" onClick={() => setIsProfileOpen(false)} className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2">
                    Configurações do Perfil
                  </Link>
                  <div className="h-px bg-slate-100 my-1"></div>
                  <button onClick={fazerLogout} className="text-left px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2">
                    Encerrar Sessão
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="bg-white text-slate-600 text-[13px] md:text-sm font-medium px-8 py-3 flex justify-between items-center flex-shrink-0 z-10 shadow-sm border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Ambiente Restrito</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-800 font-semibold tracking-tight">Setor de Manutenção Predial | TCE-GO</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden sm:block">Olá, <span className="text-blue-800 font-bold">{nomeUsuario}</span></span>
          <span className="text-slate-500 font-medium">{dataAtual}</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-[#111827] text-slate-400 flex flex-col border-r border-slate-800 z-0 shadow-inner">
          <nav className="flex-1 py-6 flex flex-col gap-1 px-3">
            <Link to="/" className="px-4 py-3 text-sm font-medium hover:bg-slate-800/60 hover:text-white rounded-lg transition-colors flex items-center gap-2">
              📊 Visão Geral
            </Link>
            
            <div className="px-4 py-2 text-xs font-bold text-slate-600 uppercase tracking-widest mt-5 mb-1">
              Colaboradores
            </div>
            <Link to="/equipe" className="px-4 py-3 text-sm font-medium hover:bg-slate-800/60 hover:text-white rounded-lg transition-colors flex items-center gap-2">
              👥 Equipe e Portfólio
            </Link>
            
            {userRole === 'admin' && (
              <>
                <div className="px-4 py-2 text-xs font-bold text-slate-600 uppercase tracking-widest mt-6 mb-1">
                  Gestão do Sistema
                </div>
                <Link to="/admin" className="px-4 py-3 text-sm font-medium bg-slate-800/30 text-slate-200 hover:bg-slate-800/60 hover:text-white rounded-lg transition-colors border border-slate-700 flex items-center gap-2">
                  🔒 Painel de Administração
                </Link>
              </>
            )}
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto bg-slate-100 p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      
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
        <Route path="/meu-perfil" element={<RotaProtegida><DashboardLayout><MeuPerfil /></DashboardLayout></RotaProtegida>} />
        <Route path="/admin" element={<RotaProtegida><DashboardLayout><AdminPanel /></DashboardLayout></RotaProtegida>} />
      </Routes>
    </Router>
  );
}

export default App;