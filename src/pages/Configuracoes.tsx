import React from 'react';

function Configuracoes() {
    return (
        <>
            <header>
                <h1 className="header-title">Configurações</h1>
                <p className="header-subtitle">Personalize o sistema conforme suas necessidades</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Configurações Gerais */}
                <div className="chart-card">
                    <h3 className="section-title">Configurações Gerais</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#2b3a54', fontWeight: 600 }}>
                                Nome da Empresa
                            </label>
                            <input
                                type="text"
                                placeholder="Sankhya App"
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #dce0e8',
                                    borderRadius: '8px',
                                    fontSize: '0.95rem',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#2b3a54', fontWeight: 600 }}>
                                Email de Contato
                            </label>
                            <input
                                type="email"
                                placeholder="contato@empresa.com"
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #dce0e8',
                                    borderRadius: '8px',
                                    fontSize: '0.95rem',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#2b3a54', fontWeight: 600 }}>
                                Telefone
                            </label>
                            <input
                                type="tel"
                                placeholder="(11) 99999-9999"
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #dce0e8',
                                    borderRadius: '8px',
                                    fontSize: '0.95rem',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>

                        <button style={{
                            padding: '12px 24px',
                            backgroundColor: '#008561',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            marginTop: '8px'
                        }}>
                            Salvar Alterações
                        </button>
                    </div>
                </div>

                {/* Notificações */}
                <div className="chart-card">
                    <h3 className="section-title">Notificações</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#f0f3f7', borderRadius: '8px' }}>
                            <div>
                                <div style={{ fontWeight: 600, color: '#2b3a54', marginBottom: '4px' }}>Email de Vendas</div>
                                <div style={{ fontSize: '0.85rem', color: '#626e82' }}>Receber notificações de novas vendas</div>
                            </div>
                            <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#f0f3f7', borderRadius: '8px' }}>
                            <div>
                                <div style={{ fontWeight: 600, color: '#2b3a54', marginBottom: '4px' }}>Alertas de Estoque</div>
                                <div style={{ fontSize: '0.85rem', color: '#626e82' }}>Avisos quando estoque estiver baixo</div>
                            </div>
                            <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#f0f3f7', borderRadius: '8px' }}>
                            <div>
                                <div style={{ fontWeight: 600, color: '#2b3a54', marginBottom: '4px' }}>Novos Clientes</div>
                                <div style={{ fontSize: '0.85rem', color: '#626e82' }}>Notificar sobre novos cadastros</div>
                            </div>
                            <input type="checkbox" style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#f0f3f7', borderRadius: '8px' }}>
                            <div>
                                <div style={{ fontWeight: 600, color: '#2b3a54', marginBottom: '4px' }}>Relatórios Semanais</div>
                                <div style={{ fontSize: '0.85rem', color: '#626e82' }}>Resumo semanal por email</div>
                            </div>
                            <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                        </div>
                    </div>
                </div>

                {/* Aparência */}
                <div className="chart-card">
                    <h3 className="section-title">Aparência</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#2b3a54', fontWeight: 600 }}>
                                Tema
                            </label>
                            <select style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #dce0e8',
                                borderRadius: '8px',
                                fontSize: '0.95rem',
                                fontFamily: 'inherit',
                                backgroundColor: 'white'
                            }}>
                                <option>Claro (Padrão)</option>
                                <option>Escuro</option>
                                <option>Automático</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#2b3a54', fontWeight: 600 }}>
                                Cor Principal
                            </label>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <div style={{ width: '40px', height: '40px', backgroundColor: '#008561', borderRadius: '8px', cursor: 'pointer', border: '3px solid #008561' }}></div>
                                <div style={{ width: '40px', height: '40px', backgroundColor: '#3b82f6', borderRadius: '8px', cursor: 'pointer', border: '1px solid #dce0e8' }}></div>
                                <div style={{ width: '40px', height: '40px', backgroundColor: '#8b5cf6', borderRadius: '8px', cursor: 'pointer', border: '1px solid #dce0e8' }}></div>
                                <div style={{ width: '40px', height: '40px', backgroundColor: '#ef4444', borderRadius: '8px', cursor: 'pointer', border: '1px solid #dce0e8' }}></div>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#2b3a54', fontWeight: 600 }}>
                                Tamanho da Fonte
                            </label>
                            <select style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #dce0e8',
                                borderRadius: '8px',
                                fontSize: '0.95rem',
                                fontFamily: 'inherit',
                                backgroundColor: 'white'
                            }}>
                                <option>Pequena</option>
                                <option>Média (Padrão)</option>
                                <option>Grande</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Segurança */}
                <div className="chart-card">
                    <h3 className="section-title">Segurança</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <button style={{
                            padding: '12px 24px',
                            backgroundColor: 'white',
                            color: '#626e82',
                            border: '1px solid #dce0e8',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            textAlign: 'left'
                        }}>
                            🔒 Alterar Senha
                        </button>

                        <button style={{
                            padding: '12px 24px',
                            backgroundColor: 'white',
                            color: '#626e82',
                            border: '1px solid #dce0e8',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            textAlign: 'left'
                        }}>
                            📱 Autenticação em 2 Fatores
                        </button>

                        <button style={{
                            padding: '12px 24px',
                            backgroundColor: 'white',
                            color: '#626e82',
                            border: '1px solid #dce0e8',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            textAlign: 'left'
                        }}>
                            📋 Histórico de Acessos
                        </button>

                        <button style={{
                            padding: '12px 24px',
                            backgroundColor: '#DA4453',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            marginTop: '16px'
                        }}>
                            🚪 Sair de Todas as Sessões
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Configuracoes;
