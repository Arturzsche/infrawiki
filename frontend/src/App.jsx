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
      const dias = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
      const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
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
      
      <header className="bg-gradient-to-r from-slate-100 to-slate-200 h-24 flex items-center justify-between px-8 border-b border-slate-300 flex-shrink-0">
        <div className="flex items-center gap-5">
          <div className="flex flex-col w-10 h-14 justify-between">
            <div className="w-full h-[26px] bg-[#284666]"></div>
            <div className="w-full h-[26px] bg-[#5c85ad]"></div>
          </div>
          <span className="text-[2.5rem] font-light text-[#284666] tracking-wider">
            INFRA<span className="font-bold">WIKI</span>
          </span>
        </div>

        <div className="flex items-center gap-8">
          <img 
            src="/logo-infrawiki.png" 
            alt="Logo Institucional" 
            className="h-16 w-auto object-contain mix-blend-multiply opacity-90" 
          />
          
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-11 h-11 rounded-full text-white font-bold flex items-center justify-center hover:ring-4 transition-all uppercase overflow-hidden bg-[#284666] ring-[#5c85ad]/30 shadow-sm"
            >
              {fotoUsuario ? <img src={fotoUsuario} alt="Avatar do Usuário" className="w-full h-full object-cover" /> : iniciais}
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50 animate-fade-in text-slate-800">
                <div className="p-5 flex flex-col items-center border-b border-slate-100 bg-slate-50">
                  <div className="w-16 h-16 rounded-full text-white text-2xl font-bold flex items-center justify-center mb-3 uppercase overflow-hidden bg-[#284666]">
                    {fotoUsuario ? <img src={fotoUsuario} alt="Avatar" className="w-full h-full object-cover" /> : iniciais}
                  </div>
                  <h3 className="font-bold text-sm capitalize flex items-center gap-2">
                    {nomeUsuario} {userRole === 'admin' && <span className="text-[10px] bg-[#284666] text-white px-2 py-0.5 rounded uppercase tracking-wider">Admin</span>}
                  </h3>
                  <p className="text-slate-500 text-xs mt-1">{emailUsuario}</p>
                </div>
                <div className="p-1 flex flex-col bg-white">
                  <Link to="/meu-perfil" onClick={() => setIsProfileOpen(false)} className="px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                    Configurações do Perfil
                  </Link>
                  <div className="h-px bg-slate-100 my-1"></div>
                  <button onClick={fazerLogout} className="text-left px-4 py-2.5 text-sm font-bold text-[#b73a3a] hover:bg-red-50 transition-colors">
                    Encerrar Sessão
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="bg-[#5c85ad] text-white text-xs font-semibold px-8 py-2 flex justify-between items-center flex-shrink-0 shadow-sm">
        <div className="flex items-center gap-8">
          <span className="uppercase tracking-widest text-[11px] font-bold">Menu</span>
          <span className="flex items-center gap-2 font-normal">
            Bem vindo, {nomeUsuario.toUpperCase()} 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
        <span className="font-normal">{dataAtual}</span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-[#284666] text-slate-300 flex flex-col shadow-inner">
          <nav className="flex-1 py-4 flex flex-col gap-1">
            <Link to="/" className="px-6 py-3 text-sm font-medium hover:bg-[#1f3752] hover:text-white transition-colors border-l-4 border-transparent hover:border-[#5c85ad]">
              Visão Geral
            </Link>
            <div className="px-6 py-2 text-[10px] font-bold text-[#7a9ebd] uppercase tracking-widest mt-2">
              Colaboradores
            </div>
            <Link to="/equipe" className="px-6 py-3 text-sm font-medium hover:bg-[#1f3752] hover:text-white transition-colors border-l-4 border-transparent hover:border-[#5c85ad]">
              Equipe e Portfólio
            </Link>
            
            {userRole === 'admin' && (
              <>
                <div className="px-6 py-2 text-[10px] font-bold text-[#7a9ebd] uppercase tracking-widest mt-4">
                  Gestão do Sistema
                </div>
                <Link to="/admin" className="px-6 py-3 text-sm font-medium hover:bg-[#1f3752] text-white transition-colors border-l-4 border-transparent hover:border-white bg-[#1f3752]/50">
                  Painel de Administração
                </Link>
              </>
            )}
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto bg-slate-50 p-8">
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