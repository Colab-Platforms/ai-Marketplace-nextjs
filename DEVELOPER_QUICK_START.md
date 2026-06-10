# 🚀 Developer Quick Start Guide

## Getting Started in 5 Minutes

### 1. Clone & Install
```bash
# Backend
cd backend
npm install

# Frontend
cd client
npm install
```

### 2. Setup Environment
```bash
# Backend (.env)
DATABASE_URL="postgresql://user:password@localhost:5432/ai_marketplace"
JWT_SECRET="your-secret-key-here"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
FRONTEND_URL="http://localhost:3000"

# Frontend (.env.local)
NEXT_PUBLIC_API_BASE_URL="http://localhost:5000"
```

### 3. Database Setup
```bash
cd backend
npm run db:migrate
npm run db:seed
```

### 4. Run Both Servers
```bash
# Terminal 1 - Backend
cd backend
npm run dev  # http://localhost:5000

# Terminal 2 - Frontend
cd client
npm run dev  # http://localhost:3000
```

### 5. Test Login
```
URL: http://localhost:3000/login
Email: Use the vendor email from your seeds
Password: Your seeded password
```

---

## 📁 Project Structure

```
ai-Marketplace-nextjs/
│
├── backend/                      # Express.js Backend
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/            # Authentication
│   │   │   ├── vendor/          # Vendor management
│   │   │   ├── tool/            # Products/Tools
│   │   │   ├── webhook/         # Webhook integration
│   │   │   └── category/        # Categories
│   │   └── middlewares/         # Auth, error handling
│   ├── prisma/
│   │   ├── schema.prisma        # Database schema
│   │   └── seeds/               # Seed data
│   └── package.json
│
└── client/                       # Next.js Frontend
    ├── app/
    │   ├── dashboard/           # Vendor dashboard
    │   │   ├── page.tsx         # Main dashboard
    │   │   ├── layout.tsx       # Sidebar layout
    │   │   ├── products/        # Products management
    │   │   ├── analytics/       # Analytics page
    │   │   └── api-integration/ # Webhooks
    │   └── vendor-onboarding/   # Onboarding flow
    ├── services/                # API services
    │   ├── vendor.service.ts
    │   ├── tool.service.ts
    │   └── webhook.service.ts
    ├── type/                    # TypeScript types
    │   ├── auth.ts
    │   └── tool.ts
    ├── lib/                     # Utilities
    │   ├── api.ts              # Axios config
    │   └── verification.ts     # Vendor helpers
    └── components/             # Reusable components
```

---

## 🔑 Key API Endpoints

### Vendor
```typescript
GET    /api/vendors/profile      // Get vendor profile
PUT    /api/vendors/profile      // Update profile
GET    /api/vendors/stats        // Dashboard stats
POST   /api/vendors/:id/submit-verification
```

### Tools (Products)
```typescript
GET    /api/tools/my/list        // List vendor's tools
POST   /api/tools/               // Create tool
GET    /api/tools/:id            // Get tool details
PUT    /api/tools/:id            // Update tool
DELETE /api/tools/:id            // Delete tool
POST   /api/tools/:id/publish    // Publish tool
POST   /api/tools/:id/unpublish  // Unpublish tool
```

### Pricing Plans
```typescript
POST   /api/tools/:id/pricing-plans      // Add plan
GET    /api/tools/:id/pricing-plans      // Get plans
```

### Webhooks
```typescript
GET    /api/webhooks/                    // List webhooks
POST   /api/webhooks/                    // Create webhook
PUT    /api/webhooks/:id                 // Update webhook
DELETE /api/webhooks/:id                 // Delete webhook
POST   /api/webhooks/:id/test            // Test webhook
GET    /api/webhooks/tool/:id/logs       // Get logs
```

---

## 💻 Service Usage Examples

### Using Vendor Service
```typescript
import { vendorService } from '@/services/vendor.service';

// Get stats
const stats = await vendorService.getStats();
console.log(stats.data);

// Get profile
const profile = await vendorService.getProfile();

// Update profile
await vendorService.updateProfile({
  company_name: "New Name",
  website_url: "https://new-url.com"
});
```

