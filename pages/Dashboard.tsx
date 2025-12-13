import React, { useState, useEffect } from 'react';
import { format, isSameDay, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { storageService } from '../services/storageService';
import { Visit, VisitStatus, Property, Client } from '../types';
import { Calendar as CalendarIcon, CheckCircle, Clock, MapPin, Users, Plus, Edit2, Trash2, X, Save, AlertCircle } from 'lucide-react';
import CorretorDashboard from '../components/CorretorDashboard';

const Dashboard: React.FC = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Visit>>({
    date: '',
    propertyId: '',
    clientId: '',
    status: VisitStatus.SCHEDULED,
    notes: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setVisits(storageService.getVisits());
    setProperties(storageService.getProperties());
    setClients(storageService.getClients());
    setLoading(false);
  };

  const getClientName = (id: string) => clients.find(c => c.id === id)?.name || 'Cliente removido';
  const getPropertyTitle = (id: string) => properties.find(p => p.id === id)?.title || 'Imóvel removido';
  const getPropertyAddress = (id: string) => properties.find(p => p.id === id)?.address || '';

  const handleOpenModal = (visit?: Visit) => {
    if (visit) {
      setEditingId(visit.id);
      setFormData({
        date: visit.date.slice(0, 16), // Format for datetime-local input
        propertyId: visit.propertyId,
        clientId: visit.clientId,
        status: visit.status,
        notes: visit.notes
      });
    } else {
      setEditingId(null);
      // Default to next hour
      const now = new Date();
      now.setMinutes(0);
      now.setHours(now.getHours() + 1);
      const tzOffset = now.getTimezoneOffset() * 60000; // offset in milliseconds
      const localISOTime = (new Date(now.getTime() - tzOffset)).toISOString().slice(0, 16);

      setFormData({
        date: localISOTime,
        propertyId: properties.length > 0 ? properties[0].id : '',
        clientId: clients.length > 0 ? clients[0].id : '',
        status: VisitStatus.SCHEDULED,
        notes: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.propertyId || !formData.clientId || !formData.date) {
      alert("Por favor preencha imóvel, cliente e data.");
      return;
    }

    const visitToSave: Visit = {
      id: editingId || crypto.randomUUID(),
      date: new Date(formData.date!).toISOString(),
      propertyId: formData.propertyId!,
      clientId: formData.clientId!,
      status: formData.status || VisitStatus.SCHEDULED,
      notes: formData.notes || ''
    };

    storageService.saveVisit(visitToSave);
    loadData();
    handleCloseModal();
  };

  const handleDelete = () => {
    if (editingId && confirm('Tem certeza que deseja excluir esta visita?')) {
      storageService.deleteVisit(editingId);
      loadData();
      handleCloseModal();
    }
  };

  const getStatusColor = (status: VisitStatus) => {
    switch (status) {
      case VisitStatus.COMPLETED: return 'bg-green-100 text-green-700 border-green-200';
      case VisitStatus.CANCELED: return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const todayVisits = visits.filter(visit => isSameDay(parseISO(visit.date), new Date()))
    .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());

  const nextVisits = visits
    .filter(visit => parseISO(visit.date) > new Date() && !isSameDay(parseISO(visit.date), new Date()))
    .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())
    .slice(0, 5);

  if (loading) return <div className="flex justify-center p-10">Carregando...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Painel do Corretor</h2>
          <div className="text-sm text-gray-500 mt-1">
            {format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })}
          </div>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="w-full sm:w-auto bg-brand-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-brand-700 transition-colors shadow-sm"
        >
          <Plus size={20} />
          Nova Visita
        </button>
      </div>

      {/* New Component: Stats Cards */}
      <CorretorDashboard />

      {/* Today's Agenda */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <CalendarIcon size={20} className="text-brand-600"/>
            Agenda de Hoje
          </h3>
          <span className="text-xs font-bold bg-brand-100 text-brand-700 px-2.5 py-1 rounded-full">
            {todayVisits.length} compromissos
          </span>
        </div>
        
        {todayVisits.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center text-gray-400">
            <CalendarIcon size={48} className="mb-3 opacity-20" />
            <p className="text-lg font-medium text-gray-500">Agenda livre hoje</p>
            <p className="text-sm">Aproveite para prospectar novos clientes.</p>
            <button onClick={() => handleOpenModal()} className="mt-4 text-brand-600 hover:underline text-sm font-medium">
              Agendar visita agora
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {todayVisits.map(visit => (
              <div key={visit.id} className="p-4 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row gap-4 group">
                <div className="flex sm:flex-col items-center sm:justify-center min-w-[80px] text-brand-600">
                  <span className="text-xl font-bold">{format(parseISO(visit.date), 'HH:mm')}</span>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-800">{getPropertyTitle(visit.propertyId)}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded border ${getStatusColor(visit.status)}`}>
                      {visit.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={14} />
                    <span className="truncate">{getPropertyAddress(visit.propertyId)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users size={14} />
                    <span className="font-medium text-gray-700">{getClientName(visit.clientId)}</span>
                  </div>
                  {visit.notes && (
                    <p className="text-xs text-gray-400 italic mt-1 border-l-2 border-gray-200 pl-2">
                      "{visit.notes}"
                    </p>
                  )}
                </div>
                <div className="flex items-center sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleOpenModal(visit)}
                    className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                    title="Editar Visita"
                  >
                    <Edit2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Visits */}
      {nextVisits.length > 0 && (
         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
         <div className="p-6 border-b border-gray-100 bg-gray-50/50">
           <h3 className="text-lg font-bold text-gray-800">Próximos Compromissos</h3>
         </div>
         <div className="divide-y divide-gray-50">
           {nextVisits.map(visit => (
             <div key={visit.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center gap-4 group">
               <div className="text-center min-w-[60px] bg-gray-100 rounded-lg p-2">
                 <div className="text-xs text-gray-500 uppercase font-bold">{format(parseISO(visit.date), 'MMM', {locale: ptBR})}</div>
                 <div className="text-xl font-bold text-gray-800">{format(parseISO(visit.date), 'dd')}</div>
               </div>
               <div className="flex-1">
                 <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-800">{getClientName(visit.clientId)}</h4>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getStatusColor(visit.status)}`}>
                      {visit.status}
                    </span>
                 </div>
                 <p className="text-sm text-gray-500 truncate">{getPropertyTitle(visit.propertyId)}</p>
                 <div className="text-xs text-brand-600 font-semibold mt-1 flex items-center gap-1">
                   <Clock size={12} />
                   {format(parseISO(visit.date), 'EEEE, HH:mm', {locale: ptBR})}
                 </div>
               </div>
               <button 
                  onClick={() => handleOpenModal(visit)}
                  className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit2 size={18} />
                </button>
             </div>
           ))}
         </div>
       </div>
      )}

      {/* Edit/Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-xl max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">
                {editingId ? 'Editar Visita' : 'Agendar Nova Visita'}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {/* Warning if no data */}
              {(properties.length === 0 || clients.length === 0) && (
                <div className="bg-yellow-50 text-yellow-800 p-3 rounded-lg text-sm flex gap-2 items-start">
                   <AlertCircle size={16} className="mt-0.5" />
                   <div>
                     Para agendar, você precisa cadastrar <a href="#/properties" className="underline font-bold">imóveis</a> e <a href="#/clients" className="underline font-bold">clientes</a> primeiro.
                   </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Imóvel</label>
                  <select 
                    required
                    className="w-full p-2 border rounded-lg bg-white focus:ring-2 focus:ring-brand-500 outline-none"
                    value={formData.propertyId}
                    onChange={e => setFormData({...formData, propertyId: e.target.value})}
                  >
                    <option value="">Selecione um imóvel...</option>
                    {properties.map(p => (
                      <option key={p.id} value={p.id}>{p.title} - {p.address}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                  <select 
                    required
                    className="w-full p-2 border rounded-lg bg-white focus:ring-2 focus:ring-brand-500 outline-none"
                    value={formData.clientId}
                    onChange={e => setFormData({...formData, clientId: e.target.value})}
                  >
                    <option value="">Selecione um cliente...</option>
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data e Hora</label>
                    <input 
                      required
                      type="datetime-local"
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                      value={formData.date}
                      onChange={e => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select 
                      className="w-full p-2 border rounded-lg bg-white focus:ring-2 focus:ring-brand-500 outline-none"
                      value={formData.status}
                      onChange={e => setFormData({...formData, status: e.target.value as VisitStatus})}
                    >
                      {Object.values(VisitStatus).map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
                  <textarea 
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                    rows={3}
                    placeholder="Ex: Cliente quer ver a área de lazer..."
                    value={formData.notes}
                    onChange={e => setFormData({...formData, notes: e.target.value})}
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                {editingId ? (
                  <button 
                    type="button"
                    onClick={handleDelete}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Trash2 size={18} /> Excluir
                  </button>
                ) : <div></div>}
                
                <div className="flex gap-2">
                  <button 
                    type="button" 
                    onClick={handleCloseModal} 
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 flex items-center gap-2 transition-colors shadow-sm"
                    disabled={properties.length === 0 || clients.length === 0}
                  >
                    <Save size={18} />
                    Salvar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;