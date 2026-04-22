#!/bin/bash
# Quick Setup Script para Portfolio

echo "🚀 Iniciando setup do Portfolio..."

# 1. Instalar dependências
echo "📦 Instalando dependências..."
npm install

# 2. Copiar arquivo de ambiente (se não existir)
if [ ! -f ".env.local" ]; then
    echo "⚙️ Criando .env.local..."
    cp .env.example .env.local
    echo "⚠️  Edite .env.local com suas credenciais!"
fi

# 3. Executar lint
echo "🔍 Executando ESLint..."
npm run lint -- --fix

# 4. Criar usuário admin
echo "🔐 Criando usuário admin..."
node scripts/createAdmin.js

echo ""
echo "✅ Setup concluído!"
echo ""
echo "🎯 Próximos passos:"
echo "1. Edite .env.local com seus dados (MongoDB, Cloudinary, JWT)"
echo "2. Execute: npm run dev"
echo "3. Acesse: http://localhost:3000"
echo "4. Admin: http://localhost:3000/admin"
echo ""
echo "📚 Documentação: Ver README_SETUP.md"
