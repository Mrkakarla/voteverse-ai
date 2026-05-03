# VoteVerse AI - Civic Engagement & Election Platform

A modern, full-stack web application built with Next.js 14, TypeScript, and Tailwind CSS that enhances civic participation through interactive features, AI-powered analysis, and gamification.

## 🚀 Features

### Core Functionality
- **Authentication**: Secure auth with Supabase and OAuth (Google)
- **Interactive Simulator**: Step-by-step voting process education
- **AI Chatbot**: Vira AI assistant powered by Claude API
- **Fake News Detection**: Credibility analysis for news articles
- **Civic Pledges**: Public commitment system with leaderboard
- **Learning Modules**: Educational content on voting and civic participation
- **Booth Locator**: Find nearby voting locations with Google Maps
- **Gamification**: XP, levels, badges, streaks, and achievements

### Quality & Performance
- **Code Quality**: ESLint with accessibility rules (jsx-a11y)
- **Security**: Middleware auth, protected routes, OAuth integration
- **Efficiency**: Image optimization, code-splitting, lazy loading
- **Testing**: Vitest + React Testing Library with examples
- **Accessibility**: WCAG 2.1 compliant, ARIA labels, keyboard navigation
- **Performance Monitoring**: Web Vitals tracking (CLS, FID, LCP, FCP, TTFB)

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Anthropic API key
- Google Maps API key (optional, for booth locator)

## 🛠️ Installation

### 1. Clone & Install

```bash
cd voteverse-ai
npm install --legacy-peer-deps
```

### 2. Setup Supabase

1. Create project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run:
   - `supabase/migrations/001_init_schema.sql`
   - `supabase/migrations/002_seed_data.sql`
3. Enable Google OAuth in Authentication → Providers
4. Copy project URL and anon key

### 3. Setup Anthropic

1. Get API key from [console.anthropic.com](https://console.anthropic.com)

### 4. Environment Variables

```bash
cp .env.example .env.local
```

Fill in the values:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-production-domain.com
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_APP_URL=https://your-production-domain.com
ANTHROPIC_API_KEY=your_anthropic_api_key
```

### Production Auth Setup

1. Create a Supabase project and add the Supabase URL and anon key to `.env.local` and your hosting provider.
2. In Supabase Auth, enable the Google provider and add your Google OAuth client ID and secret.
3. In Google Cloud Console, add `https://YOUR_SUPABASE_PROJECT_REF.supabase.co/auth/v1/callback` as an authorized redirect URI.
4. In Supabase Auth URL settings, set the site URL to your deployed app and add `/callback` to the redirect allow list.
5. Set `NEXTAUTH_URL` and `NEXTAUTH_SECRET` if you use the NextAuth route in this app.
6. Set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` only if you want the booth map to render live in production.

### Deployment Order

If you want to set this up one step at a time, do it in this order:
1. Supabase project URL and anon key.
2. Supabase Google provider.
3. Google OAuth client configuration.
4. Deploy URL and callback URLs.
5. Optional keys: `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, and Google Maps API key.

## 📦 Project Structure

```
voteverse-ai/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Protected dashboard pages
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # UI primitives
│   ├── layout/           # Layout components
│   ├── dashboard/        # Dashboard components
│   ├── chatbot/          # Chat interface
│   └── ...
├── lib/                  # Utilities & configs
│   ├── supabase/         # Supabase clients
│   ├── anthropic.ts      # Claude API setup
│   ├── gamification.ts   # Game logic
│   └── utils.ts          # Helpers
├── hooks/                # Custom React hooks
├── types/                # TypeScript types
├── supabase/            # Database migrations
├── __tests__/           # Test files
└── public/              # Static assets
```

## 🎮 Development

### Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Run tests
npm test

# Run tests in UI mode
npm run test:ui

# Generate coverage report
npm run test:coverage

# Type check
npm run type-check
```

## 🧪 Testing

Tests are written with Vitest and React Testing Library. See [TESTING.md](./TESTING.md) for detailed guide.

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# Coverage report
npm run test:coverage
```

## ♿ Accessibility

VoteVerse AI is built with WCAG 2.1 accessibility standards in mind. See [ACCESSIBILITY.md](./ACCESSIBILITY.md) for guidelines.

Check accessibility issues:

```bash
npm run lint  # Includes jsx-a11y checks
```

## 📊 Performance

Web Vitals are automatically tracked:
- **CLS**: Cumulative Layout Shift
- **FID**: First Input Delay
- **LCP**: Largest Contentful Paint
- **FCP**: First Contentful Paint
- **TTFB**: Time to First Byte

View metrics in browser console during development.

## 🔐 Security

- Environment variables secured with .env.local
- Database protected with Supabase Row Level Security
- Authentication middleware for protected routes
- OAuth integration with Google
- CSRF protection via Next.js

## 📱 Responsive Design

Built mobile-first with Tailwind CSS:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Deploy to Vercel

```bash
# Push to GitHub
git push origin main

# Import at vercel.com/new
# Add environment variables
# Deploy
```

### Environment Variables on Vercel

Add all variables from `.env.local` in Vercel project settings:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- ANTHROPIC_API_KEY
- GOOGLE_MAPS_API_KEY (optional)

## 📚 Documentation

- [Testing Guide](./TESTING.md) - How to write and run tests
- [Accessibility Guide](./ACCESSIBILITY.md) - WCAG compliance and best practices
- [Database Schema](./supabase/migrations/001_init_schema.sql) - Database structure
- [API Routes](./app/api/) - Backend endpoints

## 🎨 Design System

- **Colors**: Indigo/Slate palette matching democracy theme
- **Typography**: Responsive text sizing
- **Components**: Reusable UI primitives in `components/ui/`
- **Animations**: Framer Motion for smooth interactions

## 🤝 Contributing

1. Follow the [Code of Conduct](./CODE_OF_CONDUCT.md)
2. Run `npm run lint` before committing
3. Ensure tests pass: `npm test`
4. Follow TypeScript strict mode
5. Add tests for new features

## 📝 License

MIT License - See LICENSE file

## 🆘 Support

For issues, questions, or suggestions:
1. Check [existing issues](https://github.com/voteverse/voteverse-ai/issues)
2. Create a new issue with detailed description
3. Include environment info and reproduction steps

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Supabase](https://supabase.com/)
- [Anthropic Claude](https://www.anthropic.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

