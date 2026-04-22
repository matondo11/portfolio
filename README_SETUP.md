# Portfolio - Moderno e Dinâmico 

Um portfólio moderno, totalmente dinâmico e pronto para produção, construído com Next.js, TypeScript, Tailwind CSS, Framer Motion e MongoDB.

## ✨ Características

- ✅ **Frontend Moderno**: Next.js 16 com App Router
- ✅ **Backend Completo**: APIs CRUD para projetos
- ✅ **Painel Admin**: Login seguro com JWT
- ✅ **Upload de Mídia**: Integração com Cloudinary
- ✅ **Animações Suaves**: Framer Motion
- ✅ **Banco de Dados**: MongoDB Atlas
- ✅ **Responsivo**: Mobile-first design
- ✅ **TypeScript**: Type-safe code
- ✅ **Tailwind CSS**: Estilos modernos
- ✅ **Performance Otimizada**: Next/Image, Lazy loading

## 🚀 Como Começar

### 1. Clonar o Repositório
```bash
git clone <seu-repo>
cd portfolio
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# MongoDB
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# Cloudinary
CLOUDINARY_CLOUD_NAME=seu-cloud-name
CLOUDINARY_API_KEY=sua-api-key
CLOUDINARY_API_SECRET=seu-api-secret

# JWT
JWT_SECRET=sua-chave-secreta-super-segura

# Next.js
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Criar Usuário Admin

Após configurar o MongoDB, execute:

```bash
node scripts/createAdmin.js sua-senha-segura
```

### 5. Iniciar o Servidor

**Desenvolvimento:**
```bash
npm run dev
```

**Produção:**
```bash
npm run build
npm run start
```

Acesse `http://localhost:3000`

## 🎯 Estrutura do Projeto

```
portfolio/
├── app/
│   ├── api/
│   │   ├── auth/login/          # Login JWT
│   │   ├── projects/            # CRUD de projetos
│   │   ├── upload/              # Upload Cloudinary
│   │   └── ...
│   ├── admin/                   # Painel admin
│   ├── page.tsx                 # Home page
│   └── layout.tsx               # Layout global
├── components/
│   ├── Hero.tsx                 # Seção hero
│   ├── Projects.tsx             # Grid de projetos
│   ├── ProjectCard.tsx          # Card individual
│   ├── Skills.tsx               # Habilidades
│   ├── Services.tsx             # Serviços
│   ├── About.tsx                # Sobre
│   └── Contact.tsx              # Contato
├── models/
│   ├── Projects.ts              # Schema MongoDB
│   └── User.ts                  # Schema User
├── lib/
│   ├── db.ts                    # Conexão MongoDB
│   ├── auth.ts                  # JWT + Hash
│   └── ...
├── types/
│   └── index.ts                 # Tipos TypeScript
└── public/
    ├── profile.png              # Foto de perfil
    └── ...
```

## 🔐 Painel Admin

Acesse `/admin` para gerenciar projetos.

**Login padrão:**
- Usuário: `admin`
- Senha: A que você escolheu no passo 4

**Funcionalidades:**
- ➕ Criar novo projeto
- ✏️ Editar projeto existente
- 🗑️ Deletar projeto
- 📸 Upload de imagens/vídeos
- 🏷️ Gerenciar tecnologias
- 📊 Gerenciar status

## 🌍 Deploy

### Vercel (Recomendado)

1. Faça push do código para GitHub
2. Conecte seu repositório no [Vercel Dashboard](https://vercel.com)
3. Adicione variáveis de ambiente no Vercel
4. Deploy automático! 🚀

### Outras Plataformas

O projeto é compatível com Railway, Heroku, Render, etc.

## 📝 API Endpoints

```
GET    /api/projects              # Listar todos os projetos
POST   /api/projects              # Criar novo projeto
PUT    /api/projects/:id          # Atualizar projeto
DELETE /api/projects/:id          # Deletar projeto
POST   /api/auth/login            # Login admin
POST   /api/upload                # Upload arquivo
```

## 🎨 Customização

### Alterar Conteúdo

**Hero Section**: `components/Hero.tsx`
- Foto: Substitua `/public/profile.png`
- Texto: Edite as strings

**About**: `components/About.tsx`
- Descrição pessoal
- Experiências

**Skills**: `components/Skills.tsx`
- Adicione/remova habilidades
- Ajuste percentuais

**Projects**: Gerenciar via painel admin

### Estilos

Tailwind CSS está totalmente customizável:
- Cores: `tailwind.config.js`
- Fonts: `app/layout.tsx` (Google Fonts)
- Temas: Modifique classes de cor

## 🐛 Troubleshooting

### Build Lento?
- Desabilite turbopack em `next.config.ts` se necessário
- Limpe `.next`: `rm -rf .next`
- Reinstale dependências: `npm ci`

### MongoDB Connection Error?
- Verifique sua URI no `.env.local`
- Adicione seu IP na whitelist do MongoDB Atlas
- Teste a conexão com Compass

### Upload não funciona?
- Verifique credenciais do Cloudinary
- Folder deve estar criado em Account Settings

## 📦 Dependências Principais

- **Next.js 16**: Framework React com SSR
- **MongoDB + Mongoose**: Banco de dados
- **Cloudinary**: Upload de mídia
- **Framer Motion**: Animações
- **Tailwind CSS**: Estilização
- **JWT + Bcrypt**: Autenticação segura

## 🔒 Segurança

- ✅ Senhas hasheadas com bcryptjs
- ✅ JWT para autenticação
- ✅ CORS protegido
- ✅ Variables de ambiente ocultas
- ✅ Headers de segurança configurados
- ✅ Validação de entrada nos formulários

## 📱 Responsividade

- ✅ Mobile first
- ✅ Breakpoints: sm (640px), md (768px), lg (1024px)
- ✅ Imagens otimizadas para todos os devices
- ✅ Touch-friendly buttons

## ⚡ Performance

- ✅ Next/Image otimizado
- ✅ Lazy loading de componentes
- ✅ Code splitting automático
- ✅ CSS minificado
- ✅ CDN via Cloudinary para mídia

## 📄 Licença

MIT License - Use livremente!

## 💬 Suporte

Dúvidas? Verifique:
- [Documentação Next.js](https://nextjs.org/docs)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Cloudinary Docs](https://cloudinary.com/documentation)

---

**Feito com ❤️ para desenvolvedores modernos**
