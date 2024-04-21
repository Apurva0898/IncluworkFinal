import { LoginCredentials, LoginResponse } from '../models/User';

const API_URL = 'http://localhost:3000/incluwork';

const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await fetch(API_URL + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to log in');
  }
  const data: LoginResponse = await response.json();
  console.log(data);

  return data;
};

export default { login };
