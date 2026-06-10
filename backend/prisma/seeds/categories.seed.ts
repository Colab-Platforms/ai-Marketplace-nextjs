import prisma from "@root/prisma.js";

export async function seedCategories() {
    console.log("🏷️  Seeding categories...");

    const categories = [
        { name: "Content Generation", slug: "content-generation" },
        { name: "Image Generation", slug: "image-generation" },
        { name: "Video Generation", slug: "video-generation" },
        { name: "Audio & Speech", slug: "audio-speech" },
        { name: "Chatbots & Assistants", slug: "chatbots-assistants" },
        { name: "Data Analytics", slug: "data-analytics" },
        { name: "Code Generation", slug: "code-generation" },
        { name: "Marketing & SEO", slug: "marketing-seo" },
        { name: "Design Tools", slug: "design-tools" },
        { name: "Business Intelligence", slug: "business-intelligence" },
        { name: "Customer Support", slug: "customer-support" },
        { name: "Sales & CRM", slug: "sales-crm" },
        { name: "Productivity", slug: "productivity" },
        { name: "Research & Education", slug: "research-education" },
        { name: "Healthcare", slug: "healthcare" },
        { name: "Finance", slug: "finance" },
        { name: "Legal", slug: "legal" },
        { name: "HR & Recruitment", slug: "hr-recruitment" },
        { name: "E-commerce", slug: "e-commerce" },
        { name: "Social Media", slug: "social-media" },
    ];

    for (const category of categories) {
        await prisma.categories.upsert({
            where: { slug: category.slug },
            update: {},
            create: category,
        });
    }

    console.log(`✅ Seeded ${categories.length} categories`);
}