### Using Tool Service
```typescript
import { toolService } from '@/services/tool.service';

// Get my tools
const tools = await toolService.getMyTools({ 
  status: 'PUBLISHED',
  page: 1,
  pageSize: 10 
});

// Create tool
const newTool = await toolService.createTool({
  name: "AI Content Writer",
  category_id: "cat_id_here",
  pricing_model: "FREEMIUM",
  short_description: "Generate content with AI"
});

// Publish tool
await toolService.publishTool(toolId);

// Add pricing plan
await toolService.addPricingPlan(toolId, {
  name: "Pro Plan",
  billing_cycle: "MONTHLY",
  price: 29.99,
  currency: "USD",
  features: ["Feature 1", "Feature 2"]
});
```

### Using Webhook Service
```typescript
import { webhookService } from '@/services/webhook.service';

// Create webhook
await webhookService.create({
  tool_id: "tool_id_here",
  webhook_url: "https://your-domain.com/webhook",
  webhook_secret: "your_secret_key"
});

// Test webhook
const result = await webhookService.test(webhookId);

// Get logs
const logs = await webhookService.getLogs(toolId);
```

---

## 🎨 UI Component Patterns

### Stat Card
```tsx
<div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
  <div className="w-12 h-12 rounded-xl bg-avatar-accent/10 text-avatar-accent flex items-center justify-center mb-4">
    <i className="fas fa-robot text-lg" />
  </div>
  <p className="text-3xl font-bold text-avatar-dark">{value}</p>
  <p className="text-sm text-avatar-slate">Label</p>
</div>
```

### Button Primary
```tsx
<button className="px-5 py-2.5 bg-avatar-accent hover:bg-avatar-navy text-white rounded-xl text-sm font-semibold shadow-md transition-all">
  Click Me
</button>
```

### Input Field
```tsx
<input 
  className="w-full px-4 py-2.5 rounded-xl border border-avatar-light bg-white text-sm text-avatar-dark placeholder:text-avatar-silver focus:outline-none focus:ring-2 focus:ring-avatar-accent/30 focus:border-avatar-accent transition"
  placeholder="Enter value..."
/>
```

### Status Badge
```tsx
<span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-500 text-white">
  Published
</span>
```

---

## 🔧 Common Tasks

### Add a New Dashboard Page

1. **Create the page file:**
```tsx
// client/app/dashboard/my-page/page.tsx
'use client';

export default function MyPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-avatar-dark">My Page</h1>
      {/* Your content */}
    </div>
  );
}
```

2. **Add to sidebar menu:**
```tsx
// client/app/dashboard/layout.tsx
const menuItems = [
  // ...existing items
  { name: 'My Page', href: '/dashboard/my-page', icon: 'fa-star' },
];
```

### Add a New API Service

1. **Create service file:**
```typescript
// client/services/myservice.service.ts
import apiClient from '@/lib/api';

export const myService = {
  getData: async () => {
    const response = await apiClient.get('/api/my-endpoint');
    return response.data;
  },
  
  postData: async (data: any) => {
    const response = await apiClient.post('/api/my-endpoint', data);
    return response.data;
  },
};
```

2. **Use in component:**
```tsx
import { myService } from '@/services/myservice.service';

const data = await myService.getData();
```

---

## 🐛 Debugging Tips

### Backend Logs
```bash
# Check server logs
cd backend
npm run dev

# Watch for errors in console
# API errors show with stack traces
```

### Frontend Logs
```bash
# Open browser console (F12)
# Check Network tab for API calls
# Check Console for JavaScript errors
```

### Common Issues

**Issue:** "JWT token invalid"
```typescript
// Solution: Check localStorage
localStorage.getItem('accessToken')
// If null, user needs to login again
```

**Issue:** "Cannot connect to database"
```bash
# Solution: Check DATABASE_URL in .env
# Ensure PostgreSQL is running
```

