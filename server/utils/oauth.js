import axios from 'axios';

export const exchangeCodeForToken = async (code) => {
  const response = await axios.post(
    'https://oauth2.googleapis.com/token',
    null,
    {
      params: {
        code: code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: 'http://localhost:5000/auth/google/callback',
        grant_type: 'authorization_code',
      },
    }
  );

  return response.data;
};
