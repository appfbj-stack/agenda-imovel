export enum PropertyStatus {
  AVAILABLE = 'Disponível',
  SOLD = 'Vendido',
  RENTED = 'Alugado',
  RESERVED = 'Reservado',
}

export enum PropertyType {
  APARTMENT = 'Apartamento',
  HOUSE = 'Casa',
  LAND = 'Terreno',
  COMMERCIAL = 'Sala Comercial',
}

export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  type: PropertyType;
  status: PropertyStatus;
  bedrooms: number;
  area: number; // m²
  description: string;
  imageUrl: string;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  interests: string;
}

export enum VisitStatus {
  SCHEDULED = 'Agendada',
  COMPLETED = 'Realizada',
  CANCELED = 'Cancelada',
}

export interface Visit {
  id: string;
  date: string; // ISO string
  propertyId: string;
  clientId: string;
  status: VisitStatus;
  notes: string;
}

export interface Proposal {
  id: string;
  propertyId: string;
  clientId: string;
  value: number;
  status: 'Em Análise' | 'Aceita' | 'Recusada';
  date: string;
}