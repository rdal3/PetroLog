# ⛽ PetroLog

**Gestão inteligente da sua moto.** Controle abastecimentos, manutenções, consumo e custos — tudo em um app moderno, rápido e instalável no celular.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

### 📊 Dashboard Inteligente
- Odômetro atual, consumo médio e distância total registrada
- **Autonomia estimada** com base no tamanho do tanque e média de consumo
- **Custo por km** rodado (combustível + manutenção / distância)
- Resumo financeiro (combustível, manutenção, total gasto)
- Alertas de manutenções próximas ou vencidas

### ⛽ Controle de Abastecimentos
- Registro com data, odômetro, litros, valor e **posto**
- Toggle de tanque cheio/parcial para cálculo preciso de consumo (método tanque-a-tanque)
- **Custo por litro** calculado em tempo real
- Histórico completo com badges de consumo e distância percorrida

### 🔧 Manutenções
- Registro de serviços com km, custo, próxima troca e observações
- **Presets rápidos**: Óleo, Pastilha, Relação, Pneu, Vela, Correia
- Alertas automáticos quando uma manutenção está próxima ou vencida

### 📈 Estatísticas & Gráficos
- **Média de consumo (km/l)** — gráfico de linha com **meta de referência** configurável
- **Autonomia fechada (km)** — gráfico de barras
- **Preço do litro (R$/L)** — gráfico de área com tendência
- **Comparativo mensal (R$)** — barras empilhadas combustível + manutenção

### 🏠 Garagem (Multi-moto)
- Suporte a **múltiplas motos** com dados independentes
- Troca rápida entre motos pelo header
- Adicionar/remover motos da garagem

### 🎨 Temas & UX
- **Dark mode** e **Light mode** com transição suave (toggle no header)
- **Onboarding** animado na primeira visita (4 slides)
- **Swipe-to-delete** em cards (UX mobile nativa)
- **Haptic feedback** (vibração) ao salvar registros
- **Toast notifications** para feedback visual de ações
- Micro-animações, glassmorphism e stagger de entrada
- Tipografia Inter (Google Fonts)

### 🔔 Notificações
- Lembretes automáticos quando manutenções estiverem próximas (via Notification API)
- Permissão configurável em Ajustes

### 💾 Dados & Backup
- **Persistência automática** via `localStorage` — dados sobrevivem a recarregamentos
- **Exportar backup** completo como JSON
- **Importar backup** de arquivo JSON (compatível com v1 e v2)
- **Resetar** para dados de exemplo

### 🚀 Deploy-ready
- Configuração Vercel com SPA fallback (`vercel.json`)
- **PWA manifest** — instalável como app no celular
- Meta tags SEO, favicon SVG, tema de status bar

---

## 🛠️ Tech Stack

| Tecnologia | Versão | Uso |
|---|---|---|
| **React** | 19 | UI components & state |
| **Vite** | 6 | Build tool & dev server |
| **Tailwind CSS** | 4 | Styling via `@tailwindcss/vite` plugin |
| **Recharts** | 2 | Gráficos (Line, Bar, Area) |
| **Lucide React** | 0.468+ | Ícones |

---

## 📁 Estrutura do Projeto

```
telemetria serena/
├── index.html                  # Entry HTML com SEO + PWA
├── package.json                # Dependências e scripts
├── vite.config.js              # Vite + React + Tailwind
├── vercel.json                 # Deploy config (SPA fallback)
├── public/
│   ├── favicon.svg             # Ícone do app
│   └── manifest.json           # PWA manifest
└── src/
    ├── main.jsx                # Entry point React
    ├── App.jsx                 # Shell: header + tabs + onboarding gate
    ├── index.css               # Global CSS: tema, animações, utils
    ├── context/
    │   └── AppContext.jsx      # Estado global, localStorage, CRUD, stats
    ├── components/
    │   ├── ui/
    │   │   ├── Card.jsx        # Card com glassmorphism
    │   │   ├── Input.jsx       # Input estilizado
    │   │   ├── Toggle.jsx      # Switch toggle
    │   │   ├── Modal.jsx       # Dialog de confirmação
    │   │   ├── EmptyState.jsx  # Estado vazio
    │   │   ├── Toast.jsx       # Sistema de notificações
    │   │   ├── SwipeableCard.jsx  # Card com swipe-to-delete
    │   │   └── Onboarding.jsx  # Tutorial de 4 slides
    │   ├── layout/
    │   │   ├── Header.jsx      # Header fixo + theme toggle + bike switcher
    │   │   └── BottomNav.jsx   # Nav flutuante pill-shape
    │   └── bikes/
    │       └── BikeGraphics.jsx # SVGs de 5 tipos de motos
    └── views/
        ├── HomeView.jsx        # Dashboard principal
        ├── RefuelView.jsx      # Abastecimentos
        ├── MaintenanceView.jsx # Manutenções
        ├── StatsView.jsx       # Gráficos e estatísticas
        └── SettingsView.jsx    # Configurações e garagem
```

---

## 🚀 Quick Start

### Pré-requisitos
- [Node.js](https://nodejs.org/) 18+
- npm 9+

### Instalação

```bash
# Clonar o repositório
git clone <repo-url>
cd "telemetria serena"

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O app abrirá automaticamente em **http://localhost:5173**

### Scripts disponíveis

| Script | Comando | Descrição |
|---|---|---|
| **Dev** | `npm run dev` | Servidor de desenvolvimento com HMR |
| **Build** | `npm run build` | Build de produção → `dist/` |
| **Preview** | `npm run preview` | Preview do build local |

---

## 🌐 Deploy

### Vercel (recomendado)

```bash
# Via CLI
npx vercel --prod
```

Ou conecte o repositório Git diretamente ao [Vercel Dashboard](https://vercel.com). O `vercel.json` já está configurado com SPA fallback.

### Outros hosts (Netlify, etc.)

O app é um SPA estático. Após `npm run build`, sirva a pasta `dist/` com redirecionamento de todas as rotas para `index.html`.

---

## 📱 PWA — Instalar no Celular

1. Abra o app no navegador do celular (Chrome, Safari)
2. Toque em **"Adicionar à tela inicial"** ou **"Instalar"**
3. O app funciona como um app nativo com tema e ícone próprios

---

## 🧮 Como o Consumo é Calculado

O PetroLog usa o **método tanque-a-tanque** (full-tank-to-full-tank), o mais preciso para calcular consumo real:

1. Encha o tanque completamente (**tanque cheio**)
2. Rode normalmente, abastecendo quando quiser (parciais são aceitos)
3. Na próxima vez que encher o tanque, o app calcula:

```
Consumo = Distância percorrida ÷ Litros consumidos (todos desde o último cheio)
```

> **Dica:** Sempre marque "Encheu o tanque" quando completar. Abastecimentos parciais são registrados mas aguardam o próximo tanque cheio para fechar o ciclo de cálculo.

---

## 🎯 Configurações da Moto

| Campo | Descrição | Efeito |
|---|---|---|
| **Tanque (litros)** | Capacidade total do tanque | Cálculo de autonomia estimada |
| **Meta (km/l)** | Objetivo de consumo | Linha de referência no gráfico |

---

## 📄 Licença

MIT — use, modifique e distribua livremente.

---

<p align="center">
  by rdal3<br/>
  <strong>PetroLog v2.0.0</strong>
</p>
