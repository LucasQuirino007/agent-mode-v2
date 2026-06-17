const request = require('supertest');
const express = require('express');
const fs = require('fs');
const crypto = require('crypto');

const documentosRouter = require('./documentos');

describe('GET /api/documentos/:cpf', () => {
  let app;
  let existsSyncSpy;
  let randomUUIDSpy;

  beforeEach(() => {
    app = express();
    app.use('/api', documentosRouter);

    existsSyncSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    randomUUIDSpy = jest.spyOn(crypto, 'randomUUID').mockReturnValue('token-fixo-teste');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('deve retornar sucesso com lista de documentos quando existem arquivos para o CPF informado', async () => {
    // Arrange
    existsSyncSpy.mockImplementation((filePath) => {
      const normalizedPath = String(filePath).replace(/\\/g, '/');

      return (
        normalizedPath.endsWith('/storage/IR/2024/INF_2024_12345678900.pdf') ||
        normalizedPath.endsWith('/storage/IR/2025/INF_2025_12345678900.pdf') ||
        normalizedPath.endsWith('/storage/BOLETOS/2025/01/BLT_01_2025_12345678900.pdf')
      );
    });

    // Act
    const response = await request(app).get('/api/documentos/123.456.789-00');

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.documentos).toHaveLength(3);
    expect(response.body.documentos).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          tipo: 'IR',
          ano: '2024',
          nome: 'Informe de Rendimentos 2024',
          link: expect.stringContaining('/storage/IR/2024/INF_2024_12345678900.pdf?token=token-fixo-teste')
        }),
        expect.objectContaining({
          tipo: 'IR',
          ano: '2025',
          nome: 'Informe de Rendimentos 2025',
          link: expect.stringContaining('/storage/IR/2025/INF_2025_12345678900.pdf?token=token-fixo-teste')
        }),
        expect.objectContaining({
          tipo: 'BOLETO',
          ano: '2025',
          mes: '01',
          nome: 'Boleto 01/2025',
          link: expect.stringContaining('/storage/BOLETOS/2025/01/BLT_01_2025_12345678900.pdf?token=token-fixo-teste')
        })
      ])
    );
  });

  it('deve retornar 400 quando o CPF informado é inválido', async () => {
    // Arrange
    const cpfInvalido = '1234';

    // Act
    const response = await request(app).get(`/api/documentos/${cpfInvalido}`);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: 'CPF inválido.'
    });
    expect(existsSyncSpy).not.toHaveBeenCalled();
  });

  it('deve retornar 404 quando não há documentos para o CPF (matrícula inexistente no contexto de negócio)', async () => {
    // Arrange
    existsSyncSpy.mockReturnValue(false);

    // Act
    const response = await request(app).get('/api/documentos/999.888.777-66');

    // Assert
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: 'Documento não localizado.'
    });
  });
});
