import React from 'react';
import { Home, Users, Building2, Calendar, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Agenda', path: '/dashboard', icon: Calendar },
    { name: 'Imóveis', path: '/properties', icon: Building2 },
    { name: 'Clientes', path: '/clients', icon: Users },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-20">
        <Link to="/" className="flex items-center gap-2">
          <Building2 className="text-brand-600 h-6 w-6" />
          <h1 className="text-xl font-bold text-brand-600">ImóvelAgenda</h1>
        </Link>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="bg-white w-64 h-full shadow-lg p-4" onClick={e => e.stopPropagation()}>
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive(item.path) ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={20} />
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 mt-auto border-t">
                  <Link to="/" className="text-gray-500 text-sm flex gap-2 p-3 hover:text-brand-600">
                      Sair
                  </Link>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white shadow-lg sticky top-0 h-screen">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="text-brand-600 h-8 w-8" />
            <div>
                <h1 className="text-xl font-bold text-brand-600">ImóvelAgenda</h1>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Pro</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive(item.path) ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
           <Link to="/" className="text-sm text-gray-400 hover:text-brand-600 transition-colors block text-center mb-2">
             Sair / Ir para Home
           </Link>
          <div className="text-xs text-gray-300 text-center">
            v1.0.0 - PWA Ready
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-[calc(100vh-64px)] md:h-screen">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
