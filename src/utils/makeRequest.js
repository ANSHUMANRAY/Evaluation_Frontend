import axios from 'axios';

export async function makeRequest(
  apiEndpoint = {},
  dyamicConfig = {},
  navigate
) {
  try {
    const response = await axios({
      ...dyamicConfig,
      ...apiEndpoint,
      headers: {
        Authorization: 'Bearer QWlzaHdhcnlhIE4=',
      },
    });

    return response.data;
  } catch (err) {
    navigate('/error');
  }
}