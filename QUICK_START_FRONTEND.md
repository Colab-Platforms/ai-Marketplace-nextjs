# 🚀 Quick Start Guide - Frontend Development

## Step-by-Step Guide to Start Building Vendor Dashboard

---

## 1. Verify Backend is Running

```bash
cd backend
npm run dev
```

✅ Server should be at: `http://localhost:5000`

Test it:
```bash
curl http://localhost:5000/api/health
```

Expected: `{"status":"ok","message":"Server is healthy"}`

---

## 2. Setup Frontend Environment

```bash
cd client
```

Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 3. Install Required Packages

```bash
npm install axios
npm install @tanstack/react-query
npm install react-hook-form zod @hookform/resolvers
npm install recharts  # for charts
npm install lucide-react  # for icons (if not installed)
```

If using ShadCN (recommended):
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input label select textarea table badge avatar dropdown-menu dialog toast
```

---

## 4. Create API Client

Create `client/lib/api.ts`:

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // or get from your auth context
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## 5. Create API Service Functions

Create `client/services/vendor.service.ts`:

```typescript
import api from '@/lib/api';

export const vendorService = {
  // Get vendor profile
  getProfile: async () => {
    const response = await api.get('/vendors/profile');
    return response.data;
  },

  // Get vendor stats
  getStats: async () => {
    const response = await api.get('/vendors/stats');
    return response.data;
  },

  // Create vendor profile
  createProfile: async (data: any) => {
    const response = await api.post('/vendors/', data);
    return response.data;
  },

  // Update vendor profile
  updateProfile: async (data: any) => {
    const response = await api.put('/vendors/profile', data);
    return response.data;
  },

  // Submit for verification
  submitVerification: async (vendorId: string) => {
    const response = await api.post(`/vendors/${vendorId}/submit-verification`);
    return response.data;
  },
};
```

Create `client/services/tool.service.ts`:

```typescript
import api from '@/lib/api';

export const toolService = {
  // Get my tools
  getMyTools: async (params?: { status?: string; page?: number; pageSize?: number }) => {
    const response = await api.get('/tools/my/list', { params });
    return response.data;
  },

  // Create tool
  createTool: async (data: any) => {
    const response = await api.post('/tools/', data);
    return response.data;
  },

  // Update tool
  updateTool: async (id: string, data: any) => {
    const response = await api.put(`/tools/${id}`, data);
    return response.data;
  },

  // Delete tool
  deleteTool: async (id: string) => {
    const response = await api.delete(`/tools/${id}`);
    return response.data;
  },

  // Publish tool
  publishTool: async (id: string) => {
    const response = await api.post(`/tools/${id}/publish`);
    return response.data;
  },

  // Unpublish tool
  unpublishTool: async (id: string) => {
    const response = await api.post(`/tools/${id}/unpublish`);
    return response.data;
  },

  // Add pricing plan
  addPricingPlan: async (toolId: string, data: any) => {
    const response = await api.post(`/tools/${toolId}/pricing-plans`, data);
    return response.data;
  },

  // Get pricing plans
  getPricingPlans: async (toolId: string) => {
    const response = await api.get(`/tools/${toolId}/pricing-plans`);
    return response.data;
  },

  // Get categories
  getCategories: async () => {
    const response = await api.get('/categories/');
    return response.data;
  },
};
```

---

## 6. Create Dashboard Layout

Create `client/app/dashboard/layout.tsx`:

```typescript
import { ReactNode } from 'react';
import DashboardSidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/Header';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

---

## 7. Build Sidebar Component

Create `client/components/dashboard/Sidebar.tsx`:

```typescript
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Webhook, 
  User, 
  LogOut 
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/dashboard/products', icon: Package },
  { name: 'API Integration', href: '/dashboard/api-integration', icon: Webhook },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6">
          <h1 className="text-2xl font-bold">AI Marketplace</h1>
          <p className="text-sm text-gray-500">Vendor Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 mb-1 rounded-lg ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## 8. Build Dashboard Page (Stats)

Create `client/app/dashboard/page.tsx`:

```typescript
'use client';

