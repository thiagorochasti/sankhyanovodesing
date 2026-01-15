import React, { useState, useEffect } from 'react';
import { EzGrid, EzForm } from '@sankhyalabs/ezui/react/components';
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
    const [sourceRecords, setSourceRecords] = useState(VENDAS_INITIAL_RECORDS);
    const [duVendas, setDuVendas] = useState<DataUnit | null>(null);
    const [currentView, setCurrentView] = useState<number>(VIEW_MODE.GRID);
    const [isInserting, setIsInserting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedCount, setSelectedCount] = useState(0); // Estado para contar seleção

    function onViewModeChange(viewMode: number) {
        setCurrentView(viewMode);
    }

    function enterEditMode() {
        setIsUpdating(true);
        onViewModeChange(VIEW_MODE.FORM);
    }

    async function onCopyRecords() {
        if (!duVendas) return;
        await duVendas.copySelected();
        await duVendas.loadData();
    }

    async function addNewRecord() {
        if (!duVendas) return;
        await duVendas.addRecord();
        onViewModeChange(VIEW_MODE.FORM);
        setIsInserting(true);
    }

    async function onSaveRecord() {
        if (!duVendas) return;
        await duVendas.saveData();
        setIsUpdating(false);
        setIsInserting(false);
        setCurrentView(VIEW_MODE.GRID);
    }

    function initDataUnit() {
        if (!duVendas) return;
        duVendas.metadataLoader = metadataLoaderVendas as any;
        duVendas.dataLoader = dataLoaderVendas as any;
        duVendas.saveLoader = saveLoaderVendas as any;
        duVendas.removeLoader = removeLoaderVendas as any;
    }

    function loadDataUnit() {
        if (!duVendas) return;
        duVendas.loadMetadata().then(() => {
            duVendas.loadData();
        });
    }

    function metadataLoaderVendas(dataUnit: any) {
        return new Promise((resolve) => {
            console.log("Metadados carregados:", VENDAS_METADATA);
            resolve(VENDAS_METADATA);
        });
    }

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

                    if (operation === "INSERT") {
                        record["__record__id__"] = generateUniqueId(updatingFields);
                        record["ID"] = Math.max(...sourceRecords.map(r => r.ID || 0)) + 1;
                    }

                    const qtd = updatingFields["QTD"] || record["QTD"] || 0;
                    const valorUnit = updatingFields["VALOR_UNIT"] || record["VALOR_UNIT"] || 0;
                    updatingFields["TOTAL"] = qtd * valorUnit;

                    dataUnitRecords.push({ ...record, ...updatingFields });
                });

                console.log("Alterações salvas:", changes);
                setSourceRecords(dataUnitRecords);
                resolve(dataUnitRecords);
            }, 500);
        });
    }

    function generateUniqueId(updatingFields: any) {
        return StringUtils.hashCode(`${updatingFields["CLIENTE"] + updatingFields["PRODUTO"]}`) + Math.floor(Math.random() * 200000);
    }

    async function backToGridMode() {
        if (!duVendas) return;
        await duVendas.cancelEdition();
        setIsInserting(false);
        setIsUpdating(false);
        onViewModeChange(VIEW_MODE.GRID);
    }

    // Listener para eventos de seleção do AG Grid
    function handleRowSelection(event: any) {
        console.log("Selection event:", event);
        console.log("Event detail:", event.detail);

        // Stencil custom events use event.detail, not event.api
        // ISelection interface has selection array, not records
        const selectionInfo = event.detail;
        const count = selectionInfo?.selection?.length || 0;
        console.log("Selection count:", count);
        setSelectedCount(count);
    }

    useEffect(() => {
        const du = new DataUnit();
        setDuVendas(du);
    }, []);

    useEffect(() => {
        if (duVendas) {
            initDataUnit();
            loadDataUnit();
        }
    }, [duVendas]);

    // Fix Shadow DOM labels - inject CSS after form renders
    useEffect(() => {
        if (currentView === VIEW_MODE.FORM) {
            setTimeout(() => {
                const inputs = document.querySelectorAll('ez-text-input, ez-number-input, ez-date-input, ez-select');
                inputs.forEach((input: any) => {
                    if (input.shadowRoot) {
                        const label = input.shadowRoot.querySelector('label');
                        if (label) {
                            label.style.transform = 'translateY(-28px) scale(0.85)';
                            label.style.transformOrigin = 'top left';
                            label.style.background = 'white';
                            label.style.padding = '0 4px';
                            label.style.color = '#008561';
                        }
                        const inputEl = input.shadowRoot.querySelector('input');
                        if (inputEl) {
                            inputEl.style.paddingTop = '16px';
                        }
                    }
                });
            }, 100);
        }
    }, [currentView]);


    const renderGridToolbar = () => {
        if (!duVendas) return null;
        const hasSelection = selectedCount > 0;

        return (
            <div className="grid-toolbar" style={{ marginBottom: '16px' }}>
                <button
                    className="grid-action-btn grid-action-btn-primary"
                    onClick={addNewRecord}
                    title="Criar novo registro"
                >
                    <span className="btn-icon">➕</span>
                    Novo
                </button>

                <div className="toolbar-separator"></div>

                <button
                    className="grid-action-btn"
                    onClick={enterEditMode}
                    disabled={!hasSelection}
                    title="Editar registro selecionado"
                >
                    <span className="btn-icon">✏️</span>
                    Editar
                </button>

                <button
                    className="grid-action-btn grid-action-btn-danger"
                    onClick={() => duVendas && duVendas.removeSelectedRecords()}
                    disabled={!hasSelection}
                    title="Excluir registros selecionados"
                >
                    <span className="btn-icon">🗑️</span>
                    Excluir
                </button>

                <button
                    className="grid-action-btn"
                    onClick={onCopyRecords}
                    disabled={!hasSelection}
                    title="Duplicar registro selecionado"
                >
                    <span className="btn-icon">📋</span>
                    Duplicar
                </button>

                <div className="toolbar-separator"></div>

                <button
                    className="grid-action-btn"
                    onClick={() => duVendas && duVendas.loadData()}
                    title="Atualizar dados"
                >
                    <span className="btn-icon">🔄</span>
                    Atualizar
                </button>

                {hasSelection && (
                    <span style={{ marginLeft: '12px', color: '#626e82', fontSize: '13px' }}>
                        {selectedCount} selecionado(s)
                    </span>
                )}
            </div>
        );
    };

    return (
        <>
            <header>
                <h1 className="header-title">Vendas</h1>
                <p className="header-subtitle">Gerencie todas as vendas realizadas</p>
            </header>

            {currentView === VIEW_MODE.GRID ? (
                <>
                    {renderGridToolbar()}
                    <div className="chart-card" style={{ flex: 1, minHeight: '500px', height: 'calc(100vh - 300px)' }}>
                        <h3 className="section-title">Lista de Vendas</h3>
                        {duVendas && (
                            <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
                                <EzGrid
                                    dataUnit={duVendas}
                                    onEzDoubleClick={enterEditMode}
                                    onEzSelectionChange={handleRowSelection}
                                    canEdit={false}
                                    mode="complete"
                                />
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className="chart-card" style={{ padding: '24px' }}>
                    <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 className="section-title" style={{ marginBottom: 0 }}>
                            {isInserting ? '📝 Nova Venda' : '✏️ Editar Venda'}
                        </h3>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                className="grid-action-btn"
                                onClick={backToGridMode}
                            >
                                ← Cancelar
                            </button>
                            <button
                                className="grid-action-btn grid-action-btn-primary"
                                onClick={onSaveRecord}
                            >
                                💾 Salvar
                            </button>
                        </div>
                    </div>
                    <div style={{ maxWidth: '800px' }}>
                        {duVendas && <EzForm dataUnit={duVendas}></EzForm>}
                    </div>
                </div>
            )}
        </>
    );
}

export default Vendas;
