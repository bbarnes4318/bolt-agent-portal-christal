const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const API_TOKEN = "09f0c9f0ce65fca7fd49064ab10d2bac546768a83f994109e4c7ff148297934dd40a060c15972a26959daf9e5d11ec27d5fcd55a123ee3fc5c1297b15efafd8c2d791d62cebe5c77232e80b8e44b54059313a1e37cc598a5d75245cc6e43e7e864e7ba91131e520c96fb55efeb13fe738b136fa9";
const ACCOUNT_ID = "RAa6a071b5a752499d966c5695492b26a0";
const TARGET_ID = "TA540227dd15a24f0ab2ad5453ac8fc5cb"; // Correct TARGET_ID
const BASE_URL = "https://api.ringba.com/v2";

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// Add CSP headers
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  );
  next();
});

// Proxy endpoint for call logs
app.get('/api/calllogs', async (req, res) => {
  try {
    console.log('Fetching call logs...');
    const startDate = new Date('2024-01-01T00:00:00Z').toISOString();
    const endDate = new Date('2024-11-12T23:59:59Z').toISOString();

    const response = await fetch(`${BASE_URL}/${ACCOUNT_ID}/calllogs/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        columns: [
          "callDt",
          "buyer",
          "targetName",
          "inboundPhoneNumber",
          "callLengthInSeconds",
          "hasConverted",
          "recordingUrl"
        ],
        filter: {
          targetId: TARGET_ID,
          dateRange: {
            start: startDate,
            end: endDate
          }
        },
        sortBy: [
          {
            column: "callDt",
            direction: "desc"
          }
        ],
        page: {
          size: 10,
          number: 1
        }
      })
    });

    console.log('API Request Body:', JSON.stringify({
      filter: {
        targetId: TARGET_ID,
        dateRange: {
          start: startDate,
          end: endDate
        }
      }
    }, null, 2));

    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText);
      const text = await response.text();
      console.error('Response:', text);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Call logs fetched successfully:', data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching call logs:', error);
    res.status(500).json({ error: error.message });
  }
});

// Proxy endpoint for updating target status
app.post('/api/target/status', async (req, res) => {
  try {
    const { enabled } = req.body;
    console.log(`Updating target status to: ${enabled ? 'ON' : 'OFF'}`);

    const response = await fetch(`${BASE_URL}/${ACCOUNT_ID}/targets/${TARGET_ID}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Token ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      // Simplified request body - just send enabled status directly
      body: JSON.stringify({ enabled })
    });

    const responseText = await response.text();
    console.log('Raw API Response:', responseText);

    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText);
      throw new Error(`Failed to update target status: ${responseText}`);
    }

    const data = responseText ? JSON.parse(responseText) : {};
    console.log(`Target status updated successfully to: ${enabled ? 'ON' : 'OFF'}`);
    res.json(data);
  } catch (error) {
    console.error('Error updating target status:', error);
    res.status(500).json({ error: error.message });
  }
});

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
