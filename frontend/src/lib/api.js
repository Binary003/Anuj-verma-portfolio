const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const fetchProjects = async () => {
  try {
    const response = await fetch(`${API_URL}/projects`);
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const fetchSkills = async () => {
  try {
    const response = await fetch(`${API_URL}/skills`);
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
};

export const submitContact = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting contact:', error);
    return { success: false, message: 'Failed to send message' };
  }
};

export const API_BASE_URL = 'http://localhost:5000';
