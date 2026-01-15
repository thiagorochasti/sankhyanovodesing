import React, { useState } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import Vendas from './pages/Vendas';
import Clientes from './pages/Clientes';
import Produtos from './pages/Produtos';
import Configuracoes from './pages/Configuracoes';

type PageType = 'dashboard' | 'vendas' | 'clientes' | 'produtos' | 'configuracoes';

function App() {
  const [activePage, setActivePage] = useState<PageType>('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'vendas':
        return <Vendas />;
      case 'clientes':
        return <Clientes />;
      case 'produtos':
        return <Produtos />;
      case 'configuracoes':
        return <Configuracoes />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <h2>Sankhya App</h2>
        <nav>
          <div
            className={`menu-item ${activePage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActivePage('dashboard')}
          >
            Dashboard
          </div>
          <div
            className={`menu-item ${activePage === 'vendas' ? 'active' : ''}`}
            onClick={() => setActivePage('vendas')}
          >
            Vendas
          </div>
          <div
            className={`menu-item ${activePage === 'clientes' ? 'active' : ''}`}
            onClick={() => setActivePage('clientes')}
          >
            Clientes
          </div>
          <div
            className={`menu-item ${activePage === 'produtos' ? 'active' : ''}`}
            onClick={() => setActivePage('produtos')}
          >
            Produtos
          </div>
          <div
            className={`menu-item ${activePage === 'configuracoes' ? 'active' : ''}`}
            onClick={() => setActivePage('configuracoes')}
          >
            Configurações
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
