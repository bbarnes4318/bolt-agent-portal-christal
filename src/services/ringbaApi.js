export async function updateTargetStatus(enabled) {
  try {
    const response = await fetch('/api/target/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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

export async function fetchCallLogs() {
  try {
    const response = await fetch('/api/calllogs');

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
