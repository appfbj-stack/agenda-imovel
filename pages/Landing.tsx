import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Calendar, Users, CheckCircle2, ArrowRight, Smartphone, Shield, Zap, Moon, Sun, ChevronRight } from 'lucide-react';

const Landing: React.FC = () => {
  // Default to dark mode for "wow" factor immediately
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 font-sans selection:bg-brand-100 selection:text-brand-900 dark:selection:bg-brand-900 dark:selection:text-brand-100">
        
        {/* Navbar */}
        <nav className="fixed w-full top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-brand-600 p-2 rounded-lg shadow-lg shadow-brand-500/30">
                <Building2 className="text-white h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors">ImóvelAgenda</span>
            </div>
            <div className="flex items-center gap-4">
               <button 
                 onClick={toggleTheme}
                 className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
                 aria-label="Alternar tema"
               >
                 {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
               </button>
               <Link 
                to="/dashboard" 
                className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Acessar Sistema
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative overflow-hidden pt-32 pb-24 lg:pt-48 lg:pb-32">
          {/* Background Effects */}
          <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-50 via-white to-white dark:from-brand-900/20 dark:via-gray-900 dark:to-gray-900 -z-10 transition-colors duration-500"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-sm font-semibold mb-8 border border-brand-100 dark:border-brand-800 opacity-0 animate-fade-in-up" style={{animationDelay: '100ms'}}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              A ferramenta definitiva para corretores v1.0
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8 leading-tight opacity-0 animate-fade-in-up" style={{animationDelay: '200ms'}}>
              Organize sua carteira.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-blue-400 dark:from-brand-400 dark:to-blue-300">
                Feche mais negócios.
              </span>
            </h1>
            
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 leading-relaxed opacity-0 animate-fade-in-up" style={{animationDelay: '300ms'}}>
              Abandone as planilhas e cadernos. Tenha controle total sobre seus imóveis, clientes e visitas na palma da sua mão com o ImóvelAgenda Pro.
            </p>
            
            <div className="mt-10 flex justify-center gap-4 flex-col sm:flex-row opacity-0 animate-fade-in-up" style={{animationDelay: '400ms'}}>
              <Link 
                to="/dashboard" 
                className="px-8 py-4 rounded-xl bg-brand-600 text-white text-lg font-bold hover:bg-brand-700 hover:scale-105 transition-all shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 group"
              >
                Começar Agora Grátis 
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
              </Link>
              <Link 
                to="/dashboard"
                className="px-8 py-4 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 text-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center"
              >
                Ver Demo
              </Link>
            </div>

            {/* Dashboard Preview Mockup */}
            <div className="mt-20 relative max-w-5xl mx-auto opacity-0 animate-fade-in-up" style={{animationDelay: '600ms'}}>
              <div className="relative rounded-2xl bg-gray-900 p-2 shadow-2xl ring-1 ring-gray-900/10 dark:ring-gray-700/50 transform hover:rotate-1 transition-transform duration-500">
                <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 aspect-[16/9] flex items-center justify-center text-gray-500 relative">
                   {/* Abstract UI Representation */}
                   <div className="absolute inset-0 bg-white dark:bg-gray-900 transition-colors duration-500">
                      <div className="h-full w-full grid grid-cols-4 grid-rows-6 gap-4 p-6 bg-gray-50 dark:bg-gray-900">
                          <div className="col-span-4 row-span-1 flex justify-between items-center mb-4">
                              <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                              <div className="h-10 w-32 bg-brand-100 dark:bg-brand-900/50 rounded-lg"></div>
                          </div>
                          <div className="col-span-1 row-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
                               <div className="h-8 w-8 bg-brand-50 dark:bg-brand-900 rounded-full mb-2"></div>
                               <div className="h-6 w-16 bg-gray-100 dark:bg-gray-700 rounded mb-1"></div>
                               <div className="h-8 w-10 bg-gray-200 dark:bg-gray-600 rounded"></div>
                          </div>
                          <div className="col-span-1 row-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
                               <div className="h-8 w-8 bg-green-50 dark:bg-green-900/30 rounded-full mb-2"></div>
                               <div className="h-6 w-16 bg-gray-100 dark:bg-gray-700 rounded mb-1"></div>
                               <div className="h-8 w-10 bg-gray-200 dark:bg-gray-600 rounded"></div>
                          </div>
                           <div className="col-span-1 row-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
                               <div className="h-8 w-8 bg-orange-50 dark:bg-orange-900/30 rounded-full mb-2"></div>
                               <div className="h-6 w-16 bg-gray-100 dark:bg-gray-700 rounded mb-1"></div>
                               <div className="h-8 w-10 bg-gray-200 dark:bg-gray-600 rounded"></div>
                          </div>
                          <div className="col-span-1 row-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 flex items-center justify-center text-gray-300 dark:text-gray-600 text-xs text-center">
                              Resumo do Dia
                          </div>
                          <div className="col-span-4 row-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mt-4 p-6">
                              <div className="h-6 w-32 bg-gray-100 dark:bg-gray-700 rounded mb-4"></div>
                              <div className="space-y-3">
                                  <div className="h-16 w-full bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700/50"></div>
                                  <div className="h-16 w-full bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700/50"></div>
                                  <div className="h-16 w-full bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700/50"></div>
                              </div>
                          </div>
                      </div>
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent pointer-events-none"></div>
                </div>
              </div>
               {/* Decorative blobs with animation */}
               <div className="absolute -top-12 -right-12 w-24 h-24 bg-brand-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob dark:opacity-40"></div>
               <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 dark:opacity-40"></div>
               <div className="absolute top-12 left-12 w-20 h-20 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 dark:opacity-40 hidden md:block"></div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-base font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wide">Funcionalidades</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Tudo o que você precisa para vender mais
              </p>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                O ImóvelAgenda Pro foi desenhado pensando na rotina dinâmica do corretor de imóveis.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/50 rounded-xl flex items-center justify-center text-brand-600 dark:text-brand-400 mb-6 group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Gestão de Agenda</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  Nunca mais perca uma visita. Organize seus compromissos, receba lembretes visuais e otimize seu tempo.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-xl flex items-center justify-center text-orange-600 dark:text-orange-400 mb-6 group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Carteira de Imóveis</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  Cadastre imóveis com fotos, descrições geradas por IA e compartilhe diretamente no WhatsApp com um clique.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center text-green-600 dark:text-green-400 mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Controle de Clientes</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  Registre interesses, vincule visitas e mantenha o histórico de negociações sempre atualizado.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits / Why Us */}
        <div className="py-24 bg-white dark:bg-gray-900 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row items-center gap-16">
                  <div className="lg:w-1/2">
                      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mb-6">
                          A liberdade de trabalhar de qualquer lugar
                      </h2>
                      <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
                          O ImóvelAgenda Pro é um PWA (Progressive Web App). Isso significa que você pode instalá-lo no seu celular como um aplicativo nativo, sem ocupar espaço e com funcionamento super rápido.
                      </p>
                      
                      <div className="space-y-4">
                          {[
                            "Acesso Offline para consultas rápidas",
                            "Descrição de imóveis com Inteligência Artificial",
                            "Sem mensalidades abusivas"
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <div className="flex-shrink-0">
                                    <CheckCircle2 className="h-6 w-6 text-brand-500" />
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 font-medium">{item}</p>
                            </div>
                          ))}
                      </div>
                      
                      <div className="mt-10">
                         <Link 
                           to="/dashboard" 
                           className="text-brand-600 dark:text-brand-400 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                         >
                           Ver todas as vantagens <ChevronRight size={20} />
                         </Link>
                      </div>
                  </div>
                  <div className="lg:w-1/2 relative">
                      <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl text-center transform translate-y-8 hover:-translate-y-1 transition-transform duration-300 border border-transparent dark:border-gray-700">
                              <Smartphone className="w-10 h-10 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                              <h4 className="font-bold text-gray-900 dark:text-white">Mobile First</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Perfeito no celular</p>
                          </div>
                          <div className="bg-brand-50 dark:bg-brand-900/20 p-6 rounded-2xl text-center hover:-translate-y-1 transition-transform duration-300 border border-transparent dark:border-brand-900/30">
                              <Zap className="w-10 h-10 text-brand-500 mx-auto mb-4" />
                              <h4 className="font-bold text-brand-900 dark:text-brand-300">Super Rápido</h4>
                              <p className="text-sm text-brand-700 dark:text-brand-400">Interface ágil</p>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl text-center transform translate-y-8 hover:-translate-y-1 transition-transform duration-300 border border-transparent dark:border-gray-700">
                              <Shield className="w-10 h-10 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                              <h4 className="font-bold text-gray-900 dark:text-white">Seguro</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Dados locais</p>
                          </div>
                           <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl text-center hover:-translate-y-1 transition-transform duration-300 border border-transparent dark:border-gray-700">
                              <Building2 className="w-10 h-10 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                              <h4 className="font-bold text-gray-900 dark:text-white">Especializado</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Para Imobiliárias</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 dark:bg-black text-white py-12 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                  <Building2 className="text-brand-400 h-6 w-6" />
                  <span className="text-xl font-bold tracking-tight">ImóvelAgenda Pro</span>
              </div>
              <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} Todos os direitos reservados.
              </p>
              <div className="flex gap-6">
                  <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm">Entrar</Link>
                  <Link to="/properties" className="text-gray-400 hover:text-white transition-colors text-sm">Imóveis</Link>
                  <Link to="/clients" className="text-gray-400 hover:text-white transition-colors text-sm">Clientes</Link>
              </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;