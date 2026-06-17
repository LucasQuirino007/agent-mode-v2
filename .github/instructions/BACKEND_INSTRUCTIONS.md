---
applyTo: "backend/**"
---

# Backend Instructions — Portal de Consulta de Documentos

## Visão Geral

O backend é uma API REST construída com **Node.js** e **Express**, responsável por:

- Validar a identidade do colaborador.
- Retornar links temporários (simulando SAS Tokens do Azure Blob Storage) para os documentos disponíveis.

---

## Pré-requisitos

| Ferramenta | Versão mínima |
|---|---|
| Node.js | 20 LTS |
| npm | 9+ |

> Se estiver usando o **Codespaces / devcontainer**, o ambiente já estará configurado.

---

## Estrutura de Pastas

```
backend/
├── src/
│   ├── data/
│   │   └── colaboradores.js      # Dados mockados dos colaboradores
│   ├── routes/
│   │   ├── validacao.js          # POST /api/validar-colaborador
│   │   └── documentos.js         # GET  /api/documentos/:cpf
│   └── server.js                 # Entry point do servidor Express
├── storage/
│   ├── IR/
│   │   ├── 2024/                 # INF_2024_CPF.pdf
│   │   └── 2025/                 # INF_2025_CPF.pdf
│   └── BOLETOS/
│       └── 2025/
│           └── 01/               # BLT_01_2025_CPF.pdf
└── package.json
```

---

## Instalação

```bash
cd backend
npm install
```

---

## Rodando o Servidor de Desenvolvimento

```bash
npm run dev
```

O servidor iniciará na porta **3001**.

> URL base: `http://localhost:3001`

---

## Endpoints

### `POST /api/validar-colaborador`

Valida a identidade do colaborador com base nos dados fornecidos.

**Request body:**

```json
{
  "matricula": "12345",
  "cpf": "123.456.789-00",
  "dataNascimento": "1990-01-15",
  "dataAdmissao": "2015-03-01"
}
```

**Resposta de sucesso (200):**

```json
{
  "success": true,
  "message": "Colaborador validado com sucesso.",
  "colaborador": {
    "nome": "João Silva",
    "cpf": "123.456.789-00"
  }
}
```

**Resposta de erro (404):**

```json
{
  "success": false,
  "message": "Pessoa não localizada."
}
```

---

### `GET /api/documentos/:cpf?tipo=IR|BOLETO`

Retorna a lista de documentos disponíveis com links temporários simulados.

**Parâmetros:**

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `cpf` | path | CPF do colaborador (somente dígitos ou formatado) |
| `tipo` | query | `IR` para Informes de Rendimentos ou `BOLETO` para Boletos |

**Resposta de sucesso (200):**

```json
{
  "success": true,
  "documentos": [
    {
      "nome": "Informe de Rendimentos 2024",
      "tipo": "IR",
      "ano": "2024",
      "link": "http://localhost:3001/storage/IR/2024/INF_2024_12345678900.pdf?token=uuid-aqui&expires=1234567890"
    }
  ]
}
```

**Resposta de erro (404):**

```json
{
  "success": false,
  "message": "Documento não localizado."
}
```

---

## Dados Mockados

O arquivo `src/data/colaboradores.js` contém **5 colaboradores fictícios** com os seguintes campos:

- `matricula`
- `cpf`
- `dataNascimento`
- `dataAdmissao`
- `nome`

---

## Variáveis de Ambiente

Crie um arquivo `.env` na pasta `backend/` com:

```env
PORT=3001
TOKEN_EXPIRATION_SECONDS=3600
```

---

## Troubleshooting

| Problema | Solução |
|---|---|
| `Error: listen EADDRINUSE :::3001` | Outra aplicação está usando a porta 3001. Encerre-a ou mude `PORT` no `.env`. |
| `Cannot find module 'express'` | Execute `npm install` dentro da pasta `backend/`. |
| CORS bloqueando requisições do frontend | Verifique se o middleware `cors` está habilitado no `server.js`. |
| Link temporário expirado | O token tem expiração configurável via `TOKEN_EXPIRATION_SECONDS`. |
