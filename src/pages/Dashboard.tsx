import React, { useEffect, useState } from 'react';
import { DataUnit, DataType } from '@sankhyalabs/core';

function Dashboard() {
    const [du] = useState(() => new DataUnit());
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        // Configurar Metadata do Grid
        // Usando 'as any' porque width e format são propriedades válidas mas não estão no tipo oficial
        du.metadata = {
            name: 'vendas_recentes',
            fields: [
                { name: 'ID', label: 'ID', dataType: DataType.NUMBER, width: 80 },
                { name: 'PRODUTO', label: 'Produto', dataType: DataType.TEXT, width: 250 },
                { name: 'CLIENTE', label: 'Cliente', dataType: DataType.TEXT, width: 200 },
                { name: 'VALOR', label: 'Valor (R$)', dataType: DataType.NUMBER, format: '#,##0.00', width: 120 },
                { name: 'STATUS', label: 'Status', dataType: DataType.TEXT, width: 100 }
            ]
        } as any;

        // Simular Carregamento de Dados da API
        du.dataLoader = async () => {
            return {
                records: [
                    { __record__id__: '1', ID: 1045, PRODUTO: 'Smartphone Galaxy S23', CLIENTE: 'Tech Solutions Ltda', VALOR: 4500.00, STATUS: 'Concluído' },
                    { __record__id__: '2', ID: 1046, PRODUTO: 'Notebook Dell XPS', CLIENTE: 'Consultoria Silva', VALOR: 8900.00, STATUS: 'Pendente' },
                    { __record__id__: '3', ID: 1047, PRODUTO: 'Monitor LG Ultrawide', CLIENTE: 'João da Silva', VALOR: 1200.00, STATUS: 'Concluído' },
                    { __record__id__: '4', ID: 1048, PRODUTO: 'Teclado Mecânico Keychron', CLIENTE: 'Dev House', VALOR: 650.00, STATUS: 'Enviado' },
                    { __record__id__: '5', ID: 1049, PRODUTO: 'Mouse Logitech MX Master', CLIENTE: 'Design Studio', VALOR: 450.00, STATUS: 'Concluído' },
                ]
            };
        };

        du.loadData();

        // Simular Dados do Gráfico
        setChartData([
            { label: 'Jan', value: 35000 },
            { label: 'Fev', value: 42000 },
            { label: 'Mar', value: 38000 },
            { label: 'Abr', value: 51000 },
            { label: 'Mai', value: 49000 },
            { label: 'Jun', value: 62000 },
        ]);

    }, [du]);

    return (
        <>
            <header>
                <h1 className="header-title">Visão Geral</h1>
                <p className="header-subtitle">Acompanhe o desempenho das suas vendas em tempo real.</p>
            </header>

            {/* Stats Cards Row */}
            <section className="stats-grid">
                {/* Card 1 - Success color */}
                <div className="stat-card-content">
                    <span className="stat-label">Faturamento Total</span>
                    <span className="stat-value" style={{ color: '#00cb94' }}>R$ 247.500</span>
                </div>

                {/* Card 2 - Primary color */}
                <div className="stat-card-content">
                    <span className="stat-label">Vendas do Mês</span>
                    <span className="stat-value" style={{ color: '#008561' }}>142</span>
                </div>

                {/* Card 3 - Warning color */}
                <div className="stat-card-content">
                    <span className="stat-label">Ticket Médio</span>
                    <span className="stat-value" style={{ color: '#f2d410' }}>R$ 1.740</span>
                </div>

                {/* Card 4 - Tertiary color */}
                <div className="stat-card-content">
                    <span className="stat-label">Novos Clientes</span>
                    <span className="stat-value" style={{ color: '#da3688' }}>28</span>
                </div>
            </section>

            {/* Charts & Lists Section */}
            <section className="charts-section">
                {/* Main Grid Area */}
                <div className="chart-card">
                    <h3 className="section-title">Transações Recentes</h3>
                    <div className="table-container">
                        <table className="transactions-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Produto</th>
                                    <th>Cliente</th>
                                    <th>Valor (R$)</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1045</td>
                                    <td>Smartphone Galaxy S23</td>
                                    <td>Tech Solutions Ltda</td>
                                    <td>R$ 4.500,00</td>
                                    <td><span className="status-badge status-success">Concluído</span></td>
                                </tr>
                                <tr>
                                    <td>1046</td>
                                    <td>Notebook Dell XPS</td>
                                    <td>Consultoria Silva</td>
                                    <td>R$ 8.900,00</td>
                                    <td><span className="status-badge status-pending">Pendente</span></td>
                                </tr>
                                <tr>
                                    <td>1047</td>
                                    <td>Monitor LG Ultrawide</td>
                                    <td>João da Silva</td>
                                    <td>R$ 1.200,00</td>
                                    <td><span className="status-badge status-success">Concluído</span></td>
                                </tr>
                                <tr>
                                    <td>1048</td>
                                    <td>Teclado Mecânico Keychron</td>
                                    <td>Dev House</td>
                                    <td>R$ 650,00</td>
                                    <td><span className="status-badge status-shipped">Enviado</span></td>
                                </tr>
                                <tr>
                                    <td>1049</td>
                                    <td>Mouse Logitech MX Master</td>
                                    <td>Design Studio</td>
                                    <td>R$ 450,00</td>
                                    <td><span className="status-badge status-success">Concluído</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Side List / Chart Area */}
                <div className="chart-card">
                    <h3 className="section-title">Últimas Atividades</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                        <div className="activity-item">
                            <div className="activity-title">🎉 Nova Venda #1049</div>
                            <div className="activity-details">
                                <span>Cliente: Design Studio</span>
                                <span>Valor: R$ 450,00</span>
                            </div>
                        </div>

                        <div className="activity-item">
                            <div className="activity-title">👤 Novo Cliente</div>
                            <div className="activity-details">
                                <span>Nome: Tech Solutions</span>
                                <span>Origem: Site</span>
                            </div>
                        </div>

                        <div className="activity-item">
                            <div className="activity-title">⚠️ Alerta de Estoque</div>
                            <div className="activity-details">
                                <span>Produto: Monitor LG</span>
                                <span>Quantidade: Baixa</span>
                            </div>
                        </div>

                        <div className="activity-item">
                            <div className="activity-title">📦 Produto Enviado #1048</div>
                            <div className="activity-details">
                                <span>Cliente: Dev House</span>
                                <span>Valor: R$ 650,00</span>
                            </div>
                        </div>

                        <button style={{
                            marginTop: 'auto',
                            padding: '10px 20px',
                            backgroundColor: '#008561', /* Sankhya Primary */
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            transition: 'all 0.2s ease'
                        }}>Ver Todas</button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Dashboard;
