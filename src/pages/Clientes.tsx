import React, { useState, useEffect, useRef } from 'react';
import { EzGrid, EzButton, EzViewStack, EzForm, EzIcon } from '@sankhyalabs/ezui/react/components';
import { DataUnit, StringUtils } from '@sankhyalabs/core';

const CLIENTES_METADATA = {
    name: "clientes",
    label: "Clientes",
    fields: [
        { name: "ID", label: "ID Cliente", dataType: "NUMBER", userInterface: "INTEGERNUMBER", readOnly: true, required: false },
        { name: "NOME", label: "Nome", dataType: "TEXT", userInterface: "TEXT", readOnly: false, required: true },
        { name: "EMAIL", label: "Email", dataType: "TEXT", userInterface: "TEXT", readOnly: false, required: true },
        { name: "TELEFONE", label: "Telefone", dataType: "TEXT", userInterface: "TEXT", readOnly: false, required: true },
        { name: "DOCUMENTO", label: "CPF/CNPJ", dataType: "TEXT", userInterface: "TEXT", readOnly: false, required: false },
        { name: "ENDERECO", label: "Endereço", dataType: "TEXT", userInterface: "TEXT", readOnly: false, required: false },
        { name: "CIDADE", label: "Cidade", dataType: "TEXT", userInterface: "TEXT", readOnly: false, required: true },
        { name: "STATUS", label: "Status", dataType: "TEXT", userInterface: "TEXT", readOnly: false, required: true }
    ]
};

const CLIENTES_INITIAL_RECORDS = [
    { __record__id__: "1", ID: 1, NOME: "Tech Solutions Ltda", EMAIL: "contato@techsolutions.com", TELEFONE: "(11) 98765-4321", DOCUMENTO: "12.345.678/0001-90", ENDERECO: "Av. Paulista, 1000", CIDADE: "São Paulo", STATUS: "Ativo" },
    { __record__id__: "2", ID: 2, NOME: "Consultoria Silva", EMAIL: "contato@silva.com.br", TELEFONE: "(21) 99876-5432", DOCUMENTO: "98.765.432/0001-10", ENDERECO: "Rua das Flores, 200", CIDADE: "Rio de Janeiro", STATUS: "Ativo" },
    { __record__id__: "3", ID: 3, NOME: "João da Silva", EMAIL: "joao@email.com", TELEFONE: "(11) 91234-5678", DOCUMENTO: "123.456.789-00", ENDERECO: "Rua dos Jardins, 50", CIDADE: "São Paulo", STATUS: "Ativo" },
    { __record__id__: "4", ID: 4, NOME: "Dev House", EMAIL: "contato@devhouse.dev", TELEFONE: "(48) 99123-4567", DOCUMENTO: "11.222.333/0001-44", ENDERECO: "Av. Beira Mar, 300", CIDADE: "Florianópolis", STATUS: "Ativo" },
    { __record__id__: "5", ID: 5, NOME: "Design Studio", EMAIL: "hello@designstudio.com", TELEFONE: "(11) 92345-6789", DOCUMENTO: "55.666.777/0001-88", ENDERECO: "Rua Oscar Freire, 100", CIDADE: "São Paulo", STATUS: "Inativo" },
    { __record__id__: "6", ID: 6, NOME: "Empresa ABC Ltda", EMAIL: "contato@abc.com.br", TELEFONE: "(31) 93456-7890", DOCUMENTO: "99.888.777/0001-66", ENDERECO: "Av. Afonso Pena, 400", CIDADE: "Belo Horizonte", STATUS: "Ativo" },
];

const VIEW_MODE = {
    GRID: 0,
    FORM: 1
};

