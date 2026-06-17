---
applyTo: "frontend/**"
---

# Frontend Instructions — Portal de Consulta de Documentos

## Visão Geral

O frontend é uma aplicação **React 18** construída com **Vite 5** e estilizada com **Tailwind CSS 3**. Ele permite que o colaborador:

1. Selecione o tipo de documento desejado (Informe de Rendimentos ou Boleto do Plano de Saúde).
2. Preencha o formulário de validação de identidade.
3. Visualize e acesse os documentos disponíveis por meio de links temporários.

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
frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── DocumentList.jsx      # Lista de documentos com links temporários
│   │   ├── ValidationForm.jsx    # Formulário de validação do colaborador
│   │   └── DocumentSelector.jsx  # Seleção do tipo de documento
│   ├── pages/
│   │   └── Home.jsx              # Página principal
│   ├── services/
│   │   └── api.js                # Chamadas à API do backend
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## Instalação

```bash
cd frontend
npm install
```

---

## Rodando o Servidor de Desenvolvimento

```bash
npm run dev
```

O frontend iniciará na porta **5173**.

> URL: `http://localhost:5173`

Certifique-se de que o **backend também está rodando** na porta `3001` antes de usar o formulário.

---

## Funcionalidades

### Seleção de Documento

Na página inicial, o colaborador escolhe entre:

- **Informe de Rendimentos** — documentos do tipo `IR`
- **Boletos do Plano de Saúde** — documentos do tipo `BOLETO`

### Formulário de Validação

Campos obrigatórios:

| Campo | Formato |
|---|---|
| Matrícula | Numérico |
| CPF | `000.000.000-00` (com máscara) |
| Data de Nascimento | `DD/MM/AAAA` |
| Data de Admissão | `DD/MM/AAAA` |

Ao clicar em **Enviar**, a aplicação chama `POST /api/validar-colaborador`.

### Lista de Documentos

Em caso de sucesso na validação, a aplicação chama `GET /api/documentos/:cpf?tipo=...` e exibe os documentos disponíveis com um botão **Abrir** para cada link temporário.

### Tratamento de Erros

| Cenário | Mensagem exibida |
|---|---|
| Colaborador não encontrado | "Pessoa não localizada." |
| Nenhum documento disponível | "Documento não localizado." |
| Erro de rede / API offline | "Erro ao conectar com o servidor. Tente novamente." |

---

## Variáveis de Ambiente

Crie um arquivo `.env` na pasta `frontend/` com:

```env
VITE_API_URL=http://localhost:3001
```

> O Vite expõe apenas variáveis prefixadas com `VITE_` para o código do navegador.

---

## Proxy de Desenvolvimento (opcional)

Para evitar problemas de CORS em desenvolvimento, configure o proxy no `vite.config.js`:

```js
export default {
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
}
```

---

## Build para Produção

```bash
npm run build
```

Os arquivos estáticos serão gerados na pasta `dist/`.

---

## Troubleshooting

| Problema | Solução |
|---|---|
| Tela em branco após iniciar | Verifique o console do navegador (F12) para erros de import. |
| Erro `Failed to fetch` na validação | Confirme que o backend está rodando em `localhost:3001`. |
| Estilos Tailwind não aplicados | Verifique se `tailwind.config.js` aponta para os arquivos `.jsx` corretos em `content`. |
| Porta 5173 ocupada | Altere a porta com `npm run dev -- --port 5174` ou configure em `vite.config.js`. |
| CPF sem máscara enviado para API | Certifique-se de que o componente de input formata corretamente antes do envio. |
