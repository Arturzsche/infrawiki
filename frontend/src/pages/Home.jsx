export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-800 mb-2">Visão Geral</h1>
      <p className="text-slate-500 mb-8">Bem-vindo à Wiki Operacional de Manutenção.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-blue-500">
          <h3 className="text-lg font-bold text-slate-700">Procedimentos Ativos</h3>
          <p className="text-4xl font-black text-blue-600 mt-2">2</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-green-500">
          <h3 className="text-lg font-bold text-slate-700">Status do Sistema</h3>
          <p className="text-xl font-bold text-green-600 mt-2">Online e Conectado</p>
        </div>
      </div>
    </div>
  );
}