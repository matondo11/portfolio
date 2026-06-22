# 📚 Documentação Completa do Projeto Portfolio

## Índice
1. [Visão Geral](#visão-geral)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Arquitetura](#arquitetura)
4. [Estrutura de Diretórios](#estrutura-de-diretórios)
5. [Modelos de Dados](#modelos-de-dados)
6. [Endpoints da API](#endpoints-da-api)
7. [Componentes React](#componentes-react)
8. [Sistema de Autenticação](#sistema-de-autenticação)
9. [Fluxo de Dados](#fluxo-de-dados)
10. [Funcionalidades Principais](#funcionalidades-principais)
11. [Configuração de Ambiente](#configuração-de-ambiente)

---

## Visão Geral

O **Portfolio** é uma aplicação web moderna construída para showcasear um portfólio profissional dinâmico. É um projeto **full-stack** que combina um frontend responsivo com um backend robusto para gerenciar projetos, feedback e autenticação.

### Características Principais
- ✅ **Portfólio Dinâmico**: Projetos gerenciados via banco de dados MongoDB
- ✅ **Painel Admin**: Acesso restrito com autenticação JWT
- ✅ **PWA**: Progressive Web App - funciona offline
- ✅ **Animações Suaves**: Experiência visual moderna com Framer Motion
- ✅ **Upload de Mídia**: Integração com Cloudinary para imagens/vídeos
- ✅ **Responsivo**: Design mobile-first com Tailwind CSS
- ✅ **Type-Safe**: TypeScript em todo o projeto
- ✅ **Performance**: Otimizações com Next.js 16

---

## Stack Tecnológico

### Frontend
| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| **Next.js** | 16.2.4 | Framework React com SSR e App Router |
| **React** | 19.2.4 | Biblioteca UI |
| **TypeScript** | 5 | Type safety |
| **Tailwind CSS** | 4.2.2 | Estilização utility-first |
| **Framer Motion** | 12.38.0 | Animações avançadas |
| **React Icons** | 5.6.0 | Ícones SVG |
| **Lucide React** | 1.8.0 | Ícones adicionais |
| **Next.js PWA** | 5.6.0 | Suporte para Progressive Web App |

### Backend
| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| **Node.js** | 18+ | Runtime JavaScript |
| **MongoDB** | N/A | Banco de dados NoSQL |
| **Mongoose** | 9.5.0 | ODM para MongoDB |
| **JWT** | 9.0.2 | Autenticação stateless |
| **bcryptjs** | 2.4.3 | Hash de senhas |

### Serviços Externos
| Serviço | Propósito |
|--------|----------|
| **MongoDB Atlas** | Banco de dados em nuvem |
| **Cloudinary** | Armazenamento e otimização de imagens |
| **JWT** | Tokens de autenticação |

### Ferramentas de Desenvolvimento
| Ferramenta | Propósito |
|-----------|----------|
| **ESLint** | Linting e qualidade de código |
| **PostCSS** | Processamento de CSS |
| **TypeScript** | Type checking |

---

## Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                      Cliente (Browser)                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │     React Components (TSX)                          │   │
│  │  - Hero, Projects, Skills, Contact, etc            │   │
│  │  - Framer Motion para animações                    │   │
│  │  - Tailwind CSS para estilos                       │   │
│  └──────────────────┬──────────────────────────────────┘   │
└─────────────────────┼──────────────────────────────────────┘
                      │ HTTP(S) / REST API
┌─────────────────────┼──────────────────────────────────────┐
│                      │                                      │
│              Next.js Server (Backend)                       │
│  ┌──────────────────┴──────────────────────────────────┐   │
│  │          App Router & API Routes (route.ts)        │   │
│  │  ┌────────────────────────────────────────────┐    │   │
│  │  │ GET /api/projects                          │    │   │
│  │  │ POST /api/projects                         │    │   │
│  │  │ PUT /api/projects/[id]                     │    │   │
│  │  │ DELETE /api/projects/[id]                  │    │   │
│  │  │ POST /api/auth/login                       │    │   │
│  │  │ POST /api/feedback                         │    │   │
│  │  │ POST /api/views                            │    │   │
│  │  └────────────────────────────────────────────┘    │   │
│  ├─ Middleware: Autenticação JWT                       │   │
│  ├─ Conexão com MongoDB                               │   │
│  └──────────────────┬───────────────────────────────────┘   │
└─────────────────────┼──────────────────────────────────────┘
                      │
        ┌─────────────┼──────────────┐
        │             │              │
   ┌────▼────┐  ┌────▼────┐  ┌─────▼──────┐
   │ MongoDB │  │Cloudinary│  │   JWT      │
   │  Atlas  │  │(Imagens) │  │ (Auth)     │
   └─────────┘  └──────────┘  └────────────┘
```

---

## Estrutura de Diretórios

```
portfolio/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout raiz
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Estilos globais
│   │
│   ├── api/                     # Backend API Routes
│   │   ├── auth/
│   │   │   └── login/route.ts  # POST: Autenticação
│   │   ├── projects/
│   │   │   ├── route.ts        # GET: lista projetos | POST: criar projeto
│   │   │   └── [id]/
│   │   │       └── route.ts    # GET/PUT/DELETE: operações em projeto
│   │   ├── feedback/
│   │   │   └── route.ts        # POST: Submeter feedback
│   │   ├── upload/
│   │   │   └── route.ts        # POST: Upload para Cloudinary
│   │   └── views/
│   │       └── route.ts        # POST/GET: Contador de visualizações
│   │
│   ├── admin/
│   │   └── page.tsx            # Painel administrativo
│   │
│   └── projects/
│       ├── page.tsx            # Lista de projetos
│       └── [id]/
│           └── page.tsx        # Detalhes do projeto
│
├── components/                   # Componentes React
│   ├── Navbar.tsx              # Barra de navegação
│   ├── Hero.tsx                # Seção hero principal
│   ├── Hero1.tsx               # Variação alternativa
│   ├── About.tsx               # Seção sobre mim
│   ├── Services.tsx            # Serviços oferecidos
│   ├── Skills.tsx              # Habilidades técnicas
│   ├── Projects.tsx            # Galeria de projetos
│   ├── ProjectCard.tsx         # Card individual do projeto
│   ├── ProjectDetail.tsx       # Detalhes completos do projeto
│   ├── ProjectFilter.tsx       # Filtros de projetos
│   ├── Contact.tsx             # Formulário de contato
│   ├── FeedbackForm.tsx        # Formulário de feedback
│   ├── Testimonials.tsx        # Depoimentos/testemunhos
│   ├── Roadmap.tsx             # Roadmap de desenvolvimento
│   ├── AdminProjectForm.tsx    # Formulário admin para projetos
│   └── SectionHeader.tsx       # Header reutilizável
│
├── models/                      # Modelos MongoDB (Mongoose)
│   ├── Project.ts              # Schema de Projeto
│   ├── User.ts                 # Schema de Usuário
│   ├── Feedback.ts             # Schema de Feedback
│   └── View.ts                 # Schema de Contador de Visualizações
│
├── lib/                         # Funções utilitárias
│   ├── db.ts                   # Conexão com MongoDB
│   └── auth.ts                 # Funções de autenticação (JWT, bcrypt)
│
├── types/
│   └── index.ts                # Tipos e interfaces TypeScript
│
├── data/
│   ├── projects.ts             # Dados estáticos de projetos (fallback)
│   └── skills.ts               # Lista de habilidades
│
├── public/                      # Arquivos estáticos
│   ├── manifest.json           # PWA manifest
│   ├── offline.html            # Página offline
│   ├── robots.txt              # SEO
│   └── sw.js                   # Service Worker (PWA)
│
├── scripts/
│   └── createAdmin.js          # Script para criar admin
│
├── Configuration Files
│   ├── next.config.ts          # Configuração Next.js
│   ├── tsconfig.json           # Configuração TypeScript
│   ├── tailwind.config.js      # Configuração Tailwind
│   ├── postcss.config.mjs      # Configuração PostCSS
│   ├── eslint.config.mjs       # Configuração ESLint
│   ├── package.json            # Dependências
│   └── .env.local              # Variáveis de ambiente
```

---

## Modelos de Dados

### 1. Project (Projeto)

```typescript
interface IProject extends Document {
  title: string;                    // Título do projeto
  description: string;              // Descrição curta
  image?: string;                   // URL da imagem (Cloudinary)
  video?: string;                   // URL do vídeo
  technologies: string[];           // ["React", "TypeScript", "Tailwind"]
  github?: string;                  // Link do repositório GitHub
  demo?: string;                    // Link da demo
  figma?: string;                   // Link do design Figma
  platform: string[];               // ["web", "ios", "android"]
  status: 'production' | 'in-progress' | 'idea';
  featured?: boolean;               // Destaque na página inicial
  createdAt: Date;                  // Data de criação
}
```

### 2. User (Usuário)

```typescript
interface IUser extends Document {
  username: string;                 // Nome de usuário (único)
  password: string;                 // Senha com hash bcrypt
  createdAt: Date;                  // Data de criação
}
```

### 3. Feedback (Feedback)

```typescript
interface FeedbackInput {
  name: string;                     // Nome de quem deixou feedback
  rating: number;                   // Avaliação (1-5)
  comment: string;                  // Comentário/testemunho
  role: string;                     // Cargo/profissão
}
```

### 4. View (Contador de Visualizações)

```typescript
interface ViewRecord {
  projectId: string;                // ID do projeto
  count: number;                    // Número de visualizações
}
```

---

## Endpoints da API

### Autenticação

#### `POST /api/auth/login`
**Descrição**: Autentica usuário e retorna JWT

**Request Body**:
```json
{
  "username": "admin",
  "password": "sua-senha"
}
```

**Response (200)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (401)**:
```json
{
  "error": "Credenciais inválidas"
}
```

---

### Projetos

#### `GET /api/projects`
**Descrição**: Retorna lista de todos os projetos

**Response (200)**:
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "E-commerce Platform",
    "description": "Plataforma de vendas online",
    "image": "https://res.cloudinary.com/...",
    "technologies": ["Next.js", "MongoDB", "Stripe"],
    "github": "https://github.com/...",
    "demo": "https://project.com",
    "platform": ["web"],
    "status": "production",
    "featured": true,
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

#### `POST /api/projects` ⚠️ Admin Only
**Descrição**: Cria novo projeto

**Request Body**:
```json
{
  "title": "App Mobile",
  "description": "Aplicativo mobile para iOS e Android",
  "technologies": ["React Native", "Firebase"],
  "platform": ["ios", "android"],
  "status": "in-progress",
  "featured": false
}
```

**Response (201)**: Projeto criado com `_id`

#### `PUT /api/projects/[id]` ⚠️ Admin Only
**Descrição**: Atualiza um projeto específico

**Parameters**: `id` (MongoDB ObjectId)

**Request Body**: Qualquer campo do projeto

#### `DELETE /api/projects/[id]` ⚠️ Admin Only
**Descrição**: Deleta um projeto

**Parameters**: `id` (MongoDB ObjectId)

---

### Feedback

#### `POST /api/feedback`
**Descrição**: Submete um feedback/testemunho

**Request Body**:
```json
{
  "name": "João Silva",
  "rating": 5,
  "comment": "Excelente trabalho! Muito profissional.",
  "role": "CEO at Startup XYZ"
}
```

**Response (201)**: Feedback salvo

---

### Upload de Mídia

#### `POST /api/upload` ⚠️ Admin Only
**Descrição**: Faz upload de imagem para Cloudinary

**Request**: FormData com arquivo

**Response (200)**:
```json
{
  "url": "https://res.cloudinary.com/...",
  "publicId": "portfolio/project-123"
}
```

---

### Visualizações

#### `GET /api/views`
**Descrição**: Retorna contador de visualizações

**Response (200)**:
```json
{
  "projectId": "507f1f77bcf86cd799439011",
  "count": 150
}
```

#### `POST /api/views`
**Descrição**: Incrementa contador de um projeto

**Request Body**:
```json
{
  "projectId": "507f1f77bcf86cd799439011"
}
```

---

## Componentes React

### 1. **Navbar.tsx**
- Barra de navegação fixa no topo
- Links para seções (Home, Projetos, Sobre, Contato)
- Menu mobile responsivo
- Tema claro/escuro (se implementado)

### 2. **Hero.tsx**
- Seção inicial com impacto visual
- Animações com Framer Motion
- Call-to-action para contato
- Efeito de digitação com `react-typing-effect`

### 3. **About.tsx**
- Informações sobre o desenvolvedor
- Apresentação profissional
- Foto/avatar

### 4. **Services.tsx**
- Lista de serviços oferecidos
- Ícones com React Icons/Lucide
- Layout em grid responsivo

### 5. **Skills.tsx**
- Habilidades técnicas agrupadas por categoria
- Níveis: mastered, learning, planned
- Visualização com barras ou badges

### 6. **Projects.tsx**
- Galeria de projetos do banco de dados
- Integra `ProjectFilter` para filtros
- `ProjectCard` para cada projeto
- Carregamento dinâmico da API

### 7. **ProjectCard.tsx**
- Card individual do projeto
- Imagem, título, tecnologias
- Links para GitHub/Demo
- Hover effects com Framer Motion

### 8. **ProjectDetail.tsx**
- Página de detalhes completo
- Descrição longa, problema, solução
- Galeria de imagens
- Links externos

### 9. **ProjectFilter.tsx**
- Filtros por tecnologia, plataforma, status
- Busca por texto
- Refresco de lista

### 10. **Contact.tsx**
- Formulário de contato
- Links de redes sociais
- Email/WhatsApp

### 11. **FeedbackForm.tsx**
- Formulário para deixar feedback
- Rating (1-5 estrelas)
- Integra com API `/api/feedback`

### 12. **Testimonials.tsx**
- Exibe feedbacks submetidos
- Carousel de testemunhos
- Avatar e informações de quem deixou feedback

### 13. **Roadmap.tsx**
- Timeline de planos futuros
- Funcionalidades planejadas
- Animações de timeline

### 14. **AdminProjectForm.tsx**
- Formulário para gerenciar projetos (admin)
- Campos: título, descrição, tecnologias, links
- Upload de imagem integrado
- Botões: Salvar, Deletar, Cancelar

---

## Sistema de Autenticação

### Fluxo de Login

```
┌─────────────────┐
│  Frontend (UI)  │
│  Admin Page     │
└────────┬────────┘
         │ 1. Usuário entra username/password
         │
    ┌────▼────────────────────────────┐
    │ POST /api/auth/login             │
    │ { username, password }           │
    └────┬─────────────────────────────┘
         │
    ┌────▼────────────────────────────┐
    │ Backend                          │
    │ 1. Conecta MongoDB               │
    │ 2. Busca usuário por username    │
    │ 3. Compara senha com hash bcrypt │
    └────┬─────────────────────────────┘
         │
    ┌────▼────────────────────────────┐
    │ Se válido:                       │
    │ - Gera JWT token (1h expiry)    │
    │ - Retorna { token }              │
    │                                  │
    │ Se inválido:                     │
    │ - Retorna erro 401               │
    └────┬─────────────────────────────┘
         │
    ┌────▼──────────────────┐
    │ Frontend              │
    │ Salva token em:       │
    │ - localStorage        │
    │ - sessionStorage      │
    │ - Cookie (httpOnly)   │
    └───────────────────────┘
```

### Proteção de Rotas

Endpoints admin requerem header:
```
Authorization: Bearer <token>
```

Token é verificado no backend antes de permitir operação.

### Funções de Auth (`lib/auth.ts`)

```typescript
// Hash de senha
hashPassword(password: string): string
// Retorna hash bcrypt da senha

// Validação de senha
comparePassword(password: string, hash: string): boolean
// Compara senha com hash, retorna true se válida

// Geração de JWT
generateToken(payload: object): string
// Cria token JWT com 1h de expiração

// Verificação de JWT
verifyToken(token: string): any
// Valida token, retorna payload ou null
```

---

## Fluxo de Dados

### 1. Carregar Projetos

```
┌──────────────┐
│  Home Page   │
│  useEffect   │
└──────┬───────┘
       │ Chama: fetch('/api/projects')
       ▼
┌──────────────────────────┐
│ GET /api/projects        │
│ (Backend)                │
│ - MongoDB.find()         │
│ - Sort por createdAt     │
└──────┬───────────────────┘
       │ Response: Array[Project]
       ▼
┌──────────────────────────┐
│ Frontend                 │
│ setState(projects)       │
│ Renderiza ProjectCard    │
└──────────────────────────┘
```

### 2. Criar/Editar Projeto (Admin)

```
┌─────────────────┐
│ AdminForm       │
│ Preenche dados  │
└────────┬────────┘
         │ Envia: POST /api/projects
         │ Body: { ...projectData }
         ▼
┌──────────────────────────┐
│ Backend POST             │
│ - Valida dados           │
│ - Cria novo Document     │
│ - .save() no MongoDB     │
└──────┬───────────────────┘
       │ Response: Projeto criado
       ▼
┌──────────────────────────┐
│ Frontend                 │
│ Atualiza lista           │
│ Mostra sucesso/erro      │
└──────────────────────────┘
```

### 3. Submeter Feedback

```
┌──────────────────┐
│ FeedbackForm     │
│ Usuário escreve  │
└────────┬─────────┘
         │ Envia: POST /api/feedback
         │ Body: { name, rating, comment, role }
         ▼
┌──────────────────────────┐
│ Backend POST             │
│ - Salva em MongoDB       │
│ - Validação básica       │
└──────┬───────────────────┘
       │ Response: { success: true }
       ▼
┌──────────────────────────┐
│ Frontend                 │
│ - Reseta form            │
│ - Mostra mensagem sucesso│
│ - Recarrega Testimonials │
└──────────────────────────┘
```

---

## Funcionalidades Principais

### 🏠 Página Principal
- **Hero Section**: Apresentação impactante
- **About**: Informações profissionais
- **Services**: Serviços oferecidos
- **Skills**: Stack técnico
- **Projects**: Galeria dinâmica
- **Testimonials**: Feedbacks de clientes
- **Roadmap**: Planos futuros
- **Contact**: Formulário de contato
- **Navbar**: Navegação fixa

### 📂 Página de Projetos
- Lista de todos os projetos
- Filtros por tecnologia/plataforma/status
- Busca por texto
- Links para GitHub/Demo
- Contador de visualizações

### 📄 Detalhe do Projeto
- Descrição completa
- Problema e solução
- Galeria de imagens/vídeos
- Tecnologias utilizadas
- Links externos (GitHub, Demo, Figma)
- Plataformas (Web, iOS, Android)

### 👨‍💼 Painel Admin
- Login seguro com JWT
- CRUD completo de projetos
- Upload de imagens via Cloudinary
- Gerenciamento de tecnologias
- Visualização de estatísticas

### 💬 Feedback/Testimonials
- Formulário para deixar feedback
- Sistema de rating (1-5)
- Exibição em carrossel
- Persistência em banco de dados

### 📊 Contador de Visualizações
- Rastreia visualizações por projeto
- Incrementa no carregamento
- Exibe número de views no card

### 📱 PWA (Progressive Web App)
- Funciona offline
- Service Worker
- Instalável como app
- Manifest.json configurado

---

## Configuração de Ambiente

### .env.local

```env
# ────────────────────────────────────────────────────────────
# MONGODB
# ────────────────────────────────────────────────────────────
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# ────────────────────────────────────────────────────────────
# JWT (Autenticação)
# ────────────────────────────────────────────────────────────
JWT_SECRET=sua-chave-secreta-super-segura-32-caracteres-minimo

# ────────────────────────────────────────────────────────────
# CLOUDINARY (Armazenamento de Mídia)
# ────────────────────────────────────────────────────────────
CLOUDINARY_CLOUD_NAME=seu-cloud-name
CLOUDINARY_API_KEY=sua-api-key
CLOUDINARY_API_SECRET=seu-api-secret

# ────────────────────────────────────────────────────────────
# NEXT.JS
# ────────────────────────────────────────────────────────────
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor em http://localhost:3000

# Produção
npm run build        # Build otimizado
npm run start        # Inicia servidor em produção

# Linting
npm run lint         # Executa ESLint

# Criar Admin
node scripts/createAdmin.js
```

---

## Fluxo de Desenvolvimento

### Ciclo de Desenvolvimento Local

1. **Desenvolvimento**
   ```bash
   npm run dev
   ```
   - Hot reload automático
   - Mensagens de erro no terminal

2. **Testes/Validação**
   - Testar componentes localmente
   - Verificar API com Postman/Insomnia
   - Testar responsividade

3. **Linting**
   ```bash
   npm run lint
   ```
   - Verificar qualidade de código
   - Corrigir warnings

4. **Build**
   ```bash
   npm run build
   ```
   - Gera production-ready bundle
   - Otimizações automáticas

---

## Melhorias Futuras Possíveis

- [ ] Sistema de comentários em projetos
- [ ] Dark mode/Light mode toggle
- [ ] Search avançada com filtros
- [ ] Integração com GitHub API para stats
- [ ] Cache de projetos com SWR
- [ ] Analytics (Google Analytics/Plausible)
- [ ] Email notifications
- [ ] Webhooks para atualizações automáticas
- [ ] Versionamento de projetos
- [ ] Blog/Artigos

---

## Troubleshooting

### Problema: "Erro ao conectar MongoDB"
**Solução**: Verifique `MONGODB_URI` no `.env.local` e certifique-se de que:
- URL está correta
- IP whitelist inclui seu IP em MongoDB Atlas
- Senha não tem caracteres especiais sem encoding

### Problema: "Token inválido"
**Solução**:
- Verifique `JWT_SECRET` está igual em dev e prod
- Confirme que token não expirou (1h de validade)
- Token deve estar no header: `Authorization: Bearer <token>`

### Problema: "Upload Cloudinary falha"
**Solução**:
- Confirme credenciais Cloudinary
- Verifique API key e secret
- Check se cloud name é o correto

### Problema: "PWA não funciona offline"
**Solução**:
- Service Worker registrado em `public/sw.js`
- Verificar console para errors
- Limpar cache e fazer rebuild

---

## Recursos Úteis

- 📚 [Next.js Documentation](https://nextjs.org/docs)
- 📚 [Mongoose Documentation](https://mongoosejs.com/)
- 📚 [Tailwind CSS](https://tailwindcss.com/)
- 📚 [Framer Motion](https://www.framer.com/motion/)
- 📚 [JWT.io](https://jwt.io/)
- 📚 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- 📚 [Cloudinary](https://cloudinary.com/)

---

## Conclusão

Este projeto é uma solução completa de portfólio moderno, totalmente funcional e pronta para produção. Combina as melhores práticas de desenvolvimento web com uma arquitetura escalável e fácil de manter.

A estrutura permite fácil expansão com novas funcionalidades mantendo a qualidade e performance do código.

---

**Última atualização**: 2024
**Versão**: 1.0.0