function Clientes() {
    const viewStackRef = useRef<any>(null);
    const [sourceRecords, setSourceRecords] = useState(CLIENTES_INITIAL_RECORDS);
    const [duClientes, setDuClientes] = useState<DataUnit | null>(null);
    const [currentView, setCurrentView] = useState<number>(VIEW_MODE.GRID);
    const [isInserting, setIsInserting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    function onViewModeChange(viewMode: number) {
        setCurrentView(viewMode);
    }

    function enterEditMode() {
        setIsUpdating(true);
        onViewModeChange(VIEW_MODE.FORM);
    }

    async function onCopyRecords() {
        if (!duClientes || !duClientes.getSelectionInfo().records.length) return;
        await duClientes.copySelected();
        await duClientes.loadData();
    }

    async function addNewRecord() {
        if (!duClientes) return;
        await duClientes.addRecord();
        onViewModeChange(VIEW_MODE.FORM);
        setIsInserting(true);
    }

    async function onSaveRecord() {
        if (!duClientes) return;
        await duClientes.saveData();
        setIsUpdating(false);
        setIsInserting(false);
        setCurrentView(VIEW_MODE.GRID);
    }

    function initDataUnit() {
        if (!duClientes) return;
        duClientes.metadataLoader = metadataLoaderClientes as any;
        duClientes.dataLoader = dataLoaderClientes as any;
        duClientes.saveLoader = saveLoaderClientes as any;
        duClientes.removeLoader = removeLoaderClientes as any;
    }

    function loadDataUnit() {
        if (!duClientes) return;
        duClientes.loadMetadata().then(() => {
            duClientes.loadData();
        });
    }

    function metadataLoaderClientes(dataUnit: any) {
        return new Promise((resolve) => {
            console.log("Metadados carregados:", CLIENTES_METADATA);
            resolve(CLIENTES_METADATA);
        });
    }

    function dataLoaderClientes(dataUnit: any) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("Dados carregados:", { records: sourceRecords });
                resolve({ records: sourceRecords });
            }, 500);
        });
    }

    function saveLoaderClientes(dataUnit: any, records: any) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newRecords = records.map((record: any) => {
                    if (!record.ID) {
                        record.ID = Math.floor(Math.random() * 100000);
                        record.__record__id__ = String(record.ID);
                    }
                    return record;
                });

                setSourceRecords((prevRecords) => {
                    const existingIds = new Set(prevRecords.map(r => r.__record__id__));
                    const updatedRecords = [...prevRecords];

                    newRecords.forEach((newRecord: any) => {
                        if (existingIds.has(newRecord.__record__id__)) {
                            const index = updatedRecords.findIndex(r => r.__record__id__ === newRecord.__record__id__);
                            if (index !== -1) {
                                updatedRecords[index] = newRecord;
                            }
                        } else {
                            updatedRecords.push(newRecord);
                        }
                    });

                    console.log("Registros salvos:", updatedRecords);
                    return updatedRecords;
                });

                resolve({ success: true });
            }, 300);
        });
    }

    function removeLoaderClientes(dataUnit: any, recordIds: any) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("IDs dos registros removidos:", recordIds);
                setSourceRecords(prevRecords =>
                    prevRecords.filter(record => !recordIds.includes(record.__record__id__))
                );
                resolve({ success: true });
            }, 300);
        });
    }

    async function backToGridMode() {
        if (!duClientes) return;
        await duClientes.cancelEdition();
        setIsInserting(false);
        setIsUpdating(false);
        onViewModeChange(VIEW_MODE.GRID);
    }

    useEffect(() => {
        const du = new DataUnit();
        setDuClientes(du);
    }, []);

    useEffect(() => {
        if (duClientes) {
            initDataUnit();
            loadDataUnit();
        }
    }, [duClientes]);

    useEffect(() => {
        if (viewStackRef.current) {
            viewStackRef.current.viewIndex = currentView;
        }
    }, [currentView]);

    const renderTaskbarButtons = () => (
        <div style={{ display: 'flex', gap: '8px' }}>
            <button
                onClick={() => duClientes && duClientes.removeSelectedRecords()}
                style={{
                    padding: '8px 12px',
                    backgroundColor: 'white',
                    color: '#626e82',
                    border: '1px solid #dce0e8',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                }}
            >
                🗑️ Excluir
            </button>
            <button
                onClick={onCopyRecords}
                style={{
                    padding: '8px 12px',
                    backgroundColor: 'white',
                    color: '#626e82',
                    border: '1px solid #dce0e8',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                }}
            >
                📋 Copiar
            </button>
            {currentView === VIEW_MODE.GRID && (
                <button
                    onClick={() => duClientes && duClientes.loadData()}
                    style={{
                        padding: '8px 12px',
                        backgroundColor: 'white',
                        color: '#626e82',
                        border: '1px solid #dce0e8',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                    }}
                >
                    🔄 Atualizar
                </button>
            )}
        </div>
    );

    const renderHeader = () => (
        <div slot="head">
            <header>
                <h1 className="header-title">Clientes</h1>
                <p className="header-subtitle">Gerencie sua base de clientes</p>
            </header>

            <section className="stats-grid">
                <div className="stat-card-content">
                    <span className="stat-label">Total de Clientes</span>
                    <span className="stat-value" style={{ color: '#008561' }}>156</span>
                </div>
                <div className="stat-card-content">
                    <span className="stat-label">Clientes Ativos</span>
                    <span className="stat-value" style={{ color: '#00cb94' }}>142</span>
                </div>
                <div className="stat-card-content">
                    <span className="stat-label">Novos Este Mês</span>
                    <span className="stat-value" style={{ color: '#da3688' }}>28</span>
                </div>
                <div className="stat-card-content">
                    <span className="stat-label">Taxa de Retenção</span>
                    <span className="stat-value" style={{ color: '#f2d410' }}>91%</span>
                </div>
            </section>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                {currentView === VIEW_MODE.GRID ? (
                    <>
                        <button
                            onClick={addNewRecord}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#008561',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 600,
                                fontSize: '0.95rem'
                            }}
                        >
                            + Novo Cliente
                        </button>
                        {renderTaskbarButtons()}
                    </>
                ) : (
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            onClick={backToGridMode}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: 'white',
                                color: '#626e82',
                                border: '1px solid #dce0e8',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 600,
                                fontSize: '0.95rem'
                            }}
                        >
                            ← Voltar
                        </button>
                        <button
                            onClick={onSaveRecord}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#008561',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 600,
                                fontSize: '0.95rem'
                            }}
                        >
                            💾 Salvar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

    const renderGrid = () => (
        <div className="chart-card" style={{ flex: 1, minHeight: '400px' }}>
            <h3 className="section-title">Lista de Clientes</h3>
            {duClientes && <EzGrid dataUnit={duClientes} onEzDoubleClick={enterEditMode} canEdit={false} mode="complete"></EzGrid>}
        </div>
    );

    const renderForm = () => (
        <div className="chart-card" style={{ flex: 1 }}>
            <h3 className="section-title">
                {isInserting ? '📝 Novo Cliente' : '✏️ Editar Cliente'}
            </h3>
            <div style={{ maxWidth: '800px' }}>
                {duClientes && <EzForm dataUnit={duClientes}></EzForm>}
            </div>
        </div>
    );

    return (
        <>
            <EzViewStack ref={viewStackRef}>
                {renderHeader()}
                <stack-item>
                    {renderGrid()}
                </stack-item>
                <stack-item>
                    {renderForm()}
                </stack-item>
            </EzViewStack>
        </>
    );
}

export default Clientes;
