# Test Marketplace - Quick Start Guide

## 🚀 Quick Test Instructions

Follow these steps to test the marketplace with real data:

---

## Step 1: Start Backend

```bash
cd backend
npm run dev
```

Server should start on: `http://localhost:5000`

---

## Step 2: Start Frontend

```bash
cd client
npm run dev
```

Frontend should start on: `http://localhost:3000`

---

## Step 3: Create Test Data

### Option A: Using API (Postman/Thunder Client/curl)

#### 3.1 Register as Vendor

**POST** `http://localhost:5000/api/auth/register`

```json
{
  "firstName": "John",
  "lastName": "Smith",
  "name": "John Smith",
  "email": "vendor@test.com",
  "password": "Test@123",
  "role": "VENDOR"
}
```

**Copy the `accessToken` from response!**

---

#### 3.2 Create Vendor Profile

**POST** `http://localhost:5000/api/vendors/`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
```

**Body:**
```json
{
  "company_name": "AI Solutions Inc",
  "brand_name": "AI Solutions",
  "company_type": "Private Limited",
  "description": "Leading AI tool provider"
}
```

---

#### 3.3 Get Categories

**GET** `http://localhost:5000/api/categories/`

**Copy a `category id` from the response** (e.g., "clx..." for Content Generation)

---

#### 3.4 Upload Documents & Submit Verification

**POST** `http://localhost:5000/api/vendors/VENDOR_ID/docs`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
```

**Body:**
```json
{
  "doc_type": "GST_CERTIFICATE",
  "doc_url": "https://example.com/doc.pdf"
}
```

**POST** `http://localhost:5000/api/vendors/VENDOR_ID/submit-verification`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

✅ **Vendor is now VERIFIED (auto-approved)**

---

#### 3.5 Create AI Tool

**POST** `http://localhost:5000/api/tools/`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
```

**Body:**
```json
{
  "name": "AI Content Writer Pro",
  "category_id": "YOUR_CATEGORY_ID_HERE",
  "short_description": "Generate high-quality content with AI",
  "full_description": "Our AI Content Writer Pro uses advanced GPT models to create engaging, SEO-optimized content for blogs, social media, and marketing materials. Perfect for content creators, marketers, and businesses looking to scale their content production.",
  "logo_url": "https://via.placeholder.com/150",
  "website_url": "https://aiwriterpro.example.com",
  "demo_url": "https://demo.aiwriterpro.example.com",
  "pricing_model": "SUBSCRIPTION",
  "images": [
    "https://via.placeholder.com/600x400/4A90E2/ffffff?text=Screenshot+1",
    "https://via.placeholder.com/600x400/50C878/ffffff?text=Screenshot+2"
  ]
}
```

**Copy the `tool id` from response!**

---

#### 3.6 Add Pricing Plans

**POST** `http://localhost:5000/api/tools/TOOL_ID/pricing-plans`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
```

**Basic Plan:**
```json
{
  "name": "Basic Plan",
  "description": "Perfect for individuals and small projects",
  "billing_cycle": "MONTHLY",
  "price": 19.99,
  "currency": "USD",
  "trial_days": 7,
  "features": [
    "10,000 words per month",
    "5 AI models",
    "Basic templates",
    "Email support"
  ]
}
```

**Pro Plan:**
```json
{
  "name": "Professional Plan",
  "description": "For professionals and growing businesses",
  "billing_cycle": "MONTHLY",
  "price": 49.99,
  "currency": "USD",
  "trial_days": 14,
  "features": [
    "50,000 words per month",
    "All AI models",
    "Advanced templates",
    "Priority support",
    "SEO optimization",
    "Plagiarism checker"
  ]
}
```

---

#### 3.7 Publish Tool

**POST** `http://localhost:5000/api/tools/TOOL_ID/publish`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

✅ **Tool is now PUBLISHED and will appear in marketplace!**

---

## Step 4: View in Marketplace

1. Go to: `http://localhost:3000/marketplace`
2. You should see your published tool!
3. Click "View Details" to see the full page
4. Try search and category filters

---

## Step 5: Create More Tools (Optional)

Repeat steps 3.5-3.7 to add more tools. Here are some ideas:

### Sample Tool 2: "AI Image Generator"
```json
{
  "name": "AI Image Generator",
  "category_id": "IMAGE_GENERATION_CATEGORY_ID",
  "short_description": "Create stunning images from text descriptions",
  "full_description": "Transform your ideas into beautiful images with our AI-powered image generator. Perfect for designers, marketers, and content creators.",
  "pricing_model": "FREEMIUM",
  "images": [
    "https://via.placeholder.com/600x400/9B59B6/ffffff?text=AI+Images"
  ]
}
```

