import { supabase } from './supabase';

export async function checkHealth(): Promise<{
  ok: boolean;
  database: boolean;
  auth: boolean;
}> {
  const dbCheck = await supabase.from('habits').select('id').limit(1);
  const authCheck = await supabase.auth.getSession();

  return {
    ok: !dbCheck.error,
    database: !dbCheck.error,
    auth: !authCheck.error,
  };
}