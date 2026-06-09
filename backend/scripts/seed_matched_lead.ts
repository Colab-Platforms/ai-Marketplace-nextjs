import prisma from '../prisma.js';

async function seedMatchedLead() {
  console.log('--- Seeding Matched Lead for Vendor ---');
  
  try {
    // 1. Find the vendor
    const vendor = await prisma.user.findUnique({
      where: { email: 'vendor.ujjwal@gmail.com' }
    });

    if (!vendor) {
      console.error('Vendor not found');
      return;
    }

    // 2. Find a tool owned by this vendor
    const tool = await prisma.tool.findFirst({
      where: { vendorId: vendor.id }
    });

    if (!tool) {
      console.log('Creating a tool for the vendor...');
      const newTool = await prisma.tool.create({
        data: {
          vendorId: vendor.id,
          name: 'AI Analytics Pro',
          category: 'Analytics',
          description: 'Advanced AI-powered business analytics.',
          features: ['Dashboard', 'Real-time monitoring'],
          pricingTiers: ['Basic', 'Enterprise']
        }
      });
      console.log('Tool created:', newTool.id);
    }

    const toolToUse = tool || await prisma.tool.findFirst({ where: { vendorId: vendor.id } });

    // 3. Find a lead
    const lead = await prisma.lead.findFirst();

    if (!lead) {
      console.error('No leads found in database. Create a lead first.');
      return;
    }

    // 4. Create a shortlist if not exists
    const rm = await prisma.user.findFirst({
      where: { userRoles: { some: { role: { name: 'RM' } } } }
    });

    const rmId = rm?.id || 1; // Fallback to ID 1 if no RM found

    const shortlist = await prisma.vendorShortlist.create({
      data: {
        leadId: lead.id,
        recommendedByRmId: rmId,
      }
    });

    // 5. Link the tool to the shortlist
    await prisma.shortlistTool.create({
      data: {
        shortlistId: shortlist.id,
        toolId: toolToUse!.id
      }
    });

    console.log(`✅ Successfully matched lead #${lead.id} with vendor tool #${toolToUse!.id}`);

  } catch (err: any) {
    console.error('❌ Error seeding matched lead:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

seedMatchedLead();
