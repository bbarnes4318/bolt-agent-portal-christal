const API_TOKEN = "09f0c9f0ce65fca7fd49064ab10d2bac546768a89466051745b01af48f43c69d3508a09ffbb25c1c963cb4288cb44ba9fb8016ac0f349b73df49c2c9fb4d40566949f1cf9e150c26c2a934e4e126f2184cd47765ae9041d9dac81c3b87e94436edf4a791603bef94b2ed4889a5380b35edb69252"
const ACCOUNT_ID = "RAa6a071b5a752499d966c5695492b26a0"
const TARGET_ID = "TAbd5c7f0f23c245f49fc34927fe8318c6"

export async function updateTargetStatus(enabled) {
  try {
    const response = await fetch(`https://api.ringba.com/v2/${ACCOUNT_ID}/targets/${TARGET_ID}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Token ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        "enabled": enabled 
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating target status:', error);
    throw error;
  }
}

export async function fetchCallLogs() {
  try {
    const response = await fetch(`https://api.ringba.com/v2/${ACCOUNT_ID}/calllogs`, {
      headers: {
        'Authorization': `Token ${API_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching call logs:', error);
    throw error;
  }
}