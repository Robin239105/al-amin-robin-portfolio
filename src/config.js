// Centralized configuration for the Cinematic Portfolio
const isProduction = true; // Set to true for cPanel deployment

export const API_URL = import.meta.env.VITE_API_URL || (isProduction 
  ? 'https://api.alaminrobin.com' 
  : 'http://localhost:3001');

export const WHATSAPP_NUMBER = '8801575096211';
export const ADMIN_EMAIL = 'admin@alaminrobin.com';

