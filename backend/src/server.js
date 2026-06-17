require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const validacaoRouter = require('./routes/validacao');
const documentosRouter = require('./routes/documentos');

const app = express();
const PORT = Number(process.env.PORT || 3001);

app.use(cors());
app.use(express.json());

app.use('/storage', express.static(path.resolve(__dirname, '../storage')));

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api', validacaoRouter);
app.use('/api', documentosRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Rota não encontrada: ${req.method} ${req.originalUrl}`
  });
});

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});
