import React, { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { Client } from '../types';
import { Plus, Phone, Mail, User, Trash2, Search } from 'lucide-react';

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Partial<Client>>({
    name: '',
    phone: '',
    email: '',
    interests: ''
  });

  useEffect(() => {
    setClients(storageService.getClients());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newClient: Client = {
      id: crypto.randomUUID(),
      ...formData as Client
    };
    storageService.saveClient(newClient);
    setClients(storageService.getClients());
    setIsModalOpen(false);
    setFormData({ name: '', phone: '', email: '', interests: '' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Remover este cliente?')) {
        storageService.deleteClient(id);
        setClients(storageService.getClients());
    }
  };

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.interests.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Carteira de Clientes</h2>
        <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Buscar nome ou interesse..." 
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            <button
            onClick={() => setIsModalOpen(true)}
            className="bg-brand-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-700 transition-colors whitespace-nowrap"
            >
            <Plus size={20} />
            <span className="hidden sm:inline">Novo Cliente</span>
            </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <div className="col-span-4">Nome</div>
            <div className="col-span-3">Contato</div>
            <div className="col-span-4">Interesse</div>
            <div className="col-span-1 text-right">Ações</div>
        </div>
        <div className="divide-y divide-gray-50">
          {filteredClients.map(client => (
            <div key={client.id} className="p-4 flex flex-col md:grid md:grid-cols-12 gap-4 hover:bg-gray-50 transition-colors">
                <div className="col-span-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-bold">
                        {client.name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-900">{client.name}</h3>
                        <span className="text-xs text-gray-500 md:hidden">ID: {client.id.slice(0,4)}</span>
                    </div>
                </div>
                <div className="col-span-3 flex flex-col justify-center text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <Phone size={14} className="text-gray-400" />
                        {client.phone}
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail size={14} className="text-gray-400" />
                        {client.email}
                    </div>
                </div>
                <div className="col-span-4 flex items-center text-sm text-gray-600">
                    <span className="bg-gray-100 px-2 py-1 rounded text-gray-700 w-full md:w-auto truncate">
                        {client.interests}
                    </span>
                </div>
                <div className="col-span-1 flex justify-end items-center">
                    <button onClick={() => handleDelete(client.id)} className="text-gray-400 hover:text-red-500 p-2">
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">Novo Cliente</h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <input
                  required
                  className="w-full p-2 border rounded-lg"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp</label>
                <input
                  required
                  className="w-full p-2 border rounded-lg"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-lg"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Perfil / Interesses</label>
                <textarea
                  required
                  rows={3}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Ex: Apartamento no centro, até 500k..."
                  value={formData.interests}
                  onChange={e => setFormData({...formData, interests: e.target.value})}
                />
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700">Salvar Cliente</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;