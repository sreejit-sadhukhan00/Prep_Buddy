import Vapi from '@vapi-ai/web';

const vapiInstance = new Vapi(import.meta.env.VITE_VAPI_WEB_TOKEN, {
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_VAPI_WEB_TOKEN}`
    }
  });

export default vapiInstance;