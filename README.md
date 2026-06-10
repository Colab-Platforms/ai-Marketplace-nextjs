# 🤖 AI Marketplace - Vendor Dashboard

A complete B2B AI tools marketplace platform with a fully functional vendor dashboard.

## ✨ Features

### 🎯 For Vendors
- ✅ **Complete Dashboard** - Real-time statistics and analytics
- ✅ **Product Management** - Add, edit, publish/unpublish AI tools
- ✅ **Pricing Plans** - Multiple plans per product with features
- ✅ **Webhook Integration** - Receive subscription events in real-time
- ✅ **Sales Analytics** - Revenue tracking, subscriber metrics, conversion rates
- ✅ **Verification System** - Business document upload and verification

### 🛠️ Technical Stack
- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT tokens
- **File Storage:** Cloudinary integration
- **API:** RESTful with full validation

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd ai-Marketplace-nextjs

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Environment Setup

**Backend (.env):**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/ai_marketplace"
JWT_SECRET="your-super-secret-jwt-key-here"
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
FRONTEND_URL="http://localhost:3000"
PORT=5000
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_BASE_URL="http://localhost:5000"
```

### Database Setup

```bash
cd backend

# Run migrations
npm run db:migrate

# Seed the database
npm run db:seed
```

### Run the Application

```bash
# Terminal 1 - Backend
cd backend
npm run dev  # http://localhost:5000

# Terminal 2 - Frontend
cd client
npm run dev  # http://localhost:3000
```

---

## 📁 Project Structure

```
ai-Marketplace-nextjs/
│
├── backend/                          # Express Backend
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/                # Authentication
│   │   │   ├── vendor/              # Vendor management
│   │   │   ├── tool/                # Products/Tools CRUD
│   │   │   ├── webhook/             # Webhook integration
│   │   │   └── category/            # Product categories
│   │   ├── middlewares/             # Auth, error handling
│   │   └── index.ts                 # Server entry
│   ├── prisma/
│   │   ├── schema.prisma            # Database schema
│   │   └── seeds/                   # Seed data
│   └── API_DOCUMENTATION.md         # API reference
│
├── client/                           # Next.js Frontend
│   ├── app/
│   │   ├── dashboard/               # Vendor Dashboard
│   │   │   ├── page.tsx            # Main dashboard (stats)
│   │   │   ├── products/           # Product management
│   │   │   ├── analytics/          # Sales analytics
│   │   │   ├── api-integration/    # Webhook config
│   │   │   └── verification/       # Document upload
│   │   ├── vendor-onboarding/      # Onboarding flow
│   │   └── (auth)/                 # Login/Register
│   ├── services/                   # API services
│   ├── type/                       # TypeScript types
│   └── components/                 # Reusable components
│
└── Documentation Files
    ├── VENDOR_DASHBOARD_COMPLETE.md    # Implementation details
    ├── DEVELOPER_QUICK_START.md        # Developer guide
    └── README.md                       # This file
