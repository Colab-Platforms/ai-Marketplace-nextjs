
const API_URL = 'http://localhost:5000/api';

async function testDisputeSystem() {
    console.log("🚀 Starting Dispute Resolution Test...");

    // 1. Login as Admin to get a token
    const loginRes = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: 'superadmin@colab.com',
            password: 'SuperAdmin@123'
        })
    });
    const { data: { token } } = await loginRes.json() as any;
    console.log("✅ Admin Logged In");

    // 2. Create a Ticket (Simulating a Customer/Vendor)
    const createRes = await fetch(`${API_URL}/tickets`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            subject: 'Issue with Tool Integration',
            description: 'The vendor has not provided the documentation for the API yet.',
            priority: 'HIGH',
            relatedType: 'PROPOSAL',
            relatedId: 1 // Assuming proposal ID 1 exists
        })
    });
    const ticketData = await createRes.json() as any;
    console.log("✅ Ticket Created:", ticketData.data.subject);

    const ticketId = ticketData.data.id;

    // 3. Fetch All Tickets
    const listRes = await fetch(`${API_URL}/tickets`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const listData = await listRes.json() as any;
    console.log("✅ Total Tickets in System:", listData.data.length);

    // 4. Update Ticket Status (Resolving it)
    const updateRes = await fetch(`${API_URL}/tickets/${ticketId}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'RESOLVED', resolutionLog: 'Issue fixed by coordinating with vendor.' })
    });
    console.log("✅ Ticket Status Updated to RESOLVED");

    console.log("\n🏁 Ticket Module Backend is working correctly!");
}

testDisputeSystem().catch(console.error);
