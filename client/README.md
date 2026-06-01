# Avatar AI Landing Page - Next.js 16

A modern, fully responsive landing page built with Next.js 16, TypeScript, and TailwindCSS.

## 🚀 Features

- ✅ Next.js 16 with App Router
- ✅ TypeScript for type safety
- ✅ TailwindCSS for styling
- ✅ Component-based architecture
- ✅ Fully responsive design
- ✅ Smooth animations and transitions
- ✅ SEO optimized
- ✅ Production-ready code

## 📁 Project Structure

```
client/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with fonts and metadata
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/
│   ├── common/              # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── PageLoader.tsx
│   │   ├── ScrollProgress.tsx
│   │   └── AnnouncementBar.tsx
│   └── home/                # Home page sections
│       ├── HeroSection.tsx
│       ├── AboutSection.tsx
│       ├── DivisionsSection.tsx
│       ├── LearningSection.tsx
│       ├── SolutionsSection.tsx
│       ├── MarketplaceSection.tsx
│       ├── EnterpriseSection.tsx
│       ├── StatsSection.tsx
│       ├── TestimonialsSection.tsx
│       ├── FAQSection.tsx
│       └── CTASection.tsx
├── data/                    # Data files
│   ├── stats.ts
│   ├── testimonials.ts
│   ├── faqs.ts
│   └── divisions.ts
├── hooks/                   # Custom React hooks
│   └── useInView.ts
├── public/                  # Static assets
│   ├── Aavtat logo.svg
│   └── bannerimages/
└── styles/                  # Additional styles (if needed)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the client folder:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🎨 Customization

### Colors

The color palette is defined in `app/globals.css`:

- `avatar-navy`: #2C3E5A
- `avatar-dark`: #1E2D42
- `avatar-slate`: #3A4F6E
- `avatar-steel`: #8A9BB5
- `avatar-silver`: #B8C4D4
- `avatar-light`: #E8ECF2
- `avatar-ice`: #F4F6F9
- `avatar-accent`: #4A6FA5
- `avatar-deep`: #172536

### Fonts

- Display Font: Space Grotesk
- Body Font: Inter

### Data

Update content in the `data/` folder:
- `stats.ts` - Statistics numbers
- `testimonials.ts` - Customer testimonials
- `faqs.ts` - FAQ questions and answers
- `divisions.ts` - Division cards

## 🔧 Key Components

### HeroSection
Auto-sliding banner with typewriter effect

### AboutSection
Grid layout with images and feature highlights

### DivisionsSection
8 division cards with hover effects

### TestimonialsSection
Auto-scrolling marquee of testimonials

### FAQSection
Accordion-style FAQ with smooth animations

### StatsSection
Animated counter statistics

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Mobile menu with smooth transitions
- Optimized images with Next.js Image component

## ⚡ Performance

- Server-side rendering (SSR)
- Optimized images with Next.js Image
- Code splitting
- Lazy loading
- Font optimization

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

All rights reserved © 2025 Avatar AI Ecosystem

## 🤝 Contributing

This is a private project. For any questions or suggestions, please contact the development team.
