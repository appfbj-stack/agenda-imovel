import { Property, Client, Visit, PropertyStatus, PropertyType, VisitStatus } from '../types';

// Seed Data
const initialProperties: Property[] = [
  {
    id: '1',
    title: 'Apartamento no Centro',
    address: 'Av. Paulista, 1000, São Paulo',
    price: 850000,
    type: PropertyType.APARTMENT,
    status: PropertyStatus.AVAILABLE,
    bedrooms: 2,
    area: 85,
    description: 'Lindo apartamento reformado com vista para a cidade.',
    imageUrl: 'https://picsum.photos/seed/apt1/400/300'
  },
  {
    id: '2',
    title: 'Casa em Condomínio',
    address: 'Rua das Flores, 123, Cotia',
    price: 1200000,
    type: PropertyType.HOUSE,
    status: PropertyStatus.RESERVED,
    bedrooms: 4,
    area: 250,
    description: 'Casa ampla com piscina e área gourmet.',
    imageUrl: 'https://picsum.photos/seed/house1/400/300'
  }
];

const initialClients: Client[] = [
  {
    id: '1',
    name: 'Roberto Silva',
    phone: '(11) 99999-8888',
    email: 'roberto@email.com',
    interests: 'Apartamento 2 quartos, até 900k'
  },
  {
    id: '2',
    name: 'Ana Souza',
    phone: '(11) 98888-7777',
    email: 'ana@email.com',
    interests: 'Casa em condomínio'
  }
];

const initialVisits: Visit[] = [
  {
    id: '1',
    date: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(), // Today 10am
    propertyId: '1',
    clientId: '1',
    status: VisitStatus.SCHEDULED,
    notes: 'Cliente quer ver a iluminação natural.'
  },
  {
    id: '2',
    date: new Date(new Date().setHours(14, 30, 0, 0)).toISOString(), // Today 2:30pm
    propertyId: '2',
    clientId: '2',
    status: VisitStatus.SCHEDULED,
    notes: ''
  }
];

// Storage Keys
const KEYS = {
  PROPERTIES: 'imovelagenda_properties',
  CLIENTS: 'imovelagenda_clients',
  VISITS: 'imovelagenda_visits'
};

// Helpers
const get = <T>(key: string, initial: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initial;
  } catch (e) {
    return initial;
  }
};

const set = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// API
export const storageService = {
  getProperties: (): Property[] => get(KEYS.PROPERTIES, initialProperties),
  saveProperty: (property: Property) => {
    const properties = get(KEYS.PROPERTIES, initialProperties);
    const index = properties.findIndex(p => p.id === property.id);
    if (index >= 0) {
      properties[index] = property;
    } else {
      properties.push(property);
    }
    set(KEYS.PROPERTIES, properties);
  },
  deleteProperty: (id: string) => {
      const properties = get<Property[]>(KEYS.PROPERTIES, initialProperties);
      set(KEYS.PROPERTIES, properties.filter(p => p.id !== id));
  },

  getClients: (): Client[] => get(KEYS.CLIENTS, initialClients),
  saveClient: (client: Client) => {
    const clients = get(KEYS.CLIENTS, initialClients);
    const index = clients.findIndex(c => c.id === client.id);
    if (index >= 0) {
      clients[index] = client;
    } else {
      clients.push(client);
    }
    set(KEYS.CLIENTS, clients);
  },
  deleteClient: (id: string) => {
    const clients = get<Client[]>(KEYS.CLIENTS, initialClients);
    set(KEYS.CLIENTS, clients.filter(c => c.id !== id));
  },

  getVisits: (): Visit[] => get(KEYS.VISITS, initialVisits),
  saveVisit: (visit: Visit) => {
    const visits = get(KEYS.VISITS, initialVisits);
    const index = visits.findIndex(v => v.id === visit.id);
    if (index >= 0) {
      visits[index] = visit;
    } else {
      visits.push(visit);
    }
    set(KEYS.VISITS, visits);
  },
  deleteVisit: (id: string) => {
    const visits = get<Visit[]>(KEYS.VISITS, initialVisits);
    set(KEYS.VISITS, visits.filter(v => v.id !== id));
  }
};