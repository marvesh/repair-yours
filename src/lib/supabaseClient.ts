import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // ✅ match the .env.local

export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
