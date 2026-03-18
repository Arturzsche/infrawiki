import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function MeuPerfil() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const fotoInputRef = useRef(null);
  const capaInputRef = useRef(null);
  const perfilId = localStorage.getItem('perfilId');

  useEffect(() => {
    if (perfilId) {
      axios.get(`https://infrawiki-api.onrender.com/api/estagiarios/${perfilId}`)
        .then(res => { setFormData(res.data); setLoading(false); })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [perfilId]);

  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_SIZE = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height && width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          } else if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          setFormData(prev => ({ ...prev, [field]: dataUrl }));
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const salvarAlteracoes = () => {
    axios.put(`https://infrawiki-api.onrender.com/api/estagiarios/${perfilId}`, formData)
      .then(() => alert("Perfil atualizado com sucesso!"))
      .catch(() => alert("Erro ao salvar alterações."));
  };

  if (loading) return <div className="p-8 text-center animate-pulse">Carregando configurações...</div>;
  if (!perfilId) return <div className="p-8 text-center text-red-500 font-bold">Perfil não encontrado. Faça login novamente.</div>;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 max-w-3xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-black text-slate-800 mb-6">Configurações do Perfil</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Capa de Fundo</label>
          <div 
            className="w-full h-32 rounded-xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer bg-cover bg-center"
            style={formData.capa ? { backgroundImage: `url(${formData.capa})` } : {}}
            onClick={() => capaInputRef.current.click()}
          >
            <span className="bg-white/80 px-4 py-1 rounded text-sm font-bold shadow-sm">Alterar Capa</span>
          </div>
          <input type="file" ref={capaInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'capa')} />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Foto de Perfil</label>
          <div className="flex items-center gap-4">
            <img src={formData.foto} alt="Avatar" className="w-20 h-20 rounded-full object-cover shadow-sm border border-slate-200" />
            <button onClick={() => fotoInputRef.current.click()} className="px-4 py-2 bg-slate-100 font-bold text-sm rounded-lg hover:bg-slate-200 transition">Trocar Foto</button>
            <input type="file" ref={fotoInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'foto')} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Nome de Exibição</label>
            <input type="text" value={formData.nome || ''} onChange={e => setFormData({...formData, nome: e.target.value})} className="w-full p-3 border border-slate-300 rounded-lg outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Área de Atuação</label>
            <select value={formData.area || ''} onChange={e => setFormData({...formData, area: e.target.value})} className="w-full p-3 border border-slate-300 rounded-lg outline-none bg-white">
              <option>Engenharia Civil</option>
              <option>Engenharia da Computação</option>
              <option>Engenharia Elétrica</option>
              <option>Engenharia Mecânica</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Biografia</label>
          <textarea value={formData.bio || ''} onChange={e => setFormData({...formData, bio: e.target.value})} rows="4" className="w-full p-3 border border-slate-300 rounded-lg outline-none"></textarea>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button onClick={salvarAlteracoes} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition-colors">
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}