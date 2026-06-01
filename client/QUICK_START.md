# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd client
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (with hot reload) |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🎨 Customization Quick Guide

### Change Colors
Edit `app/globals.css`:
```css
--color-avatar-navy: #2C3E5A;
--color-avatar-accent: #4A6FA5;
/* etc. */
```

### Update Content

#### Statistics
Edit `data/stats.ts`:
```typescript
export const stats: Stat[] = [
  { id: '1', value: 12000, suffix: '+', label: 'AI Professionals Trained' },
  // ...
];
```

#### Testimonials
Edit `data/testimonials.ts`

#### FAQs
Edit `data/faqs.ts`

#### Divisions
Edit `data/divisions.ts`

### Add New Section
1. Create component in `components/home/NewSection.tsx`
2. Import in `app/page.tsx`:
```typescript
import NewSection from '@/components/home/NewSection';
```
3. Add to page:
```typescript
<NewSection />
```

---

## 📱 Testing Responsive Design

### Desktop
- Open [http://localhost:3000](http://localhost:3000)

### Mobile
- Open DevTools (F12)
- Click device toolbar icon
- Select mobile device

### Different Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Build Errors
```bash
# Clear cache
rm -rf .next
npm run build
```

### Type Errors
```bash
# Check types
npx tsc --noEmit
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📦 Production Deployment

### Build
```bash
npm run build
```

### Test Production Build Locally
```bash
npm start
```

### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Other Platforms
- **Netlify**: Connect GitHub repo
- **AWS Amplify**: Connect GitHub repo
- **Docker**: Use provided Dockerfile (if created)

---

## 🔧 Environment Variables

Create `.env.local` for environment-specific variables:
```env
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Access in code:
```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [React Documentation](https://react.dev)

---

## 💡 Tips

1. **Hot Reload**: Changes auto-refresh in dev mode
2. **TypeScript**: Hover over variables for type info
3. **Tailwind IntelliSense**: Install VS Code extension
4. **Component Structure**: Keep components small and focused
5. **Data Separation**: Keep content in `data/` folder

---

## ✅ Checklist Before Going Live

- [ ] Update metadata in `app/layout.tsx`
- [ ] Replace placeholder images with real ones
- [ ] Test all links
- [ ] Test on mobile devices
- [ ] Run `npm run build` successfully
- [ ] Set up analytics
- [ ] Configure SEO meta tags
- [ ] Test page load speed
- [ ] Check accessibility
- [ ] Set up error tracking

---

## 🆘 Need Help?

1. Check `README.md` for detailed documentation
2. Check `CONVERSION_NOTES.md` for technical details
3. Review Next.js documentation
4. Check component comments in code

---

**Happy Coding! 🎉**
