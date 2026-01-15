import React, { useState, useEffect, useRef } from 'react';
import { EzGrid, EzButton, EzViewStack, EzForm, EzIcon } from '@sankhyalabs/ezui/react/components';
import { DataUnit, StringUtils } from '@sankhyalabs/core';

const PRODUTOS_METADATA = {
    name: "produtos",
    label: "Produtos",
    fields: [
        { name: "ID", label: "Código", dataType: "NUMBER", userInterface: "INTEGERNUMBER", readOnly: true, required: false },
        { name: "NOME", label: "Nome do Produto", dataType: "TEXT", userInterface: "TEXT", readOnly: false, required: true },
        { name: "CATEGORIA", label: "Categoria", dataType: "TEXT", userInterface: "TEXT", readOnly: false, required: true },
        { name: "PRECO", label: "Preço", dataType: "NUMBER", userInterface: "DECIMALNUMBER", readOnly: false, required: true },
        { name: "ESTOQUE", label: "Estoque", dataType: "NUMBER", userInterface: "INTEGERNUMBER", readOnly: false, required: true },
        { name: "FORNECEDOR", label: "Fornecedor", dataType: "TEXT", userInterface: "TEXT", readOnly: false, required: false },
        { name: "DESCRICAO", label: "Descrição", dataType: "TEXT", userInterface: "TEXT", readOnly: false, required: false },
        { name: "STATUS", label: "Status", dataType: "TEXT", userInterface: "TEXT", readOnly: false, required: true }
    ]
};

const PRODUTOS_INITIAL_RECORDS = [
    { __record__id__: "1", ID: 101, NOME: "Notebook Dell XPS 15", CATEGORIA: "Informática", PRECO: 8900.00, ESTOQUE: 12, FORNECEDOR: "Dell Inc.", DESCRICAO: "Notebook de alta performance", STATUS: "Ativo" },
    { __record__id__: "2", ID: 102, NOME: "Mouse Logitech MX Master", CATEGORIA: "Periféricos", PRECO: 450.00, ESTOQUE: 35, FORNECEDOR: "Logitech", DESCRICAO: "Mouse ergonômico wireless", STATUS: "Ativo" },
    { __record__id__: "3", ID: 103, NOME: "Teclado Mecânico Keychron K8", CATEGORIA: "Periféricos", PRECO: 650.00, ESTOQUE: 20, FORNECEDOR: "Keychron", DESCRICAO: "Teclado mecânico wireless", STATUS: "Ativo" },
    { __record__id__: "4", ID: 104, NOME: "Monitor LG UltraWide 34\"", CATEGORIA: "Monitores", PRECO: 2100.00, ESTOQUE: 8, FORNECEDOR: "LG Electronics", DESCRICAO: "Monitor ultrawide 21:9", STATUS: "Ativo" },
    { __record__id__: "5", ID: 105, NOME: "Cadeira Ergonômica Herman Miller", CATEGORIA: "Mobiliário", PRECO: 5500.00, ESTOQUE: 5, FORNECEDOR: "Herman Miller", DESCRICAO: "Cadeira ergonômica premium", STATUS: "Ativo" },
    { __record__id__: "6", ID: 106, NOME: "Webcam Logitech C920", CATEGORIA: "Periféricos", PRECO: 350.00, ESTOQUE: 0, FORNECEDOR: "Logitech", DESCRICAO: "Webcam Full HD", STATUS: "Inativo" },
];

const VIEW_MODE = {
    GRID: 0,
    FORM: 1
};

