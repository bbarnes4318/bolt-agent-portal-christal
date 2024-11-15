import fetch from 'node-fetch';

// Function to update the target status through Ringba API
export async function updateTargetStatus(enabled) {
  try {
    const response = await fetch('https://api.ringba.com/v2/targets/update', { // Update the URL as needed for your API endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 09f0c9f0ce65fca7fd49064ab10d2bac546768a8653e531adba01a243400043644d6ea41a753f19b5b83d4358aa30ed7116ae811099eb51212f4950b56e014c30e21909f4436ab54ef8a14a9d8e50af44c142194c09e14fddc04455e1feac90d9007b8ab991db817dd60420935e9c0cbb328d0ff' // API Key
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
        'Authorization': 'Bearer 09f0c9f0ce65fca7fd49064ab10d2bac546768a8653e531adba01a243400043644d6ea41a753f19b5b83d4358aa30ed7116ae811099eb51212f4950b56e014c30e21909f4436ab54ef8a14a9d8e50af44c142194c09e14fddc04455e1feac90d9007b8ab991db817dd60420935e9c0cbb328d0ff', // API Key
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
