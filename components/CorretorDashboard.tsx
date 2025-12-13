import React, { useEffect, useState } from 'react';
import { storageService } from '../services/storageService';
import { VisitStatus } from '../types';
import { Building2, Users, Calendar, Clock, CheckCircle } from 'lucide-react';

const CorretorDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeClients: 0,
    scheduledVisits: 0
  });

  useEffect(() => {
    const properties = storageService.getProperties();
    const clients = storageService.getClients();
    const visits = storageService.getVisits();

    setStats({
      totalProperties: properties.length,
      activeClients: clients.length,
      scheduledVisits: visits.filter(v => v.status === VisitStatus.SCHEDULED).length
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Imóveis na Carteira</p>
            <p className="text-3xl font-bold text-brand-600 mt-1">{stats.totalProperties}</p>
          </div>
          <div className="p-3 bg-brand-50 rounded-full text-brand-600">
            <Building2 size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Clientes Ativos</p>
            <p className="text-3xl font-bold text-green-600 mt-1">{stats.activeClients}</p>
          </div>
          <div className="p-3 bg-green-50 rounded-full text-green-600">
            <Users size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Visitas Agendadas</p>
            <p className="text-3xl font-bold text-orange-600 mt-1">{stats.scheduledVisits}</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-full text-orange-600">
            <Clock size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorretorDashboard;