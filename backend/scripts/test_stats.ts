import axios from 'axios';

async function testStats() {
    try {
        const loginRes = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'superadmin@colab.com',
                password: 'SuperAdmin@123'
            })
        });
        const loginData: any = await loginRes.json();
        const token = loginData.data.token;

        const statsRes = await fetch('http://localhost:5000/api/proposals/stats', {
            headers: { Authorization: `Bearer ${token}` }
        });
        const statsData: any = await statsRes.json();
        console.log('Platform Stats:', statsData.data);
    } catch (err: any) {
        console.error('Error fetching stats:', err.message);
    }
}

testStats();
