import { supabase } from '@/lib/supabaseClient';

export async function getOrders(agent: string) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('agent', agent)
    .order('date', { ascending: false });
  if (error) throw error;
  return data;
}
