import axios from 'axios';

const BASE_URL = 'https://genai-images-4ea9c0ca90c8.herokuapp.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// interceptor for logging
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('Response Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Network Error: No response received', error.message);
    } else {
      console.error('Request Setup Error:', error.message);
    }
    return Promise.reject(error);
  }
);


export const fetchP13nAnswers = async () => {
  try {
    const requestBody = {
      module_id: '1',
      parent_id: 'EXAMPLEPARENT',
      child_id: 'EXAMPLECHILD',
      responses: [
        {
          question_id: 'q006_tantrums',
          selected_choice_ids: ['choice_b', 'choice_c'],
          open_response_text: '',
          timestamp: '2025-10-14T07:25:31.482Z',
        },
        {
          question_id: 'q009_language_dev',
          selected_choice_ids: ['choice_c', 'choice_a'],
          open_response_text: '',
          timestamp: '2025-10-14T07:25:31.482Z',
        },
        {
          question_id: 'q008_development_concerns',
          selected_choice_ids: ['open_response'],
          open_response_text: 'His cognitive abilities being stunted by overuse of mobiles',
          timestamp: '2025-10-14T07:25:31.482Z',
        },
      ],
    };

    const response = await apiClient.post('/p13n_answers', requestBody);
    return response.data;
  } catch (error) {
    console.error('Error fetching P13n answers:', error);
    throw error;
  }
};


export const activateTinu = async (context, topic) => {
  try {
    const requestBody = {
      child_id: 'EXAMPLECHILD',
      context: context,
      module_id: '1',
      topic: topic,
    };

    const response = await apiClient.post('/activate_tinu', requestBody);
    return response.data;
  } catch (error) {
    console.error('Error activating Tinu:', error);
    throw error;
  }
};

export default {
  fetchP13nAnswers,
  activateTinu,
};
