const API_URL = import.meta.env.VITE_API_URL || 'https://anuj-verma-portfolio.onrender.com/api';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://anuj-verma-portfolio.onrender.com';

export const fetchProjects = async () => {
  try {
    const response = await fetch(`${API_URL}/projects`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' }
    });
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const fetchSkills = async () => {
  try {
    const response = await fetch(`${API_URL}/skills`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' }
    });
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
