import fetch from 'node-fetch';

// Function to update the target status through Ringba API
export async function updateTargetStatus(enabled) {
  try {
    const response = await fetch('https://api.ringba.com/v2/targets/update', { // Update the URL as needed for your API endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 09f0c9f0ce65fca7fd49064ab10d2bac546768a808933e19dfe71db57de11b7d531066b7b4f072abc7fcec112992cafb489008619fb80b8e93172b0a5ebfd3caffd4cf4584b64f7dc5b3508f24efa4847f189a9e47f28a399337a4dc6479527f6ddd6de97a27533b1746fa49d5113b5c996a57a2' // API Key
      },
      body: JSON.stringify({ enabled })
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

// Function to fetch call logs from Ringba API
export async function fetchCallLogs() {
  try {
    const response = await fetch('https://api.ringba.com/v2/calllogs', { // Update the URL as needed for your API endpoint
      method: 'GET',
      headers: {
        'Authorization': 'Bearer 09f0c9f0ce65fca7fd49064ab10d2bac546768a808933e19dfe71db57de11b7d531066b7b4f072abc7fcec112992cafb489008619fb80b8e93172b0a5ebfd3caffd4cf4584b64f7dc5b3508f24efa4847f189a9e47f28a399337a4dc6479527f6ddd6de97a27533b1746fa49d5113b5c996a57a2', // API Key
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.calls || [];
  } catch (error) {
    console.error('Error fetching call logs:', error);
    throw error;
  }
}
