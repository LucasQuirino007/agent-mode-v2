const cpfMask = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

const dateMask = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  return digits
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2');
};

function ValidationForm({ formData, onChange, onSubmit, loading }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="matricula" className="mb-2 block text-sm font-medium text-slate-700">
          Matrícula
        </label>
        <input
          id="matricula"
          type="text"
          inputMode="numeric"
          value={formData.matricula}
          onChange={(event) => onChange('matricula', event.target.value.replace(/\D/g, ''))}
          required
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div>
        <label htmlFor="cpf" className="mb-2 block text-sm font-medium text-slate-700">
          CPF
        </label>
        <input
          id="cpf"
          type="text"
          inputMode="numeric"
          value={formData.cpf}
          onChange={(event) => onChange('cpf', cpfMask(event.target.value))}
          placeholder="000.000.000-00"
          required
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="dataNascimento" className="mb-2 block text-sm font-medium text-slate-700">
            Data de Nascimento
          </label>
          <input
            id="dataNascimento"
            type="text"
            inputMode="numeric"
            value={formData.dataNascimento}
            onChange={(event) => onChange('dataNascimento', dateMask(event.target.value))}
            placeholder="DD/MM/AAAA"
            required
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label htmlFor="dataAdmissao" className="mb-2 block text-sm font-medium text-slate-700">
            Data de Admissão
          </label>
          <input
            id="dataAdmissao"
            type="text"
            inputMode="numeric"
            value={formData.dataAdmissao}
            onChange={(event) => onChange('dataAdmissao', dateMask(event.target.value))}
            placeholder="DD/MM/AAAA"
            required
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
}

export default ValidationForm;
