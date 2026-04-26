const { createClient } = require('@supabase/supabase-js');

// SERVICE_ROLE_KEY bypasses RLS — server-side only, never expose to client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

module.exports = supabase;
