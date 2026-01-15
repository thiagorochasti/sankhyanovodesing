import React, { useState, useEffect, useRef } from 'react';
import { EzGrid, EzButton, EzViewStack, EzForm, EzIcon } from '@sankhyalabs/ezui/react/components';
import { DataUnit, StringUtils } from '@sankhyalabs/core';

const VENDAS_METADATA = {
    name: "vendas",
    label: "Vendas",
    fields: [
        { name: "ID", label: "Nº Venda", dataType: "NUMBER", userInterface: "INTEGERNUMBER", readOnly: true, required: false },
        { name: "DATA", label: "Data", dataType: "TEXT", userInterface: "TEXT", readOnly: false, required: true },
        { name: "CLIENTE", label: "Cliente", dataType: "TEXT", userInterface: "TEXT", readOnly: false, required: true },
        { name: "PRODUTO", label: "Produto", dataType: "TEXT", userInterface: "TEXT", readOnly: false, required: true },
        { name: "QTD", label: "Quantidade", dataType: "NUMBER", userInterface: "INTEGERNUMBER", readOnly: false, required: true },
        { name: "VALOR_UNIT", label: "Valor Unitário", dataType: "NUMBER", userInterface: "DECIMALNUMBER", readOnly: false, required: true },
        { name: "TOTAL", label: "Total", dataType: "NUMBER", userInterface: "DECIMALNUMBER", readOnly: true, required: false },
        { name: "STATUS", label: "Status", dataType: "TEXT", userInterface: "TEXT", readOnly: false, required: true }
    ]
};

const VENDAS_INITIAL_RECORDS = [
    { __record__id__: "1", ID: 1050, DATA: "15/01/2026", CLIENTE: "Empresa ABC Ltda", PRODUTO: "Licença Software ERP", QTD: 5, VALOR_UNIT: 2500.00, TOTAL: 12500.00, STATUS: "Concluído" },
    { __record__id__: "2", ID: 1049, DATA: "15/01/2026", CLIENTE: "Design Studio", PRODUTO: "Mouse Logitech MX Master", QTD: 2, VALOR_UNIT: 450.00, TOTAL: 900.00, STATUS: "Concluído" },
    { __record__id__: "3", ID: 1048, DATA: "14/01/2026", CLIENTE: "Dev House", PRODUTO: "Teclado Mecânico Keychron", QTD: 3, VALOR_UNIT: 650.00, TOTAL: 1950.00, STATUS: "Enviado" },
    { __record__id__: "4", ID: 1047, DATA: "14/01/2026", CLIENTE: "João da Silva", PRODUTO: "Monitor LG Ultrawide", QTD: 1, VALOR_UNIT: 1200.00, TOTAL: 1200.00, STATUS: "Concluído" },
    { __record__id__: "5", ID: 1046, DATA: "13/01/2026", CLIENTE: "Consultoria Silva", PRODUTO: "Notebook Dell XPS", QTD: 2, VALOR_UNIT: 8900.00, TOTAL: 17800.00, STATUS: "Pendente" },
    { __record__id__: "6", ID: 1045, DATA: "13/01/2026", CLIENTE: "Tech Solutions Ltda", PRODUTO: "Smartphone Galaxy S23", QTD: 10, VALOR_UNIT: 4500.00, TOTAL: 45000.00, STATUS: "Pendente" },
    { __record__id__: "7", ID: 1044, DATA: "12/01/2026", CLIENTE: "Startup XYZ", PRODUTO: "Cadeira Ergonômica", QTD: 15, VALOR_UNIT: 850.00, TOTAL: 12750.00, STATUS: "Concluído" },
];

const VIEW_MODE = {
    GRID: 0,
    FORM: 1
};

