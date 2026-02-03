# Portfolio

A modern, interactive portfolio website built with cutting-edge web technologies. Featuring theme customization, terminal aesthetics, and smooth animations.

## 🎨 Features

- **9 Stunning Themes**: Cyber, Dracula, Nord, Monokai, Solarized Dark, Gruvbox, Soft Black, Light, and Blue themes
- **Theme Persistence**: Your selected theme is saved in localStorage
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion for fluid, interactive animations
- **Terminal UI**: Retro terminal-inspired design elements
- **Real-time Theme Updates**: Dynamic color switching across all components
- **Accessible Components**: Built with shadcn-ui for consistent UX

## 🛠️ Technologies

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn-ui
- **Animations**: Framer Motion
- **Icons**: React Icons + Lucide React
- **State Management**: Custom Portfolio Store
- **Routing**: React Router

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+) with npm
- Git

### Installation

```sh
# Step 1: Clone the repository

# Step 2: Navigate to the project directory

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The application will be available at `http://localhost:<PORT>`.

## 📦 Build for Production

```sh
# Build the project
npm run build

# Preview the production build
npm run preview
```

## 🎯 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn-ui components
│   ├── ThemeSelector.tsx
│   ├── HeroSection.tsx
│   ├── SkillsSection.tsx
│   └── ...other sections
├── pages/              # Page components
│   ├── Index.tsx       # Main portfolio page
│   ├── Admin.tsx       # Admin panel
│   └── NotFound.tsx
├── lib/                # Utilities and store
│   ├── portfolioStore.tsx
│   └── portfolioConfig.ts
├── App.tsx             # Main app component
└── index.css           # Global styles & themes
```

## 🎨 Available Themes

1. **Cyber** - Green neon cyberpunk aesthetic
2. **Dracula** - Classic dark purple theme
3. **Nord** - Arctic cool palette
4. **Monokai** - Famous VSCode theme
5. **Solarized Dark** - High contrast warm theme
6. **Gruvbox** - Retro warm colors
7. **Soft Black** - Minimalist dark theme
8. **Light** - Clean light theme
9. **Blue** - Cool blue palette

## 🔧 Configuration

Edit `src/lib/portfolioConfig.ts` to customize:
- Personal information
- Social links
- Skills and experience
- Projects
- Education
- Contact information

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```sh
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

Connect your GitHub repository to Netlify for automatic deployments on every push.

### Deploy to GitHub Pages

```sh
npm run build
# Push dist folder to gh-pages branch
```
## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

---

Built with ❤️ by Pankaj Raj | v1.0.0
