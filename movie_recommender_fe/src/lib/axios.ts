import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:9991',
    headers: { 
      'Content-Type': 'application/json' 
    }
})