function Vendas() {
    const viewStackRef = useRef<any>(null);
    const [sourceRecords, setSourceRecords] = useState(VENDAS_INITIAL_RECORDS);
    const [duVendas, setDuVendas] = useState<DataUnit | null>(null);
    const [currentView, setCurrentView] = useState<number>(VIEW_MODE.GRID);
    const [isInserting, setIsInserting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    // Muda a stack view atual
    function onViewModeChange(viewMode: number) {
        setCurrentView(viewMode);
    }

    function enterEditMode() {
        setIsUpdating(true);
        onViewModeChange(VIEW_MODE.FORM);
    }

    async function onCopyRecords() {
        if (!duVendas || !duVendas.getSelectionInfo().records.length) return;
        await duVendas.copySelected();
        await duVendas.loadData();
    }

    async function addNewRecord() {
        if (!duVendas) return; await duVendas.addRecord();
        onViewModeChange(VIEW_MODE.FORM);
        setIsInserting(true);
    }

    async function onSaveRecord() {
        if (!duVendas) return; await duVendas.saveData();
        setIsUpdating(false);
        setIsInserting(false);
        setCurrentView(VIEW_MODE.GRID);
    }

    // Sobrescreve os loaders do dataUnit
    function initDataUnit() {
        if (!duVendas) return; duVendas.metadataLoader = metadataLoaderVendas as any;
        duVendas.dataLoader = dataLoaderVendas as any;
        duVendas.saveLoader = saveLoaderVendas as any;
        duVendas.removeLoader = removeLoaderVendas as any;
    }

    // Carrega as informações do dataUnit
    function loadDataUnit() {
        if (!duVendas) return; duVendas.loadMetadata().then(() => {
            duVendas.loadData();
        });
    }

    // Implementação do metadataLoader
    function metadataLoaderVendas(dataUnit: any) {
        return new Promise((resolve) => {
            console.log("Metadados carregados:", VENDAS_METADATA);
            resolve(VENDAS_METADATA);
        });
    }

    // Implementação do dataLoader
    function dataLoaderVendas(dataUnit: any) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("Dados carregados:", { records: sourceRecords });
                resolve({ records: sourceRecords });
            }, 500);
        });
    }

    function removeLoaderVendas(dataUnit: any, recordIds: any) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("IDs dos registros removidos:", recordIds);
                resolve(recordIds);
            }, 500);
        });
    }

    function saveLoaderVendas(dataUnit: any, changes: any) {
        return new Promise((resolve) => {
            setTimeout(() => {
                let dataUnitRecords: any[] = [];

                changes.forEach((change: any) => {
                    let { record, updatingFields, operation } = change;

                    // Atribui um ID caso um novo registro seja adicionado
                    if (operation === "INSERT") {
                        record["__record__id__"] = generateUniqueId(updatingFields);
                        record["ID"] = Math.max(...sourceRecords.map(r => r.ID || 0)) + 1;
                    }

                    // Calcula o total automaticamente
                    const qtd = updatingFields["QTD"] || record["QTD"] || 0;
                    const valorUnit = updatingFields["VALOR_UNIT"] || record["VALOR_UNIT"] || 0;
                    updatingFields["TOTAL"] = qtd * valorUnit;

                    // Atualiza o registro com as alterações realizadas
                    dataUnitRecords.push({ ...record, ...updatingFields });
                });

                console.log("Alterações salvas:", changes);
                setSourceRecords(dataUnitRecords);
                resolve(dataUnitRecords);
            }, 500);
        });
    }

    // Gera um ID único para um novo registro
    function generateUniqueId(updatingFields) {
        return StringUtils.hashCode(`${updatingFields["CLIENTE"] + updatingFields["PRODUTO"]}`) + Math.floor(Math.random() * 200000);
    }

    async function backToGridMode() {
        if (!duVendas) return; await duVendas.cancelEdition();
        setIsInserting(false);
        setIsUpdating(false);
        onViewModeChange(VIEW_MODE.GRID);
    }

    useEffect(() => {
        setDuVendas(new DataUnit());
    }, []);

    useEffect(() => {
        if (duVendas == undefined) return;
        initDataUnit();
        loadDataUnit();
    }, [duVendas]);

    useEffect(() => {
        if (viewStackRef.current) {
            viewStackRef.current.show(currentView);
        }
    }, [currentView]);

    const renderTaskbarButtons = () => (
        <div style={{ display: 'flex', gap: '8px' }}>
            <button
                onClick={() => duVendas && duVendas.removeSelectedRecords()}
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
                    onClick={() => duVendas && duVendas.loadData()}
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

    const renderHeader = () => {
        const updateHeaderButtons = (
            <>
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
                        fontSize: '0.95rem',
                        marginRight: '12px'
                    }}
                >
                    Cancelar
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
            </>
        );

        return (
            <>
                <header>
                    <h1 className="header-title">Vendas</h1>
                    <p className="header-subtitle">Gerencie todas as vendas realizadas</p>
                </header>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    {currentView === VIEW_MODE.FORM && (
                        <button
                            onClick={backToGridMode}
                            style={{
                                padding: '8px',
                                backgroundColor: 'white',
                                color: '#626e82',
                                border: '1px solid #dce0e8',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '1.2rem'
                            }}
                        >
                            ← Voltar
                        </button>
                    )}

                    <div style={{ flex: 1 }}></div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        {currentView === VIEW_MODE.FORM && !isInserting && renderTaskbarButtons()}

                        {!isInserting && !isUpdating && (
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
                                + Nova Venda
                            </button>
                        )}

                        {(isInserting || isUpdating) && updateHeaderButtons}
                    </div>
                </div>
            </>
        );
    };

    const renderGrid = () => (
        <div className="chart-card" style={{ flex: 1, minHeight: '400px' }}>
            <h3 className="section-title">Lista de Vendas</h3>
            {duVendas && (
                <EzGrid dataUnit={duVendas} onEzDoubleClick={enterEditMode} canEdit={false} mode="complete">
                    <div slot='leftButtons'>
                        {renderTaskbarButtons()}
                    </div>
                </EzGrid>
            )}
        </div>
    );

    const renderForm = () => (
        <div className='chart-card' style={{ padding: '24px' }}>
            <h3 className="section-title" style={{ marginBottom: '24px' }}>
                {isInserting ? '📝 Nova Venda' : '✏️ Editar Venda'}
            </h3>
            <div style={{ maxWidth: '800px' }}>
                {duVendas && <EzForm dataUnit={duVendas}></EzForm>}
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

export default Vendas;