function Produtos() {
    const viewStackRef = useRef<any>(null);
    const [sourceRecords, setSourceRecords] = useState(PRODUTOS_INITIAL_RECORDS);
    const [duProdutos, setDuProdutos] = useState<DataUnit | null>(null);
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
        if (!duProdutos || !duProdutos.getSelectionInfo().records.length) return;
        await duProdutos.copySelected();
        await duProdutos.loadData();
    }

    async function addNewRecord() {
        if (!duProdutos) return;
        await duProdutos.addRecord();
        onViewModeChange(VIEW_MODE.FORM);
        setIsInserting(true);
    }

    async function onSaveRecord() {
        if (!duProdutos) return;
        await duProdutos.saveData();
        setIsUpdating(false);
        setIsInserting(false);
        setCurrentView(VIEW_MODE.GRID);
    }

    function initDataUnit() {
        if (!duProdutos) return;
        duProdutos.metadataLoader = metadataLoaderProdutos as any;
        duProdutos.dataLoader = dataLoaderProdutos as any;
        duProdutos.saveLoader = saveLoaderProdutos as any;
        duProdutos.removeLoader = removeLoaderProdutos as any;
    }

    function loadDataUnit() {
        if (!duProdutos) return;
        duProdutos.loadMetadata().then(() => {
            duProdutos.loadData();
        });
    }

    function metadataLoaderProdutos(dataUnit: any) {
        return new Promise((resolve) => {
            console.log("Metadados carregados:", PRODUTOS_METADATA);
            resolve(PRODUTOS_METADATA);
        });
    }

    function dataLoaderProdutos(dataUnit: any) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("Dados carregados:", { records: sourceRecords });
                resolve({ records: sourceRecords });
            }, 500);
        });
    }

    function saveLoaderProdutos(dataUnit: any, records: any) {
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

    function removeLoaderProdutos(dataUnit: any, recordIds: any) {
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
        if (!duProdutos) return;
        await duProdutos.cancelEdition();
        setIsInserting(false);
        setIsUpdating(false);
        onViewModeChange(VIEW_MODE.GRID);
    }

    useEffect(() => {
        const du = new DataUnit();
        setDuProdutos(du);
    }, []);

    useEffect(() => {
        if (duProdutos) {
            initDataUnit();
            loadDataUnit();
        }
    }, [duProdutos]);

    useEffect(() => {
        if (viewStackRef.current) {
            viewStackRef.current.viewIndex = currentView;
        }
    }, [currentView]);

    const renderTaskbarButtons = () => (
        <div style={{ display: 'flex', gap: '8px' }}>
            <button
                onClick={() => duProdutos && duProdutos.removeSelectedRecords()}
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
                    onClick={() => duProdutos && duProdutos.loadData()}
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
                <h1 className="header-title">Produtos</h1>
                <p className="header-subtitle">Gerencie seu catálogo de produtos</p>
            </header>

            <section className="stats-grid">
                <div className="stat-card-content">
                    <span className="stat-label">Total de Produtos</span>
                    <span className="stat-value" style={{ color: '#008561' }}>124</span>
                </div>
                <div className="stat-card-content">
                    <span className="stat-label">Produtos Ativos</span>
                    <span className="stat-value" style={{ color: '#00cb94' }}>118</span>
                </div>
                <div className="stat-card-content">
                    <span className="stat-label">Estoque Baixo</span>
                    <span className="stat-value" style={{ color: '#da3688' }}>8</span>
                </div>
                <div className="stat-card-content">
                    <span className="stat-label">Valor Total</span>
                    <span className="stat-value" style={{ color: '#f2d410' }}>R$ 458K</span>
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
                            + Novo Produto
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
            <h3 className="section-title">Catálogo de Produtos</h3>
            {duProdutos && <EzGrid dataUnit={duProdutos} onEzDoubleClick={enterEditMode} canEdit={false} mode="complete"></EzGrid>}
        </div>
    );

    const renderForm = () => (
        <div className="chart-card" style={{ flex: 1 }}>
            <h3 className="section-title">
                {isInserting ? '📦 Novo Produto' : '✏️ Editar Produto'}
            </h3>
            <div style={{ maxWidth: '800px' }}>
                {duProdutos && <EzForm dataUnit={duProdutos}></EzForm>}
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

export default Produtos;
