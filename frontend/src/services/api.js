import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001'
});

export async function validarColaborador(payload) {
  const { data } = await api.post('/api/validar-colaborador', payload);
  return data;
}

export async function buscarDocumentos(cpf, tipo) {
  const { data } = await api.get(`/api/documentos/${cpf}`, {
    params: { tipo }
  });
  return data;
}
