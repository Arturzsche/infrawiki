import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      if (isLogin) {
        const res = await axios.post('https://infrawiki-api.onrender.com/api/auth/login', { usuario, senha });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('usuarioLogado', res.data.usuario.usuario);
        localStorage.setItem('usuarioEmail', res.data.usuario.email);
        localStorage.setItem('perfilId', res.data.usuario.perfilId);
        localStorage.setItem('role', res.data.usuario.role);
        navigate('/');
      } else {
        await axios.post('https://infrawiki-api.onrender.com/api/auth/registro', { usuario, email, senha });
        alert('Cadastro realizado com sucesso! Faça o login.');
        setIsLogin(true);
        setSenha('');
      }
    } catch (err) {
      setErro(err.response?.data?.error || 'Ocorreu um erro. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <img src="/logo-infrawiki.png" alt="Logo InfraWiki" className="w-40 mb-4" />
          <h2 className="text-2xl font-black text-slate-800">
            {isLogin ? 'Acesso Restrito' : 'Criar Conta'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {isLogin ? 'Entre com seu usuário e senha' : 'Cadastre-se no sistema'}
          </p>
        </div>

        {erro && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm font-bold text-center border border-red-200">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Usuário</label>
            <input 
              type="text" 
              required 
              value={usuario} 
              onChange={(e) => setUsuario(e.target.value.toLowerCase().replace(/\s/g, ''))} 
              className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50"
              placeholder={isLogin ? "Seu usuário" : "Ex: joaossilva"}
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">E-mail</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50"
                placeholder="seu.email@tcego.com.br"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Senha</label>
            <input 
              type="password" 
              required 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
              className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md mt-2">
            {isLogin ? 'Entrar no Sistema' : 'Cadastrar Usuário'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button onClick={() => { setIsLogin(!isLogin); setErro(''); setSenha(''); }} className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">
            {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
          </button>
        </div>
      </div>
    </div>
  );
}