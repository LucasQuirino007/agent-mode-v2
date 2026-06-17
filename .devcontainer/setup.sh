#!/bin/bash
set -e

echo "🚀 Configurando o ambiente de desenvolvimento ..."

# Instala dependências do backend (se a pasta existir e tiver package.json)
if [ -f "/workspaces/$(basename $PWD)/backend/package.json" ]; then
  echo "📦 Instalando dependências do backend..."
  cd /workspaces/$(basename $PWD)/backend && npm install
  cd /workspaces/$(basename $PWD)
fi

# Instala dependências do frontend (se a pasta existir e tiver package.json)
if [ -f "/workspaces/$(basename $PWD)/frontend/package.json" ]; then
  echo "📦 Instalando dependências do frontend..."
  cd /workspaces/$(basename $PWD)/frontend && npm install
  cd /workspaces/$(basename $PWD)
fi

echo "✅ Ambiente pronto! Portas disponíveis:"
echo "   - Backend:  http://localhost:3001"
echo "   - Frontend: http://localhost:5173"
