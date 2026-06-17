function DocumentList({ documents }) {
  if (!documents.length) {
    return null;
  }

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Documentos disponíveis</h2>

      <ul className="space-y-3">
        {documents.map((documento, index) => {
          const key = documento.id || documento.nome || String(index);
          const nome = documento.nome || documento.arquivo || `Documento ${index + 1}`;
          const link = documento.url || documento.link;

          return (
            <li key={key} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
              <span className="text-sm text-slate-700">{nome}</span>
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-700"
                >
                  Abrir
                </a>
              ) : (
                <span className="text-xs text-slate-500">Link indisponível</span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default DocumentList;