**Issue:** "CORS error"
```typescript
// Solution: Check FRONTEND_URL in backend .env
// Must match your frontend URL
```

---

## 📚 Useful Commands

### Database
```bash
npm run db:migrate      # Run migrations
npm run db:seed         # Seed database
npm run db:reset        # Reset database
npm run db:studio       # Open Prisma Studio
```

### Development
```bash
npm run dev             # Start dev server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run linter
```

### Git
```bash
git status              # Check status
git add .               # Stage all changes
git commit -m "message" # Commit changes
git push                # Push to remote
```

---

## 🎯 Testing Workflow

### 1. Test Vendor Registration
```
http://localhost:3000/register
→ Select "VENDOR" role
→ Fill form → Submit
→ Should redirect to onboarding
```

### 2. Test Onboarding
```
http://localhost:3000/vendor-onboarding
→ Fill business details
→ Submit → Redirect to dashboard
```

### 3. Test Product Creation
```
http://localhost:3000/dashboard/products
→ Click "Add New Tool"
→ Fill all sections
→ Add pricing plans
→ Submit → Tool created as DRAFT
```

### 4. Test Publishing
```
→ Find draft tool
→ Click "Publish"
→ Status changes to PUBLISHED
→ Tool appears in marketplace
```

### 5. Test Analytics
```
http://localhost:3000/dashboard/analytics
→ All metrics should display
→ Charts should render
→ Numbers should match stats API
```

---

## 🔐 Authentication Flow

```
1. User logs in → POST /api/auth/login
2. Receives JWT token
3. Token stored in localStorage
4. All API calls include: Authorization: Bearer <token>
5. Backend verifies token on each request
6. If invalid → 401 → Redirect to /login
```

---

## 📊 Data Flow

```
Component → Service → API → Backend → Database
    ↓          ↓        ↓       ↓         ↓
   UI ← Transform ← Response ← JSON ← Prisma
```

### Example: Load Dashboard Stats
```
DashboardPage.tsx
  → vendorService.getStats()
    → apiClient.get('/api/vendors/stats')
      → Backend: vendors.controller.ts
        → vendors.service.ts
          → Prisma query
            → PostgreSQL database
              → Return data
```

---

## 🎨 Tailwind Classes Reference

### Spacing
```css
p-4      /* padding: 1rem */
m-4      /* margin: 1rem */
gap-4    /* gap: 1rem */
space-y-4 /* vertical spacing */
```

### Sizing
```css
w-full   /* width: 100% */
h-12     /* height: 3rem */
max-w-4xl /* max-width: 56rem */
```

### Colors (Avatar Theme)
```css
bg-avatar-accent      /* Primary blue */
text-avatar-dark      /* Dark text */
text-avatar-slate     /* Medium gray */
text-avatar-steel     /* Light gray */
border-avatar-light   /* Light border */
```

### Rounded Corners
```css
rounded-xl   /* 0.75rem */
rounded-2xl  /* 1rem */
rounded-3xl  /* 1.5rem */
rounded-full /* 9999px */
```

---

## 📞 Need Help?

### Check These Files First:
1. `VENDOR_DASHBOARD_COMPLETE.md` - Full implementation details
2. `API_DOCUMENTATION.md` - Backend API reference
3. `VENDOR_FLOW_SUMMARY.md` - Original flow documentation

### Common Questions:

**Q: How do I add a new field to the tool form?**
A: Add to the form state, add input field, update the API call.

**Q: How do I change the sidebar menu?**
A: Edit `client/app/dashboard/layout.tsx`, update `menuItems` array.

**Q: How do I add a new API endpoint?**
A: Backend: Add route → controller → service. Frontend: Add to service file.

**Q: Where are the colors defined?**
A: `client/tailwind.config.ts` - extends theme with avatar colors.

---

**Happy Coding! 🚀**

If you encounter issues, check the browser console and backend logs first.
Most errors will have clear messages indicating what went wrong.
