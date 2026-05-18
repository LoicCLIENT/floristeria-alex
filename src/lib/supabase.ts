import { createClient } from '@supabase/supabase-js';

// These are placeholder values - replace with your actual Supabase credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to save contact message
export async function saveContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const { data: result, error } = await supabase
    .from('contact_messages')
    .insert([data])
    .select();

  if (error) {
    console.error('Error saving contact message:', error);
    throw error;
  }

  return result;
}

// Helper function to save order
export async function saveOrder(data: {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  delivery_date: string;
  items: unknown;
  total: number;
}) {
  const { data: result, error } = await supabase
    .from('orders')
    .insert([data])
    .select();

  if (error) {
    console.error('Error saving order:', error);
    throw error;
  }

  return result;
}
