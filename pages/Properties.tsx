import React, { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { generatePropertyDescription } from '../services/geminiService';
import { Property, PropertyStatus, PropertyType } from '../types';
import { Plus, MapPin, Bed, Ruler, Trash2, Wand2, Search, Upload, Image as ImageIcon, X, Share2 } from 'lucide-react';

const Properties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form State
  const [formData, setFormData] = useState<Partial<Property>>({
    title: '',
    address: '',
    price: 0,
    type: PropertyType.APARTMENT,
    status: PropertyStatus.AVAILABLE,
    bedrooms: 0,
    area: 0,
    description: '',
    imageUrl: ''
  });
  const [generatingAI, setGeneratingAI] = useState(false);

  useEffect(() => {
    setProperties(storageService.getProperties());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProperty: Property = {
      id: crypto.randomUUID(),
      ...formData as Property,
      imageUrl: formData.imageUrl || `https://picsum.photos/seed/${Date.now()}/400/300`
    };
    storageService.saveProperty(newProperty);
    setProperties(storageService.getProperties());
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
        title: '',
        address: '',
        price: 0,
        type: PropertyType.APARTMENT,
        status: PropertyStatus.AVAILABLE,
        bedrooms: 0,
        area: 0,
        description: '',
        imageUrl: ''
    });
  };

  const handleDelete = (id: string) => {
    if(confirm('Tem certeza que deseja excluir este imóvel?')) {
        storageService.deleteProperty(id);
        setProperties(storageService.getProperties());
    }
  }

  const handleShare = (property: Property) => {
    const priceFormatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.price);
    const text = `*${property.title}*\n📍 ${property.address}\n💰 ${priceFormatted}\n🛏 ${property.bedrooms} quartos | 📐 ${property.area}m²\n\n${property.description || 'Entre em contato para mais detalhes!'}`;
    
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleGenerateDescription = async () => {
    if (!formData.type || !formData.address) {
        alert("Preencha Tipo e Endereço para gerar a descrição.");
        return;
    }
    setGeneratingAI(true);
    const features = `${formData.bedrooms} quartos, ${formData.area}m², preço R$ ${formData.price}`;
    const desc = await generatePropertyDescription(formData.type, formData.address, features);
    setFormData(prev => ({ ...prev, description: desc }));
    setGeneratingAI(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, imageUrl: '' });
  };

  const filteredProperties = properties.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Meus Imóveis</h2>
        <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Buscar imóvel..." 
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
            <span className="hidden sm:inline">Novo Imóvel</span>
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map(property => (
          <div key={property.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 overflow-hidden relative group">
              <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white
                  ${property.status === PropertyStatus.AVAILABLE ? 'bg-green-500' : 
                    property.status === PropertyStatus.SOLD ? 'bg-red-500' : 'bg-yellow-500'}`}>
                  {property.status}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{property.title}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin size={12} /> {property.address}
                    </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 my-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <span className="font-medium bg-gray-100 px-2 py-0.5 rounded text-xs uppercase">{property.type}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bed size={16} />
                  <span>{property.bedrooms}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Ruler size={16} />
                  <span>{property.area} m²</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
                <span className="text-xl font-bold text-brand-700">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.price)}
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleShare(property)} 
                    className="text-green-600 hover:text-green-700 p-2 hover:bg-green-50 rounded-lg transition-colors"
                    title="Compartilhar no WhatsApp"
                  >
                    <Share2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(property.id)} 
                    className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Excluir"
                  >
                      <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Cadastrar Imóvel</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              {/* Image Upload Area */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">Foto Principal</label>
                
                {formData.imageUrl ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200 group">
                    <img 
                      src={formData.imageUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    <button 
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors shadow-md"
                      title="Remover imagem"
                    >
                      <X size={16} />
                    </button>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all pointer-events-none" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-3 text-gray-400" />
                        <p className="text-sm text-gray-500"><span className="font-semibold">Clique para enviar</span> ou arraste</p>
                        <p className="text-xs text-gray-500">PNG, JPG ou WebP</p>
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                  <input
                    required
                    type="text"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                  <input
                    required
                    list="property-types"
                    type="text"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                    placeholder="Ex: Apartamento, Terreno, Sítio..."
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value})}
                  />
                  <datalist id="property-types">
                    {Object.values(PropertyType).map(t => <option key={t} value={t} />)}
                    <option value="Galpão" />
                    <option value="Sítio" />
                    <option value="Fazenda" />
                    <option value="Studio" />
                    <option value="Cobertura" />
                    <option value="Loja" />
                  </datalist>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                  <input
                    required
                    type="text"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
                  <input
                    required
                    type="number"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Situação</label>
                  <select
                    className="w-full p-2 border rounded-lg bg-white focus:ring-2 focus:ring-brand-500 outline-none"
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value as PropertyStatus})}
                  >
                    {Object.values(PropertyStatus).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quartos / Salas</label>
                  <input
                    required
                    type="number"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                    value={formData.bedrooms}
                    onChange={e => setFormData({...formData, bedrooms: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Área (m²)</label>
                  <input
                    required
                    type="number"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                    value={formData.area}
                    onChange={e => setFormData({...formData, area: Number(e.target.value)})}
                  />
                </div>
                <div className="md:col-span-2">
                    <div className="flex justify-between items-center mb-1">
                        <label className="block text-sm font-medium text-gray-700">Descrição</label>
                        <button 
                            type="button"
                            onClick={handleGenerateDescription}
                            disabled={generatingAI}
                            className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded flex items-center gap-1 hover:bg-indigo-100"
                        >
                            <Wand2 size={12} />
                            {generatingAI ? 'Gerando...' : 'Gerar com IA'}
                        </button>
                    </div>
                  <textarea
                    rows={3}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    placeholder="Escreva ou gere uma descrição..."
                  />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 shadow-sm">Salvar Imóvel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;