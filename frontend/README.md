# Frontend — Portal de Consulta de Documentos

Interface web em **React 18 + Vite 5 + Tailwind CSS 3** para consulta de documentos de colaboradores (Informes de Rendimentos e Boletos).

## Descrição

O portal permite que o colaborador:
1. Informe seus dados (matrícula, CPF, data de nascimento e data de admissão) para se autenticar.
2. Visualize e acesse os documentos disponíveis vinculados ao seu CPF.
3. Filtre os documentos por tipo (IR ou Boleto).

A comunicação com o backend é feita via API REST em `http://localhost:3001`.

## Requisitos

- Node.js 20 LTS+
- npm 9+
- Backend rodando em `http://localhost:3001`

## Instalação

```bash
cd frontend
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:5173` no navegador.

## Variáveis de ambiente

Crie (ou ajuste) o arquivo `.env` na pasta `frontend/`:

```env
VITE_API_URL=http://localhost:3001
```

## Build

```bash
npm run build
```

Gera os arquivos otimizados na pasta `dist/`.

## Dados de teste (mocks)

Use os dados abaixo no formulário de validação para testar a autenticação:

| Nome | Matrícula | CPF | Data de Nascimento | Data de Admissão |
|------|-----------|-----|--------------------|------------------|
| João Silva | 12345 | 123.456.789-00 | 1990-01-15 | 2015-03-01 |
| Maria Souza | 23456 | 987.654.321-00 | 1988-07-22 | 2012-09-10 |
| Carlos Oliveira | 34567 | 456.789.123-11 | 1993-11-08 | 2018-01-20 |
| Ana Pereira | 45678 | 321.654.987-22 | 1985-04-30 | 2010-06-15 |
| Rafael Costa | 56789 | 159.357.258-33 | 1996-12-02 | 2020-08-03 |

> Todos os campos devem ser preenchidos exatamente como na tabela para que a validação seja bem-sucedida.
