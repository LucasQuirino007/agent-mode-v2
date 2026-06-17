# Backend — Portal de Consulta de Documentos

API REST em **Node.js + Express** responsável por validar colaboradores e fornecer links temporários para download de documentos (Informe de Rendimentos e Boletos).

## Descrição

O backend expõe dois grupos de endpoints:
- **Validação de colaborador** — autentica o colaborador comparando matrícula, CPF, data de nascimento e data de admissão com os dados cadastrados.
- **Consulta de documentos** — retorna links temporários (com token e expiração) para os PDFs armazenados em `storage/`, filtráveis por tipo (`IR` ou `BOLETO`).

## Requisitos

- Node.js 20 LTS+
- npm 9+

## Instalação

```bash
cd backend
npm install
```

## Execução

```bash
npm start
```

O servidor sobe em `http://localhost:3001` por padrão.

### Variáveis de ambiente (opcional)

Crie um arquivo `.env` na pasta `backend/`:

```env
PORT=3001
TOKEN_EXPIRATION_SECONDS=3600
```

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/health` | Verifica se o servidor está no ar |
| POST | `/api/validar-colaborador` | Valida os dados do colaborador |
| GET | `/api/documentos/:cpf` | Retorna documentos disponíveis para o CPF |

### Parâmetros — `GET /api/documentos/:cpf`

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `cpf` | path | Sim | CPF do colaborador (com ou sem máscara) |
| `tipo` | query | Não | Filtra por tipo: `IR` ou `BOLETO` |

## Dados de teste (mocks)

Os colaboradores abaixo estão cadastrados nos mocks e podem ser usados para validação:

| Nome | Matrícula | CPF | Data de Nascimento | Data de Admissão |
|------|-----------|-----|--------------------|------------------|
| João Silva | 12345 | 123.456.789-00 | 1990-01-15 | 2015-03-01 |
| Maria Souza | 23456 | 987.654.321-00 | 1988-07-22 | 2012-09-10 |
| Carlos Oliveira | 34567 | 456.789.123-11 | 1993-11-08 | 2018-01-20 |
| Ana Pereira | 45678 | 321.654.987-22 | 1985-04-30 | 2010-06-15 |
| Rafael Costa | 56789 | 159.357.258-33 | 1996-12-02 | 2020-08-03 |

> Todos os campos devem ser preenchidos exatamente como na tabela para que a validação seja bem-sucedida.

### Exemplo de requisição — validar colaborador

```http
POST /api/validar-colaborador
Content-Type: application/json

{
  "matricula": "12345",
  "cpf": "123.456.789-00",
  "dataNascimento": "1990-01-15",
  "dataAdmissao": "2015-03-01"
}
```

### Exemplo de resposta — validação bem-sucedida

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

### Exemplo de requisição — buscar documentos

```http
GET /api/documentos/12345678900?tipo=IR
```

### Exemplo de resposta — documentos encontrados

```json
{
  "success": true,
  "documentos": [
    {
      "nome": "Informe de Rendimentos 2024",
      "tipo": "IR",
      "ano": "2024",
      "link": "http://localhost:3001/storage/IR/2024/INF_2024_12345678900.pdf?token=...&expires=..."
    }
  ]
}
```
