import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://deygkmjhmenfbmocefki.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRleWdrbWpobWVuZmJtb2NlZmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA3NTk3NjgsImV4cCI6MjAxNjMzNTc2OH0.wqZN4iky80ywC5ohhTQFLIytCL7f6YWFieHYUwxAl_Q";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