```

---

## 🎨 Dashboard Pages

### 1. Main Dashboard (`/dashboard`)
- Real-time vendor statistics
- Total products, subscribers, earnings, balance
- Recent activity (30-day subscriptions, views)
- Quick action cards

### 2. Products Management (`/dashboard/products`)
- List all vendor's AI tools
- Filter by status (All, Published, Drafts)
- Create new products with pricing plans
- Edit existing products
- Publish/Unpublish/Delete actions

### 3. Sales Analytics (`/dashboard/analytics`)
- Revenue overview (earnings, payouts, balance)
- Key metrics grid
- Product distribution charts
- Conversion rate calculations
- Recent activity summary

### 4. API Integration (`/dashboard/api-integration`)
- Webhook configuration
- Test webhook connections
- View execution logs
- Enable/disable webhooks
- Manage webhook secrets

### 5. Verification (`/dashboard/verification`)
- Upload business documents
- View verification status
- Track approval progress

---

## 🔑 Key Features

### Product Management
```typescript
✅ Create AI tools with detailed information
✅ Add multiple pricing plans per product
✅ Upload product screenshots
✅ Publish to marketplace (auto-approved)
✅ Edit and update product details
✅ Unpublish or delete products
```

### Pricing Plans
```typescript
✅ Multiple plans per product
✅ Billing cycles: Monthly, Yearly, Lifetime, One-time
✅ Trial period support
✅ Feature lists for each plan
✅ Multi-currency support (USD, EUR, GBP, INR)
```

### Webhooks
```typescript
✅ Configure webhooks per tool
✅ Receive subscription events in real-time
✅ Test webhook endpoints
✅ View execution logs
✅ Enable/disable webhooks
✅ Secure with webhook secrets
```

### Analytics
```typescript
✅ Real-time dashboard statistics
✅ Revenue tracking (earnings, payouts, balance)
✅ Subscriber metrics
✅ Conversion rate calculations
✅ Product performance tracking
✅ 30-day activity reports
```

---

## 📊 API Endpoints

### Vendor Management
```
GET    /api/vendors/profile           # Get vendor profile
PUT    /api/vendors/profile           # Update profile
GET    /api/vendors/stats             # Dashboard statistics
POST   /api/vendors/:id/docs          # Upload documents
POST   /api/vendors/:id/submit-verification
```

### Tools (Products)
```
GET    /api/tools/my/list             # List vendor's tools
POST   /api/tools/                    # Create tool
GET    /api/tools/:id                 # Get tool details
PUT    /api/tools/:id                 # Update tool
DELETE /api/tools/:id                 # Delete tool
POST   /api/tools/:id/publish         # Publish tool
POST   /api/tools/:id/unpublish       # Unpublish tool
POST   /api/tools/:id/pricing-plans   # Add pricing plan
GET    /api/tools/:id/pricing-plans   # Get pricing plans
```

### Webhooks
```
GET    /api/webhooks/                 # List all webhooks
POST   /api/webhooks/                 # Create webhook
PUT    /api/webhooks/:id              # Update webhook
DELETE /api/webhooks/:id              # Delete webhook
POST   /api/webhooks/:id/test         # Test webhook
GET    /api/webhooks/tool/:id/logs    # Get execution logs
```

### Authentication
```
POST   /api/auth/register             # Register user
POST   /api/auth/login                # Login
POST   /api/auth/logout               # Logout
```

---

## 🔐 Authentication

### JWT Token Flow
```
1. User registers/logs in
2. Server returns JWT token
3. Token stored in localStorage
4. All API requests include: Authorization: Bearer <token>
5. Backend verifies token on each request
6. Token expires after 7 days
```

### Role-Based Access
```typescript
- VENDOR: Access to vendor dashboard
- CUSTOMER: Browse marketplace (future)
- ADMIN: Platform management (future)
```

---

## 🧪 Testing

### Manual Testing Flow

1. **Register as Vendor**
```
http://localhost:3000/register
→ Select role: VENDOR
→ Fill form → Submit
```

2. **Complete Onboarding**
```
http://localhost:3000/vendor-onboarding
→ Fill business details
→ Submit → Auto-redirect to dashboard
```

3. **Create Product**
```
/dashboard/products → Add New Tool
→ Fill form, add pricing plans
→ Submit → Tool created as DRAFT
```

4. **Publish Product**
```
→ Click "Publish" button
→ Tool status changes to PUBLISHED
→ Appears in marketplace
```

5. **Configure Webhook**
```
/dashboard/api-integration → Add Webhook
→ Select tool, enter URL & secret
→ Test webhook → View logs
```

6. **View Analytics**
```
/dashboard/analytics
→ Check all metrics
→ Verify calculations
```

---

## 📚 Documentation

### Available Docs
- **VENDOR_DASHBOARD_COMPLETE.md** - Complete implementation details
- **DEVELOPER_QUICK_START.md** - Quick start guide for developers
- **API_DOCUMENTATION.md** - Full API reference (in backend folder)
- **VENDOR_FLOW_SUMMARY.md** - Original vendor flow documentation

---

## 🛠️ Tech Stack Details

### Frontend
- **Next.js 14** - App Router, Server Components
- **React 18** - Hooks, Context API
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **Redux Toolkit** - State management
- **Font Awesome** - Icons

### Backend
- **Express.js** - Web framework
- **TypeScript** - Type-safe backend
- **Prisma ORM** - Database toolkit
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Joi** - Validation
- **Cloudinary** - File storage
- **Multer** - File upload

---

## 🎨 Design System

### Colors
```css
avatar-accent: #1E90FF  /* Primary blue */
avatar-deep: #0A1929    /* Dark navy */
avatar-navy: #0D47A1    /* Navy blue */
avatar-dark: #1e293b    /* Text dark */
avatar-slate: #64748b   /* Text medium */
avatar-steel: #94a3b8   /* Text light */
```

### Components
- Rounded-3xl cards with subtle shadows
- Gradient backgrounds for emphasis
- Consistent spacing (gap-4, gap-6)
- Icon-based visual hierarchy
- Responsive breakpoints (sm, md, lg, xl)

---

## 🐛 Common Issues & Solutions

### Issue: Database Connection Failed
```bash
# Check PostgreSQL is running
# Verify DATABASE_URL in .env
# Run: npm run db:migrate
```

### Issue: JWT Token Invalid
```typescript
// Clear localStorage and login again
localStorage.clear();
// Navigate to /login
```

### Issue: CORS Error
```typescript
// Backend .env must have:
FRONTEND_URL="http://localhost:3000"
```

### Issue: Categories Not Loading
```bash
# Run seed command
cd backend
npm run db:seed
```

---

## 📈 Future Enhancements

### Phase 3 (Planned)
- [ ] Admin dashboard
- [ ] Customer marketplace view
- [ ] Advanced search and filters
- [ ] Per-tool detailed analytics
- [ ] Bulk operations
- [ ] Email notifications
- [ ] Payment gateway integration
- [ ] Reviews and ratings system
- [ ] Team collaboration features

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👥 Team

- **Backend:** Express + PostgreSQL + Prisma
- **Frontend:** Next.js + TypeScript + Tailwind
- **Implementation:** Complete vendor dashboard with all features

---

## 📞 Support

For issues and questions:
1. Check documentation files
2. Review API_DOCUMENTATION.md
3. Check browser console for errors
4. Review backend logs

---

## 🎉 Achievements

✅ **24+ API Endpoints** - Fully functional backend  
✅ **6 Dashboard Pages** - Complete vendor workflow  
✅ **Real-time Analytics** - Live data integration  
✅ **Webhook System** - Event-driven architecture  
✅ **Type-safe** - Full TypeScript coverage  
✅ **Responsive** - Mobile, tablet, desktop support  
✅ **Production Ready** - Error handling, loading states  

---

## 🚀 Deployment

### Backend
```bash
cd backend
npm run build
npm run start
```

### Frontend
```bash
cd client
npm run build
npm run start
```

### Environment Variables (Production)
- Set DATABASE_URL to production database
- Use strong JWT_SECRET
- Configure Cloudinary for production
- Set FRONTEND_URL to production domain

---

**Version:** 2.0.0  
**Status:** Production Ready  
**Last Updated:** June 10, 2026

**Built with ❤️ for AI Marketplace**
