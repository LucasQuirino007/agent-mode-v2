const express = require('express');
const colaboradores = require('../data/colaboradores');

const router = express.Router();

const normalizarCpf = (cpf = '') => cpf.replace(/\D/g, '');

router.post('/validar-colaborador', (req, res) => {
  const { matricula, cpf, dataNascimento, dataAdmissao } = req.body || {};

  const colaborador = colaboradores.find((item) => {
    return (
      item.matricula === String(matricula || '') &&
      normalizarCpf(item.cpf) === normalizarCpf(cpf || '') &&
      item.dataNascimento === dataNascimento &&
      item.dataAdmissao === dataAdmissao
    );
  });

  if (!colaborador) {
    return res.status(404).json({
      success: false,
      message: 'Pessoa não localizada.'
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Colaborador validado com sucesso.',
    colaborador: {
      nome: colaborador.nome,
      cpf: colaborador.cpf
    }
  });
});

module.exports = router;
