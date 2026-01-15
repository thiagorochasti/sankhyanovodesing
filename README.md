# 📊 Sankhya App - Sistema de Gestão Empresarial

> **Desenvolvido por:** Thiago Rochasti  
> **Repositório:** [github.com/thiagorochasti/sankhyanovodesing](https://github.com/thiagorochasti/sankhyanovodesing)

## 🎯 Sobre o Projeto

Aplicação moderna de gestão empresarial construída com **Sankhya Design System**, implementando padrões CRUD completos com componentes oficiais da Sankhya. O projeto demonstra a utilização de `EzGrid`, `EzForm`, `EzViewStack` e `DataUnit` para criar interfaces profissionais e funcionais.

Este sistema foi desenvolvido como uma demonstração prática de como criar aplicações empresariais robustas seguindo as melhores práticas do ecossistema Sankhya.

## ✨ Funcionalidades

### 📈 Dashboard
- Visão geral com métricas em tempo real
- Cards informativos com estatísticas de negócio
- Gráficos de vendas e performance
- Tabela de transações recentes

### 💼 Vendas (CRUD Completo)
- ✅ Grid interativo com ag-grid
- ✅ Formulário automático baseado em metadata
- ✅ Criar, editar, excluir e copiar vendas
- ✅ Duplo-clique para editar registros
- ✅ Navegação fluida entre grid e formulário

### 👥 Clientes (CRUD Completo)
- ✅ Gerenciamento completo da base de clientes
- ✅ Formulários validados automaticamente
- ✅ Filtros e busca inteligente
- ✅ Estatísticas de retenção e novos clientes

### 📦 Produtos (CRUD Completo)
- ✅ Catálogo de produtos com categorias
- ✅ Controle de estoque e preços
- ✅ Interface intuitiva para cadastro
- ✅ Alertas de estoque baixo

### ⚙️ Configurações
- Configurações do sistema
- Preferências do usuário
- Opções de personalização

## 🛠️ Tecnologias Utilizadas

### Core
- **React 19** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática para maior segurança
- **Sankhya Design System** - Componentes oficiais Sankhya
  - `@sankhyalabs/ezui` - UI Components
  - `@sankhyalabs/core` - DataUnit e utilitários

### Grid & Forms
- **ag-grid-community** - Grid enterprise-grade
- **ag-grid-react** - Integração React para ag-grid
- **EzGrid** - Grid Sankhya com ag-grid
- **EzForm** - Formulários automáticos por metadata

### Design
- **Paleta oficial Sankhya**
  - Primary: `#008561`
  - Secondary: `#00cb94`
  - Accent: `#da3688`
  - Warning: `#f2d410`

## 📋 Pré-requisitos

- Node.js 16+ 
- npm ou yarn
- Git

## 🚀 Como Executar

### 1. Clone o repositório
```bash
git clone https://github.com/thiagorochasti/sankhyanovodesing.git
cd sankhyanovodesing
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Inicie o servidor de desenvolvimento
```bash
npm start
```

A aplicação estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
sankhya-app/
├── public/              # Arquivos públicos
├── src/
│   ├── pages/          # Páginas da aplicação
│   │   ├── Dashboard.tsx    # Dashboard principal
│   │   ├── Vendas.tsx       # CRUD de Vendas ✅
│   │   ├── Clientes.tsx     # CRUD de Clientes ✅
│   │   ├── Produtos.tsx     # CRUD de Produtos ✅
│   │   └── Configuracoes.tsx
│   ├── App.tsx         # Componente principal
│   ├── App.css         # Estilos globais
│   ├── index.tsx       # Entry point
│   └── react-app-env.d.ts  # Tipos TypeScript
├── package.json
└── tsconfig.json
```

## 💡 Padrão CRUD Implementado

Todas as páginas CRUD seguem o padrão oficial Sankhya:

### 1. Metadata
```typescript
const METADATA = {
    name: "vendas",
    label: "Vendas",
    fields: [
        { name: "ID", dataType: "NUMBER", readOnly: true },
        { name: "DATA", dataType: "TEXT", required: true },
        // ... outros campos
    ]
};
```

### 2. DataUnit com Loaders Customizados
```typescript
- metadataLoader: Retorna estrutura dos campos
- dataLoader: Carrega dados (simula API)
- saveLoader: Persiste INSERT/UPDATE
- removeLoader: Remove registros
```

### 3. EzViewStack para Navegação
```typescript
<EzViewStack>
    <stack-item>Grid View</stack-item>
    <stack-item>Form View</stack-item>
</EzViewStack>
```

### 4. Componentes Sankhya
- `EzGrid` - Grid com ag-grid integrado
- `EzForm` - Formulário automático
- `EzButton` - Botões estilizados
- `DataUnit` - Gerenciamento de dados

## 🎨 Princípios de Design

- **Interface Moderna**: Design limpo e profissional
- **Responsividade**: Funciona em Desktop e Tablets
- **Paleta Oficial**: Cores do Sankhya Design System
- **Acessibilidade**: Componentes acessíveis por padrão
- **Consistência**: Padrões uniformes em todas as telas

## 📝 Scripts Disponíveis

```bash
npm start        # Inicia servidor de desenvolvimento
npm test         # Executa testes
npm run build    # Gera build de produção
npm run eject    # Ejeta configuração do CRA
```

## 🐛 Solução de Problemas

### Erro de TypeScript com custom elements
Os tipos para `ez-*` components estão definidos em `react-app-env.d.ts`

### Grid não exibe corretamente
Certifique-se de que o CSS do ag-grid está importado em `index.tsx`:
```typescript
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
```

## 📚 Documentação Sankhya

- [Sankhya Design System](https://gilded-nasturtium-6b64dd.netlify.app/)
- [Componentes](https://gilded-nasturtium-6b64dd.netlify.app/docs/components/components-doc/)
- [Como criar CRUD](https://gilded-nasturtium-6b64dd.netlify.app/blog#introdu%C3%A7%C3%A3o)

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um Fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 👨‍💻 Autor

**Thiago Rochasti**
- GitHub: [@thiagorochasti](https://github.com/thiagorochasti)
- Projeto: [Sankhya App](https://github.com/thiagorochasti/sankhyanovodesing)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!

**Desenvolvido com ❤️ usando Sankhya Design System**
