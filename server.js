import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const API_TOKEN = "09f0c9f0ce65fca7fd49064ab10d2bac546768a89466051745b01af48f43c69d3508a09ffbb25c1c963cb4288cb44ba9fb8016ac0f349b73df49c2c9fb4d40566949f1cf9e150c26c2a934e4e126f2184cd47765ae9041d9dac81c3b87e94436edf4a791603bef94b2ed4889a5380b35edb69252";
const ACCOUNT_ID = "RAa6a071b5a752499d966c5695492b26a0";
const TARGET_ID = "TAbd5c7f0f23c245f49fc34927fe8318c6";

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// Proxy endpoint for call logs
app.get('/api/calllogs', async (req, res) => {
  try {
    const response = await fetch(`https://api.ringba.com/v2/${ACCOUNT_ID}/calllogs/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "columns": [
          "callDt",
          "buyer",
          "targetName",
          "inboundPhoneNumber",
          "callLengthInSeconds",
          "hasConverted",
          "recordingUrl"
        ],
        "filter": {
          "targetId": TARGET_ID
        },
        "sortBy": [
          {
            "column": "callDt",
            "direction": "desc"
          }
        ],
        "page": {
          "size": 10,
          "number": 1
        }
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching call logs:', error);
    res.status(500).json({ error: 'Failed to fetch call logs' });
  }
});

// Proxy endpoint for updating target status
app.post('/api/target/status', async (req, res) => {
  try {
    const { enabled } = req.body;
    const response = await fetch(`https://api.ringba.com/v2/${ACCOUNT_ID}/targets/${TARGET_ID}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Token ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ enabled })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error updating target status:', error);
    res.status(500).json({ error: 'Failed to update target status' });
  }
});

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
