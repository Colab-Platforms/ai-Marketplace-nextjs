import prisma from '../prisma.js';

async function verifyVendorData() {
  const vendor = await prisma.user.findUnique({ where: { email: 'vendor.ujjwal@gmail.com' } });
  if (!vendor) return console.log('Vendor not found');

  const tools = await prisma.tool.findMany({ where: { vendorId: vendor.id } });
  console.log('Vendor Tools:', tools.length);

  const matchedLeads = await prisma.lead.count({
    where: {
      vendorShortlists: {
        some: {
          shortlistTools: {
            some: {
              tool: { vendorId: vendor.id }
            }
          }
        }
      }
    }
  });
  console.log('Matched Leads:', matchedLeads);
}

verifyVendorData();
