function DocumentSelector({ value, onChange }) {
  return (
    <div>
      <label htmlFor="tipoDocumento" className="mb-2 block text-sm font-medium text-slate-700">
        Tipo de Documento
      </label>
      <select
        id="tipoDocumento"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      >
        <option value="IR">Informe de Rendimentos</option>
        <option value="BOLETO">Boletos do Plano de Saúde</option>
      </select>
    </div>
  );
}

export default DocumentSelector;
