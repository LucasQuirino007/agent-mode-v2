import { useMemo, useState } from 'react';
import DocumentSelector from '../components/DocumentSelector';
import ValidationForm from '../components/ValidationForm';
import DocumentList from '../components/DocumentList';
import { buscarDocumentos, validarColaborador } from '../services/api';

const initialFormState = {
  matricula: '',
  cpf: '',
  dataNascimento: '',
  dataAdmissao: ''
};

const maskDateToIso = (value) => {
  const [day, month, year] = String(value || '').split('/');

  if (!day || !month || !year) {
    return value;
  }

  return `${year}-${month}-${day}`;
};

function Home() {
  const [documentType, setDocumentType] = useState('IR');
  const [formData, setFormData] = useState(initialFormState);
  const [documents, setDocuments] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const normalizedCpf = useMemo(() => formData.cpf.replace(/\D/g, ''), [formData.cpf]);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setMessage('');
    setDocuments([]);

    try {
      await validarColaborador({
        matricula: formData.matricula,
        cpf: normalizedCpf,
        dataNascimento: maskDateToIso(formData.dataNascimento),
        dataAdmissao: maskDateToIso(formData.dataAdmissao)
      });

      const payload = await buscarDocumentos(normalizedCpf, documentType);
      const list = Array.isArray(payload) ? payload : payload?.documentos || [];

      if (!list.length) {
        setMessage('Documento não localizado.');
        return;
      }

      setDocuments(list);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 404) {
        setMessage('Pessoa não localizada.');
      } else if (error?.code === 'ERR_NETWORK') {
        setMessage('Erro ao conectar com o servidor. Tente novamente.');
      } else {
        setMessage(error?.response?.data?.message || 'Erro ao conectar com o servidor. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-10">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4">
        <header className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h1 className="text-xl font-bold text-slate-900">Portal de Consulta de Documentos</h1>
          <p className="mt-2 text-sm text-slate-600">
            Selecione o tipo de documento, valide sua identidade e acesse os arquivos disponíveis.
          </p>
        </header>

        <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mb-4">
            <DocumentSelector value={documentType} onChange={setDocumentType} />
          </div>

          <ValidationForm
            formData={formData}
            onChange={handleFieldChange}
            onSubmit={handleSubmit}
            loading={loading}
          />

          {message && (
            <p className="mt-4 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">{message}</p>
          )}
        </section>

        <DocumentList documents={documents} />
      </div>
    </main>
  );
}

export default Home;
