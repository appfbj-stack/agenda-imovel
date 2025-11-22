import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import Clients from './pages/Clients';
import Landing from './pages/Landing';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rota Pública */}
        <Route path="/" element={<Landing />} />
        
        {/* Rotas da Aplicação (com Sidebar) */}
        <Route path="/dashboard" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
        <Route path="/properties" element={
          <Layout>
            <Properties />
          </Layout>
        } />
        <Route path="/clients" element={
          <Layout>
            <Clients />
          </Layout>
        } />
      </Routes>
    </Router>
  );
};

export default App;
