import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '❌ Supabase env vars missing! ' +
    'Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in Vercel → Settings → Environment Variables, ' +
    'then redeploy.'
  )
}

export const supabase = createClient(
  supabaseUrl || 'https://pnhhoezlzahpwizycxle.supabase.co/rest/v1/',
  supabaseAnonKey || 'sb_publishable_F6h7GRBGk-rOA-IfIyyOzA_2rEXUT4E'
)