### Sample Tool 3: "AI Chatbot Builder"
```json
{
  "name": "AI Chatbot Builder",
  "category_id": "CHATBOTS_CATEGORY_ID",
  "short_description": "Build intelligent chatbots in minutes",
  "full_description": "Create custom AI chatbots for customer support, sales, and engagement. No coding required.",
  "pricing_model": "SUBSCRIPTION",
  "images": [
    "https://via.placeholder.com/600x400/E74C3C/ffffff?text=Chatbot+Builder"
  ]
}
```

---

## Option B: Using Backend Script

Create a seed script `backend/scripts/seed_sample_tool.ts`:

```typescript
import prisma from "@root/prisma.js";

async function seedSampleTool() {
  // Find or create vendor
  let vendor = await prisma.vendors.findFirst({
    where: { company_name: "AI Solutions Inc" }
  });

  if (!vendor) {
    // Create user first
    const user = await prisma.users.create({
      data: {
        firstName: "John",
        lastName: "Smith",
        name: "John Smith",
        email: "vendor@test.com",
        password: "$2b$10$...", // hashed password
        role: "VENDOR",
        isVerified: true
      }
    });

    vendor = await prisma.vendors.create({
      data: {
        owner_user_id: user.id,
        company_name: "AI Solutions Inc",
        verification_status: "VERIFIED"
      }
    });
  }

  // Get a category
  const category = await prisma.categories.findFirst({
    where: { name: "Content Generation" }
  });

  if (!category) {
    throw new Error("Run db:seed first to add categories");
  }

  // Create tool
  const tool = await prisma.tools.create({
    data: {
      vendor_id: vendor.id,
      category_id: category.id,
      name: "AI Content Writer Pro",
      slug: `ai-content-writer-pro-${Date.now()}`,
      short_description: "Generate high-quality content with AI",
      full_description: "Advanced AI content generation tool",
      pricing_model: "SUBSCRIPTION",
      status: "PUBLISHED", // Published immediately
    }
  });

  // Add pricing plan
  await prisma.pricing_plans.create({
    data: {
      tool_id: tool.id,
      name: "Professional Plan",
      description: "For professionals",
      billing_cycle: "MONTHLY",
      price: 49.99,
      currency: "USD",
      trial_days: 14
    }
  });

  console.log("✅ Sample tool created:", tool.name);
}

seedSampleTool()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
```

Run with:
```bash
cd backend
tsx scripts/seed_sample_tool.ts
```

---

## 🧪 Testing Checklist

After adding tools, test these features:

### Marketplace Page:
- [ ] Tools display in grid
- [ ] Category filter works
- [ ] Search works (try searching "AI")
- [ ] Pagination appears (if 10+ tools)
- [ ] Images load correctly
- [ ] Pricing displays correctly
- [ ] Click "View Details" works

### Tool Detail Page:
- [ ] Tool info displays correctly
- [ ] Screenshots/images show
- [ ] Description is readable
- [ ] Pricing plans display with features
- [ ] Vendor info shows
- [ ] Statistics display (views, reviews)
- [ ] "Visit Website" button works (if URL provided)
- [ ] "Try Demo" button works (if URL provided)
- [ ] "Back to Marketplace" link works

### Filters & Search:
- [ ] "All Tools" shows everything
- [ ] Selecting a category filters correctly
- [ ] Search updates results in real-time
- [ ] Empty state shows when no results

---

## 🐛 Troubleshooting

### Issue: No tools appear in marketplace
**Solutions:**
1. Check tool status is "PUBLISHED" (not "DRAFT")
2. Check vendor is "VERIFIED"
3. Check tool has at least one pricing plan before publishing
4. Check backend console for errors

### Issue: 401 Unauthorized
**Solutions:**
1. Token might be expired - login again
2. Make sure Authorization header is set correctly
3. Check token format: `Bearer YOUR_TOKEN`

### Issue: Category not found
**Solutions:**
1. Run `npm run db:seed` in backend to seed categories
2. Use correct category ID from GET /api/categories response

### Issue: Images not loading
**Solutions:**
1. Use valid image URLs (https://via.placeholder.com works for testing)
2. Check browser console for CORS errors
3. Ensure URLs are accessible

---

## 📊 Expected Result

After following these steps, you should see:

1. **Marketplace Page** with your published tool(s)
2. **Tool cards** with images, descriptions, pricing
3. **Working filters** by category
4. **Working search** functionality
5. **Tool detail page** with complete information
6. **Pricing plans** displayed nicely

---

## 🎉 Success!

If you can see and interact with your tools in the marketplace, the integration is working perfectly!

**Next steps:**
- Build vendor dashboard to manage tools via UI
- Add more tools through the API
- Test with different categories and pricing models

