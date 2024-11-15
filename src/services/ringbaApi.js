import fetch from 'node-fetch';

// Function to update the target status through Ringba API
export async function updateTargetStatus(enabled) {
  try {
    const response = await fetch('https://api.ringba.com/v2/targets/update', { // Update the URL as needed for your API endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Bearer YOUR_API_KEY_HERE // Make sure to replace 'YOUR_API_KEY_HERE' with your actual API key
      },
      body: JSON.stringify({ enabled })
    });

    if (!response.ok) {
      throw new Error(HTTP error! status: ${response.status});
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
        'Authorization': Bearer YOUR_API_KEY_HERE, // Make sure to replace 'YOUR_API_KEY_HERE' with your actual API key
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(HTTP error! status: ${response.status});
    }

    const data = await response.json();
    return data.calls || [];
  } catch (error) {
    console.error('Error fetching call logs:', error);
    throw error;
  }
}