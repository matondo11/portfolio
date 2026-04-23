# Portfolio - Desenvolvedor Full Stack

Portfólio moderno e profissional construído com Next.js 16, TypeScript, Tailwind CSS e Framer Motion. Inclui animações suaves, design responsivo e otimização para produção.

## 🚀 Tecnologias Utilizadas

- **Framework**: Next.js 16 (App Router)
- **Linguagem**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animações**: Framer Motion
- **Ícones**: React Icons, Lucide React
- **Banco de Dados**: MongoDB
- **Armazenamento de Imagens**: Cloudinary
- **PWA**: Next.js PWA

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no MongoDB Atlas
- Conta no Cloudinary (opcional)

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/portfolio.git
cd portfolio
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o .env com suas chaves
```

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📦 Build para Produção

```bash
npm run build
npm run start
```

## 🚀 Hospedagem

### Vercel (Recomendado)
1. Conecte seu repositório no [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente
3. Deploy automático

### Outras Opções
- **Netlify**: Suporte para Next.js
- **Railway**: Boa integração com MongoDB
- **Heroku**: Configuração manual necessária

## 🎨 Recursos

- ✅ Design responsivo (mobile-first)
- ✅ Animações suaves com Framer Motion
- ✅ Efeito glass no navbar
- ✅ Ícones de tecnologias na hero
- ✅ Otimização de imagens
- ✅ PWA pronto
- ✅ SEO otimizado
- ✅ Performance 60fps

## 📁 Estrutura do Projeto

```
portfolio/
├── app/                    # Next.js App Router
├── components/             # Componentes React
├── data/                   # Dados estáticos
├── lib/                    # Utilitários
├── public/                 # Assets estáticos
└── types/                  # Tipos TypeScript
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Servidor de produção
- `npm run lint` - Verificação de código

## 📄 Licença

Este projeto está sob a licença MIT.
