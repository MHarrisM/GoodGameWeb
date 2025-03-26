import { createClient } from '@supabase/supabase-js';
// import "./hidden/hidden"

const SUPABASE_URL = 'https://mayklnpngkmssoovybkc.supabase.co';
const SUPBASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1heWtsbnBuZ2ttc3Nvb3Z5YmtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NDgxMTgsImV4cCI6MjA1ODUyNDExOH0.gu5B8JK7VagHF4YUrvKaCC9vyr0rVqSwr8d7x4bYvbw';
const supabase = createClient(SUPABASE_URL, SUPBASE_ANON_KEY);
export default supabase;