import { supabase } from '../supabase/supabaseClient'

export async function supabasePizzas() {
  const { data, error } = await supabase.from('pizzas').select('*');
  if (error) {
    console.error('Error fetching pizzas:', error);
    return [];
  }
  return data;
}