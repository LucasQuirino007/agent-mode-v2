const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const router = express.Router();

const STORAGE_DIR = path.resolve(__dirname, '../../storage');
const TOKEN_EXPIRATION_SECONDS = Number(process.env.TOKEN_EXPIRATION_SECONDS || 3600);

const normalizarCpf = (cpf = '') => cpf.replace(/\D/g, '');

const montarLinkTemporario = (req, caminhoRelativo) => {
  const token = crypto.randomUUID();
  const expires = Math.floor(Date.now() / 1000) + TOKEN_EXPIRATION_SECONDS;
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  return `${baseUrl}/${caminhoRelativo.replace(/\\/g, '/')}?token=${token}&expires=${expires}`;
};

router.get('/documentos/:cpf', (req, res) => {
  const cpfNormalizado = normalizarCpf(req.params.cpf);
  const tipo = String(req.query.tipo || '').toUpperCase();

  if (cpfNormalizado.length !== 11) {
    return res.status(400).json({
      success: false,
      message: 'CPF inválido.'
    });
  }

  if (tipo && !['IR', 'BOLETO'].includes(tipo)) {
    return res.status(400).json({
      success: false,
      message: "Parâmetro 'tipo' inválido. Use IR ou BOLETO."
    });
  }

  const documentos = [];

  if (!tipo || tipo === 'IR') {
    const anos = ['2024', '2025'];

    for (const ano of anos) {
      const nomeArquivo = `INF_${ano}_${cpfNormalizado}.pdf`;
      const caminhoRelativoArquivo = path.join('storage', 'IR', ano, nomeArquivo);
      const caminhoCompletoArquivo = path.join(STORAGE_DIR, 'IR', ano, nomeArquivo);

      if (fs.existsSync(caminhoCompletoArquivo)) {
        documentos.push({
          nome: `Informe de Rendimentos ${ano}`,
          tipo: 'IR',
          ano,
          link: montarLinkTemporario(req, caminhoRelativoArquivo)
        });
      }
    }
  }

  if (!tipo || tipo === 'BOLETO') {
    const boletos = [{ ano: '2025', mes: '01' }];

    for (const item of boletos) {
      const nomeArquivo = `BLT_${item.mes}_${item.ano}_${cpfNormalizado}.pdf`;
      const caminhoRelativoArquivo = path.join('storage', 'BOLETOS', item.ano, item.mes, nomeArquivo);
      const caminhoCompletoArquivo = path.join(STORAGE_DIR, 'BOLETOS', item.ano, item.mes, nomeArquivo);

      if (fs.existsSync(caminhoCompletoArquivo)) {
        documentos.push({
          nome: `Boleto ${item.mes}/${item.ano}`,
          tipo: 'BOLETO',
          ano: item.ano,
          mes: item.mes,
          link: montarLinkTemporario(req, caminhoRelativoArquivo)
        });
      }
    }
  }

  if (!documentos.length) {
    return res.status(404).json({
      success: false,
      message: 'Documento não localizado.'
    });
  }

  return res.status(200).json({
    success: true,
    documentos
  });
});

module.exports = router;