import { useQuery } from '@tanstack/react-query';
import { vendorService } from '@/services/vendor.service';
import StatsCard from '@/components/dashboard/StatsCard';
import { Package, Users, DollarSign, Eye } from 'lucide-react';

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['vendor-stats'],
    queryFn: () => vendorService.getStats(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const stats = data?.data;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Products"
          value={stats?.totalProducts || 0}
          subtitle={`${stats?.publishedProducts || 0} published`}
          icon={Package}
          color="blue"
        />
        <StatsCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          subtitle="Active subscribers"
          icon={Users}
          color="green"
        />
        <StatsCard
          title="Balance"
          value={`$${stats?.vendorBalance?.toFixed(2) || '0.00'}`}
          subtitle={`$${stats?.totalEarnings?.toFixed(2) || '0.00'} earned`}
          icon={DollarSign}
          color="yellow"
        />
        <StatsCard
          title="Total Views"
          value={stats?.totalViews || 0}
          subtitle="Across all tools"
          icon={Eye}
          color="purple"
        />
      </div>

      {/* Verification Status */}
      {stats?.verification_status === 'VERIFIED' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800">
            ✅ Your vendor account is verified!
          </p>
        </div>
      )}
    </div>
  );
}
```

Create `client/components/dashboard/StatsCard.tsx`:

```typescript
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'yellow' | 'purple';
}

const colorClasses = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  yellow: 'bg-yellow-100 text-yellow-600',
  purple: 'bg-purple-100 text-purple-600',
};

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-3xl font-bold mb-1">{value}</p>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
}
```

---

## 9. Add React Query Provider

Update `client/app/providers.tsx`:

```typescript
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

Update `client/app/layout.tsx` to include Providers.

---

## 10. Test Your Dashboard

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd client && npm run dev`
3. Register as vendor or login
4. Navigate to `/dashboard`
5. You should see stats cards with your data!

---

## 11. Next Steps - Products Page

Create `client/app/dashboard/products/page.tsx`:

```typescript
'use client';

import { useQuery } from '@tanstack/react-query';
import { toolService } from '@/services/tool.service';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import ProductsTable from '@/components/dashboard/ProductsTable';

export default function ProductsPage() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['my-tools'],
    queryFn: () => toolService.getMyTools(),
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link href="/dashboard/products/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div>Loading products...</div>
      ) : (
        <ProductsTable 
          products={data?.data?.records || []} 
          onUpdate={refetch}
        />
      )}
    </div>
  );
}
```

---

## 12. Directory Structure

Your frontend should look like:

```
client/
├── app/
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx (stats)
│   │   ├── products/
│   │   │   ├── page.tsx (list)
│   │   │   ├── new/
│   │   │   │   └── page.tsx (add form)
│   │   │   └── [id]/
│   │   │       └── edit/
│   │   │           └── page.tsx (edit form)
│   │   ├── api-integration/
│   │   │   └── page.tsx
│   │   └── profile/
│   │       └── page.tsx
├── components/
│   ├── dashboard/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── StatsCard.tsx
│   │   └── ProductsTable.tsx
│   └── ui/ (shadcn components)
├── services/
│   ├── vendor.service.ts
│   ├── tool.service.ts
│   └── webhook.service.ts
├── lib/
│   └── api.ts
└── .env.local
```

---

## 13. Common Issues & Solutions

### Issue: CORS Error
**Solution**: Backend CORS is configured for `http://localhost:3000`. If you use a different port, update `backend/src/index.ts`

### Issue: 401 Unauthorized
**Solution**: Make sure JWT token is stored and sent in headers. Check browser localStorage.

### Issue: Token not persisting
**Solution**: Use a proper auth context/provider to manage token state across the app.

---

## 📚 Additional Resources

### API Documentation
- Full API reference: `backend/API_DOCUMENTATION.md`
- Testing guide: `backend/TESTING_GUIDE.md`

### Example API Calls
```typescript
// Get stats
const stats = await vendorService.getStats();

// Get tools
const tools = await toolService.getMyTools({ status: 'PUBLISHED' });

// Create tool
const tool = await toolService.createTool({
  name: 'My AI Tool',
  category_id: 'cat_123',
  pricing_model: 'SUBSCRIPTION',
});

// Publish tool
await toolService.publishTool(tool.data.id);
```

---

## ✅ Checklist

- [ ] Backend running on port 5000
- [ ] Frontend environment variables set
- [ ] Required npm packages installed
- [ ] API client created (`lib/api.ts`)
- [ ] Service functions created
- [ ] React Query provider added
- [ ] Dashboard layout built
- [ ] Sidebar navigation working
- [ ] Stats page displaying data
- [ ] Can navigate between pages

---

## 🎯 Your First Goal

**Build the Dashboard page with stats cards that fetch real data from the API!**

Once that's working, move on to the Products page.

**Happy Coding! 🚀**
